import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { FileDownloadService } from 'app/services/file-download.service';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private baseUrl = '/api/odf/odf-order';

    constructor(private http: HttpClient, private fileDownloadService: FileDownloadService) { }

    getRecordList(data, filters) {
        return this.http.post(`${this.baseUrl}/list`, {
            input: data,
            filters: filters
        });
    }

    saveRecord(data) {
        return this.http.post(`${this.baseUrl}/create`, data);
    }

    getRecordById(id) {
        return this.http.get(`${this.baseUrl}/${id}`)
    }

    getProposalByNo(proposalNo) {
        return this.http.get(`${this.baseUrl}/${proposalNo}/proposal-details`)
    }

    getProfilesByTerm(term): Observable<any> {
        return this.http.get(`${this.baseUrl}/profiles/by-term`, { params: { term: term } });
    }

    downloadAttachment(orderNumber) {
        this.fileDownloadService.download(`${this.baseUrl}/downloadFile/${orderNumber}`, 'GET');
    }

    delete(id: number): Observable<any> {
        console.log("🚀 ~ file: order.service.ts ~ line 42 ~ OrderService ~ delete ~ id", id)
        return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
    }

    getOrderLog(id: number): Observable<any> {
        return this.http.get(`${this.baseUrl}/${id}/history`);
    }

    getSubjectOrders(subjectId) {
        return this.http.get(`${this.baseUrl}/subject/${subjectId}`);
    }

    editOrder(orderId, data) {
        return this.http.post(`${this.baseUrl}/update/${orderId}`, data);
    }

}
