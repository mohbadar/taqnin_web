import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AuthorityService } from 'app/services/authority.service';
import { CommissionService } from 'app/services/commission.service';
import { HomeService } from 'app/services/home.service';
import { MinistryService } from 'app/services/ministry.service';
import {
	ApexAxisChartSeries,
	ApexChart,
	ApexXAxis,
	ApexYAxis,
	ApexGrid,
	ApexDataLabels,
	ApexStroke,
	ApexTitleSubtitle,
	ApexTooltip,
	ApexLegend,
	ApexPlotOptions,
	ApexFill,
	ApexMarkers,
	ApexTheme,
	ApexNonAxisChartSeries,
	ApexResponsive
  } from "ng-apexcharts";
import { NgxSpinnerService } from 'ngx-spinner';

export type ChartOptions = {
	series: ApexAxisChartSeries | ApexNonAxisChartSeries;
	colors: string[],
	chart: ApexChart;
	xaxis: ApexXAxis;
	yaxis: ApexYAxis | ApexYAxis[],
	title: ApexTitleSubtitle;
	dataLabels: ApexDataLabels,
	stroke: ApexStroke,
	grid: ApexGrid,
	legend?: ApexLegend,
	tooltip?: ApexTooltip,
	plotOptions?: ApexPlotOptions,
	labels?: string[],
	fill: ApexFill,
	markers?: ApexMarkers,
	theme: ApexTheme,
	responsive: ApexResponsive[]
  };
  
  var $primary = "#975AFF",
  $success = "#40C057",
  $info = "#2F8BE6",
  $warning = "#F77E17",
  $danger = "#F55252",
  $label_color_light = "#E6EAEE",
  $red = "#A10A28",
  $blue_red = "#C7B42C",
  $orange = "#AAAAAA",
  $orange_blue = "#5AA454",
  $1new = "#f5d442",
  $2new = "#b88365",
  $3new = "#65b7b8",
  $4new = "#ebb5e9",
  $5new = "#f74a98",
  $6new = "#178252",
  $7new = "#c96969",
  $8new = "#30700b";
var themeColors = [$primary, $success,$warning, $danger, $info,$label_color_light, 
	$red,$blue_red,$orange,$orange_blue, $1new, $2new, $3new, $4new, $5new, $6new, $7new, $8new];



@Component({
  selector: 'app-home-gender',
  templateUrl: './home-gender.component.html',
  styleUrls: ['./home-gender.component.scss'],
})

export class HomeGenderComponent {
	
	ministrie$;
	authoritie$;
	commission$;

