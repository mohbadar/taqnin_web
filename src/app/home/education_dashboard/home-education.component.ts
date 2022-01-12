import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AuthorityService } from 'app/services/authority.service';
import { CommissionService } from 'app/services/commission.service';
import { HomeService } from 'app/services/home.service';
import { MinistryService } from 'app/services/ministry.service';
import { UtilityService } from 'app/services/utility.service';
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
  selector: 'app-home-education',
  templateUrl: './home-education.component.html',
  styleUrls: ['./home-education.component.scss'],
})

export class HomeEducationComponent {

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
  profileDatabyProvince = null;
  educationLebels = new Array();
  educationCount = new Array();
  educationLevel;
  
  addForm: FormGroup;
	constructor(
		public translate:TranslateService,
		private cdref: ChangeDetectorRef,
		private sprinner: NgxSpinnerService,
		private ministryService: MinistryService,
		private formBuilder: FormBuilder,
		private homeService: HomeService,
		private commissionService: CommissionService,
		private utilityService: UtilityService,
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
		this.loadAllEducation();
		this.loadEducationlevel();
	}

	loadEducationlevel(){
		this.educationLevel = this.utilityService.getEducationLevel();
	}

	loadAllEducation(){
		this.sprinner.show();
		let EducationData = new Array();
	   let  EducationLabels = new Array();
		this.homeService.getProfileEducation().subscribe(res=>{
			console.log("res: ", res);
			for(let i=0; i<res.length; i++){
				EducationData.push(res[i][1]);
				if(res[i][0] == 1)
				  {EducationLabels.push(this.educationLevel[0]['name']);}
				else if(res[i][0] == 2)
				  {EducationLabels.push(this.educationLevel[1]['name']);}
				else if(res[i][0] == 3)
				  {EducationLabels.push(this.educationLevel[2]['name']);}
				else if(res[i][0] == 4)
				  {EducationLabels.push(this.educationLevel[3]['name']);}
				else if(res[i][0] == 5)
				  {EducationLabels.push(this.educationLevel[4]['name']);}
			}
			console.log("educationLevel: ", EducationLabels[0]);
			console.log("educationCount: ", EducationData[0]);
			this.educationLebels = EducationLabels;
			this.educationCount = EducationData;
			this.drawSectChart();
			this.sprinner.hide();
		},err=>{
			console.log("error ", err);
			this.sprinner.hide();
		});
	}

	drawSectChart(){
		this.vertical_chart_opt.xAxisLabel = this.translate.instant('EDUCATION');
		this.vertical_chart_opt.yAxisLabel = this.translate.instant('COUNT');
		this.vertical_chart_opt.legendTitle = this.translate.instant('Legend');
		console.log("count: ", this.educationCount);
		this.profileDatabyProvince = Object.assign({}, vertical_chart_opt, {data:[]});
			
			for(let i = 0; i <this.educationCount.length; i++){
				let lg = {
					name: this.educationLebels[i],
					value: this.educationCount[i]
				}
				this.profileDatabyProvince.data.push(lg);
			}

			this.cdref.detectChanges();
	}

	loadMinistryEducation(event){
		let EducationData = new Array();
	    let  EducationLabels = new Array();
		console.log("Ministry event: ", event.id);
		this.sprinner.show();
		this.profileDatabyProvince = null;
		this.homeService.getEducationByMinistry(event.id).subscribe(res=>{
			console.log("res: ", res);
			for(let i=0; i<res.length; i++){
				EducationData.push(res[i][1]);
				if(res[i][0] == 1)
				  {EducationLabels.push(this.educationLevel[0]['name']);}
				else if(res[i][0] == 2)
				  {EducationLabels.push(this.educationLevel[1]['name']);}
				else if(res[i][0] == 3)
				  {EducationLabels.push(this.educationLevel[2]['name']);}
				else if(res[i][0] == 4)
				  {EducationLabels.push(this.educationLevel[3]['name']);}
				else if(res[i][0] == 5)
				  {EducationLabels.push(this.educationLevel[4]['name']);}
			}
			console.log("educationLevel: ", EducationLabels[0]);
			console.log("educationCount: ", EducationData[0]);
			this.educationLebels = EducationLabels;
			this.educationCount = EducationData;
			this.drawSectChart();
			this.sprinner.hide();
		},err=>{
			console.log("error ", err);
			this.sprinner.hide();
		});	
		
	}

