import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges, OnChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTable, MatTableDataSource } from '@angular/material';
import { LocalStorageService, LocalStorage } from 'ngx-webstorage';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {

  @Input() elementData: any;
  @Input() displayedColumns: string[];
  @Output() action = new EventEmitter<any>();
  @ViewChild('table', { static: false }) table: MatTable<any>;

  @LocalStorage() searchPlaceholder: any;

  dataSource: any;

  isloading = true;
  menuButtons = [];

  adminMenu = {
    active: ['edit', 'inactive', 'delete'],
    staging: ['publish', 'delete'],
    draft: ['edit', 'delete'],
  };

  OAMenu = {
    pending: ['edit', 'delete'],
    draft: ['edit', 'delete'],
  };

  constructor(private router: Router, public localStorage: LocalStorageService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.elementData) {
      this.buildTableData();
    }
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

  ngOnInit() {
    this.updateSearchPlaceholder();
    this.localStorage.observe('searchText').subscribe(value => {
      this.applyFilter(value);
    });
  }

  setMenuButtons(status: string) {
    status = status.toLowerCase();
    const role = 1;
    const modules = ['users', 'posts', 'comments'];

    if (role === 1) {
      if (modules.includes(this.getModuleName())) {
        this.menuButtons = this.adminMenu[status] || ['delete'];
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

  getModuleName() {
    return this.router.url.substring(1, this.router.url.length);
  }

  emitAction(action: string, data: number) {
    this.action.emit({ action, data });
  }

}
