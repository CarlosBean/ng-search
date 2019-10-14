import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges, OnChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTable, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { LocalStorageService, LocalStorage } from 'ngx-webstorage';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {

  @Input() elementData: [{}];
  @Input() displayedColumns: string[];
  @Output() action = new EventEmitter<any>();
  @ViewChild('table', { static: false }) table: MatTable<any>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @LocalStorage() searchPlaceholder: any;

  dataSource: any;

  isloading = true;
  menuButtons = [];

  adminMenu = {
    active: ['update', 'inactive', 'delete'],
    staging: ['publish', 'delete'],
    draft: ['update', 'delete'],
  };

  OAMenu = {
    pending: ['update', 'delete'],
    draft: ['update', 'delete'],
  };

  modulesWithOutlet = ['posts'];

  constructor(private router: Router, public localStorage: LocalStorageService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.elementData) {
      this.buildTableData();
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
  }

  ngOnInit() {
    this.updateSearchPlaceholder();
    this.localStorage.observe('searchText').subscribe(value => {
      this.applyFilter(value);
    });
  }

  updateSearchPlaceholder() {
    this.searchPlaceholder = this.displayedColumns;
  }

  buildTableData() {
    this.elementData.forEach((object: any) => {
      for (const key in object) {
        if (!this.displayedColumns.includes(key)) {
          delete object[key];
        }
      }

      // added fixed status for test
      if (this.getModuleName() === 'users') {
        object.status = 'active';
      }
    });

    this.dataSource = new MatTableDataSource(this.elementData);
    this.table ? this.table.renderRows() : console.log('TABLE NOT INITIALIZED');
  }

  applyFilter(filterValue = '') {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  setMenuButtons(status = '') {
    status = status.toLowerCase();
    const role = 1;
    const modules = ['users', 'posts', 'comments'];

    if (role === 1) {
      if (modules.includes(this.getModuleName())) {
        this.menuButtons = this.adminMenu[status] || ['update', 'delete'];
      }
    } else {
      this.menuButtons = this.OAMenu[status] || ['delete'];
    }
  }

  getStatusClass(column: string, status: string) {
    if (column === 'status') {
      return status ? status.toLowerCase() : '';
    }
  }

  getModuleName(): string {
    return this.router.url.substring(1, this.router.url.length);
  }

  emitAction(action: string, id?: number) {
    if (action === 'update') {
      if (this.isOutletRoute()) {
        this.router.navigate(['/', this.getModuleName(), { outlets: { popup: `update/${id}` } }]);
      } else {
        this.router.navigate([`/${this.getModuleName()}/update/${id}`]);
      }
    } else {
      this.action.next({ action, id });
    }
  }

  isOutletRoute(): boolean {
    return this.modulesWithOutlet.includes(this.getModuleName());
  }
}
