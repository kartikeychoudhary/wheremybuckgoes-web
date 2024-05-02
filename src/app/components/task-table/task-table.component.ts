import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import {
  CheckboxSelectionCallbackParams,
  ColDef,
  GridApi,
  GridOptions,
  GridReadyEvent,
  HeaderCheckboxSelectionCallbackParams,
  IGroupCellRendererParams,
} from 'ag-grid-community';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { ActionButtons } from '../action-buttons/action-buttons.component';
import { Task } from 'src/app/modal/task.modal';
import { formatDate, formatExecutionTime } from 'src/app/utils/application.helper';
@Component({
  selector: 'task-table',
  templateUrl: './task-table.component.html',
})
export class TaskTableComponent {

  getStatusClass = (status) => {
    switch (status) {
      case 'FAILED':
        return 'text-red-500'; // Red color
      case 'COMPLETED':
        return 'text-green-500'; // Green color
      case 'IN_PROGRESS':
        return 'text-blue-500'; // Blue color
      default:
        return ''; // Default class for unknown status
    }
  };

  @Input() rowDataInput: any[];
  @Input() params: { lastDataUpdated : number, rowData: any[]}
  @Input() startTask: Function;
  gridAPI: GridApi;

  faEllipsisVertical = faEllipsisVertical;
  public columnDefs: ColDef[] = [
    {field: 'taskId', hide: true},
    {
      field: 'select',
      headerName: '',
      maxWidth: 50,
      checkboxSelection: (params: CheckboxSelectionCallbackParams) =>
        this.checkboxSelection(params),
      headerCheckboxSelection: (
        params: HeaderCheckboxSelectionCallbackParams
      ) => this.headerCheckboxSelection(params),
    },
    { field: 'status', cellClass: (params) => this.getStatusClass(params.value) },
    { field: 'request' },
    { field: 'response' },
    { field: 'type' },
    { field: 'createdDate', valueFormatter: (params)=> formatDate(params.value)},
    { field: 'startDate', valueFormatter: (params)=> formatDate(params.value)},
    { field: 'endDate', valueFormatter: (params)=> formatDate(params.value) },
    { field: 'executionTime', valueFormatter: (params)=> formatExecutionTime(params.value) },
    {
      field: 'action',
      headerName: 'Action',
      cellClass: 'overflow-visible',
      cellRendererSelector: (params) => {
        return {
          component: ActionButtons,
        }
      },
      cellRendererParams: {
        actionTriggered: this.onStartTask.bind(this),
        calledFrom: 'TASK'
      },
    },
  ];
  public autoGroupColumnDef: ColDef = {
    headerName: 'Group',
    minWidth: 170,
    field: 'athlete',
    valueGetter: (params) => {
      if (params.node!.group) {
        return params.node!.key;
      } else {
        return params.data[params.colDef.field!];
      }
    },
    headerCheckboxSelection: true,
    cellRenderer: 'agGroupCellRenderer',
    cellRendererParams: {
      checkbox: true,
    } as IGroupCellRendererParams,
  };
  public defaultColDef: ColDef = {
    editable: false,
    enableRowGroup: false,
    enablePivot: false,
    enableValue: false,
    filter: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
  };
  public rowSelection: 'single' | 'multiple' = 'multiple';
  public rowGroupPanelShow: 'always' | 'onlyWhenGrouping' | 'never' = 'never';
  public pivotPanelShow: 'always' | 'onlyWhenPivoting' | 'never' = 'never';
  public rowData!: Task[];
  public themeClass: string = 'ag-theme-quartz-dark';

  constructor() {}

  onGridReady(params: GridReadyEvent<Task>) {
    this.gridAPI = params.api;
    this.rowData = this.rowDataInput;
  }

  checkboxSelection = (params: CheckboxSelectionCallbackParams) => {
    // we put checkbox on the name if we are not doing grouping
    return params.api.getRowGroupColumns().length === 0;
  };
  headerCheckboxSelection = (params: HeaderCheckboxSelectionCallbackParams) => {
    // we put checkbox on the name if we are not doing grouping
    return params.api.getRowGroupColumns().length === 0;
  };

  onStartTask(params:any) {
    this.startTask(params.data.rowData);
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if(this.gridAPI){
      this.rowData = this.rowDataInput;
    }
  }
}
