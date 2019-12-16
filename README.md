# Installation 

1. MongoDB for data storage. 
Database may not run if not enough space.
Navigate to Sample Match JSON file and enter terminal commands.
mongoimport --db csstats --collection sample_match --jsonArray sample_match.json
mongod
use csstats
db.sample_match.find().pretty()

2. Python API to send JSON data.
pip install Flask --user
pip install flask_cors --user
pip install pymongo --user
python CSGO_API.py

3. Display and map to heatmap.
C:\Users\Administrator
npm install
ng serve

# HeatmapsTest

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
