import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ICity, ICityDetails } from '../interfaces/city.inteface';

@Injectable({
  providedIn: 'root'
})
export class WeatherServiceStub {
  private weatherStub = new Subject<ICity>();
  private forecastStub = new Subject<ICityDetails>();

  constructor() { }

  public getCityWeather(city: string): Observable<ICity> {
    setTimeout(() => {
      this.weatherStub.next({
        name: city,
        main: { feels_like: 1, humidity: 1, temp: 1, temp_max: 1, temp_min: 1, pressure: 1 }
      });
    })
    return this.weatherStub.asObservable();
  }

  public getCityForecast(city: string): Observable<ICityDetails> {
    setTimeout(() => {
      this.forecastStub.next({
        list: []
      });
    })
    return this.forecastStub.asObservable();
  }
}
