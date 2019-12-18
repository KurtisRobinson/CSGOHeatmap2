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
    var width = 1000;
    var height = 1000;
    var len = 500;
	var id = 58;
	
	var test_list = [  {
    "ID": 34,
    "map": "de_dust2",
    "round": 19,
    "att_side": "CounterTerrorist",
    "vic_side": "Terrorist",
    "hp_dmg": 28,
    "arm_dmg": 9,
    "is_bomb_planted": "FALSE",
    "bomb_site": "",
    "wp": "HE",
    "wp_type": "Grenade",
    "winner_side": "CounterTerrorist",
    "att_pos_x": 299,
    "att_pos_y": 1195,
    "vic_pos_x": -1876,
    "vic_pos_y": 1808,
    "round_type": "FORCE_BUY"
  }];
	
	this.webService.entries_list
		.subscribe(entries => {
			this.entries_list = entries
			test_list.push.apply(test_list, this.entries_list);
		})
	//Data is retrieved from MongoDB and assigned to test_list
	console.log(test_list);
	console.log(test_list[0].att_pos_x);
	//console.log(test_list[1].att_pos_x);
	
	
    while (id--) {
      var val = Math.floor(Math.random()*100);
      max = Math.max(max, val);
      var point = {
        x: Math.floor(Math.random()*width),
		//x: test_list[id].att_pos_x,
        y: Math.floor(Math.random()*height),
		//y: test_list[id].att_pos_y,
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