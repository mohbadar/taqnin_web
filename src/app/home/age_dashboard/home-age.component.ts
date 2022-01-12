import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AuthorityService } from 'app/services/authority.service';
import { CommissionService } from 'app/services/commission.service';
import { HomeService } from 'app/services/home.service';
import { MinistryService } from 'app/services/ministry.service';
import { NgxSpinnerService } from 'ngx-spinner';

let vertical_chart_opt = {
	colorScheme: {
		domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
	},
	showXAxis: true,
	showYAxis: true,
	gradient: false,
	showLegend: true,
	showXAxisLabel: true,
	showYAxisLabel: true,
	view: [700, 400],
	
};



@Component({
  selector: 'app-home-age',
  templateUrl: './home-age.component.html',
  styleUrls: ['./home-age.component.scss'],
})

export class HomeAgeComponent {

	vertical_chart_opt = {
		colorScheme: {
			domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
		},
		showXAxis: true,
		showYAxis: true,
		gradient: false,
		showLegend: true,
		showXAxisLabel: true,
		legendTitle:'Legend',
		xAxisLabel: 'PROVINCES',
		showYAxisLabel: true,
		yAxisLabel: 'COUNT',
		view: [700, 400],
	};
	
	ministrie$;
	authoritie$;
	commission$;

  showMinistry: boolean = false;
  showAuthority: boolean = false;
  showCommission:boolean = false;
  profileDatabyAge = null;
  
  addForm: FormGroup;
	constructor(
		public translate:TranslateService,
		private cdref: ChangeDetectorRef,
		private sprinner: NgxSpinnerService,
		private ministryService: MinistryService,
		private formBuilder: FormBuilder,
		private homeService: HomeService,
		private commissionService: CommissionService,
		private authorityService: AuthorityService,

		 ) { }

	ngOnInit() {
		this.loadMapData();

		this.addForm = this.formBuilder.group({ 
			ministry:[null],
			authority:[null], 
			commission:[null], 
		  });
		
	
	}
	loadMapData(){
		this.loadMinistries();
		this.loadAuthorities();
		this.loadCommission();
		this.loadAllAge();
	}

	loadAllAge(){
		this.sprinner.show();
		this.homeService.getProfileAge().subscribe(data=>{
			console.log("res: ", data);
			this.sprinner.hide();
			this.drawSectChart(data);

		}, err=>{
			console.log("err: ", err);
			this.sprinner.hide();
		});
	}

	drawSectChart(data){
		this.vertical_chart_opt.xAxisLabel = this.translate.instant('AGE');
			this.vertical_chart_opt.yAxisLabel = this.translate.instant('COUNT');
			this.vertical_chart_opt.legendTitle = this.translate.instant('Legend');
			this.profileDatabyAge = Object.assign({}, vertical_chart_opt, {data: []});
			console.log('data', this.profileDatabyAge, this.vertical_chart_opt);
			
			if(data != null)
			{
				data.forEach(row => {
					this.profileDatabyAge.data.push({
						'name': row[1] + " سال",
						'value': row[0]
					});
				});
			}

			this.cdref.detectChanges();
	}

	loadMinistryAge(event){
		console.log("Ministry event: ", event.id);
		this.sprinner.show();
		this.profileDatabyAge = null;
		this.homeService.getAgeByMinistry(event.id).subscribe(data=>{
			this.drawSectChart(data);
			this.sprinner.hide();
		}, err=>{
			this.sprinner.hide();
		});
		
		
		
	}

	loadAuthorityAge(event){
		console.log("Authority event: ", event.id);
		this.sprinner.show();
		this.profileDatabyAge = null;
		this.homeService.getAgeByAuthority(event.id).subscribe(data=>{
			this.drawSectChart(data);
			this.sprinner.hide();
		}, err=>{
			this.sprinner.hide();
		});
		
	}

	loadCommisionAge(event){
		console.log("commission event: ", event.id);
		this.sprinner.show();
		this.profileDatabyAge = null;
		this.homeService.getAgeByCommission(event.id).subscribe(data=>{
			this.drawSectChart(data);
			this.sprinner.hide();
		}, err=>{
			this.sprinner.hide();
		});
	}

