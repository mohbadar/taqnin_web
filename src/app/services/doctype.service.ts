import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Doctype } from '../configuration/doctype/doctype';

@Injectable({
  providedIn: 'root'
})
export class DoctypeService {
    private baseUrl = '/api/admin/doctypes';

      constructor(private http: HttpClient) { }

      getDoctypes(): Observable<any> {
        return this.http.get(`${this.baseUrl}`);
      }

      createDoctype(value: Doctype): Observable<Object> {
        return this.http.post(`${this.baseUrl}`, value);
      }

      getDoctypeById(id: number): Observable<Object> {
        return this.http.get(`${this.baseUrl}/${id}`);
      }

      updateDoctype(id: number, value: Doctype): Observable<Object> {
        return this.http.put(`${this.baseUrl}/${id}`, value);
      }

      deleteRecord(id){
        return this.http.delete(`${this.baseUrl}/${id}`);
      }

      getRecordList(data, filters) {
        return this.http.post(`${this.baseUrl}`, {
          input: data,
          filters: filters
        });
      }

}
