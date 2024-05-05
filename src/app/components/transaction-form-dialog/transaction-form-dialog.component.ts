import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Transaction } from 'src/app/modal/transaction.modal';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApplicationConstant } from 'src/app/constants/application.constant';

@Component({
  selector: 'transaction-form-dialog',
  templateUrl: './transaction-form-dialog.component.html',
})
export class TransactionFormDialogComponent {
  transactionForm: FormGroup;
  editMode= false;
  isLoading= false;
  tags:string[] = []
  tag: string = '';
  transaction: Transaction;
  date: number;
  categories: string[];
  modes: string[];
  types: string[];
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<TransactionFormDialogComponent>, @Inject(MAT_DIALOG_DATA) private parameters: {transaction:Transaction, editMode:boolean}){
    this.categories = ApplicationConstant.CATEGORIES;
    this.modes = ApplicationConstant.MODE;
    this.types = ApplicationConstant.TYPE;
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.editMode = this.parameters.editMode;
    this.transaction = this.parameters.transaction;
    this.createForm();
  }

  createForm(){
    this.transactionForm = this.fb.group({
      amount:[  this.editMode ? this.transaction['amount']:null,    [Validators.required]],
      account:[ this.editMode ? this.transaction['account']:null,   [Validators.required]],
      category:[this.editMode ? this.transaction['category']:'',  [Validators.required]],
      mode: [   this.editMode ? this.transaction['transactionMode']:'', [Validators.required]],
      type: [   this.editMode ? this.transaction['type']:'',      [Validators.required]],
      description: [this.editMode ? this.transaction['description']:'null', [Validators.required]],
      spendAt: [this.editMode ? this.transaction['spendAt']:null, [Validators.required]]
    })
    this.tags = this.transaction ? this.transaction.tags : [];
    this.date = this.transaction ? this.transaction['createdDate'] : new Date().getTime(); 
  }

  addTag(){
    if(this.tag !== '' && !this.tags.includes(this.tag)){
      this.tags.push(this.tag);
      this.tag = '';
    }
  }

  removeTag(tag:string){
    const filtered = this.tags.filter(t=>t!==tag);
    this.tags = filtered;
  }

  handleDateTime(date:any) {
    this.date = date
  }

  addTransaction(){
    const transaction = {
      id: this.transaction ? this.transaction['id'] : null,
      account: this.transactionForm.value['account'],
      amount: this.transactionForm.value['amount'],
      category: this.transactionForm.value['category'],
      type: this.transactionForm.value['type'],
      transactionMode: this.transactionForm.value['mode'],
      description: this.transactionForm.value['description'],
      spendAt: this.transactionForm.value['spendAt'],
      tags: this.tags,
      createdDate: this.date
    }
    this.dialogRef.close({transaction, editMode:this.editMode});
  }

}
