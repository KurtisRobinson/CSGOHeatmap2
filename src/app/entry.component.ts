import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { WebService } from './web.service';
import { ActivatedRoute } from '@angular/router';
import * as h337 from 'heatmap.js';

// To Do : Security work needs to be added here from C3

@Component({
	selector: 'entry',
	templateUrl: './entry.component.html',
	styleUrls: ['./entry.component.css']
})

export class EntryComponent{

    constructor(private webService: WebService,
        private route: ActivatedRoute) {}

	/* async ngOnInit(){
        var response = await this.webService.getEntry(this.route.snapshot.params.id);
		this.entry = response;
	} */
	
	entry = { };

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