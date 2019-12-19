import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { WebService } from './web.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import * as h337 from 'heatmap.js';

// To Do : Security work needs to be added here from C3

@Component({
	selector: 'entry',
	templateUrl: './entry.component.html',
	styleUrls: ['./entry.component.css']
})

export class EntryComponent{
	
	entry = []
	dataForm;
	
    constructor(private webService: WebService, private route: ActivatedRoute, private formBuilder: FormBuilder) {
		this.dataForm = this.formBuilder.group({new_map: '', new_pos_x: '', new_pos_y: '', new_dmg: ''});
	}

	@ViewChild('map') map: ElementRef;
	
	async ngOnInit(){
	
	console.log(this.webService.getEntry(this.route.snapshot.params.id));
	var response = await this.webService.getEntry(this.route.snapshot.params.id);
	this.entry = response;
	
	//this.dataForm = this.formBuilder.group({new_map: '', new_pos_x: '', new_pos_y: '', new_dmg: ''});
	
	var heatmapInstance = h337.create({container: this.map.nativeElement});

	console.log(this.entry)
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
        x: this.entry.att_pos_x,
        y: this.entry.att_pos_y,
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

    asyc ngAfterViewInit(){
		
	}
	
	onSubmit(){
		console.log(this.dataForm.value);
	}
}