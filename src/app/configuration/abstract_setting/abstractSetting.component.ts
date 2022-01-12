import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { AbstractSetting } from './abstractSetting'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { ColumnMode, DatatableComponent, SelectionType, SortType } from '@swimlane/ngx-datatable';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
	selector: 'app-abstract-configuration',
	templateUrl: './abstract_setting.component.html',
	styleUrls: ['./abstract_setting.component.scss']
})
export class AbstractSettingComponent implements OnInit {


	constructor(
		public httpClient: HttpClient,
		public translate: TranslateService,
		private modalService: NgbModal,
		private spinner: NgxSpinnerService,
	) { }


	ngOnInit() {
		
	}
	

}


