import { WelcomeService } from './welcome.service';
import { DateConvertService } from './../../services/date-convert.service';
import { DocumentService } from './../document/document.service';
import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbActiveModal, NgbModal, NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { Globals } from 'app/_helpers/globals';
import { UtilityService } from 'app/services/utility.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';



@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  providers: [NgbPaginationConfig] // add NgbPaginationConfig to the component providers
})
export class WelcomeComponent implements OnInit {
  @Input() data;
  allDocuments;
  createdAt;
  userId;
  filterForm: FormGroup;
  lang;


  currentPage = 1;
  itemsPerPage = 12;
  pageSize: number;
  isDisabled = true;
  isFilter = false;
  filterValue;

  constructor(
    private welcomeService: WelcomeService,
    private translate: TranslateService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private activeModal: NgbActiveModal,
    private route: ActivatedRoute,
    private router: Router,
    public globals: Globals,
    private dConvert: DateConvertService,
    private utilityService: UtilityService,
    private formBuilder: FormBuilder,
    private ref: ChangeDetectorRef,
    private modalService: NgbModal,
    config: NgbPaginationConfig,
    private fb: FormBuilder,
  ) {
    // customize default values of paginations used by this component tree
    config.boundaryLinks = true;
  }

  ngOnInit(): void {
    console.log("documents Data: ", this.data);
    this.createFilterForm();
    if(!this.isFilter){
      this.loadApprovedDocuments();
    }

    this.setDirection();
  }

  createFilterForm() {
		this.filterForm = this.fb.group({
			query: ""
		});
	}

  loadPage(){
    this.loadApprovedDocuments();
  }

  applyFilter() {
		  this.spinner.show();
      this.isFilter = true;

      this.filterValue = this.filterForm.value.query;
      console.log('Filter value: ', this.filterValue);
      this.loadFilteredApprovedDocuments(this.filterValue);
      this.spinner.hide();
  }

resetFilters() {
    this.filterForm.reset();
    this.isFilter = false;
    this.filterValue = null;
    this.loadApprovedDocuments();
}

  loadApprovedDocuments(){
    this.welcomeService.getApprovedRecordList().subscribe(res=>{
      console.log("All documents: ", res);
      this.allDocuments = res;
      this.ref.detectChanges();
    }, err=>{
      console.log("error documents: ", err);
      this.allDocuments = null;
    });
  }

  loadFilteredApprovedDocuments(query: any){
    this.welcomeService.getFilteredApprovedRecordList(query).subscribe(res=>{
      console.log("Filtered Documents documents: ", res);
      this.allDocuments = res;
      this.ref.detectChanges();
    }, err=>{
      console.log("error documents: ", err);
      this.allDocuments = null;
    });
  }

  downloadAttachment(id){
    this.welcomeService.downloadDocumentAttachment(id);
  }

  setDirection(){
    if(localStorage.getItem('lang') == "en"){
      this.lang = "ltr";
    }else{
      this.lang = "rtl";
    }
  }

  toggleDisabled() {
    this.isDisabled = !this.isDisabled;
  }

  public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage*(pageNum - 1);
  }

  public changePagesize(num: number): void {
    this.itemsPerPage = this.pageSize + num;
  }

  viewDocument(id){
    this.router.navigate([`welcome/view/${id}`]);
  }

}
