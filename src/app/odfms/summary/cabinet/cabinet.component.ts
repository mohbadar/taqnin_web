import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss']
})
export class CabinetComponent implements OnInit {
	cabinets = [];

	constructor(private router: Router) { }

	ngOnInit(): void {
	}

	openPage(type) {
		console.log(type);
		this.router.navigate(['cabinets/' + type.nameEn]);
	}

}
