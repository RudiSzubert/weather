export interface ICity {
  clouds?: {
    all: number;
  }
  main: IMainData;
  name: string;
  sys?: {
    sunrise: number;
    sunset: number;
  }
  visibility?: number;
  wind?: {
    speed: number;
    deg: number;
    gust: number;
  }
}

export interface ICityDetails {
  list: Array<IDetail>;
}

interface IDetail {
  dt: number;
  dt_txt: string;
  main: IMainData;
  pop: 0.03
  wind: IWind;
}

interface IMainData {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  pressure: number;
}

interface IWind {
  speed: number;
  deg: number;
  gust: number;
}
