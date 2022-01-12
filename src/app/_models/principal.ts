export class Principal {
    public authenticated: boolean;
    public authorities: Authority[] = [];
    public credentials: any;
    public environments: any = [];
    public selectedEnv: string;
    public selectedLang: string;
    public name: string;
    public username: string;
    public id:number;

    constructor(authenticated: boolean, authorities: any[], credentials: any, environments: any[], id: number, selectedEnv: string, selectedLang: string, name: string, username: string) {
        this.authenticated = authenticated;
        authorities.map(
            authority => this.authorities.push(new Authority(authority)))
        this.credentials = credentials;
        this.environments = environments;
        this.selectedEnv = selectedEnv;
        this.selectedLang = selectedLang;
        this.name = name;
        this.username = username;
        this.id = id;
    }

    isAdmin() {
        return this.authorities.some(
          (auth: Authority) => auth.authority.indexOf('ADMIN') > -1)
    }

	hasAuthority(requestAuthArray: Array<string>) {
        // requestAuthArray.every(reqAuth =>{
        //     if(!this.authorities.includes(new Authority(reqAuth))){
        //         return false;
        //     }
        // })
        // return true;
		return requestAuthArray.every((a) => {
			return this.authorities.some((auth: Authority) => auth.authority.indexOf(a) > -1)
		});
	}
}

export class Authority {
    public authority: String;

    constructor(authority: String) {
        this.authority = authority;
    }
}


// https://www.baeldung.com/spring-cloud-angular
