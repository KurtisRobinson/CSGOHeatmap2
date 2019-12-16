import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { WebService } from './web.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { EntriesComponent } from './entries.component';
import { HomeComponent } from './home.component';
import { EntryComponent } from './entry.component';

var routes = [
	{
		path: '',
		component: HomeComponent
	},
	{
		path: 'de_dust2',
		component: EntriesComponent
	},
	{
		path: 'entries/:id',
		component: EntryComponent
	},
];

@NgModule({
  declarations: [
    AppComponent, EntriesComponent, HomeComponent, EntryComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
	RouterModule.forRoot(routes)
  ],
  providers: [WebService],
  bootstrap: [AppComponent]
})
export class AppModule { }
