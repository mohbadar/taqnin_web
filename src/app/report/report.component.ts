import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';




@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})

export class ReportComponent {
	
	
	constructor(
		public translate:TranslateService,

		 ) { }

	ngOnInit() {
		
		
	
	}

	

}
