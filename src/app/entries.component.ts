import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { WebService } from './web.service';
import * as h337 from 'heatmap.js';

@Component({
	selector: 'entries',
	templateUrl: './entries.component.html',
	styleUrls: ['./entries.component.css']
})

export class EntriesComponent{

	constructor(private webService: WebService) {}

	ngOnInit(){
		if (sessionStorage.page) {
			this.page = sessionStorage.page;
		}
		this.webService.getEntries(this.page);
	}
	
	nextPage() {
		this.page = Number(this.page) - 1;
		sessionStorage.page = Number(this.page);
		this.webService.getEntries(this.page);
	}
	
	previousPage(){
		if (this.page > 1){
			this.page = Number(this.page) - 1;
			sessionStorage.page = Number(this.page);
			this.webService.getEntries(this.page);
		}
	}
	
	
	page = 1;
	

	@ViewChild('map') map: ElementRef;

  ngAfterViewInit(){
    // minimal heatmap instance configuration
    var heatmapInstance = h337.create({
      // only container is required, the rest will be defaults
      container: this.map.nativeElement
    });

    // now generate some random data
	
    var points = [];
    var max = 100;
    var width = 3000;
    var height = 3000;
    var len = 500;
	
	var test_list = [{ "ID": 99, "_id": "5df98333245feb81059c5c77", "arm_dmg": 0, "att_pos_x": 459, "att_pos_y": 566, "att_side": "CounterTerrorist", "bomb_site": "", "hp_dmg": 1, "is_bomb_planted": "FALSE", "map": "de_dust2", "round": 23, "round_type": "ECO", "vic_pos_x": 333, "vic_pos_y": 1996, "vic_side": "Terrorist", "winner_side": "Terrorist", "wp": "HE","wp_type": "Grenade"
  }];
	
	this.webService.entriesSubject
		.subscribe(entries => {
			this.entries_list = entries
			test_list.push.apply(test_list, this.entries_list);
		})
	//Data is retrieved from MongoDB and assigned to test_list
	console.log(test_list);
	console.log(test_list[0].att_pos_x);
	//console.log(test_list[1].att_pos_x);
	
	
    while (len--) {
      var val = Math.floor(Math.random()*100);
      max = Math.max(max, val);
      var point = {
        x: Math.floor(Math.random()*width),
        y: Math.floor(Math.random()*height),
        value: val
      };
      points.push(point);
    }
    // heatmap data format
    var data = {
      max: 100,
      min: 10,
      //data: [{ x: test_list.att_pos_x, y: test_list.att_pos_y, value: 100}]
	  data: points
    };
    // if you have a set of datapoints always use setData instead of addData
    // for data initialization
    heatmapInstance.setData(data);
  }
}