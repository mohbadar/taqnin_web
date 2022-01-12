import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

	constructor(private router: Router) { }

	ngOnInit(): void {
	}

	openPage(type) {
		console.log(type);
		if(type == 'CABINETS') {
			this.router.navigate(['cabinets'])
		} else if(type == 'COUNCILS') {
			this.router.navigate(['councils'])
		}
	}

}
