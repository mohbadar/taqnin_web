import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class SummaryService {

	// private baseUrl = environment.apiUrl;
	private baseUrl = '/api/taqnin/summary';

	constructor(private http: HttpClient) { }

    getDocumentsCount(): Observable<any> {
		return this.http.get(`${this.baseUrl}/count-documents`);
    }


}
