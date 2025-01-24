import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction } from './maintenance/maintenance.component';
import { MonthlyTransactions } from './view-data/view-data.component';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl: string = 'https://localhost:7021/api/Transaction/';
  baseUrl1: string = 'https://localhost:7021/api/Registration/';
  baseUrl2: string = 'https://localhost:7021/api/Login/';



  constructor(private http: HttpClient) {}

  upsertTransaction(transaction: Transaction) {
    return this.http.post<Transaction>(this.baseUrl + 'Upsert', transaction);
  }

  getAllTransactions() {
    return this.http.get<Transaction[]>(this.baseUrl + 'GetAll');
  }

  deleteTransaction(id: number) {
    return this.http.delete(this.baseUrl + 'Delete/' + id, {
      responseType: 'text',
    });
  }

  getMonthlyTransactions() {
    return this.http.get<MonthlyTransactions[]>(
      this.baseUrl + 'GetMonthlyTransactions'
    );
  }

  register(register: any): Observable<any> {
    return this.http.post<any>(this.baseUrl1 + 'Register', register);
  }
  
  login(loginData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl2 + 'Login', loginData);
  }
}
