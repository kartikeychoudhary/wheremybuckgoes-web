import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TransactionFormDialogComponent } from 'src/app/components/transaction-form-dialog/transaction-form-dialog.component';
import { Transaction } from 'src/app/modal/transaction.modal';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent {
  editRowData: Function
  isDataLoaded: boolean;
  transactionsIdIndexMap: {}
  constructor(public dialog: MatDialog, private transactionService:TransactionService){

  }
  rowData = [];

  openDialog(transaction?:Transaction): void {
    const config = new MatDialogConfig();
    config.minWidth = '100%'
    config.minHeight = '100%'
    config.data = transaction ? {transaction, editMode: true} :{
      transaction: null,
      editMode: false
    }
    const dialogRef = this.dialog.open(TransactionFormDialogComponent, config);
    
    dialogRef.afterClosed().subscribe(result => {
      if(result.editMode){
        this.editTransaction(result.transaction);
      }else{
        this.addTransaction(result.transaction);
      }
    });
  }

  openEditDialog(transaction?:Transaction):void {
    this.openDialog(transaction);
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.editRowData = this.openEditDialog.bind(this);
    this.loadTransactions();
  }

  loadTransactions(){
    this.transactionService.getAllTransactions().subscribe({
      next:(res)=>{
        if(res['status'] === 'OK'){
          this.rowData = res['payload']['RESULT'];
          this.isDataLoaded = true;
        }
      },
      error: (err)=>{

      }
    })
  }

  addTransaction(transaction:Transaction){
      this.transactionService.saveTransaction(transaction).subscribe({
        next:(res)=>{
          if(res['status'] === 'OK'){
            const t = res['payload']['RESULT'];
            this.rowData.unshift(t);
          }
        },
        error: (err)=>{
  
        }
      })
  }
  editTransaction(transaction:Transaction){
    this.transactionService.saveTransaction(transaction).subscribe({
      next:(res)=>{
        if(res['status'] === 'OK'){
          const t = res['payload']['RESULT'];
          this.rowData = this.rowData.filter(tt=>tt.id!== t.id);
          this.rowData.unshift(t);
        }
      },
      error: (err)=>{

      }
    })
}
}
