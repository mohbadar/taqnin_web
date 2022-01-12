import { ChangeDetectionStrategy, Component, OnInit, AfterViewInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryService } from 'app/services/country.service';
import { ProvinceService } from 'app/services/province.service';
import { DistrictService } from 'app/services/district.service';
import { MinistryService } from 'app/services/ministry.service';
import { AuthorityService } from 'app/services/authority.service';
import { CommissionService } from 'app/services/commission.service';
import { UtilityService } from 'app/services/utility.service';
import { DateConvertService } from 'app/services/date-convert.service';
import { ProfileService } from 'app/profile/profile.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { WizardComponent } from 'angular-archwizard';
import { NgxSpinnerService } from 'ngx-spinner';
import { TimeoutError } from 'rxjs';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateProfileComponent implements OnInit, AfterViewInit {
  @ViewChild('wizard') public wizard: WizardComponent

  basicForm: FormGroup;
  placeForm: FormGroup;
  tazkiraForm: FormGroup;
  basicFormSubmitted = false;
  showMinistry: boolean = true;
  showAuthority: boolean = false;
  showCommission:boolean = false;
  showCivilanGrade: boolean = true;
  showMilitarGrade: boolean = false;
  showCivilanPosition: boolean = true;
  showMilitaryPosition: boolean = false;
  ministrie$;
  obj;
  authoritie$;
  commission$;
  placeFormSubmitted = false;
  countrie$;
  originalProvince$;
  originalDistrict$;
  birthProvince$;
  birthDistrict$;
  curentProvince$;
  currentDistrict$;
  ethnicities$;
  nationalities$;
  gender$;
  religions$;
  sects$;
  languages$;
  nationalLanguage$;
  bloodtypes;
  position$;
  grade$;
  status$;
  militaryGrade$;
  provinceData = {
    id: 1,
    namedr: 'افغانستان'
  }
  customData = {
    ethnic: '',
    nationality: '',
    region: '',
    sect: '',
    bloodtype: '',
    language: [],
    nationalLanguages: [],
    birthCountry: '',
    birthProvince: '',
    birthDistrict: '',
    originalCountry: '',
    originalProvince: '',
    originalDistrict: '',
    currentCountry: '',
    currentProvince: '',
    currentDistrict: '',
    position: '',
    grade: '',
    militaryGrade:'',
    militaryPosition:'',
    ministryAuthority: '',
    status: '',
    gender: ''
  }
  countries = [];
  provinces = [];
  districts = [];
  OriginalCountry;
  OriginalProvince;
  OriginalDistrict;
  BirthCountry;
  BirthProvince;
  BirthDistrict;
  allEthnicities;
  allNationalities;
  allNationalLanagues;
  appiantTypes;
  allReligions;
  AllSects;
  allLanguages;
  allgrades;
  allMinistries;
  allAuthorities;
  allStatus;
  allCommission;
  allPositions;
  allGenders;
  allMilitrayGrade;
  loadPaper: boolean = true;
  loadElectronic: boolean = true;
  b: { [key: string]: AbstractControl; };
  constructor(
    private ref: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private countryService: CountryService,
    private provinceService: ProvinceService,
    private districtService: DistrictService,
    private profileService: ProfileService,
    private router: Router,
    public spinner:NgxSpinnerService,
    private ministryService: MinistryService,
    private authorityService: AuthorityService,
    private commissionService: CommissionService,
    private dConvert: DateConvertService,
    private utilityService: UtilityService,
    public translate: TranslateService,
    public toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.preLoadingData();
    this.buildForms();
   

  }

  buildForms() {
    this.basicForm = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null],
      fatherName: [null, Validators.required],
      grandFatherName: [null],
      ethnic: [null, Validators.required],
      nationality: [1, Validators.required],
      religion: [1, Validators.required],
      sect: [null],
      blood: [null, Validators.required],
      dob: [null, Validators.required],
      dobGregorian: [null, Validators.required],
      birthCountry: [1, Validators.required],
      birthProvince: [null, Validators.required],
      birthDistrict: [null],
      birthVillage: [null],
      originalCountry: [1, Validators.required],
      originalProvince: [null, Validators.required],
      originalDistrict: [null],
      originalVillage: [null],
      currentCountry: [1, Validators.required],
      currentProvince: [null, Validators.required],
      currentDistrict: [null],
      currentVillage: [null],
      tazkiraNumber: [null, Validators.required],
      tazkiraTog: [null, Validators.required],
      tazkiraRegister: [null, Validators.required],
      tazkiraPage: [null, Validators.required],
      tazkiraDate: [null, Validators.required],
      tazkiraPlace: [null, Validators.required],
      enid: [null, Validators.required],
      language: [null],
      nationalLanguages:[null, Validators.required],
      phone: [null],
      year: [null, Validators.required],
      email: [null],
      gender:[null, Validators.required],

    });


    this.placeForm = this.formBuilder.group({
      appointDate: [null, Validators.required],
      appointType:[null, Validators.required],
      decreeNumber: [null, Validators.required],
      positionTitle: [null, Validators.required],
      position: [null, Validators.required],
      grade: [null, Validators.required],
      militaryGrade:[null],
      militaryPosition:[null],
      status: [null, Validators.required],
      qadamYear: [null, [Validators.max(100), Validators.min(1)]],
      qadamMonth: [null, [Validators.max(12), Validators.min(1)]],
      qadamDay: [null, [Validators.max(31), Validators.min(1)]],
      ministry: [null, Validators.required],
      authority: [null],
      commission:[null],
      suggestionNumber: [null],
      suggestionDate: [null],
    });

  }

  RadioClicked(event) {
    if (event.target.defaultValue === 'ministry') {
      console.log("selected Ministry: ", event.target.defaultValue);
      this.showMinistry = true;
      this.showAuthority = false;
      this.showCommission = false;
      this.placeForm.get('ministry').setValidators([Validators.required]);
      this.placeForm.get('authority').setErrors(null);
      this.placeForm.get('authority').clearValidators();
      this.placeForm.get('authority').setValue(null);
      this.placeForm.get('commission').setErrors(null);
      this.placeForm.get('commission').clearValidators();
      this.placeForm.get('commission').setValue(null);
     
    }

    else if(event.target.defaultValue === 'commission')
    {
      console.log("selected Commission: ", event.target.defaultValue);
      this.showMinistry = false;
      this.showAuthority = false;
      this.showCommission = true;
      this.placeForm.get('commission').setValidators([Validators.required]);
      this.placeForm.get('authority').setErrors(null);
      this.placeForm.get('authority').clearValidators();
      this.placeForm.get('authority').setValue(null);
      this.placeForm.get('ministry').setErrors(null);
      this.placeForm.get('ministry').clearValidators();
      this.placeForm.get('ministry').setValue(null);

    }

    else {
      console.log("selected Authority: ", event.target.defaultValue);
      this.showAuthority = true;
      this.showMinistry = false;
      this.showCommission= false;
      this.placeForm.get('authority').setValidators([Validators.required]);
      this.placeForm.get('ministry').setErrors(null);
      this.placeForm.get('ministry').clearValidators();
      this.placeForm.get('ministry').setValue(null);
      this.placeForm.get('commission').setErrors(null);
      this.placeForm.get('commission').clearValidators();
      this.placeForm.get('commission').setValue(null);
    }

  }
  setToNull(formName, name) {
    console.log(name);
    formName.controls[name].setValue(null);
  }

  loadGender(){
    this.gender$ = this.profileService.getGender();
    this.gender$.subscribe(res=>{
      this.allGenders = res;
    });
  }

  loadMilitaryGrade(){
    this.militaryGrade$ = this.profileService.getEmployeeMilitaryGrade();
    this.militaryGrade$.subscribe(res=>{
      this.allMilitrayGrade = res;
    });
  }

  ShowSuccessToast() {
    const header = this.translate.instant('PROFILE');
    const msg = this.translate.instant('Successfully created');
    this.toastr.success(msg, header, {
      positionClass: 'toast-top-left',
    });
  }

  routeHome() {
    this.router.navigate(['profiles']);
  }

  preLoadingData() {
    this.loadCountries();
    this.loadAllProvinces();
    this.loadAllDistricts();
    this.loadEthnicity();
    this.loadNationalities();
    this.loadReligions();
    this.loadSects();
    this.loadBloodTypes();
    this.loadLanguages();
    this.loadPositions();
    this.loadNationalLanguages();
    this.loadGrades();
    this.loadStatus();
    this.loadMinistries();
    this.loadAuthorities();
    this.loadCommission();
    this.loadAppointType();
    this.loadGender();
    this.loadMilitaryGrade();

  }

  loadAppointType(){
    this.appiantTypes = this.utilityService.getAppointType();
  }

  loadCommission(){
    this.commission$ = this.commissionService.getCommissions();
    this.commission$.subscribe(res=>{
      this.allCommission = res;
      console.log("all Commission: ", this.allCommission);
    });
  }

  loadAuthorities() {
    this.authoritie$ = this.authorityService.getAuthorities();
    this.authoritie$.subscribe(res => {
      this.allAuthorities = res;
    });
  }
  loadMinistries() {
    this.ministrie$ = this.ministryService.getMinistries();
    this.ministrie$.subscribe(res => {
      this.allMinistries = res;
    });
  }
  loadStatus() {
    this.status$ = this.profileService.getEmployeeStatus();
    this.status$.subscribe(res => {
      this.allStatus = res;
    });
  }

  loadGrades() {
    this.grade$ = this.profileService.getEmployeeGrade();
    this.grade$.subscribe(res => {
      this.allgrades = res;
    });

  }

  loadLanguages() {
    this.languages$ = this.profileService.getLanguages();
    this.languages$.subscribe(res => {
      this.allLanguages = res;
    });
  }

  loadNationalLanguages() {
    this.nationalLanguage$ = this.profileService.getNationalLanguages();
    this.nationalLanguage$.subscribe(res => {
      this.allNationalLanagues = res;
    });
  }

  loadPositions() {
    this.position$ = this.profileService.getEmployeePosition();
    this.position$.subscribe(res=>{
      this.allPositions = res;
    });
  }

  loadCountries() {
    this.spinner.show();
    this.countrie$ = this.countryService.getCountrysList();
    this.countrie$.subscribe(res => {
      this.countries = res;
      this.spinner.hide();
    }, err=>{
      this.spinner.hide();
    });
    this.loadOriginalProvinces(this.provinceData);
    this.loadBirthProvinces(this.provinceData);
    this.loadCurrentProvinces(this.provinceData);

  }

  loadPaperTazkira(event) {
    if (event) {
      console.log("paper tazkira: ", event);
      this.loadPaper = true;
      this.basicForm.get('tazkiraNumber').setValidators([Validators.required]);
      this.basicForm.get('tazkiraTog').setValidators([Validators.required]);
      this.basicForm.get('tazkiraRegister').setValidators([Validators.required]);
      this.basicForm.get('tazkiraPage').setValidators([Validators.required]);
      this.basicForm.get('tazkiraDate').setValidators([Validators.required]);
      this.basicForm.get('tazkiraPlace').setValidators([Validators.required]);
    }
    else {
      console.log("paper tazkira not : ", event);
      this.loadPaper = false;
      this.basicForm.get('tazkiraNumber').setErrors(null);
      this.basicForm.get('tazkiraNumber').clearValidators();
      this.basicForm.get('tazkiraNumber').setValue(null);

      this.basicForm.get('tazkiraTog').setErrors(null);
      this.basicForm.get('tazkiraTog').clearValidators();
      this.basicForm.get('tazkiraTog').setValue(null);

      this.basicForm.get('tazkiraRegister').setErrors(null);
      this.basicForm.get('tazkiraRegister').clearValidators();
      this.basicForm.get('tazkiraRegister').setValue(null);

      this.basicForm.get('tazkiraPage').setErrors(null);
      this.basicForm.get('tazkiraPage').clearValidators();
      this.basicForm.get('tazkiraPage').setValue(null);

      this.basicForm.get('tazkiraDate').setErrors(null);
      this.basicForm.get('tazkiraDate').clearValidators();
      this.basicForm.get('tazkiraDate').setValue(null);

      this.basicForm.get('tazkiraPlace').setErrors(null);
      this.basicForm.get('tazkiraPlace').clearValidators();
      this.basicForm.get('tazkiraPlace').setValue(null);
    }

  }

  loadElectronicTazkira(event) {
    if (event) {
      console.log("electronic tazkira: ", event);
      this.loadElectronic = true;
      this.basicForm.get('enid').setValidators([Validators.required]);

    }
    else {
      console.log("electronic tazkira not : ", event);
      this.loadElectronic = false;
      this.basicForm.get('enid').setErrors(null);
      this.basicForm.get('enid').clearValidators();
      this.basicForm.get('enid').setValue(null);
    }
  }

  loadBloodTypes() {
    this.bloodtypes = this.utilityService.getBloodTypes();
  }

  loadSects() {
    this.sects$ = this.profileService.getSects();
    this.sects$.subscribe(res => {
      this.AllSects = res;
    });
  }
  loadReligions() {
    this.religions$ = this.profileService.getReligions();
    this.religions$.subscribe(res => {
      this.allReligions = res;
    });
  }

  loadNationalities() {
    this.nationalities$ = this.profileService.getNationalities();
    this.nationalities$.subscribe(res => {
      this.allNationalities = res;
    });
  }

  loadEthnicity() {
    this.ethnicities$ = this.profileService.getEthnicities();
    this.ethnicities$.subscribe(res => {
      this.allEthnicities = res;
    });
  }
  loadAllProvinces() {
    this.provinceService.getProvincesList().subscribe(res => {
      this.provinces = res;
    });
  }

  loadAllDistricts() {
    this.districtService.getDistrictsList().subscribe(res => {
      this.districts = res;
    });
  }

  birthDateChanged() {

    let dateString = this.basicForm.get('dob').value;
    dateString = this.dConvert.convertToGregorianDate(dateString);
    this.basicForm.get('dobGregorian').setValue(dateString);
  }

  loadOriginalProvinces(event) {
    if (event) {
      this.originalProvince$ = this.provinceService.getProvinceByCountry(event.id);
    }
  }

  loadOriginalDistricts(event) {
    if (event) {
      this.originalDistrict$ = this.districtService.getDistrictByProvince(event.id);
    }
  }

  loadCurrentProvinces(event) {
    if (event) {
      this.curentProvince$ = this.provinceService.getProvinceByCountry(event.id);
    }
  }

  loadCurrentDistricts(event) {
    if (event) {
      this.currentDistrict$ = this.districtService.getDistrictByProvince(event.id);
    }
  }

  loadBirthProvinces(event) {
    if (event) {
      this.birthProvince$ = this.provinceService.getProvinceByCountry(event.id);
    }
  }

  loadBirthDistricts(event) {
    if (event) {
      this.birthDistrict$ = this.districtService.getDistrictByProvince(event.id);
    }
  }

  setF() {
    this.b = this.basicForm.controls;
  }

  copyPlace(event) {
    if (event) {
      this.basicForm.get("originalCountry").setValue(this.basicForm.get('birthCountry').value);
      this.loadOriginalProvinces(this.findProvince(this.basicForm.get('originalCountry').value));
      this.basicForm.get("originalProvince").setValue(this.basicForm.get('birthProvince').value);
      this.loadOriginalDistricts(this.findDistrict(this.basicForm.get('originalProvince').value));
      this.basicForm.get("originalDistrict").setValue(this.basicForm.get('birthDistrict').value);
      this.basicForm.get("originalVillage").setValue(this.basicForm.get('birthVillage').value);

    } else {
      this.basicForm.get("originalCountry").reset();
      this.basicForm.get("originalProvince").reset();
      this.basicForm.get("originalDistrict").reset();
      this.basicForm.get("originalVillage").reset();
    }
  }

  get cpf() {
    return this.basicForm.controls;
  }


  submitBasicFrom() {
    this.basicFormSubmitted = true;
    if (this.basicForm.invalid) {
      return;
    }
    else {
      console.log("BasicForm: ", this.basicForm);
      this.wizard.goToNextStep();

    }
  }

  get ckf() {
    return this.placeForm.controls;
  }

  submitPlaceFrom() {
    this.placeFormSubmitted = true;
    if (this.placeForm.invalid) {
      return true;
    }
    else {
      console.log("placeForm: ", this.placeForm.value);
      this.wizard.goToNextStep();
      this.obj = { ...this.basicForm.value, ...this.placeForm.value };
      this.fetchCustomData();
      console.log("obj: ", this.obj);
    }
  }

  fetchCustomData() {
    this.customData.ethnic = this.findFormField(this.allEthnicities, this.obj.ethnic);
    this.customData.nationality = this.findFormField(this.allNationalities, this.obj.nationality);
    this.customData.region = this.findFormField(this.allReligions, this.obj.religion);
    this.customData.sect = this.findFormField(this.AllSects, this.obj.sect);
    this.customData.bloodtype = (this.obj.blood ? (this.bloodtypes.find(i => i.type == this.obj.blood)).type : null);
    if(this.obj.language != null)
      {this.setLanguage(this.obj.language);}
    else{
      this.customData.language = []
    }
    if(this.obj.nationalLanguages){
      this.setNationalLanguage(this.obj.nationalLanguages);
    }
    else{
      this.customData.nationalLanguages = []
    }
    this.customData.birthCountry = this.findFormField(this.countries, this.obj.birthCountry);
    this.customData.birthProvince = this.findFormField(this.provinces, this.obj.birthProvince);
    this.customData.birthDistrict = this.findFormField(this.districts, this.obj.birthDistrict);
    this.customData.originalCountry = this.findFormField(this.countries, this.obj.originalCountry);
    this.customData.originalProvince = this.findFormField(this.provinces, this.obj.originalProvince);
    this.customData.originalDistrict = this.findFormField(this.districts, this.obj.originalDistrict);
    this.customData.currentCountry = this.findFormField(this.countries, this.obj.currentCountry);
    this.customData.currentProvince = this.findFormField(this.provinces, this.obj.currentProvince);
    this.customData.currentDistrict = this.findFormField(this.districts, this.obj.currentDistrict);
    if(this.obj.position)
    {
        this.customData.position = this.findFormField(this.allPositions, this.obj.position);
    }
    else if(this.obj.militaryPosition)
    {
      this.customData.militaryPosition = this.findFormField(this.allMilitrayGrade, this.obj.militaryPosition);
    }
    if(this.obj.grade){
      this.customData.grade = this.findFormField(this.allgrades, this.obj.grade);
    }
    else if(this.obj.militaryGrade)
    {
      this.customData.militaryGrade = this.findFormField(this.allMilitrayGrade, this.obj.militaryGrade);
    }
    this.customData.status = this.findFormField(this.allStatus, this.obj.status);
    this.customData.gender = this.findFormField(this.allGenders, this.obj.gender);
    if (this.obj.ministry) {
      this.customData.ministryAuthority = this.findFormField(this.allMinistries, this.obj.ministry);
    }
    else if(this.obj.commission)
    {
      this.customData.ministryAuthority = this.findFormField(this.allCommission, this.obj.commission);
    }
    else {
      this.customData.ministryAuthority = this.findFormField(this.allAuthorities, this.obj.authority);
    }

  }

  setLanguage(form) {
    this.customData.language = [];
    for (let i of form) {
      this.customData.language.push(this.findFormField(this.allLanguages, i));
    }
  }

  setNationalLanguage(form) {
    this.customData.nationalLanguages = [];
    for (let i of form) {
      this.customData.nationalLanguages.push(this.findFormField(this.allNationalLanagues, i));
    }
  }

  findFormField(array, field) {
    if (field && array) {
      let obj = array.find(i => i.id === field);
      return obj.nameDr;
    }
    return null;
  }

  findCountry(countryId) {
    return this.countries.find(i => i.id === countryId);
  }
  findProvince(provinceId) {
    return this.provinces.find(i => i.id === provinceId);
  }
  findDistrict(districtId) {
    return this.districts.find(i => i.id === districtId);
  }


  submit() {

    this.spinner.show();
    console.log("ALL DATA: ", this.obj);
    const formData = new FormData();
    formData.append('data', JSON.stringify(this.obj));
    console.log("data before submission: ", JSON.stringify(this.obj));
    this.profileService.addRecord(formData).subscribe(res => {
      console.log("successfully recored: ", res);
      this.ShowSuccessToast();
      this.router.navigate(['profiles/' + res['id'] + '/details']);
      this.spinner.hide();
    }, err => {
      console.log("error in recording: ", err);
      this.spinner.hide();
    });

  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.ref.detectChanges();
    }, 100);

  }


  RadioClickedNew(event) {
    if (event.target.defaultValue === 'civilian') {
      console.log("selected civilan: ", event.target.defaultValue);
      this.showCivilanGrade = true;
      this.showMilitarGrade = false;
      this.placeForm.get('grade').setValidators([Validators.required]);
      this.placeForm.get('militaryGrade').setErrors(null);
      this.placeForm.get('militaryGrade').clearValidators();
      this.placeForm.get('militaryGrade').setValue(null);
     
    }

    else if(event.target.defaultValue === 'military')
    {
      console.log("selected miliary: ", event.target.defaultValue);
      this.showMilitarGrade = true;
      this.showCivilanGrade = false;
      this.placeForm.get('militaryGrade').setValidators([Validators.required]);
      this.placeForm.get('grade').setErrors(null);
      this.placeForm.get('grade').clearValidators();
      this.placeForm.get('grade').setValue(null);

    }

  }

  RadioClickedPosition(event) {
    if (event.target.defaultValue === 'civilian') {
      console.log("selected civilan: ", event.target.defaultValue);
      this.showCivilanPosition = true;
      this.showMilitaryPosition = false;
      this.placeForm.get('position').setValidators([Validators.required]);
      this.placeForm.get('militaryPosition').setErrors(null);
      this.placeForm.get('militaryPosition').clearValidators();
      this.placeForm.get('militaryPosition').setValue(null);
     
    }

    else if(event.target.defaultValue === 'military')
    {
      console.log("selected miliary: ", event.target.defaultValue);
      this.showMilitaryPosition = true;
      this.showCivilanPosition = false;
      this.placeForm.get('militaryPosition').setValidators([Validators.required]);
      this.placeForm.get('position').setErrors(null);
      this.placeForm.get('position').clearValidators();
      this.placeForm.get('position').setValue(null);

    }

  }

}