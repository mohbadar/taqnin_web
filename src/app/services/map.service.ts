import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
 
@Injectable({
	providedIn: 'root'
})
export class MapService {

	// private baseUrl = environment.apiUrl;
	private baseUrl = '/api/maps';

	constructor(private http: HttpClient) { }

	getMapData(): Observable<any> {
		return this.http.get(`${this.baseUrl}/map`);
    }

	getMapDataByAllMinistries(): Observable<any> {
		return this.http.get(`${this.baseUrl}/map/ministries`);
    }

	getMapDataByAllAuthorities(): Observable<any> {
		return this.http.get(`${this.baseUrl}/map/authorities`);
    }

	getMapDataByAllCommissions(): Observable<any> {
		return this.http.get(`${this.baseUrl}/map/commissions`);
    }

	getMapDataByMinstry(pId): Observable<any> {
		return this.http.get(`${this.baseUrl}/map/ministryId`, {
			params: { pId }
		});
	}

	getMapDataByAuthority(pId): Observable<any> {
		return this.http.get(`${this.baseUrl}/map/authorityId`, {
			params: { pId }
		});
	}

	getMapDataByCommission(pId): Observable<any> {
		return this.http.get(`${this.baseUrl}/map/commissionId`, {
			params: { pId }
		});
	}
    
    
 
	
	
}