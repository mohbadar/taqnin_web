import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { BaseService } from 'app/services/base-service';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { AuthService } from 'app/template/shared/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AgendaService } from '../../agenda.service';
import { EditAgendaComponent } from '../edit-agenda/edit-agenda.component';

@Component({
  selector: 'app-view-agenda',
  templateUrl: './view-agenda.component.html',
  styleUrls: ['./view-agenda.component.scss']
})
export class ViewAgendaComponent implements OnInit {
	agendaId;
	data: any;
	agenda: any;
	agendaTopics:any;
	dataLoadingFlag = true;

	constructor(private cdref: ChangeDetectorRef,
		private route: ActivatedRoute,
        public translate: TranslateService,
        private spinner: NgxSpinnerService,
		private agendaService: AgendaService,
		private translatedToastr: TranslatedToastrService,
		private authService: AuthService,
		public baseService: BaseService,
		private modalService: NgbModal) { }

	ngOnInit(): void {
		this.agendaId = this.route.snapshot.paramMap.get('id');
		this.getRecord(this.agendaId);
	}

	getRecord(id) {
		this.dataLoadingFlag = true;
		this.spinner.show();
        this.agendaService.getRecordById(id).subscribe((res: any) => {
            this.spinner.hide();
			this.data = res;
			this.agenda = this.data.agenda;
			this.agendaTopics = this.data.agedaTopics;
			console.log(this.data);
			this.dataLoadingFlag = false;
        }, err => {
            this.spinner.hide();
			this.dataLoadingFlag = false;
            this.translatedToastr.error("AGENDA", "FETCHING_ERR_MSG");
			this.authService.checkUserLogin();
        });
	}

	editAgenda(agendaId) {
		console.log("Edit Agenda" + agendaId);
		this.spinner.show();
		this.agendaService.getRecordById(agendaId).subscribe(data => {
			console.log('you data has', data);
			const modalRef = this.modalService.open(EditAgendaComponent);
			modalRef.componentInstance.data = data;
			this.spinner.hide();
		}, (error) => {
			this.spinner.hide();
		});
	}

	createAgendaTopic() {
		console.log("Create Agenda Topic");
		// const modalRef = this.modalService.open(CreateAgendaTopicComponent);
		// modalRef.componentInstance.data = data;
	}

	viewAgendaTopic(recordId) {
		// this.spinner.show();
		// this.agendaService.getTopicById(recordId).subscribe(data => {
		// 	console.log('you data has', data);
		// 	const modalRef = this.modalService.open(ViewAgendaTopicComponent);
		// 	modalRef.componentInstance.data = data;
		// 	this.spinner.hide();
		// }, (error) => {
		// 	this.spinner.hide();
		// });
	}
	
	editAgendaTopic(agendaTopicId) {
		// this.spinner.show();
		// this.agendaService.getAgendaTopicById(recordId).subscribe(data => {
		// 	const modalRef = this.modalService.open(EditAgendaTopicComponent);
		// 	modalRef.componentInstance.data = data;
		// 	modalRef.componentInstance.subjectEditEventEmitter.subscribe((updatedRecord) => {
		// 		console.log(updatedRecord);
		// 	})
		// 	this.spinner.hide();
		// }, error => {
		// 	console.log('Error: ', error);
		// 	this.spinner.hide();
		// });
	}
	
	deleteTopic(agendaTopicId) {
		
	}

}
