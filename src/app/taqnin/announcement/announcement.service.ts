import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileDownloadService } from 'app/services/file-download.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
	// private baseUrl = environment.apiUrl;
	private baseUrl = 'api/taqnin/announcement';

	constructor(private http: HttpClient, private fileDownloadService: FileDownloadService) { }

	getRecordList(): Observable<any> {
		return this.http.get(`${this.baseUrl}`);
	}

	getRecord(id: number): Observable<Object> {
		return this.http.get(`${this.baseUrl}/${id}`);
	}

	addRecord(obj: Object): Observable<Object> {
		return this.http.post(`${this.baseUrl}/create`, obj);
	}

	updateRecord(id: number,  obj: Object): Observable<Object> {
		return this.http.put(`${this.baseUrl}/update/${id}`, obj);
	}

	deleteRecord(id: number): Observable<any> {
		return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
	}

  getMainAnnoucement(): Observable<Object> {
		return this.http.get(`${this.baseUrl}/main-announcement`);
	}

  getEditMainAnnoucement(id: number): Observable<Object> {
		return this.http.get(`${this.baseUrl}/main-announcement/${id}`);
	}

  createMainAnnouncementRecord(obj: Object): Observable<Object> {
		return this.http.post(`${this.baseUrl}/main-announcement`, obj);
	}

	editMainAnnouncementRecord(obj: Object): Observable<Object> {
		return this.http.put(`${this.baseUrl}/main-announcement`, obj);
	}

  getCount(){
    return this.http.get(`${this.baseUrl}/announcement-count`);
  }

  getAllFilteredAnnouncements(query: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/get-filtered-list/${query}`);
	}

  getAnnouncementDetails(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/get-announcement-details/${id}`);
  }

  downloadMainAnnouncementAttachment() {
    this.fileDownloadService.download(`/api/taqnin/announcement/main-announcement-downloadFile`, 'GET');
  }

  downloadAttachment(id) {
    this.fileDownloadService.download(`/api/taqnin/announcement/downloadFile/${id}`, 'GET');
  }

}
