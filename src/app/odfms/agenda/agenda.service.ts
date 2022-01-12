import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileDownloadService } from 'app/services/file-download.service';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
	private baseUrl = '/api/odf/agendas';

	constructor(
        private http: HttpClient,
        private fileDownloadService: FileDownloadService       
        ) { }

	getRecordList(data, filters) {
		return this.http.post(`${this.baseUrl}/list`, {
			input: data,
			filters: filters
		});
    }

	addRecord(data) {
        return this.http.post(`${this.baseUrl}/create`, data);
    }

    editRecord(data, id) {
        return this.http.post(`${this.baseUrl}/update/${id}`, data);
    }

    getRecordById(id) {
        return this.http.get(`${this.baseUrl}/${id}`);
    }

    getTopicsOfAgenda(agendaId) {
        return this.http.get(`/api/odf/agenda_topics/agenda/${agendaId}`);
    }

    getTopicById(id) {
        return this.http.get(`/api/odf/agenda_topics/${id}`);
    }

    editTopic(data, id) {
        return this.http.post(`/api/odf/agenda_topics/update/${id}`, data);
    }

    printAgenda(id){
        console.log("printing agenda");
        return this.fileDownloadService.downloadFile(`${this.baseUrl}/print/${id}`);
    }
}
