import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

@Injectable()
export class WebService {
	
	private entries_private_list;
	private entriesSubject = new Subject();
	entries_list = this.entriesSubject.asObservable();
	
	
	finalResort = [];

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
	
	postEntry(data) {
		let postData = new FormData();
		console.log("Recieved data : " + data);
		
		postData.append("arm_dmg", data.new_arm_dmg);
		postData.append("att_side", data.new_att_side);
		postData.append("hp_dmg", data.new_dmg);
		postData.append("ID", data.new_id);
		postData.append("is_bomb_planted", data.new_is_planted);
		postData.append("map", data.new_map);
		postData.append("att_pos_x", data.new_pos_x);
		postData.append("att_pos_y", data.new_pos_y);
		postData.append("round", data.new_round);
		postData.append("round_type", data.new_round_type);
		postData.append("bomb_site", data.new_site);
		postData.append("vic_side", data.new_vic_side);
		postData.append("vic_pos_x", data.new_vic_x);
		postData.append("vic_pos_y", data.new_vic_y);
		postData.append("winner_side", data.new_win_side);
		postData.append("wp", data.new_wp);
		postData.append("wp_type", data.new_wp_type);

		console.log("Data to be sent :" + postData.get("arm_dmg"))
		this.http.post('http://localhost:5000/api/v1.0/sample_match/new', postData).subscribe(response => console.log(response));
	}
}