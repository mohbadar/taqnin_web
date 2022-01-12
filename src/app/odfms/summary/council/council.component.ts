import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShuraService } from 'app/configuration/shura/shura.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-council',
  templateUrl: './council.component.html',
  styleUrls: ['./council.component.scss']
})
export class CouncilComponent implements OnInit {
	councils = [];

	constructor(
		private cdref: ChangeDetectorRef, private router: Router, private shuraService: ShuraService, private spinner: NgxSpinnerService,) { }

	ngOnInit(): void {
		this.spinner.show();
		this.shuraService.getShuras().subscribe((data: any) => {
			this.councils = data.reverse();
			this.cdref.detectChanges();
			this.spinner.hide();
		}, error => {
			console.log('Error: ', error);
			this.spinner.hide();
		});
	}

	openPage(type) {
		console.log(type);
		this.router.navigate(['councils/' + type.code]);
	}

}