	loadAuthorityEducation(event){
		let EducationData = new Array();
	    let  EducationLabels = new Array();
		console.log("Ministry event: ", event.id);
		this.sprinner.show();
		this.profileDatabyProvince = null;
		this.homeService.getEducationByAuthority(event.id).subscribe(res=>{
			console.log("res: ", res);
			for(let i=0; i<res.length; i++){
				EducationData.push(res[i][1]);
				if(res[i][0] == 1)
				  {EducationLabels.push(this.educationLevel[0]['name']);}
				else if(res[i][0] == 2)
				  {EducationLabels.push(this.educationLevel[1]['name']);}
				else if(res[i][0] == 3)
				  {EducationLabels.push(this.educationLevel[2]['name']);}
				else if(res[i][0] == 4)
				  {EducationLabels.push(this.educationLevel[3]['name']);}
				else if(res[i][0] == 5)
				  {EducationLabels.push(this.educationLevel[4]['name']);}
			}
			console.log("educationLevel: ", EducationLabels[0]);
			console.log("educationCount: ", EducationData[0]);
			this.educationLebels = EducationLabels;
			this.educationCount = EducationData;
			this.drawSectChart();
			this.sprinner.hide();
		},err=>{
			console.log("error ", err);
			this.sprinner.hide();
		});	
		
	}

