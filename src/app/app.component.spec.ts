import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { WeatherService } from './weather.service';
import { WeatherServiceStub } from './stubs/weather.service.stub';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: WeatherService, useClass: WeatherServiceStub }
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
