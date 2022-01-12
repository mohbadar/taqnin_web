import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { NgxSpinnerService } from 'ngx-spinner';
import { AgendaService } from '../../agenda.service';
import { EditAgendaComponent } from '../edit-agenda/edit-agenda.component';
import { EditTopicComponent } from './edit-topic/edit-topic.component';
import { ViewTopicComponent } from './view-topic/view-topic.component';

@Component({
  selector: 'app-view-agenda-details',
  templateUrl: './view-agenda-details.component.html',
  styleUrls: ['./view-agenda-details.component.scss']
})
export class ViewAgendaDetailsComponent implements OnInit {
  agendaId;
  showAgenda = false;
  agenda;
  ColumnMode = ColumnMode;
  dataTableFlag = false;
  rows = [];


  constructor(
    public translate: TranslateService,
    private agendaService: AgendaService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private changeDetector: ChangeDetectorRef,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get("id");
      // patch user details for edit
      this.agendaId = id;
      this.fetchAgendaData(this.agendaId);
      this.fetchAgendaTopics(this.agendaId);
    });
  }

  fetchAgendaData(agendaId) {
    this.spinner.show();
    this.agendaService.getRecordById(agendaId).subscribe((response: any) => {
      console.log('res', response);
      this.agenda = response;
      this.showAgenda = true;
      this.spinner.hide();
      this.changeDetector.detectChanges();
    }, (error) => {
      console.log('Error: ', error);
      this.spinner.hide();
    });
  }

  editAgenda(recordId) {
    this.spinner.show();
    this.agendaService.getRecordById(recordId).subscribe(data => {
      console.log('the agenda returned is', data);
      const modalRef = this.modalService.open(EditAgendaComponent, { size: 'xl', backdrop: 'static' });
      this.spinner.hide();
      modalRef.componentInstance.data = data;
      modalRef.componentInstance.agendaEditEventEmitter.subscribe((updatedRecord) => {
        this.fetchAgendaData(this.agendaId);
      })
    }, (error) => {
      console.log('Error: ', error);
      this.spinner.hide();
    });
  }

  fetchAgendaTopics(agendaId) {
    this.spinner.show();
    this.agendaService.getTopicsOfAgenda(agendaId).subscribe((data: any) => {
      console.log(data);
      this.rows = data;
      this.dataTableFlag = true;
      this.changeDetector.detectChanges();
      this.spinner.hide();
    }, (error) => {
      console.log('Error: ', error);
      this.spinner.hide();
    });
  }

//   createSubject() {
//     const modalRef = this.modalService.open(CreateSubjectComponent);
//     modalRef.componentInstance.data = this.resolutionId;
//     modalRef.componentInstance.subjectCreateEventEmitter.subscribe((createdRecord) => {
//       this.fetchResolutionSubject(this.resolutionId);
//     });
//   }

//   fetchResolutionSubject(resolutionId) {
//     this.spinner.show();
//     this.resolutionService.getResolutionSubjects(resolutionId).subscribe((data: any) => {
//       console.log(data);
//       this.rows = data;
//       this.dataTableFlag = true;
//       this.changeDetector.detectChanges();
//       this.spinner.hide();
//     }, (error) => {
//       console.log('Error: ', error);
//       this.spinner.hide();
//     });
//   }

//   viewSubject(recordId) {
//     this.spinner.show();
//     this.resolutionService.getSubjectById(recordId).subscribe(data => {
//       console.log('you data has', data);
//       const modalRef = this.modalService.open(ViewSubjectComponent);
//       modalRef.componentInstance.data = data;
//       this.spinner.hide();
//     }, (error) => {
//       this.spinner.hide();
//     });
//   }

//   editSubject(recordId) {
//     this.spinner.show();
//     this.resolutionService.getSubjectById(recordId).subscribe(data => {
//     	const modalRef = this.modalService.open(EditSubjectComponent);
//     	modalRef.componentInstance.data = data;
//     	modalRef.componentInstance.subjectEditEventEmitter.subscribe((updatedRecord) => {
//         this.fetchResolutionSubject(this.resolutionId);
//     	})
//     	this.spinner.hide();
//     }, error => {
//     	console.log('Error: ', error);
//     	this.spinner.hide();
//     });
//   }

//   deleteSubject(recordId) {
//     const modalRef = this.modalService.open(DeleteSubjecComponent, {
//       centered: true
//     });
//     modalRef.componentInstance.data = recordId;
//     modalRef.componentInstance.subjectDeleteEventEmitter.subscribe(() => {
//       this.fetchResolutionSubject(this.resolutionId);
//     });
//   }

//   manageSubjectOrder(subjectId) {
//     const modalRef = this.modalService.open(ManageSubjectOrderComponent, { size: 'xl', backdrop: 'static' });
//     modalRef.componentInstance.data = subjectId;
//   }

    editTopic(topicId) {
      this.spinner.show();
      this.agendaService.getTopicById(topicId).subscribe((data: any) => {
        console.log('you data has', data);
        const modalRef = this.modalService.open(EditTopicComponent);
        modalRef.componentInstance.data = data.odfAgendaTopic;
        modalRef.componentInstance.presenters = data.presenters;
        modalRef.componentInstance.topicEditEventEmitter.subscribe((updatedRecord) => {
            this.fetchAgendaTopics(this.agendaId);
        })
        this.spinner.hide();
      }, (error) => {
        this.spinner.hide();
      });
    }

    viewTopic(topicId) {
      this.spinner.show();
      this.agendaService.getTopicById(topicId).subscribe(data => {
        console.log('you data has', data);
        const modalRef = this.modalService.open(ViewTopicComponent);
        modalRef.componentInstance.data = data;
        this.spinner.hide();
      }, (error) => {
        this.spinner.hide();
      });
    }

    deleteAgenda(topicId) {

    }

    printAgenda() {
      this.agendaService.printAgenda(this.agendaId);
    }

    manageAgendaTopicProposals(rowId) {
      console.log(rowId);
    }
}
