import { DoctypeService } from './../../services/doctype.service';
import { SummaryService } from './../../services/summary.service';
import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexGrid, ApexLegend, ApexMarkers, ApexNonAxisChartSeries, ApexPlotOptions, ApexResponsive, ApexStroke, ApexTheme, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis } from 'ng-apexcharts';

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
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
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

  documentTypes;
  documentsCount;
  constructor(private router: Router,
		public translate: TranslateService,
		private cdref: ChangeDetectorRef,
		private spinner:NgxSpinnerService,
		private summaryService: SummaryService,
    private documentTypeService: DoctypeService
    ) { }

  ngOnInit(): void {
    this.loadDocumentsCount();
    this.getDocTypes();
  }

  loadDocumentsCount(){
		this.summaryService.getDocumentsCount().subscribe(res=>{
			this.documentsCount = res;
			this.cdref.detectChanges();
			console.log("Documents Count: ", this.documentsCount);
		}, err=>{
			console.log("error in cabinatCount: ", err);
		});
	}

  getDocTypes(){
    this.documentTypeService.getDoctypes().subscribe(res => {
      this.documentTypes = res;
      this.cdref.detectChanges();
    }, err=>{
			console.log("error in cabinatCount: ", err);
		});
  }

}
