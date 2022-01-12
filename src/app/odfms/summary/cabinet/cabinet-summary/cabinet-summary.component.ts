import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cabinet-summary',
  templateUrl: './cabinet-summary.component.html',
  styleUrls: ['./cabinet-summary.component.scss']
})
export class CabinetSummaryComponent implements OnInit {
	cabinetSlug;

	constructor(private route: ActivatedRoute,) { }

	ngOnInit(): void {
		this.cabinetSlug = this.route.snapshot.paramMap.get('cabinet');
		console.log(this.cabinetSlug)
	}

}
