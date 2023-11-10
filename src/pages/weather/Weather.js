import CloseIcon from "@mui/icons-material/Close";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MuiAlert from "@mui/material/Alert";
import Autocomplete from "@mui/material/Autocomplete";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import { AppState } from "context/AppProvider";
import * as React from "react";
import { useEffect, useState } from "react";
import * as LocalStorage from "utils/localStorage";
import * as ServerApi from "utils/serverApi";

import "./weather.scss";

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

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

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Weather() {
  const [citiesAutoComplete, setCitiesAutoComplete] = useState([]);

  const [toast, setToast] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { open } = toast;

  useEffect(() => {
    console.log("this is useEffect with []");
  }, []);

  const [selectedSearchValue, setSelectedSearchValue] = useState({
    label: "",
    locationKey: "",
  });

  const {
    favoritesArray,
    setFavoritesArray,
    selectedCityWeatherObj,
    setSelectedCityWeatherObj,
  } = AppState();

  const handleChange = (event) => {
    const searchValue = event.target.value;
    if (searchValue.length > 2) {
      ServerApi.fetchCitiesAutoComplete(searchValue)
        .then((cities) => {
          setCitiesAutoComplete(cities);
          console.log(`response from api:`);
          console.log(cities);
        })
        .catch(() => {
          console.log("error fetching");
        });
    }
  };

  const handleSelect = (event, newValue, reason) => {
    if (reason === "clear") return;
    const newCityObj = {
      label: newValue.label,
      locationKey: newValue.locationKey,
    };
    LocalStorage.set("last_selected_city_label", newCityObj.label);
    LocalStorage.set("last_selected_city_key", newCityObj.locationKey);
    setSelectedSearchValue(newCityObj);
  };

  useEffect(() => {
    var key = selectedSearchValue.locationKey;
    if (LocalStorage.get("last_selected_city_label")) {
      let lastSelectedCityKey = LocalStorage.get("last_selected_city_key");
      let lastSelectedCityLabel = LocalStorage.get("last_selected_city_label");

      ServerApi.fetchFiveDays(lastSelectedCityKey)
        .then((data) => {
          const daysWeatherArr = data.DailyForecasts.map((item) => ({
            day: getDayName(item.Date),
            minTemp: item.Temperature.Minimum.Value,
            maxTemp: item.Temperature.Maximum.Value,
          }));
          const weatherData = {
            locationKey: lastSelectedCityKey,
            city: lastSelectedCityLabel,
            temp:
              (data.DailyForecasts[0].Temperature.Maximum.Value +
                data.DailyForecasts[0].Temperature.Minimum.Value) /
              2,
            weather: data.DailyForecasts[0].Day.IconPhrase,
            daysArray: daysWeatherArr,
          };
          setSelectedCityWeatherObj(weatherData);
          console.log("today weather: ", weatherData);
        })
        .catch((err) => {
          console.log("error fetching data");
        });
    } else {
      // this case is when the user never selected a city.
      // use this when the current weather api end point is not available.
      if (key === "") {
        key = "215854"; //tel aviv key
        let default_city = "Tel Aviv"; //tel aviv key
        ServerApi.fetchFiveDays(key)
          .then((data) => {
            const daysWeatherArr = data.DailyForecasts.map((item) => ({
              day: getDayName(item.Date),
              minTemp: item.Temperature.Minimum.Value,
              maxTemp: item.Temperature.Maximum.Value,
            }));
            const weatherData = {
              locationKey: key,
              city: default_city,
              temp:
                (data.DailyForecasts[0].Temperature.Maximum.Value +
                  data.DailyForecasts[0].Temperature.Minimum.Value) /
                2,
              weather: data.DailyForecasts[0].Day.IconPhrase,
              daysArray: daysWeatherArr,
            };
            setSelectedCityWeatherObj(weatherData);
            console.log("today weather: ", weatherData);
          })
          .catch((err) => {
            console.log("error fetching data");
          });
      }
    }
    // api call for current weather
    // if (key !== "") {
    //   Promise.all([
    //     ServerApi.fetchWeatherByCity(key),
    //     ServerApi.fetchFiveDays(key),
    //   ])
    //     .then((data) => {
    //       const weatherData = {
    //         city: selectedSearchValue.label,
    //         temp: data[0].Temperature.Metric.Value,
    //         weather: data[0].WeatherText,
    //         daysArray: data[1],
    //       };
    //       console.log(weatherData);
    //       setSelectedCityWeatherObj(weatherData);
    //     })
    //     .catch((err) => {
    //       console.log("error fetching data");
    //     });
    // }
  }, [selectedSearchValue]);

  const handleAddFavorite = () => {
    setToast({ ...toast, open: true });
    const cityExists = favoritesArray.some(
      (city) => JSON.stringify(city) === JSON.stringify(weatherPageData)
    );
    if (!cityExists) {
      setFavoritesArray([...favoritesArray, weatherPageData]);
    }
  };

  const handleCloseToast = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setToast(false);
  };

  const handleCloseWindow = (event) => {
    const emptyObj = {
      city: "",
      temp: "",
      weather: "",
      daysArray: [],
    };
    setSelectedCityWeatherObj(emptyObj);
  };

  return (
    <div className="weather-page">
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={citiesAutoComplete}
        sx={{ width: 300 }}
        value={selectedSearchValue}
        onChange={handleSelect}
        renderInput={(params) => (
          <TextField
            {...params}
            className="input-search"
            label="Search"
            variant="outlined"
            fullWidth
            value={selectedSearchValue}
            onChange={handleChange}
          />
        )}
      />
      {selectedCityWeatherObj.city !== "" && (
        <div className="city-weather-container">
          <CloseIcon className="close" onClick={handleCloseWindow} />
          <div className="city-weather-add-favorites">
            <div className="city-name-temp">
              <h2>{selectedCityWeatherObj.city}</h2>
              <h2>{selectedCityWeatherObj.temp}°c</h2>
            </div>
            <div className="add-favorite" onClick={handleAddFavorite}>
              <FavoriteBorderIcon />
              add to favorites
            </div>
          </div>
          <h1>{selectedCityWeatherObj.weather}</h1>
          <div className="days">
            {selectedCityWeatherObj.daysArray.map((dayItem, index) => {
              return (
                <div key={index} className="day-weather">
                  <h3>{dayItem.day}</h3>
                  <h3>
                    {dayItem.minTemp}°c-{dayItem.maxTemp}°c
                  </h3>
                </div>
              );
            })}
          </div>
          <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleCloseToast}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={handleCloseToast}
              severity="success"
              sx={{ width: "100%" }}
            >
              saved to favorites!
            </Alert>
          </Snackbar>
        </div>
      )}
    </div>
  );
}
