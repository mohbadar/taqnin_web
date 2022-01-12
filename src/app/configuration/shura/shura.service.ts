import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { Shura } from './shura';

@Injectable({
  providedIn: 'root'
})
export class ShuraService {
    private baseUrl = '/api/shura';
	shoras;

	constructor(private http: HttpClient) { }
	
	getShuras(): Observable<any> {
	// return this.http.get(`${this.baseUrl}`);
		if (!this.shoras) {
			return this.http.get(`${this.baseUrl}`).pipe(
				map((data: any) => {
					return this.shoras = data;
				})
			);
		} else {
			return of(this.shoras);
		}
	}
    
      createShura(value: Shura): Observable<Object> {
        return this.http.post(`${this.baseUrl}`, value);
      }

      getShuraById(id: number): Observable<Object> {
        return this.http.get(`${this.baseUrl}/${id}`);
      }

      updateShura(id: number, value: Shura): Observable<Object> {
        return this.http.put(`${this.baseUrl}/${id}`, value);
      }

      deleteRecord(id){
        return this.http.delete(`${this.baseUrl}/${id}`);
      }

      getRecordList(data, filters) {
        return this.http.post(`${this.baseUrl}/list`, {
          input: data,
          filters: filters
        });
      }
}