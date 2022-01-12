import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { coreTeam, contributors } from './dev-team';


@Component({
  selector: 'app-dev-team',
  templateUrl: './dev.component.html',
  styleUrls: ['./dev.component.scss']
})
export class DevTeamComponent implements OnInit {

  selectedEnvironment: any = {};
  coreTeam = [];
  contributers = [];
  lang = '';
   
   constructor(
    private router: Router,
    private cdref: ChangeDetectorRef,
    public translate: TranslateService,
   ) {
 
   }
 
   ngOnInit(): void {
    this.lang = 'DR';
        this.coreTeam = coreTeam;
        this.contributers = contributors;
    
   }


   imageError(el) {
		el.onerror = '';
		el.src = '../../assets/img/user.png';
		console.log("error");
		return true;
	}
 

}
