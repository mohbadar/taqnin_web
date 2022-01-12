import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileDownloadService } from 'app/services/file-download.service';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WelcomeService {
  private baseUrl = '/api/taqnin/document';
  documents;

  constructor(private http: HttpClient, private fileDownloadService: FileDownloadService) { }

  getApprovedRecordList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/get-approved-list`);
	}

  getFilteredApprovedRecordList(query: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/get-approved-list/${query}`);
	}

  downloadDocumentAttachment(id) {
    this.fileDownloadService.download(`/api/taqnin/document/downloadFile/${id}`, 'GET');
  }


}
