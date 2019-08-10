import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges, OnChanges, ContentChild, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTable, MatTableDataSource } from '@angular/material';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {

  @Input() elementData: any;
  @Input() displayedColumns: string[];
  @ViewChild('table', { static: false }) table: MatTable<any>;
  @Output() eventRow = new EventEmitter<any>();

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

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
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

  emitEventRow($event: any) {
    this.eventRow.emit({ event: $event, action: 'click' });
  }

}
