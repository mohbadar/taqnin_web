import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata from "@amcharts/amcharts4-geodata/afghanistanHigh";
import {MapService} from 'app/services/map.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommissionService } from 'app/services/commission.service';
import { AuthorityService } from 'app/services/authority.service';
import { MinistryService } from 'app/services/ministry.service';




@Component({
  selector: 'app-home-map',
  templateUrl: './home-map.component.html',
  styleUrls: ['./home-map.component.scss'],
})

export class HomeMapComponent {
	
	chart;
	series;
	ministrie$;
	authoritie$;
	commission$;

  	showMinistry: boolean = false;
 	 showAuthority: boolean = false;
  	showCommission:boolean = false;
	  addForm: FormGroup;
	constructor(
		public translate:TranslateService,
		private cdref: ChangeDetectorRef,
		private sprinner: NgxSpinnerService,
		private mapService: MapService,
		private formBuilder: FormBuilder,
		private commissionService: CommissionService,
		private authorityService: AuthorityService,
		private ministryService: MinistryService,

		 ) { }

	ngOnInit() {
		this.loadMapData();
		this.generateData();
		this.addForm = this.formBuilder.group({ 
			ministry:[null],
			authority:[null], 
			commission:[null], 
		  });
		this.loadMinistries();
		this.loadAuthorities();
		this.loadCommission();
	
	}

	loadMapData(){
		this.series = null;
		this.sprinner.show();
		this.mapService.getMapData().subscribe(data=>{
			console.log("Map Data: ", data);
			this.series.data = data;
			this.sprinner.hide();
		}, err=>{
			console.log("err in Map: ", err);
			this.sprinner.hide();
		});
	}

	generateData(){
		this.chart = am4core.create("chartdiv1", am4maps.MapChart);
		this.chart.maxZoomLevel = 64;

		// Set map definition
		this.chart.geodata = am4geodata;
				

		// Set projection
		this.chart.projection = new am4maps.projections.Miller;

		let polygonSeries = this.chart.series.push(new am4maps.MapPolygonSeries());
		 polygonSeries.useGeodata = true;
		polygonSeries.calculateVisualCenter = true;



		// Configure series
		let polygonTemplate = polygonSeries.mapPolygons.template;
		polygonTemplate.tooltipText = "{name}";
		polygonTemplate.fill = am4core.color("#74B266");

		this.series = this.chart.series.push(new am4maps.MapImageSeries());
		let template = this.series.mapImages.template;
  		template.verticalCenter = "middle";
		template.horizontalCenter = "middle"; 
  		template.propertyFields.latitude = "lat";
		template.propertyFields.longitude = "long";
		
		let circle = template.createChild(am4core.Circle);
		circle.radius = 18;
		circle.fillOpacity = 0.8;
		circle.verticalCenter = "middle";
		circle.horizontalCenter = "middle";
		circle.nonScaling = true;

		let label = template.createChild(am4core.Label);
		label.text = "[font-size:15px]{count}";
		label.fill = am4core.color("#fff");
		label.verticalCenter = "middle";
		label.horizontalCenter = "middle";
		label.tooltipText = "{title}\n[bold]{count} پروفایل";
		label.nonScaling = true;

		let heat = this.series.heatRules.push({
			target: circle,
			property: "radius",
			min: 10,
			max: 20
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
		  this.series = null;
		  this.generateData();
		 
		}
		else if(event.target.defaultValue === 'commission')
		{
		  console.log("selected Commission: ", event.target.defaultValue);
		  this.showMinistry = false;
		  this.showAuthority = false;
		  this.showCommission = true;
		  this.addForm.get('ministry').setValue(null);
		  this.addForm.get('authority').setValue(null);
		  this.series = null;
		  this.generateData();
	
		}
		else if(event.target.defaultValue === 'authority'){
		  console.log("selected Authority: ", event.target.defaultValue);
		  this.showAuthority = true;
		  this.showMinistry = false;
		  this.showCommission= false;
		  this.addForm.get('commission').setValue(null);
		  this.addForm.get('ministry').setValue(null);
		  this.series = null;
		  this.generateData();
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
			this.getMapDataByAllMinistries();
			this.generateData();
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
			this.getMapDataByAllAuthorities();
			this.generateData();
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
			this.getMapDataByAllCommissions();
			this.generateData();
		}
		
		else if(event.target.defaultValue === 'all'){
			this.showMinistry = false;
			this.showAuthority = false;
			this.showCommission = false;
			this.addForm.get('commission').setValue(null);
		  	this.addForm.get('authority').setValue(null);
			this.addForm.get('ministry').setValue(null);
			console.log("all Commission");
			this.loadMapData();
			this.generateData();
		}
	
	  }

	  getMapDataByAllMinistries(){
		this.series = null;
		this.sprinner.show();
		this.mapService.getMapDataByAllMinistries().subscribe(data=>{
			console.log("Map Data: ", data);
			this.series.data = data;
			this.sprinner.hide();
		}, err=>{
			console.log("err in Map: ", err);
			this.sprinner.hide();
		});
	 }

	 getMapDataByAllAuthorities(){
		this.series = null;
		this.sprinner.show();
		this.mapService.getMapDataByAllAuthorities().subscribe(data=>{
			console.log("Map Data: ", data);
			this.series.data = data;
			this.sprinner.hide();
		}, err=>{
			console.log("err in Map: ", err);
			this.sprinner.hide();
		});
	 }

	 getMapDataByAllCommissions(){
		this.series = null;
		this.sprinner.show();
		this.mapService.getMapDataByAllCommissions().subscribe(data=>{
			console.log("Map Data: ", data);
			this.series.data = data;
			this.sprinner.hide();
		}, err=>{
			console.log("err in Map: ", err);
			this.sprinner.hide();
		}); 
	 }

	 getMapDataByMinstry(event){
		this.series = null;
		this.sprinner.show();
		this.mapService.getMapDataByMinstry(event.id).subscribe(data=>{
			console.log("Map Data: ", data);
			this.series.data = data;
			this.sprinner.hide();
			
		}, err=>{
			console.log("err in Map: ", err);
			this.sprinner.hide();
	
		});

		this.generateData();
		
	}

	getMapDataByAuthority(event){
		this.series = null;
		this.sprinner.show();
		this.mapService.getMapDataByAuthority(event.id).subscribe(data=>{
			console.log("Map Data: ", data);
			this.series.data = data;
			this.sprinner.hide();
		}, err=>{
			console.log("err in Map: ", err);
			this.sprinner.hide();
		});
		this.generateData();
		
	}

	getMapDataByCommission(event){
		this.series = null;
		this.sprinner.show();
		this.mapService.getMapDataByCommission(event.id).subscribe(data=>{
			console.log("Map Data: ", data);
			this.series.data = data;
			this.sprinner.hide();
		}, err=>{
			console.log("err in Map: ", err);
			this.sprinner.hide();
		});

		this.generateData();
		
	}


	
	ngOnDestroy()
	{
		this.chart.dispose();

	}

}
