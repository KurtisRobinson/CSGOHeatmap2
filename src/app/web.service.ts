import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class WebService {
	
	constructor(private http: HttpClient) {}
	
	getEntries() {
		return this.http.get('http://localhost:5000/api/v1.0/sample_match').toPromise();
	}
	
	getEntry(id) {
		return this.http.get('http://localhost:5000/api/v1.0/sample_match/' + id).toPromise();
	}
}