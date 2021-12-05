import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { cities } from './configs/cities';
import { ICity, ICityDetails } from './interfaces/city.inteface';
import { forkJoin, map, ReplaySubject, takeUntil } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { KelvinToCelsiusDegree } from './helpers/kelvinToCelsiusDegree';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class AppComponent implements OnInit, OnDestroy {
  public expandedElement?: ICity | null;
  public columns: string[] = [ 'city', 'temp', 'wind' ];
  public width = window.innerWidth * .9;
  public charts: Array<{ chart: Chart, id: string }> = [];
  public cities: Array<ICity> = [];
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private weather: WeatherService) {
    Chart.register(...registerables);
  }

  public ngOnInit(): void {
    this.init();
  }

  public seeForecast(row: ICity): void {
    if (this.expandedElement === row) {
      this.expandedElement = null;
    } else {
      this.expandedElement = row;
      const chartId = 'myChart-' + row.name;
      let chart = this.charts.find(e => e.id === chartId);
      if (!chart) {// No need to draw twice
        this.weather.getCityForecast(row.name).subscribe(data => {
          this.drawForecast(data, chartId);
        });
      }
    }
  }

  private init(): void {
    forkJoin(cities.map(city => { return this.weather.getCityWeather(city); }))
      .pipe(map(cities => {
        cities.forEach(c => { c.main.temp = KelvinToCelsiusDegree(c.main.temp); })
        return cities;
      }),
        takeUntil(this.destroyed$))// this isn't necessary here, but clean unsubscribing is something often forgotten
      .subscribe((data: ICity[]) => {
        this.cities = data;
      });
  }

  private drawForecast(data: ICityDetails, chartId: string): void {
    const ctx = (document.getElementById(chartId) as HTMLCanvasElement)
      .getContext('2d') as CanvasRenderingContext2D;

    const labels = data.list.map(e => e.dt_txt.split(' ')[1]);
    const temp = data.list.map(e => KelvinToCelsiusDegree(e.main.temp));
    const wind = data.list.map(e => e.wind.speed);

    const c = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Temperature',
          data: temp,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        },
          {
            label: 'Wind',
            data: wind,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
      }
    });
    this.charts.push({ chart: c, id: chartId });
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
