use reqwest::blocking::Client;
use serde::Deserialize;
use std::env;
use std::error::Error;

// GET https://api.openweathermap.org/data/2.5/weather?lat={$LAT}&lon={$LON}&appid={$API}
// {
//    "weather": [
//       {
//          "description": "moderate rain"
//       }
//    ],
//    "main": {
//       "temp": 284.2
//    },
//    "rain": {
//       "1h": 2.73
//    },
//    "sys": {
//       "country": "IT"
//    },
//    "name": "Province of Turin"
// }

#[derive(Deserialize, Debug)]
struct WeatherData {
    wind: WeatherWind,
    name: String,
    main: WeatherMain,
    weather: Vec<WeatherWeather>,
    #[serde(rename = "rain", default)]
    rain: Option<Rain>,
    #[serde(rename = "sys", default)]
    country: WeatherCountry,
}

#[derive(Deserialize, Debug, Default)]
struct WeatherCountry {
    country: Option<String>,
}

#[derive(Deserialize, Debug)]
struct WeatherWind {
    speed: f64,
}

#[derive(Deserialize, Debug)]
struct WeatherMain {
    temp: f64,
}

#[derive(Deserialize, Debug)]
struct WeatherWeather {
    description: String,
}

#[derive(Deserialize, Debug)]
struct Rain {
    #[serde(rename = "1h")]
    one_hour: f64,
}

fn main() -> Result<(), Box<dyn Error>> {
    let api_key = env::var("RUSTY_WEATHER_API_KEY")
        .expect("Please set the RUSTY_WEATHER_API_KEY environment variable");

    let args: Vec<String> = env::args().collect();
    if args.len() != 3 {
        eprintln!("Usage: weather_cli <latitude> <longitude>");
        std::process::exit(1);
    }

    let lat = &args[1];
    let lon = &args[2];

    let client = Client::new();
    let url = format!(
        "https://api.openweathermap.org/data/2.5/weather?lat={}&lon={}&appid={}",
        lat, lon, api_key
    );

    let weather_data: WeatherData = client.get(&url).send()?.json()?;
    if let Some(country) = &weather_data.country.country {
        println!("Location: {}, {}", weather_data.name, country)
    } else {
        println!("Country not defined!")
    };
    println!(
        "Temperature: {:.2}°C / {:.2}°F",
        weather_data.main.temp - 273.15,
        (weather_data.main.temp - 273.15) * 9.0 / 5.0 + 32.0
    );
    println!("Wind Speed: {:.2} m/s", weather_data.wind.speed);
    if let Some(weather) = &weather_data.weather.get(0) {
        println!("Weather Description: {}", weather.description);
    }
    if let Some(rain) = &weather_data.rain {
        println!("Rain (last 1h): {:.2} mm", rain.one_hour);
    } else {
        println!("Rain (last 1h): None");
    }
    Ok(())
}