  loadGender = false;
  showMinistry: boolean = false;
  showAuthority: boolean = false;
  showCommission:boolean = false;
  donutChartOptions : Partial<ChartOptions>;
  public genderData = new Array();
  public genderLabels = new Array();
  
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
		this.loadAllGender();
	}

	loadAllGender(){
		
		this.genderData = [];
		this.genderLabels = [];
		this.sprinner.show();
		this.homeService.getProfileByGender().subscribe(res=>{
			console.log("all ethnic data:", res);
			for(let i=0; i<res.length; i++){		
					this.genderData.push(res[i][1]);
					this.genderLabels.push(res[i][0]);		
			}
			this.loadChartData(this.genderLabels, this.genderData);
			this.sprinner.hide();
			this.loadGender = true;
		}, err=>{
			console.log("error in allthenic data");
			this.genderData = [];
			this.genderLabels = [];
			this.sprinner.hide();
		});
	}

	loadMinistryGender(event){
		console.log("Ministry event: ", event.id);
		this.genderData = [];
		this.genderLabels = [];
		this.sprinner.show();
		this.homeService.getGenderByMinistry(event.id).subscribe(res=>{
			console.log("ministry data:", res);
			for(let i=0; i<res.length; i++){
				this.genderData.push(res[i][1]);
				this.genderLabels.push(res[i][0]);
			}

			this.loadChartData(this.genderLabels, this.genderData);
			this.sprinner.hide();
		}, err=>{
			console.log("error in ministry");
			this.genderData = [];
			this.genderLabels = [];
			this.sprinner.hide();
		});
		
		
	}

	loadAuthorityGender(event){
		console.log("Authority event: ", event.id);
		this.genderData = [];
		this.genderLabels = [];
		this.sprinner.show();
		this.homeService.getGenderByAuthority(event.id).subscribe(res=>{
			console.log("Authority data:", res);
			for(let i=0; i<res.length; i++){		
					this.genderData.push(res[i][1]);
					this.genderLabels.push(res[i][0]);		
			}

			this.loadChartData(this.genderLabels, this.genderData);
			this.sprinner.hide();
		}, err=>{
			console.log("error in Authority");
			this.genderData = [];
			this.genderLabels = [];
			this.sprinner.hide();
		});
	}

	loadCommisionGender(event){
		console.log("Ministry event: ", event.id);
		this.genderData = [];
		this.genderLabels = [];
		this.sprinner.show();
		this.homeService.getGenderByCommission(event.id).subscribe(res=>{
			console.log("Commission data:", res);
			for(let i=0; i<res.length; i++){		
					this.genderData.push(res[i][1]);
					this.genderLabels.push(res[i][0]);		
			}

			this.loadChartData(this.genderLabels, this.genderData);
			this.sprinner.hide();
		}, err=>{
			console.log("error in Commission");
			this.genderData = [];
			this.genderLabels = [];
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
		  this.genderData = [];
		  this.genderLabels = [];
		  this.loadChartData(this.genderLabels, this.genderData);
		 
		}
		else if(event.target.defaultValue === 'commission')
		{
		  console.log("selected Commission: ", event.target.defaultValue);
		  this.showMinistry = false;
		  this.showAuthority = false;
		  this.showCommission = true;
		  this.addForm.get('ministry').setValue(null);
		  this.addForm.get('authority').setValue(null);
		  this.genderData = [];
		  this.genderLabels = [];
		  this.loadChartData(this.genderLabels, this.genderData);
		  
	
		}
		else if(event.target.defaultValue === 'authority'){
		  console.log("selected Authority: ", event.target.defaultValue);
		  this.showAuthority = true;
		  this.showMinistry = false;
		  this.showCommission= false;
		  this.addForm.get('commission').setValue(null);
		  this.addForm.get('ministry').setValue(null);
		  this.genderData = [];
		  this.genderLabels = [];
		  this.loadChartData(this.genderLabels, this.genderData);
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
			this.loadAllGender();
		}
	
	  }

	  loadAllMinistryChart(){
		this.genderData = [];
		this.genderLabels = [];
		this.sprinner.show();
		this.homeService.getGenderByAllMinistries().subscribe(res=>{
			console.log("All Ministries data:", res);
			for(let i=0; i<res.length; i++){		
					this.genderData.push(res[i][1]);
					this.genderLabels.push(res[i][0]);	
			}

			this.loadChartData(this.genderLabels, this.genderData);
			this.sprinner.hide();
		}, err=>{
			console.log("error in All ministries");
			this.genderData = [];
			this.genderLabels = [];
			this.sprinner.hide();
		});
	  }

	  loadAllAuthorityChart(){
		this.genderData = [];
		this.genderLabels = [];
		this.sprinner.show();
		this.homeService.getGenderByAllAuthorities().subscribe(res=>{
			console.log("All Authority data:", res);
			for(let i=0; i<res.length; i++){		
					this.genderData.push(res[i][1]);
					this.genderLabels.push(res[i][0]);		
			}

			this.loadChartData(this.genderLabels, this.genderData);
			this.sprinner.hide();
		}, err=>{
			console.log("error in All Authority");
			this.genderData = [];
			this.genderLabels = [];
			this.sprinner.hide();
		});
	  }


	  loadAllCommissionsChart(){
		this.genderData = [];
		this.genderLabels = [];
		this.sprinner.show();
		this.homeService.getGenderByAllCommission().subscribe(res=>{
			console.log("All Commission data:", res);
			for(let i=0; i<res.length; i++){		
					this.genderData.push(res[i][1]);
					this.genderLabels.push(res[i][0]);		
			}

		
			this.loadChartData(this.genderLabels, this.genderData);
			this.sprinner.hide();
		}, err=>{
			console.log("error in All Commission");
			this.genderData = [];
			this.genderLabels = [];
			this.sprinner.hide();
		});
	  }

	  loadChartData(genderLabels, genderDatas){
		this.donutChartOptions = {
			chart: {
			  type: 'donut',
			  height: 320
			},
			colors: themeColors,
			labels:genderLabels,
			series:genderDatas,
			legend: {
			  itemMargin: {
				horizontal: 2
			  },
			},
			responsive: [{
			  breakpoint: 576,
			  options: {
				chart: {
				  width: 300
				},
				legend: {
				  position: 'bottom'
				}
			  }
			}]
		  }

		  this.cdref.detectChanges();
	  }
	  

	

}
