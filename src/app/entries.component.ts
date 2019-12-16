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

	async ngOnInit(){
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
	
	// entries_list;

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
      max: max,
      min: 10,
      data: points
    };
    // if you have a set of datapoints always use setData instead of addData
    // for data initialization
    heatmapInstance.setData(data);
  }
}