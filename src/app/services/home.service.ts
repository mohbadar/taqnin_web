import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
 
@Injectable({
	providedIn: 'root'
})
export class HomeService {

	// private baseUrl = environment.apiUrl;
	private baseUrl = '/api/homes';

	constructor(private http: HttpClient) { }

	getHomeCount(): Observable<any> {
		return this.http.get(`${this.baseUrl}/count`);
    }
    
    getProfileByEthnic(): Observable<any> {
		return this.http.get(`${this.baseUrl}/ethnic`);
    }
    
    getProfileByGender(): Observable<any> {
		return this.http.get(`${this.baseUrl}/gender`);
	}

	getProfileEducation(): Observable<any> {
		return this.http.get(`${this.baseUrl}/education`);
	}

	getProfileMinistry(): Observable<any> {
		return this.http.get(`${this.baseUrl}/ministry`);
	}

	getProfileAuthority(): Observable<any> {
		return this.http.get(`${this.baseUrl}/authority`);
	}

	getProfileCommission(): Observable<any> {
		return this.http.get(`${this.baseUrl}/commission`);
	}

	
	getProfileAge(): Observable<any> {
		return this.http.get(`${this.baseUrl}/age`);
	}

	getProfileSect(): Observable<any> {
		return this.http.get(`${this.baseUrl}/sect`);
	}

	getEthnicByMinistry(pId): Observable<any> {
		return this.http.get(`${this.baseUrl}/ministryid`, {
			params: { pId }
		});
	}

	getEthnicByAuthority(pId): Observable<any> {
		return this.http.get(`${this.baseUrl}/authorityid`, {
			params: { pId }
		});
	}

	getEthnicByCommission(pId): Observable<any> {
		return this.http.get(`${this.baseUrl}/commissionid`, {
			params: { pId }
		});
	}

	getEthnicByAllMinistries(): Observable<any> {
		return this.http.get(`${this.baseUrl}/allministries`);
	}

	getEthnicByAllAuthorities(): Observable<any> {
		return this.http.get(`${this.baseUrl}/allauthorities`);
	}

	getEthnicByAllCommissions(): Observable<any> {
		return this.http.get(`${this.baseUrl}/allcommissions`);
	}

	getSectByAllMinistries(): Observable<any> {
		return this.http.get(`${this.baseUrl}/sect/allministries`);
	}

	getSectByAllAuthories(): Observable<any> {
		return this.http.get(`${this.baseUrl}/sect/allauthorities`);
	}

	getSectByAllCommission(): Observable<any> {
		return this.http.get(`${this.baseUrl}/sect/allcommissions`);
	}


	getSectByMinistry(pId): Observable<any> {
		return this.http.get(`${this.baseUrl}/sect/ministryid`, {
			params: { pId }
		});
	}

	getSectByAuthority(pId): Observable<any> {
		return this.http.get(`${this.baseUrl}/sect/authorityid`, {
			params: { pId }
		});
	}

	getSectByCommission(pId): Observable<any> {
		return this.http.get(`${this.baseUrl}/sect/commissionid`, {
			params: { pId }
		});
	}

	getGenderByAllMinistries(): Observable<any> {
		return this.http.get(`${this.baseUrl}/gender/allministries`);
	}

	getGenderByAllAuthorities(): Observable<any> {
		return this.http.get(`${this.baseUrl}/gender/allauthorities`);
	}

	getGenderByAllCommission(): Observable<any> {
		return this.http.get(`${this.baseUrl}/gender/allcommissions`);
	}

	getGenderByMinistry(pId): Observable<any> {
		return this.http.get(`${this.baseUrl}/gender/ministryid`, {
			params: { pId }
		});
	}

	getGenderByAuthority(pId): Observable<any> {
		return this.http.get(`${this.baseUrl}/gender/authorityid`, {
			params: { pId }
		});
	}

	getGenderByCommission(pId): Observable<any> {
		return this.http.get(`${this.baseUrl}/gender/commissionid`, {
			params: { pId }
		});
	}


	getAgeByAllMinistries(): Observable<any> {
		return this.http.get(`${this.baseUrl}/age/allministries`);
	}

	getAgeByAllAuthorities(): Observable<any> {
		return this.http.get(`${this.baseUrl}/age/allauthorities`);
	}

	getAgeByAllCommissions(): Observable<any> {
		return this.http.get(`${this.baseUrl}/age/allcommissions`);
	}


	getAgeByMinistry(pId): Observable<any> {
		return this.http.get(`${this.baseUrl}/age/ministryid`, {
			params: { pId }
		});
	}

	getAgeByAuthority(pId): Observable<any> {
		return this.http.get(`${this.baseUrl}/age/authorityid`, {
			params: { pId }
		});
	}

	getAgeByCommission(pId): Observable<any> {
		return this.http.get(`${this.baseUrl}/age/commissionid`, {
			params: { pId }
		});
	}

	getEducationByAllMinistries(): Observable<any> {
		return this.http.get(`${this.baseUrl}/education/allministries`);
	}

	getEducationByAllAuthorities(): Observable<any> {
		return this.http.get(`${this.baseUrl}/education/allauthorities`);
	}

	getEducationByAllCommissions(): Observable<any> {
		return this.http.get(`${this.baseUrl}/education/allcommissions`);
	}


	getEducationByMinistry(pId): Observable<any> {
		return this.http.get(`${this.baseUrl}/education/ministryid`, {
			params: { pId }
		});
	}

	getEducationByAuthority(pId): Observable<any> {
		return this.http.get(`${this.baseUrl}/education/authorityid`, {
			params: { pId }
		});
	}

	getEducationByCommission(pId): Observable<any> {
		return this.http.get(`${this.baseUrl}/education/commissionid`, {
			params: { pId }
		});
	}
 
	
	
}