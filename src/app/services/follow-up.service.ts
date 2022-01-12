import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { District } from '../models/district';
 
@Injectable({
	providedIn: 'root'
})
export class FollowUpService {

	// private baseUrl = environment.apiUrl;
	private baseUrl = '/api/odf/followups';

	constructor(private http: HttpClient) { }

	getFollowList(): Observable<any> {
		return this.http.get(`${this.baseUrl}`);
	}
 
	getFollowUp(id: number): Observable<Object> {
		return this.http.get(`${this.baseUrl}/${id}`);
	}

	getFollowUpByOrder(pId): Observable<any> {
		return this.http.get(`${this.baseUrl}/order`, {
			params: { pId }
		});
	}


	addFollowUp(data) {
        return this.http.post(`${this.baseUrl}/create`, data);
    }

	editFollowUp(id:number, data) {
        return this.http.put(`${this.baseUrl}/${id}`, data);
    }

	deleteFollowUp(id: number): Observable<any> {
		return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
    }

    getFollowUpCountByType(pId): Observable<any> {
		return this.http.get(`${this.baseUrl}/count`, {
			params: { pId }
		});;
	}
    
    getFollowUpTypes(){
        return this.http.get(`/api/odf/odffolowuptype`); 
    }
	
}