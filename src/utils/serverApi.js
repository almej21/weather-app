import axios from "axios";

const json1 = JSON.parse(`[
  {
    "Version": 1,
    "Key": "107123",
    "Type": "City",
    "Rank": 21,
    "LocalizedName": "Barranquilla",
    "Country": {
      "ID": "CO",
      "LocalizedName": "Colombia"
    },
    "AdministrativeArea": {
      "ID": "ATL",
      "LocalizedName": "Atlántico"
    }
  },
  {
    "Version": 1,
    "Key": "307297",
    "Type": "City",
    "Rank": 21,
    "LocalizedName": "Barcelona",
    "Country": {
      "ID": "ES",
      "LocalizedName": "Spain"
    },
    "AdministrativeArea": {
      "ID": "CT",
      "LocalizedName": "Catalonia"
    }
  },
  {
    "Version": 1,
    "Key": "354461",
    "Type": "City",
    "Rank": 21,
    "LocalizedName": "Barquisimeto",
    "Country": {
      "ID": "VE",
      "LocalizedName": "Venezuela"
    },
    "AdministrativeArea": {
      "ID": "K",
      "LocalizedName": "Lara"
    }
  },
  {
    "Version": 1,
    "Key": "206684",
    "Type": "City",
    "Rank": 25,
    "LocalizedName": "Bareilly",
    "Country": {
      "ID": "IN",
      "LocalizedName": "India"
    },
    "AdministrativeArea": {
      "ID": "UP",
      "LocalizedName": "Uttar Pradesh"
    }
  },
  {
    "Version": 1,
    "Key": "214964",
    "Type": "City",
    "Rank": 31,
    "LocalizedName": "Bari",
    "Country": {
      "ID": "IT",
      "LocalizedName": "Italy"
    },
    "AdministrativeArea": {
      "ID": "75",
      "LocalizedName": "Apulia"
    }
  },
  {
    "Version": 1,
    "Key": "291662",
    "Type": "City",
    "Rank": 31,
    "LocalizedName": "Barnaul",
    "Country": {
      "ID": "RU",
      "LocalizedName": "Russia"
    },
    "AdministrativeArea": {
      "ID": "ALT",
      "LocalizedName": "Altay"
    }
  },
  {
    "Version": 1,
    "Key": "351847",
    "Type": "City",
    "Rank": 31,
    "LocalizedName": "Barcelona",
    "Country": {
      "ID": "VE",
      "LocalizedName": "Venezuela"
    },
    "AdministrativeArea": {
      "ID": "B",
      "LocalizedName": "Anzoátegui"
    }
  },
  {
    "Version": 1,
    "Key": "2305467",
    "Type": "City",
    "Rank": 35,
    "LocalizedName": "Barreiro",
    "Country": {
      "ID": "BR",
      "LocalizedName": "Brazil"
    },
    "AdministrativeArea": {
      "ID": "MG",
      "LocalizedName": "Minas Gerais"
    }
  },
  {
    "Version": 1,
    "Key": "191548",
    "Type": "City",
    "Rank": 35,
    "LocalizedName": "Barasat",
    "Country": {
      "ID": "IN",
      "LocalizedName": "India"
    },
    "AdministrativeArea": {
      "ID": "WB",
      "LocalizedName": "West Bengal"
    }
  },
  {
    "Version": 1,
    "Key": "191576",
    "Type": "City",
    "Rank": 35,
    "LocalizedName": "Barddhaman",
    "Country": {
      "ID": "IN",
      "LocalizedName": "India"
    },
    "AdministrativeArea": {
      "ID": "WB",
      "LocalizedName": "West Bengal"
    }
  }
]
`);
const json2 = JSON.parse(`[
  {
    "LocalObservationDateTime": "2023-11-06T17:13:00+01:00",
    "EpochTime": 1699287180,
    "WeatherText": "Mostly sunny",
    "WeatherIcon": 2,
    "HasPrecipitation": false,
    "PrecipitationType": null,
    "IsDayTime": true,
    "Temperature": {
      "Metric": {
        "Value": 19.1,
        "Unit": "C",
        "UnitType": 17
      },
      "Imperial": {
        "Value": 66,
        "Unit": "F",
        "UnitType": 18
      }
    },
    "MobileLink": "http://www.accuweather.com/en/es/barcelona/307297/current-weather/307297?lang=en-us",
    "Link": "http://www.accuweather.com/en/es/barcelona/307297/current-weather/307297?lang=en-us"
  }
]`);
const json3 = JSON.parse(`{
  "Headline": {
    "EffectiveDate": "2023-11-07T19:00:00+01:00",
    "EffectiveEpochDate": 1699380000,
    "Severity": 7,
    "Text": "Cool Tuesday night",
    "Category": "cold",
    "EndDate": "2023-11-08T07:00:00+01:00",
    "EndEpochDate": 1699423200,
    "MobileLink": "http://www.accuweather.com/en/es/barcelona/307297/daily-weather-forecast/307297?unit=c&lang=en-us",
    "Link": "http://www.accuweather.com/en/es/barcelona/307297/daily-weather-forecast/307297?unit=c&lang=en-us"
  },
  "DailyForecasts": [
    {
      "Date": "2023-11-06T07:00:00+01:00",
      "EpochDate": 1699250400,
      "Temperature": {
        "Minimum": {
          "Value": 8.2,
          "Unit": "C",
          "UnitType": 17
        },
        "Maximum": {
          "Value": 19.5,
          "Unit": "C",
          "UnitType": 17
        }
      },
      "Day": {
        "Icon": 2,
        "IconPhrase": "Mostly sunny",
        "HasPrecipitation": false
      },
      "Night": {
        "Icon": 33,
        "IconPhrase": "Clear",
        "HasPrecipitation": false
      },
      "Sources": [
        "AccuWeather"
      ],
      "MobileLink": "http://www.accuweather.com/en/es/barcelona/307297/daily-weather-forecast/307297?day=1&unit=c&lang=en-us",
      "Link": "http://www.accuweather.com/en/es/barcelona/307297/daily-weather-forecast/307297?day=1&unit=c&lang=en-us"
    },
    {
      "Date": "2023-11-07T07:00:00+01:00",
      "EpochDate": 1699336800,
      "Temperature": {
        "Minimum": {
          "Value": 7.4,
          "Unit": "C",
          "UnitType": 17
        },
        "Maximum": {
          "Value": 17.7,
          "Unit": "C",
          "UnitType": 17
        }
      },
      "Day": {
        "Icon": 1,
        "IconPhrase": "Sunny",
        "HasPrecipitation": false
      },
      "Night": {
        "Icon": 34,
        "IconPhrase": "Mostly clear",
        "HasPrecipitation": false
      },
      "Sources": [
        "AccuWeather"
      ],
      "MobileLink": "http://www.accuweather.com/en/es/barcelona/307297/daily-weather-forecast/307297?day=2&unit=c&lang=en-us",
      "Link": "http://www.accuweather.com/en/es/barcelona/307297/daily-weather-forecast/307297?day=2&unit=c&lang=en-us"
    },
    {
      "Date": "2023-11-08T07:00:00+01:00",
      "EpochDate": 1699423200,
      "Temperature": {
        "Minimum": {
          "Value": 11,
          "Unit": "C",
          "UnitType": 17
        },
        "Maximum": {
          "Value": 17.1,
          "Unit": "C",
          "UnitType": 17
        }
      },
      "Day": {
        "Icon": 2,
        "IconPhrase": "Mostly sunny",
        "HasPrecipitation": false
      },
      "Night": {
        "Icon": 34,
        "IconPhrase": "Mostly clear",
        "HasPrecipitation": false
      },
      "Sources": [
        "AccuWeather"
      ],
      "MobileLink": "http://www.accuweather.com/en/es/barcelona/307297/daily-weather-forecast/307297?day=3&unit=c&lang=en-us",
      "Link": "http://www.accuweather.com/en/es/barcelona/307297/daily-weather-forecast/307297?day=3&unit=c&lang=en-us"
    },
    {
      "Date": "2023-11-09T07:00:00+01:00",
      "EpochDate": 1699509600,
      "Temperature": {
        "Minimum": {
          "Value": 11.2,
          "Unit": "C",
          "UnitType": 17
        },
        "Maximum": {
          "Value": 19.2,
          "Unit": "C",
          "UnitType": 17
        }
      },
      "Day": {
        "Icon": 3,
        "IconPhrase": "Partly sunny",
        "HasPrecipitation": false
      },
      "Night": {
        "Icon": 35,
        "IconPhrase": "Partly cloudy",
        "HasPrecipitation": false
      },
      "Sources": [
        "AccuWeather"
      ],
      "MobileLink": "http://www.accuweather.com/en/es/barcelona/307297/daily-weather-forecast/307297?day=4&unit=c&lang=en-us",
      "Link": "http://www.accuweather.com/en/es/barcelona/307297/daily-weather-forecast/307297?day=4&unit=c&lang=en-us"
    },
    {
      "Date": "2023-11-10T07:00:00+01:00",
      "EpochDate": 1699596000,
      "Temperature": {
        "Minimum": {
          "Value": 9.9,
          "Unit": "C",
          "UnitType": 17
        },
        "Maximum": {
          "Value": 19.1,
          "Unit": "C",
          "UnitType": 17
        }
      },
      "Day": {
        "Icon": 6,
        "IconPhrase": "Mostly cloudy",
        "HasPrecipitation": false
      },
      "Night": {
        "Icon": 35,
        "IconPhrase": "Partly cloudy",
        "HasPrecipitation": false
      },
      "Sources": [
        "AccuWeather"
      ],
      "MobileLink": "http://www.accuweather.com/en/es/barcelona/307297/daily-weather-forecast/307297?day=5&unit=c&lang=en-us",
      "Link": "http://www.accuweather.com/en/es/barcelona/307297/daily-weather-forecast/307297?day=5&unit=c&lang=en-us"
    }
  ]
}`);

