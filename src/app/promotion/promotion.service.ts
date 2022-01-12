import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
	private baseUrl = '/api/promotions';

  	constructor(private http: HttpClient) { }

  	getPromotionList(): Observable<any> {
        return this.http.get(`${this.baseUrl}`, {
            
        });
    }
    
    createPromotion(obj: Object): Observable<Object> {
        return this.http.post(`${this.baseUrl}`, obj);
    }

    editPromotion(id, data) {
        return this.http.post(`${this.baseUrl}/${id}`, data);
    }

    getPromotionById(id) {
        return this.http.get(`${this.baseUrl}/${id}`)
    }
}
