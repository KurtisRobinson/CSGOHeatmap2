import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { WebService } from './web.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import * as h337 from 'heatmap.js';

// To Do : Security work needs to be added here from C3

@Component({
	selector: 'entry',
	templateUrl: './entry.component.html',
	styleUrls: ['./entry.component.css']
})

export class EntryComponent{
	entry;
	dataForm;
	
	
    constructor(private webService: WebService, private route: ActivatedRoute, private formBuilder: FormBuilder) 
	{
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

	@ViewChild('map') map: ElementRef;
	
	async ngOnInit(){
	
	console.log(this.webService.getEntry(this.route.snapshot.params.id));
	var response = await this.webService.getEntry(this.route.snapshot.params.id);
	this.entry = response;

	var heatmapInstance = h337.create({container: this.map.nativeElement});

	console.log(this.entry)
    // now generate some random data
    var points = [];
    var max = 100;
    var width = 3000;
    var height = 3000;
    var len = 500;
	
	this.dataForm.controls['new_id'].setValue(this.entry._id);
	this.dataForm.controls['new_arm_dmg'].setValue(this.entry.arm_dmg);
	this.dataForm.controls['new_pos_x'].setValue(this.entry.att_pos_x);
	this.dataForm.controls['new_pos_y'].setValue(this.entry.att_pos_y);
	this.dataForm.controls['new_att_side'].setValue(this.entry.att_side);
	this.dataForm.controls['new_site'].setValue(this.entry.bomb_site);
	this.dataForm.controls['new_dmg'].setValue(this.entry.hp_dmg);
	this.dataForm.controls['new_is_planted'].setValue(this.entry.is_bomb_planted);
	this.dataForm.controls['new_map'].setValue(this.entry.map);
	this.dataForm.controls['new_round'].setValue(this.entry.round);
	this.dataForm.controls['new_round_type'].setValue(this.entry.round_type);
	this.dataForm.controls['new_vic_x'].setValue(this.entry.vic_pos_x);
	this.dataForm.controls['new_vic_y'].setValue(this.entry.vic_pos_y);
	this.dataForm.controls['new_vic_side'].setValue(this.entry.vic_side);
	this.dataForm.controls['new_win_side'].setValue(this.entry.winner_side);
	this.dataForm.controls['new_wp'].setValue(this.entry.wp);
	this.dataForm.controls['new_wp_type'].setValue(this.entry.wp_type);

	
	
    while (len--) {
      var val = Math.floor(Math.random()*100);
      max = Math.max(max, val);
      var point = {
        x: this.entry.att_pos_x,
        y: this.entry.att_pos_y,
        value: 100-this.entry.hp_dmg
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

	ngAfterViewInit()
	{
	}
	
	onSubmit(){
		console.log(this.dataForm.value);
		console.log("Data is valid :" + this.dataForm.valid);
		this.webService.updateEntry(this.dataForm.value);
		this.dataForm.reset();
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