import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as chartsData from 'app/services/chartData';
import {HomeService} from 'app/services/home.service';
import {UtilityService} from 'app/services/utility.service';
import {MapService} from 'app/services/map.service';
import { NgxSpinnerService } from 'ngx-spinner';
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
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent {
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

	profile; 
	proposal;
	decree; 
	complaint;
	profileActive;
	isLoading = false;
	educationLevel;
	data  = new Array(); 
	profileDatabyProvince = null;
	profileDatabyMinistry = null;
	profileDatabyAuthority = null;
	profileDatabyCommission = null;
	educationLebels = new Array();
	educationCount = new Array();
	public ethnictyDonuData = new Array();
  	public ethnicityDonutLabels = new Array();
	donutChartOptions : Partial<ChartOptions>;
	EthnictyDonutOptions: Partial<ChartOptions>;
	public userCount = 0;
	public formCount = 0;
	public instanceCount = 0;
	public polarLabels = new Array();
	public polarLebelUpdate = new Array();
	public polarData = new  Array();
	public polarAreaChartLabels;
	public polarAreaChartData;
	public polarAreaLegend = chartsData.polarAreaLegend;
	public ploarChartColors = chartsData.ploarChartColors;
	public polarAreaChartType = chartsData.polarAreaChartType;
	public polarChartOptions = chartsData.polarChartOptions;
	
	constructor(
		public translate:TranslateService,
		private homeService: HomeService,
		private spinner: NgxSpinnerService,
		private utilityService: UtilityService,
		private cdref: ChangeDetectorRef,

		 ) { }

	ngOnInit() {

		this.loadEducationlevel();
		this.TotalCount();
		this.polarAreaChartData = this.polarData;
		this.polarAreaChartLabels = this.polarLabels;
		
	
	}

	loadEducationlevel(){
		this.educationLevel = this.utilityService.getEducationLevel();
	}


	TotalCount(){
		this.spinner.show();
		this.homeService.getHomeCount().subscribe(res=>{
			console.log("all data: ", res);
			this.profile = res["profile"];
			this.proposal = res["proposal"];
			this.decree = res["decree"];
			this.complaint = res["complaint"];
			this.profileActive = res["profileAcitve"];
			this.spinner.hide();
		}, err=>{
			console.log("errror in count");
			this.spinner.hide();
		});
	}



	loadCountMinistry(){
		this.spinner.show();
		this.homeService.getProfileMinistry().subscribe(data=>{
			console.log("res: ", data);

			this.vertical_chart_opt.xAxisLabel = this.translate.instant('MINISTRY');
			this.vertical_chart_opt.yAxisLabel = this.translate.instant('COUNT');
			this.vertical_chart_opt.legendTitle = this.translate.instant('Legend');
			this.profileDatabyMinistry = Object.assign({}, vertical_chart_opt, {data: []});
			console.log('data', this.profileDatabyMinistry, this.vertical_chart_opt);
			
			data.forEach(row => {
				this.profileDatabyMinistry.data.push({
					'name': row[0],
					'value': row[1]
				});
			});
			this.spinner.hide();


		}, err=>{
			console.log("err: ", err);
			this.spinner.hide();
		});
	}


	loadCountAuthority(){
		this.spinner.show();
		this.homeService.getProfileAuthority().subscribe(data=>{
			console.log("Authority Data: ", data);
			this.vertical_chart_opt.xAxisLabel = this.translate.instant('AUTHORITY');
			this.vertical_chart_opt.yAxisLabel = this.translate.instant('COUNT');
			this.vertical_chart_opt.legendTitle = this.translate.instant('Legend');
			this.profileDatabyAuthority = Object.assign({}, vertical_chart_opt, {data: []});
			console.log('data', this.profileDatabyAuthority, this.vertical_chart_opt);
			
			data.forEach(row => {
				this.profileDatabyAuthority.data.push({
					'name': row[0],
					'value': row[1]
				});
			});
			this.spinner.hide();
			
		}, err=>{
			console.log("Commission Data: ", err);
		});
	}


	loadCountCommission(){
		this.spinner.show();
		this.homeService.getProfileCommission().subscribe(data=>{
			console.log("commission: ", data);
			this.vertical_chart_opt.xAxisLabel = this.translate.instant('COMMISSION');
			this.vertical_chart_opt.yAxisLabel = this.translate.instant('COUNT');
			this.vertical_chart_opt.legendTitle = this.translate.instant('Legend');
			this.profileDatabyCommission = Object.assign({}, vertical_chart_opt, {data: []});
			console.log('data', this.profileDatabyCommission, this.vertical_chart_opt);
			
			data.forEach(row => {
				this.profileDatabyCommission.data.push({
					'name': row[0],
					'value': row[1]
				});
			});
			this.spinner.hide();
		}, err=>{
			console.log("error : ", err);
		});
	}



	public chartClicked(e: any): void {
		//your code here
	  }
	
	  public chartHovered(e: any): void {
		//your code here
	  }

	 
	

}
