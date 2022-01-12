import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-council-summary',
  templateUrl: './council-summary.component.html',
  styleUrls: ['./council-summary.component.scss']
})
export class CouncilSummaryComponent implements OnInit {
	councilSlug;

	constructor(private route: ActivatedRoute,) { }

	ngOnInit(): void {
		this.councilSlug = this.route.snapshot.paramMap.get('council');
		console.log(this.councilSlug)
	}

}
