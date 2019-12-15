import { Component } from '@angular/core';

@Component({
	selector: 'entries',
	templateUrl: './entries.component.html',
	styleUrls: ['./entries.component.css']
})

export class EntriesComponent{
	entries_list = [
 { "name": "Pizza Place", "city": "Coleriane", "review_count": 10 },
 { "name": "Wine Lake", "city": "Ballymoney", "review_count": 7 },
 { "name": "Beer Tavern", "city": "Ballymena", "review_count": 12 }
 ];
}