import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

@Injectable()
export class WebService {
	
	private entries_private_list;
	private entriesSubject = new Subject();
	entries_list = this.entriesSubject.asObservable();
	
	constructor(private http: HttpClient) {}
	
	getEntries(page) {
		console.log('http://localhost:5000/api/v1.0/sample_match?pn=' + page)
		return this.http.get(
			'http://localhost:5000/api/v1.0/sample_match?pn=' + page)
		.subscribe(response => { 
			this.entries_private_list = response; 
			this.entriesSubject.next(
					this.entries_private_list); 
			})
	}
	
	getEntry(id) {
		return this.http.get('http://localhost:5000/api/v1.0/sample_match/' + id).toPromise();
	}
}