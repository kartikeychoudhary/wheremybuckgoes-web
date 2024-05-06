import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Transaction } from '../modal/transaction.modal';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private SERVER_URL = environment.apiUrl + 'api/v1/transaction';
  constructor(private router: Router, private http: HttpClient) {}

  getAllTransactions() {
    const headers = new HttpHeaders({
      'content-type': 'application/json',
    });
    return this.http.get<any>(this.SERVER_URL, { headers });
  }

  getAllTransactionsForDuration(date:number) {
    const headers = new HttpHeaders({
      'content-type': 'application/json',
    });
    return this.http.get<any>(this.SERVER_URL + '/after/' + date, { headers });
  }

  saveTransaction(transaction:Transaction) {
    const headers = new HttpHeaders({
      'content-type': 'application/json',
    });
    return this.http.post<any>(this.SERVER_URL, transaction, { headers });
  }
}