	loadCommisionEducation(event){
		let EducationData = new Array();
	    let  EducationLabels = new Array();
		console.log("Ministry event: ", event.id);
		this.sprinner.show();
		this.profileDatabyProvince = null;
		this.homeService.getEducationByCommission(event.id).subscribe(res=>{
			console.log("res: ", res);
			for(let i=0; i<res.length; i++){
				EducationData.push(res[i][1]);
				if(res[i][0] == 1)
				  {EducationLabels.push(this.educationLevel[0]['name']);}
				else if(res[i][0] == 2)
				  {EducationLabels.push(this.educationLevel[1]['name']);}
				else if(res[i][0] == 3)
				  {EducationLabels.push(this.educationLevel[2]['name']);}
				else if(res[i][0] == 4)
				  {EducationLabels.push(this.educationLevel[3]['name']);}
				else if(res[i][0] == 5)
				  {EducationLabels.push(this.educationLevel[4]['name']);}
			}
			console.log("educationLevel: ", EducationLabels[0]);
			console.log("educationCount: ", EducationData[0]);
			this.educationLebels = EducationLabels;
			this.educationCount = EducationData;
			this.drawSectChart();
			this.sprinner.hide();
		},err=>{
			console.log("error ", err);
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
		  this.profileDatabyProvince = null
		  this.educationLebels = [];
  		  this.educationCount = [];
		  this.drawSectChart();
		 
		}
		else if(event.target.defaultValue === 'commission')
		{
		  console.log("selected Commission: ", event.target.defaultValue);
		  this.showMinistry = false;
		  this.showAuthority = false;
		  this.showCommission = true;
		  this.addForm.get('ministry').setValue(null);
		  this.addForm.get('authority').setValue(null);
		  this.profileDatabyProvince = null
		  this.educationLebels = [];
  		  this.educationCount = [];
		  this.drawSectChart();
		  
	
		}
		else if(event.target.defaultValue === 'authority'){
		  console.log("selected Authority: ", event.target.defaultValue);
		  this.showAuthority = true;
		  this.showMinistry = false;
		  this.showCommission= false;
		  this.addForm.get('commission').setValue(null);
		  this.addForm.get('ministry').setValue(null);
		  this.profileDatabyProvince = null
		  this.educationLebels = [];
  		  this.educationCount = [];
		  this.drawSectChart();
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
			this.loadAllEducation();
		}
	
	  }

	  loadAllMinistryChart(){
		let EducationData = new Array();
	    let  EducationLabels = new Array();
		this.sprinner.show();
		this.profileDatabyProvince = null;
		this.homeService.getEducationByAllMinistries().subscribe(res=>{
			console.log("res: ", res);
			for(let i=0; i<res.length; i++){
				EducationData.push(res[i][1]);
				if(res[i][0] == 1)
				  {EducationLabels.push(this.educationLevel[0]['name']);}
				else if(res[i][0] == 2)
				  {EducationLabels.push(this.educationLevel[1]['name']);}
				else if(res[i][0] == 3)
				  {EducationLabels.push(this.educationLevel[2]['name']);}
				else if(res[i][0] == 4)
				  {EducationLabels.push(this.educationLevel[3]['name']);}
				else if(res[i][0] == 5)
				  {EducationLabels.push(this.educationLevel[4]['name']);}
			}
			console.log("educationLevel: ", EducationLabels[0]);
			console.log("educationCount: ", EducationData[0]);
			this.educationLebels = EducationLabels;
			this.educationCount = EducationData;
			this.drawSectChart();
			this.sprinner.hide();
		},err=>{
			console.log("error ", err);
			this.sprinner.hide();
		});
		
	  }

	  loadAllAuthorityChart(){
		let EducationData = new Array();
	    let  EducationLabels = new Array();
		this.sprinner.show();
		this.profileDatabyProvince = null;
		this.homeService.getEducationByAllAuthorities().subscribe(res=>{
			console.log("res: ", res);
			for(let i=0; i<res.length; i++){
				EducationData.push(res[i][1]);
				if(res[i][0] == 1)
				  {EducationLabels.push(this.educationLevel[0]['name']);}
				else if(res[i][0] == 2)
				  {EducationLabels.push(this.educationLevel[1]['name']);}
				else if(res[i][0] == 3)
				  {EducationLabels.push(this.educationLevel[2]['name']);}
				else if(res[i][0] == 4)
				  {EducationLabels.push(this.educationLevel[3]['name']);}
				else if(res[i][0] == 5)
				  {EducationLabels.push(this.educationLevel[4]['name']);}
			}
			console.log("educationLevel: ", EducationLabels[0]);
			console.log("educationCount: ", EducationData[0]);
			this.educationLebels = EducationLabels;
			this.educationCount = EducationData;
			this.drawSectChart();
			this.sprinner.hide();
		},err=>{
			console.log("error ", err);
			this.sprinner.hide();
		});
	  }


	  loadAllCommissionsChart(){
		let EducationData = new Array();
	    let  EducationLabels = new Array();
		this.sprinner.show();
		this.profileDatabyProvince = null;
		this.homeService.getEducationByAllCommissions().subscribe(res=>{
			console.log("res: ", res);
			for(let i=0; i<res.length; i++){
				EducationData.push(res[i][1]);
				if(res[i][0] == 1)
				  {EducationLabels.push(this.educationLevel[0]['name']);}
				else if(res[i][0] == 2)
				  {EducationLabels.push(this.educationLevel[1]['name']);}
				else if(res[i][0] == 3)
				  {EducationLabels.push(this.educationLevel[2]['name']);}
				else if(res[i][0] == 4)
				  {EducationLabels.push(this.educationLevel[3]['name']);}
				else if(res[i][0] == 5)
				  {EducationLabels.push(this.educationLevel[4]['name']);}
			}
			console.log("educationLevel: ", EducationLabels[0]);
			console.log("educationCount: ", EducationData[0]);
			this.educationLebels = EducationLabels;
			this.educationCount = EducationData;
			this.drawSectChart();
			this.sprinner.hide();
		},err=>{
			console.log("error ", err);
			this.sprinner.hide();
		});
	}
	  

}
