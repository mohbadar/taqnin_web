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
  selector: 'app-home-sect',
  templateUrl: './home-sect.component.html',
  styleUrls: ['./home-sect.component.scss'],
})

export class HomeSectComponent {

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
  profileDatabySect = null;
  
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
		this.loadAllSect();
	}

	loadAllSect(){
		this.sprinner.show();
		this.homeService.getProfileSect().subscribe(data=>{
			console.log("res: ", data);
			this.sprinner.hide();
			this.drawSectChart(data);

		}, err=>{
			console.log("err: ", err);
			this.sprinner.hide();
		});
	}

	drawSectChart(data){
		this.vertical_chart_opt.xAxisLabel = this.translate.instant('SECT');
			this.vertical_chart_opt.yAxisLabel = this.translate.instant('COUNT');
			this.vertical_chart_opt.legendTitle = this.translate.instant('Legend');
			this.profileDatabySect = Object.assign({}, vertical_chart_opt, {data: []});
			console.log('data', this.profileDatabySect, this.vertical_chart_opt);
			
			if(data != null){
				data.forEach(row => {
					this.profileDatabySect.data.push({
						'name': row[0],
						'value': row[1]
					});
				});
			}

			this.cdref.detectChanges();
	}

	loadMinistrySect(event){
		console.log("Ministry event: ", event.id);
		this.sprinner.show();
		this.profileDatabySect = null;
		this.homeService.getSectByMinistry(event.id).subscribe(data=>{
			this.drawSectChart(data);
			this.sprinner.hide();
		}, err=>{
			this.sprinner.hide();
		});
		
		
		
	}

	loadAuthoritySect(event){
		console.log("Authority event: ", event.id);
		this.sprinner.show();
		this.profileDatabySect = null;
		this.homeService.getSectByAuthority(event.id).subscribe(data=>{
			this.drawSectChart(data);
			this.sprinner.hide();
		}, err=>{
			this.sprinner.hide();
		});
		
	}

	loadCommisionSect(event){
		console.log("commission event: ", event.id);
		this.sprinner.show();
		this.profileDatabySect = null;
		this.homeService.getSectByCommission(event.id).subscribe(data=>{
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
		  this.profileDatabySect = null
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
			this.loadAllSect();
		}
	
	  }

	  loadAllMinistryChart(){
		this.sprinner.show();
		this.profileDatabySect = null;
		this.homeService.getSectByAllMinistries().subscribe(data=>{
			this.drawSectChart(data);
			this.sprinner.hide();
		}, err=>{
			this.sprinner.hide();
		});
		
	  }

	  loadAllAuthorityChart(){
		this.sprinner.show();
		this.profileDatabySect = null;
		this.homeService.getSectByAllAuthories().subscribe(data=>{
			this.drawSectChart(data);
			this.sprinner.hide();
		}, err=>{
			this.sprinner.hide();
		});
	  }


	  loadAllCommissionsChart(){
		this.sprinner.show();
		this.profileDatabySect = null;
		this.homeService.getSectByAllCommission().subscribe(data=>{
			this.drawSectChart(data);
			this.sprinner.hide();
		}, err=>{
			this.sprinner.hide();
		});
	  }
	  

}
