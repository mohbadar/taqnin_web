import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
    private baseUrl = '/api/admin/departments';

      constructor(private http: HttpClient) { }

      getDepartments(): Observable<any> {
        return this.http.get(`${this.baseUrl}`);
      }

      // createDepartment(value: Department): Observable<Object> {
      //   return this.http.post(`${this.baseUrl}`, value);
      // }

      // getDepartmentById(id: number): Observable<Object> {
      //   return this.http.get(`${this.baseUrl}/${id}`);
      // }

      // updateDepartment(id: number, value: Department): Observable<Object> {
      //   return this.http.put(`${this.baseUrl}/${id}`, value);
      // }

      // deleteRecord(id){
      //   return this.http.delete(`${this.baseUrl}/${id}`);
      // }

}
