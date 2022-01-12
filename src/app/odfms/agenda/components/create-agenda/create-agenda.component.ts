import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { AuthService } from 'app/template/shared/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AgendaService } from '../../agenda.service';
import { SearchSelectProposalComponent } from '../search-select-proposal/search-select-proposal.component';

@Component({
	selector: 'app-create-agenda',
	templateUrl: './create-agenda.component.html',
	styleUrls: ['./create-agenda.component.scss']
})
export class CreateAgendaComponent implements OnInit {
	newForm: FormGroup;
	formSubmitAttempt = false;
	topicsArray: FormArray;

	durationTypes$ = [
		{ key: "دقیقه", value: "MINUTE" },
		{ key: "ساعت", value: "HOUR" },
	];

	constructor(private router: Router, private translatedToastr: TranslatedToastrService,
		private authService: AuthService, private activeModal: NgbActiveModal,
		private formBuilder: FormBuilder, private spinner: NgxSpinnerService, private modalService: NgbModal,
		private agendaService: AgendaService, public translate: TranslateService,
		private changeDetectorRef: ChangeDetectorRef) {

	}

	ngOnInit(): void {
		this.initializeForm();
		this.fetchEssentialData();
	}

	initializeForm() {
		this.newForm = this.formBuilder.group({
			agendaNo: [null, [Validators.required]],
			meetingLocation: [null, [Validators.required]],
			meetingDuration: [null, [Validators.required]],
			meetingDurationType: ["MINUTE", [Validators.required]],
			meetingDate: [null, [Validators.required]],
			meetingTime: [null, [Validators.required]],
			meetingStartDate: [null, [Validators.required]],
			meetingStartTime: [null, [Validators.required]],
			topics: this.formBuilder.array([]),
		});
		this.topicsArray = this.newForm.get("topics") as FormArray;
	}

	fetchEssentialData() {
		// this.departments$ = this.baseService.getDepartmentList();
	}

	topics(): FormArray {
		return this.newForm.get("topics") as FormArray
	}

	proposals(topicIndex): FormArray {
		return this.topics().controls[topicIndex].get("proposals") as FormArray
	}

	newTopic() {
		return this.formBuilder.group({
			subject: [null, [Validators.required]],
			details: [null],
			presenters: [null, [Validators.required]],
			presentDuration: [null, [Validators.required]],
			presentDurationType: ["MINUTE", [Validators.required]],
			discussionDuration: [null, [Validators.required]],
			discussionDurationType: ["MINUTE", [Validators.required]],
			inclusionReason: [null],
			proposals: this.formBuilder.array([])
		});
	}

	clearFormArray = (formArray: FormArray) => {
		while (formArray.length !== 0) {
		  formArray.removeAt(0);
		}
	}

	addTopic() {
		console.log("Adding a topic");
		this.topicsArray.push(this.newTopic());
		console.log(this.topicsArray);
	}

	removeTopic(topicIndex: number) {
		this.topics().removeAt(topicIndex);
	}

	removeAllTopics() {
		while (this.topics().length > 0) {
			this.topics().removeAt(0);
		}
	}

	removeProposal(topicIndex, proposalIndex) {
		const proposalsArray = this.proposals(topicIndex);
		proposalsArray.removeAt(proposalIndex);
	}

	addProposal(topicIndex: number) {
		console.log(this.newForm.value);
		console.log("Link Proposal is clicked");
		const modalRef = this.modalService.open(SearchSelectProposalComponent, {
			centered: true, size: 'xl', backdrop: true, keyboard: false,
			// backdrop: 'static',
		});
		modalRef.componentInstance.response.subscribe((proposal) => {
			if (proposal) {
				let newProposal = this.formBuilder.group({
					id: [proposal['ID']],
					proposalNumber: [proposal['SHUMARA']],
					proposalDate: [proposal['PRO_DATE']],
					summary: [proposal['SUMMARY']],
				});
				this.proposals(topicIndex).insert(0, newProposal);

				this.changeDetectorRef.detectChanges();
				console.log(this.newForm.value);

				// this.proposalDetails = proposal;
				// this.cdr.detectChanges();
				// console.log("🚀 ~ file: create-decree.component.ts ~ line 316 ~ CreateDecreeComponent ~ this.modalRef.result.then ~ this.proposalDetails", this.proposalDetails)
				// this.decreeForm.patchValue({
				//     proposalNo: proposal['PROPOSAL_NUMBER']
				// });
			}
		});
	}

	closeModal() {
		this.activeModal.close();
	}

	goToAgendasRoute() {
		this.router.navigate(['agendas']);
	}

	submitForm() {
		if (this.newForm.invalid) {
			this.translatedToastr.error("ERROR", "FORM_INVALID_MSG");
			document.getElementById('newForm').classList.add('input-error');
			this.findInvalidControls()
		} else {
			this.submit();
		}
	}

	submit() {
		let obj = this.newForm.value;
		this.spinner.show();
		this.agendaService.addRecord(obj).subscribe((res: any) => {
			console.log(res);
			this.spinner.hide();
			this.translatedToastr.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
			this.closeModal()
			// this.router.navigateByUrl(`/task_mng/taskboards/`+ res.id);
		}, err => {
			this.spinner.hide();
			this.translatedToastr.error("ERROR", "ERR_MSG");
			this.authService.checkUserLogin();
		});
	}

	findInvalidControls() {
		const invalid = [];
		const controls = this.newForm.controls;
		for (const name in controls) {
			if (controls[name].invalid) {
				invalid.push(name);
			}
		}
		console.log(invalid);
		return invalid;
	}

	onFormSubmit() {
		console.log("Create order Form Value", this.newForm);
		if (this.newForm.valid) {
		  this.spinner.show();
		  const { agendaNo, meetingLocation, meetingDuration, meetingDurationType, meetingDate, meetingTime,
				meetingStartDate, meetingStartTime, topics } = this.newForm.value;
				console.log(topics);
			this.agendaService.addRecord({ agendaNo, meetingLocation, meetingDuration, meetingDurationType,
				meetingDate, meetingTime, meetingStartDate, meetingStartTime, agendaTopics: topics}).subscribe((response) => {
				if (response) {
					this.translatedToastr.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
					console.log(response);
					this.goToAgendasRoute();
				} else {
					this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_CREATING_RECORD");
					console.log(response);
				}
				this.spinner.hide();
				}, (error) => {
				this.spinner.hide();
				this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_CREATING_RECORD");
				console.log(error);
				});
	}
	
		if (this.newForm.invalid) {
		  // To display errors below forms
		  Object.keys(this.newForm.controls).forEach(field => {
			const control = this.newForm.get(field);
			control.markAsTouched({ onlySelf: true });
		  });
		  if (this.topicsArray.length != 0) {
			  this.topicsArray.controls.forEach((element: any) => {
				  Object.keys(element.controls).forEach((field: any) => {
					  const control = element.get(field);
					  control.markAsTouched({ onlySelf: true});
				  })
			  });
		  }
		}
	  }

}
