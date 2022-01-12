import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileDownloadService } from 'app/services/file-download.service';

@Injectable({
  providedIn: 'root'
})
export class ResolutionService {
  private baseUrl = '/api/resolution';

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

  addResolution(data) {
    return this.http.post(`${this.baseUrl}/create`, data);
  }

  getRecordById(id) {
    return this.http.get(`${this.baseUrl}/${id}`)
  }

  editRecord(data, id) {
    return this.http.post(`${this.baseUrl}/update/${id}`, data);
  }

  addSubject(data) {
    return this.http.post(`/api/subject/create`, data);
  }

  getResolutionSubjects(resolutionId) {
    return this.http.get(`/api/subject/resolution/${resolutionId}`);
  }

  getSubjectById(id) {
    return this.http.get(`/api/subject/${id}`);
  }

  editSubject(data, id) {
    return this.http.post(`/api/subject/update/${id}`, data);
  }

  printResolution(id){
    console.log("printing agenda");
    return this.fileDownloadService.downloadFile(`${this.baseUrl}/print/${id}`);
  }

}
