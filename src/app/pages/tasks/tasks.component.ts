import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { FieldEditorDialogComponent } from 'src/app/components/field-editor-dialog/field-editor-dialog.component';
import { TransactionFormDialogComponent } from 'src/app/components/transaction-form-dialog/transaction-form-dialog.component';
import { Task } from 'src/app/modal/task.modal';
import { Transaction } from 'src/app/modal/transaction.modal';
import { GenaiService } from 'src/app/services/genai.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
})
export class TasksComponent {
  actionTriggered: Function;
  isDataLoaded: boolean;
  transactionsIdIndexMap: {};
  prompt: string;
  isLoading: false;
  event = new Subject();
  rowData = [];

  constructor(
    public dialog: MatDialog,
    private taskService: TaskService,
    private genaiService: GenaiService
  ) {}

  ngOnInit(): void {
    this.actionTriggered = this.onActionTriggered.bind(this);
    this.loadTasks();
  }

  openEditCellDialog(params: {
    field: string;
    value: string;
    refrence: string;
    rowData: any;
  }) {
    const config = new MatDialogConfig();
    config.minWidth = '100%';
    config.minHeight = '100%';
    config.data = params;

    const dialogRef = this.dialog.open(FieldEditorDialogComponent, config);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        params.rowData[params.field] = result;
        this.editTask(params.rowData);
      }
    });
  }

  openEditDialog(params: Task): void {
    const transactionString = params.response;
    try {
      const transaction = new Transaction(JSON.parse(transactionString));
      const config = new MatDialogConfig();
      config.minWidth = '100%';
      config.minHeight = '100%';
      config.data = transaction
        ? { transaction, editMode: true }
        : {
            transaction: null,
            editMode: false,
          };
      const dialogRef = this.dialog.open(
        TransactionFormDialogComponent,
        config
      );

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          params.response = JSON.stringify(result.transaction);
          this.editTask(params);
        }
      });
    } catch (e) {
      alert('Error while parsing response');
    }
  }

  onActionTriggered(params): void {
    switch (params['action']) {
      case 'start':
        return this.startAction(params.data.rowData);
      case 'delete':
        return this.deleteTask(params.data);
      case 'edit':
        return this.editAction(params.data.rowData);
      case 'cellClicked':
        return this.openEditCellDialog({
          field: params.cell,
          value: params.rowData[params.cell],
          refrence: params.rowData['request'],
          rowData: params.rowData,
        });
      default:
        return;
    }
  }

  startAction(params: Task) {
    if (params['status'] === 'COMPLETED' && params['type'] === 'GenAi') {
      this.convertTask(params);
    }
    if (params['status'] === 'OPEN' && params['type'] === 'GenAi') {
      this.startTask(params);
    }
  }

  showLoading(value: boolean) {
    this.event.next({ type: 'LOADING', value });
  }

  refreshData(value: boolean) {
    this.event.next({ type: 'REFRESH', value });
  }

  editAction(params: Task) {
    this.openEditDialog(params);
  }

  loadTasks() {
    this.showLoading(true);
    this.taskService.getAllTasks().subscribe({
      next: (res) => {
        if (res['status'] === 'OK') {
          this.rowData = res['payload']['RESULT'];
          this.isDataLoaded = true;
        }
      },
      error: (err) => {},
      complete: () => {
        this.showLoading(false);
      },
    });
  }

  submitGenAiTask() {
    this.showLoading(true);
    if (
      this.prompt === '' ||
      this.prompt === undefined ||
      this.prompt === null
    ) {
      return;
    }
    this.genaiService.sendGenaiPrompt(this.prompt).subscribe({
      next: (res) => {
        this.prompt = null;
        if (res['status'] === 'OK') {
          const task = res['payload']['RESULT'];
          if (task) {
            this.rowData.push(task);
            this.refreshData(true);
            console.log(this.rowData);
          }
        }
      },
      error: (err) => {
        this.showLoading(false);
      },
      complete: () => {
        this.showLoading(false);
      },
    });
  }

  editTask(task: Task) {
    this.showLoading(true);
    this.taskService.saveTask(task).subscribe({
      next: (res) => {
        if (res['status'] === 'OK') {
          const t = res['payload']['RESULT'];
          this.rowData = this.rowData.filter((tt) => tt.taskId !== t.taskId);
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

  deleteTask(task: Task) {
    task.deleted = true;
    this.showLoading(true);
    this.taskService.saveTask(task).subscribe({
      next: (res) => {
        if (res['status'] === 'OK') {
          const t = res['payload']['RESULT'];
          this.rowData = this.rowData.filter((tt) => tt.taskId !== t.taskId);
          this.refreshData(true);
          this.showLoading(false);
        }
      },
      error: (err) => {
        this.showLoading(false);
      },
    });
  }

  startTask(task: Task) {
    this.showLoading(true);
    this.taskService.startTask(task).subscribe({
      next: (res) => {
        if (res['status'] === 'OK') {
          const t = res['payload']['RESULT'];
          this.rowData = this.rowData.filter((tt) => tt.taskId !== t.taskId);
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

  convertTask(task: Task) {
    this.showLoading(true);
    this.taskService.convertTask(task).subscribe({
      next: (res) => {
        if (res['status'] === 'OK') {
          const t = res['payload']['RESULT'];
          this.rowData = this.rowData.filter((tt) => tt.taskId !== t.taskId);
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
}
