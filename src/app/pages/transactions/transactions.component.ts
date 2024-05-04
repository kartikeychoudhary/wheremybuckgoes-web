import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { TransactionFormDialogComponent } from 'src/app/components/transaction-form-dialog/transaction-form-dialog.component';
import { Transaction } from 'src/app/modal/transaction.modal';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css',
})
export class TransactionsComponent {
  actionTriggered: Function;
  isDataLoaded: boolean;
  event = new Subject();
  rowData = [];
  constructor(
    public dialog: MatDialog,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.actionTriggered = this.onActionTriggered.bind(this);
    this.loadTransactions();
  }

  openDialog(transaction?: Transaction): void {
    const config = new MatDialogConfig();
    config.minWidth = '100%';
    config.minHeight = '100%';
    config.data = transaction
      ? { transaction, editMode: true }
      : {
          transaction: null,
          editMode: false,
        };
    const dialogRef = this.dialog.open(TransactionFormDialogComponent, config);

    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        if (result.editMode) {
          this.editTransaction(result.transaction);
        } else {
          this.addTransaction(result.transaction);
        }
      }
    });
  }

  onActionTriggered(params): void {
    switch (params['action']) {
      case 'delete':
        return this.deleteTransaction(params.data);
      case 'edit':
        return this.openEditDialog(params.data.rowData);
      default:
        return;
    }
  }

  openEditDialog(transaction?: Transaction): void {
    this.openDialog(transaction);
  }
  showLoading(value: boolean) {
    this.event.next({ type: 'LOADING', value });
  }
  refreshData(value: boolean) {
    this.event.next({ type: 'REFRESH', value });
  }

  loadTransactions() {
    this.showLoading(true);
    this.transactionService.getAllTransactions().subscribe({
      next: (res) => {
        if (res['status'] === 'OK') {
          this.rowData = res['payload']['RESULT'];
          this.showLoading(false);
        }
      },
      error: (err) => {
        this.showLoading(false);
      },
    });
  }

  addTransaction(transaction: Transaction) {
    this.showLoading(true);
    this.transactionService.saveTransaction(transaction).subscribe({
      next: (res) => {
        if (res['status'] === 'OK') {
          const t = res['payload']['RESULT'];
          this.rowData.unshift(t);
          this.refreshData(true);
          this.showLoading(false);
        }
      },
      error: (err) => {
        this.showLoading(false);
      },
    });
  }
  editTransaction(transaction: Transaction) {
    this.showLoading(true);
    this.transactionService.saveTransaction(transaction).subscribe({
      next: (res) => {
        if (res['status'] === 'OK') {
          const t = res['payload']['RESULT'];
          this.rowData = this.rowData.filter((tt) => tt.id !== t.id);
          this.rowData.unshift(t);
          this.showLoading(false);
        }
      },
      error: (err) => {
        this.showLoading(false);
      },
    });
  }

  deleteTransaction(transaction: Transaction) {
    transaction.deleted = true;
    this.showLoading(true);
    this.transactionService.saveTransaction(transaction).subscribe({
      next: (res) => {
        if (res['status'] === 'OK') {
          const t = res['payload']['RESULT'];
          this.rowData = this.rowData.filter((tt) => tt.id !== t.id);
          this.showLoading(false);
        }
      },
      error: (err) => {
        this.showLoading(false);
      },
    });
  }
}
