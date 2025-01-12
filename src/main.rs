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

fn main() -> Result<(), Box<dyn Error>> {
    Ok(())
}
