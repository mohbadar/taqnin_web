import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileDownloadService } from 'app/services/file-download.service';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private baseUrl = '/api/taqnin/document';
  private baseUrlComment = '/api/taqnin/comments';
  private baseUrlDepartment = '/api/taqnin/docDepartments';
  private baseUrlAttachment = 'api/taqnin/document-attachments';
  private baseUrlImport = 'api/taqnin/document/imports';
  private baseUrlExport = 'api/taqnin/document/exports';
  private baseUrlHistory = 'api/taqnin/dochistory';

  constructor(private http: HttpClient, private fileDownloadService: FileDownloadService) { }

  getRecordList(data, filters) {
    return this.http.post(`${this.baseUrl}/list`, {
      input: data,
      filters: filters
    });
  }

  getLoadData() {
    return this.http.get(`${this.baseUrl}/load-data`);
  }


  addRecord(data) {
    return this.http.post(`${this.baseUrl}/create`, data, {
      reportProgress: true,
    });
  }

  editRecord(id, data) {
    console.log("Updated Document: ", data);
    return this.http.put(`${this.baseUrl}/update/${id}`, data, {
      reportProgress: true,
    });
  }



  getRecordById(id) {
    return this.http.get(`${this.baseUrl}/${id}`)
  }

  getDocuementDtoById(id) {
    return this.http.get(`${this.baseUrl}/document-dto/${id}`);
  }

  approveDocument(id, data) {
    console.log("Approved Document: ", data);
    return this.http.put(`${this.baseUrl}/approve/${id}`, data);
  }

  assignDocument(id, data) {
    return this.http.post(`${this.baseUrl}/assign/${id}`, data, {
      reportProgress: true,
    });
  }

  documentCompletion(id, data) {
    return this.http.put(`${this.baseUrl}/document-completion/${id}`, data);
  }

  // downloadAttachment(attachmentId, documentId) {
  //   this.fileDownloadService.download(`/api/taqnin/document-attachments/downloadFile/${attachmentId}/${documentId}`, 'GET');
  // }

  downloadAttachment(documentId) {
    return this.fileDownloadService.download(`${this.baseUrl}/downloadFile/${documentId}`);
  }

  downloadHistoryAttachment(historyId, docId) {
    return this.fileDownloadService.download(`${this.baseUrlHistory}/downloadFile/${historyId}/${docId}`);
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

  deleteFile(proposalId) {
    console.log(`Deleting ${proposalId}`);
    return this.http.delete(`${this.baseUrl}/delete-attachment/${proposalId}`);
  }

  deleteDocument(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  //comment
  addComment(data) {
    return this.http.post(`${this.baseUrlComment}`, data);
  }

  getCommentList(id) {
    return this.http.get(`${this.baseUrlComment}/${id}`);
  }

  getCommentById(id) {
    return this.http.get(`${this.baseUrlComment}/single/${id}`)
  }

  editComment(id: number, data) {
    return this.http.put(`${this.baseUrlComment}/${id}`, data);
  }

  deleteComment(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrlComment}/${id}`, { responseType: 'text' });
  }
  //end

  getDocumentList() {
    return this.http.get(`${this.baseUrl}`);
  }

  //Department
  addDepartment(data) {
    return this.http.post(`${this.baseUrlDepartment}`, data);
  }

  getDepartmentList(id): Observable<any> {
    return this.http.get(`${this.baseUrlDepartment}/${id}`);
  }

  getDocumentAttachments(documentId) {
    return this.http.get(`${this.baseUrlAttachment}/document/${documentId}`);
  }


  deleteDocumentAttachment(documentAttachmentId) {
    return this.http.delete(`${this.baseUrlAttachment}/delete/${documentAttachmentId}`);
  }

  uploadAgendaTopicDocuments(documentId, fileName, file) {
    const req = new HttpRequest('POST', `${this.baseUrlAttachment}/upload-file/${documentId}/${fileName}`, file, {
      reportProgress: true,
      responseType: 'blob',
    });

    return this.http.request(req);
  }

  deleteDepartment(id) {
    return this.http.delete(`${this.baseUrlDepartment}/${id}`, { responseType: 'text' });
  }
  getDepartmentById(id) {
    return this.http.get(`${this.baseUrlDepartment}/single/${id}`);
  }
  editDepartment(id: number, data) {
    return this.http.put(`${this.baseUrlDepartment}/${id}`, data);
  }


  //Import
  getImportList(id) {
    return this.http.get(`${this.baseUrlImport}/${id}`);
  }

  addImport(data) {
    return this.http.post(`${this.baseUrlImport}`, data);
  }
  deleteImport(id) {
    return this.http.delete(`${this.baseUrlImport}/${id}`);
  }
  //End

  //Export
  addExport(data) {
    return this.http.post(`${this.baseUrlExport}`, data);
  }

  getExportList(id) {
    return this.http.get(`${this.baseUrlExport}/${id}`);
  }

  deleteExport(id) {
    return this.http.delete(`${this.baseUrlExport}/${id}`);
  }

  assignDepartment(doc_id, dep_id) {
   return this.http.put(`/api/taqnin/document/dep/${doc_id}/${dep_id}`,null);
  }

  //document history
  addHistory(data) {
    return this.http.post(`${this.baseUrlHistory}`, data);
  }

  getHistory(doc_id){
    return this.http.get(`${this.baseUrlHistory}/${doc_id}`);
  }

}
