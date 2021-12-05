import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICity, ICityDetails } from './interfaces/city.inteface';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private readonly appid = '0b36b6a98d27a0e2172d6dfa5a30cdf0'; // Should be on backend only, we have no backend though
  private readonly weatherEndpoint = 'https://api.openweathermap.org/data/2.5/';

  constructor(private http: HttpClient) { }

  public getCityWeather(city: string): Observable<ICity> {
    return this.http.get(
      this.weatherEndpoint + 'weather',
      { params: { q: city, appid: this.appid } }) as Observable<ICity>;
  }

  public getCityForecast(city: string): Observable<ICityDetails> {
    return this.http.get(
      this.weatherEndpoint + 'forecast',
      { params: { q: city, appid: this.appid } }) as Observable<ICityDetails>;
  }
}