function getDayName(timestamp) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = new Date(timestamp);
  const dayIndex = date.getUTCDay();

  return daysOfWeek[dayIndex];
}

export const fetchCitiesAutoComplete = (prefix) => {
  // return new Promise((resolve, reject) => {
  //   const citiesArray = json1.map((item) => ({
  //     label: item.LocalizedName,
  //     locationKey: item.Key,
  //   }));
  //   resolve(citiesArray);
  // });

  return new Promise((resolve, reject) => {
    axios
      .get(
        `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=pKZNU1qaHzzjzNOsWsWRaqxjZ5h5JSIh&q=${prefix}`
      )
      .then((res) => {
        const citiesArray = res.data.map((item) => ({
          label: item.LocalizedName,
          locationKey: item.Key,
        }));
        resolve(citiesArray);
      })
      .catch((err) => {
        // reject(json1[0]);
        console.log("ERROR:", err);
        reject(err);
      });
  });
};

// this api end point is currently not working, as for 10.11.23
export const fetchWeatherByCity = (locationKey) => {
  // return new Promise((resolve, reject) => {
  //   resolve(json2[0]);
  // });

  return new Promise((resolve, reject) => {
    axios
      .get(
        `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=pKZNU1qaHzzjzNOsWsWRaqxjZ5h5JSIh`
      )
      .then((res) => {
        resolve(res.data[0]);
      })
      .catch((err) => {
        // reject(json2[0]);
        // console.log("ERROR:", err);
        reject(err);
      });
  });
};

export const fetchFiveDays = (locationKey) => {
  // return new Promise((resolve, reject) => {
  //   // const daysWeather = json3.DailyForecasts.map((item) => ({
  //   //   day: getDayName(item.Date),
  //   //   minTemp: item.Temperature.Minimum.Value,
  //   //   maxTemp: item.Temperature.Maximum.Value,
  //   // }));
  //   resolve(json3);
  // });

  return new Promise((resolve, reject) => {
    axios
      .get(
        `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=pKZNU1qaHzzjzNOsWsWRaqxjZ5h5JSIh&metric=true`
      )
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.log("ERROR:", err);
        reject(err);
      });
  });
};
