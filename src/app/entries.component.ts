import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { WebService } from './web.service';
import { AuthService } from './auth.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import * as h337 from 'heatmap.js';

@Component({
	selector: 'entries',
	templateUrl: './entries.component.html',
	styleUrls: ['./entries.component.css']
})

export class EntriesComponent{
	entries_list;

	constructor(private webService: WebService, private authService: AuthService,  private route: ActivatedRoute, private formBuilder: FormBuilder) {
		this.dataForm = this.formBuilder.group(
	   {
		new_id: '',
		new_arm_dmg: '',		
		new_pos_x: ['', Validators.required],
		new_pos_y: ['', Validators.required],
		new_att_side: '',
		new_site: '',
		new_dmg: '',
		new_is_planted: '',
		new_map: '',
		new_round: '',
		new_round_type: '',
		new_vic_x: '',
		new_vic_y: '',
		new_vic_side: '',
		new_win_side: '',
		new_wp: '',
		new_wp_type: '',
		}
	  )	
	}

	dataForm;
	
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
	
	entries;
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
	 
	this.webService.entries_list
		.subscribe(entries => {
			this.entries_list = entries;
		})
	
	var listHolding = [];
	
	this.webService.entries_list
		.subscribe(entries => {

			//this.webService.entries_list = entries
			
			console.log(this.webService.finalResort)
					
			var healthArray = []
			
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
  
  onSubmit(){
		console.log(this.dataForm.value);
		console.log("Data is valid :" + this.dataForm.valid);
		this.webService.postEntry(this.dataForm.value);
		this.dataForm.reset();
		//$Window.location.reload();
	}
	
	
	isInvalid(control){
		return this.dataForm.controls[control].invalid && this.dataForm.controls[control].touched;
	}
	
	isUnTouched(){
		return this.dataForm.controls.controls.new_pos_x.pristine || 
		this.dataForm.controls.controls.new_pos_y.pristine ;
	}
	
	isIncomplete(){
		return this.isInvalid('new_pos_x') || 
		this.isInvalid('new_pos_y') || 
		this.isUnTouched();
	}
}