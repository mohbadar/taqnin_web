import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecruitmentService {
  private baseUrl = '/api/recruitments';

  constructor(private http: HttpClient) { }

  getRecordList(data, filters) {
      return this.http.post(`${this.baseUrl}/list`, {
          input: data,
          filters: filters
      });
  }

  addRecord(data) {
      return this.http.post(`${this.baseUrl}`, data);
  }

  editRecord(id, data) {
      return this.http.post(`${this.baseUrl}/${id}`, data);
  }

  getRecordById(id) {
      return this.http.get(`${this.baseUrl}/${id}`)
  }
}
