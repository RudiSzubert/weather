# Weather

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Obviously there should be more unit tests, I wouldn't fit in given time though

## Components

As you can see there is only one component - app. The reason for this is simple - I've decided to use angular materials
for table, so it wouldn't be easy to make a components for row, while making one for column wouldn't make sense -
 - I'd need to collect e.g. temperatures from different cities for that. So I could make a component for cell, just to 
display a single value - again not much sense. I could do a component for a details, and I think it would be the best solution
if I'd going to develop this further, but right now it would be a single canvas with single function. 

## Styles

I've used angular material to get simple, tidy and well-aligned styles for all screen sizes.
As this page was to present some numeric data I've focused more on readability and UX, e.g. by adding charts.


