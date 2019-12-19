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
	
	_entries;
	page = 1;
	

	@ViewChild('map') map: ElementRef;

_entries;

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
	 
	this.webService.entries_list
		.subscribe(entries => {
			this.entries_list = entries;
		})
	
	var listHolding = [];
	
	this.webService.entries_list
		.subscribe(entries => {
			console.log(this.listHolding);

			this.webService.entries_list = entries
			
			console.log(this.webService.finalResort)
					
			var healthArray = []
	
			console.log(this.webService.entries_private_list)
			
			for (let item of this.webService.entries_private_list){
				let conversion = {
					'x':item.att_pos_x,
					'y':item.att_pos_y,
					'value':100-item.hp_dmg
				}
				healthArray.push(conversion)
			}
			
			console.log([healthArray])
			
			heatmapInstance.setData({max: 100, min: 10, data:healthArray});
		})
  }
}