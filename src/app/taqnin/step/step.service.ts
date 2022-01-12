import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StepService {
	// private baseUrl = environment.apiUrl;
	private baseUrl = '/api/taqnin/steps';

	constructor(private http: HttpClient) { }

	getRecordList(): Observable<any> {
		return this.http.get(`${this.baseUrl}`);
	}
 
	getRecord(id: number): Observable<Object> {
		return this.http.get(`${this.baseUrl}/${id}`);
	}

	createRecord(obj: Object): Observable<Object> {
		return this.http.post(`${this.baseUrl}`, obj);
	}

	updateRecord(id: number,  value: any): Observable<Object> {
		return this.http.put(`${this.baseUrl}/${id}`, value);
	}

	deleteRecord(id: number): Observable<any> {
		return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
	}
}
