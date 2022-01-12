import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { FileDownloadService } from '../../services/file-download.service';

@Injectable({
  providedIn: 'root'
})
export class ProposalService {
	private baseUrl = '/api/odf/odfproposal';

  	constructor(private http: HttpClient, private fileDownloadService: FileDownloadService) { }


  	getRecordList(data, filters) {
        return this.http.post(`${this.baseUrl}/list`, {
            input: data,
            filters: filters
        });
    }
    
    getLoadData(){
      return this.http.get(`${this.baseUrl}/load-data`);
    }


    addRecord(data) {
      return this.http.post(`${this.baseUrl}/create`, data);
    }


    editProposal(id:number, data) {
      return this.http.put(`${this.baseUrl}/${id}`, data);
     }

    getRecordById(id) {
        return this.http.get(`${this.baseUrl}/${id}`)
    }
    
    downloadAttachment(proposalId) {
      console.log(`Printing ${proposalId}`);
      return this.fileDownloadService.download(`${this.baseUrl}/download-attachment/${proposalId}`);
    }

    deleteRecord(id){
      return this.http.get(`${this.baseUrl}/${id}/delete`);
    }

    getProposalAttachment(proposalId) {
      return this.http.get(`${this.baseUrl}/attachment/${proposalId}`);
    }

    uploadProposalAttachment(id, fileData) {
      const file: FormData = new FormData();
      file.append('file', fileData);
  
      const req = new HttpRequest('POST', `${this.baseUrl}/upload/attachment/${id}`, file, {
        reportProgress: true,
        responseType: 'blob',
      });
  
      return this.http.request(req);
    }

    deleteFile(proposalId){
      console.log(`Deleting ${proposalId}`);
      return this.http.delete(`${this.baseUrl}/delete-attachment/${proposalId}`);
    }

    getProposalLog(id){
      return null;
    }

    getProposalAuthorityAgreement(){
      return this.http.get(`/api/odf/odfauthorityagreements`);
    }

    addDocument(data): Observable<HttpEvent<any>> {
      const req = new HttpRequest('POST', `/api/odf/proposaldocument/document`, data, {
          reportProgress: true,
          responseType: 'json'
      });

      return this.http.request(req);
  }

  getDocumentByProposal(pId): Observable<any> {
    return this.http.get(`/api/odf/proposaldocument/proposal`, {
        params: { pId }
    });
  }

  downloadProposalAttachment(id) {
    this.fileDownloadService.download(`/api/odf/proposaldocument/downloadFile/${id}`, 'GET');
  }

  deleteDocument(id: number): Observable<any> {
    return this.http.delete(`/api/odf/proposaldocument/${id}`, { responseType: 'text' });
  }

  addComment(data){
    return this.http.post(`/api/odf/proposalcomments/create`, data);
  }


  getCommentByProposal(pId): Observable<any> {
    return this.http.get(`/api/odf/proposalcomments/proposal`, {
        params: { pId }
    });
  }

  downloadCommentAttachment(id) {
    this.fileDownloadService.download(`/api/odf/proposalcomments/downloadFile/${id}`, 'GET');
  }

  findByIdComment(id){
    return this.http.get(`/api/odf/proposalcomments/${id}`)
  }

  editComment(id:number, data) {
    return this.http.put(`/api/odf/proposalcomments/${id}`, data);
   }
 

}
