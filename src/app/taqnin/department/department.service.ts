import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
	// private baseUrl = environment.apiUrl;
	private baseUrl = 'api/admin/departments';

	constructor(private http: HttpClient) { }

	getRecordList(): Observable<any> {
		return this.http.get(`${this.baseUrl}`);
	}
 
	getCountry(id: number): Observable<Object> {
		return this.http.get(`${this.baseUrl}/${id}`);
	}

	createRecord(data: Object): Observable<Object> {
		return this.http.post(`${this.baseUrl}`, data);
	}

	updateCountry(id: number,  value: any): Observable<Object> {
		return this.http.put(`${this.baseUrl}/${id}`, value);
	}

	deleteCountry(id: number): Observable<any> {
		return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
	}


}
