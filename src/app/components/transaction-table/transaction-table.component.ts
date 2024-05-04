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
import { Transaction } from 'src/app/modal/transaction.modal';
import { Subject } from 'rxjs';
import { formatDate } from 'src/app/utils/application.helper';


@Component({
  selector: 'transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrl: './transaction-table.component.css',
})
export class TransactionTableComponent {
  @Input() rowDataInput: any[];
  @Input() params: { lastDataUpdated : number, rowData: any[]}
  @Input() action: Function
  @Input() event: Subject<any>;
  gridAPI: GridApi;


  faEllipsisVertical = faEllipsisVertical;
  public columnDefs: ColDef[] = [
    {field: 'id', hide: true},
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
    { field: 'account' },
    { field: 'amount', maxWidth: 150 },
    { field: 'createdDate', headerName:'Date', valueFormatter: (params)=> formatDate(params.value)  },
    { field: 'type' },
    { field: 'category' },
    { field: 'transactionMode', headerName:'Mode' },
    { field: 'description' },
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
        actionTriggered: this.onAction.bind(this),
        calledFrom: 'TRANSACTION'
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
  public rowData!: Transaction[];
  public themeClass: string = 'ag-theme-quartz-dark';

  constructor() {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.event.subscribe(value=>{
      if(this.gridAPI && value['type'] === 'LOADING'){
        if(value['value']){
          this.gridAPI.showLoadingOverlay();
        }else{
          this.gridAPI.hideOverlay();
        }
      }else if(this.gridAPI && value['type'] === 'REFRESH'){
        this.gridAPI.setGridOption("rowData", this.rowData);
      }
    })
  }

  onGridReady(params: GridReadyEvent<Transaction>) {
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

  onAction(params:any) {
    this.action(params);
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if(this.gridAPI){
      this.rowData = this.rowDataInput;
    }
  }
}