	loadCommission(){
		this.commission$ = this.commissionService.getCommissions();
	  }
	
	  loadAuthorities() {
		this.authoritie$ = this.authorityService.getAuthorities();
	  }
	  loadMinistries() {
		this.ministrie$ = this.ministryService.getMinistries();
	  }

	  setToNull(formName, name) {
		console.log(name);
		formName.controls[name].setValue(null);
	  }



	  RadioClicked(event) {
		if (event.target.defaultValue === 'ministry') {
		  console.log("selected Ministry: ", event.target.defaultValue);
		  this.showMinistry = true;
		  this.showAuthority = false;
		  this.showCommission = false;
		  this.addForm.get('authority').setValue(null);
		  this.addForm.get('commission').setValue(null);
		  this.profileDatabyAge = null
		  let data = null;
		  this.drawSectChart(data);
		 
		}
		else if(event.target.defaultValue === 'commission')
		{
		  console.log("selected Commission: ", event.target.defaultValue);
		  this.showMinistry = false;
		  this.showAuthority = false;
		  this.showCommission = true;
		  this.addForm.get('ministry').setValue(null);
		  this.addForm.get('authority').setValue(null);
		  let data = null;
		  this.drawSectChart(data);
		  
	
		}
		else if(event.target.defaultValue === 'authority'){
		  console.log("selected Authority: ", event.target.defaultValue);
		  this.showAuthority = true;
		  this.showMinistry = false;
		  this.showCommission= false;
		  this.addForm.get('commission').setValue(null);
		  this.addForm.get('ministry').setValue(null);
		  let data = null;
		  this.drawSectChart(data);
		}
		
		else if(event.target.defaultValue === 'allministry')
		{
			this.showMinistry = false;
			this.showAuthority = false;
			this.showCommission = false;
			this.addForm.get('commission').setValue(null);
		  	this.addForm.get('authority').setValue(null);
			this.addForm.get('ministry').setValue(null);
			console.log("all Ministries");
			this.loadAllMinistryChart();
		}
		else if(event.target.defaultValue === 'allauthority')
		{
			this.showMinistry = false;
			this.showAuthority = false;
			this.showCommission = false;
			this.addForm.get('commission').setValue(null);
		  	this.addForm.get('authority').setValue(null);
			this.addForm.get('ministry').setValue(null);
			console.log("all Authority");
			this.loadAllAuthorityChart();
		}
		
		else if(event.target.defaultValue === 'allcommission')
		{
			this.showMinistry = false;
			this.showAuthority = false;
			this.showCommission = false;
			this.addForm.get('commission').setValue(null);
		  	this.addForm.get('authority').setValue(null);
			this.addForm.get('ministry').setValue(null);
			console.log("all Commission");
			this.loadAllCommissionsChart();
		}
		
		else if(event.target.defaultValue === 'all'){
			this.showMinistry = false;
			this.showAuthority = false;
			this.showCommission = false;
			this.addForm.get('commission').setValue(null);
		  	this.addForm.get('authority').setValue(null);
			this.addForm.get('ministry').setValue(null);
			console.log("all Commission");
			this.loadAllAge();
		}
	
	  }

	  loadAllMinistryChart(){
		this.sprinner.show();
		this.profileDatabyAge = null;
		this.homeService.getAgeByAllMinistries().subscribe(data=>{
			this.drawSectChart(data);
			this.sprinner.hide();
		}, err=>{
			this.sprinner.hide();
		});
		
	  }

	  loadAllAuthorityChart(){
		this.sprinner.show();
		this.profileDatabyAge = null;
		this.homeService.getAgeByAllAuthorities().subscribe(data=>{
			this.drawSectChart(data);
			this.sprinner.hide();
		}, err=>{
			this.sprinner.hide();
		});
	  }


	  loadAllCommissionsChart(){
		this.sprinner.show();
		this.profileDatabyAge = null;
		this.homeService.getAgeByAllCommissions().subscribe(data=>{
			this.drawSectChart(data);
			this.sprinner.hide();
		}, err=>{
			this.sprinner.hide();
		});
	  }
	  

}
