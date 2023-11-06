import CloseIcon from "@mui/icons-material/Close";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MuiAlert from "@mui/material/Alert";
import Autocomplete from "@mui/material/Autocomplete";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import { AppState } from "context/AppProvider";
import * as React from "react";
import { useEffect, useState } from "react";
import * as ServerApi from "utils/serverApi";

import "./weather.scss";

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

  const [weatherPageData, setWeatherPageData] = useState({
    city: "",
    temp: "",
    weather: "",
    daysArray: [],
  });

  const [selectedSearchValue, setSelectedSearchValue] = useState({
    label: "Tel Aviv",
    locationKey: "215854",
  });

  const { favoritesArray, setFavoritesArray } = AppState();

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
    setSelectedSearchValue(newCityObj);
  };

  useEffect(() => {
    const key = selectedSearchValue.locationKey;

    if (key !== "") {
      Promise.all([
        ServerApi.fetchWeatherByCity(key),
        ServerApi.fetchFiveDays(key),
      ])
        .then((data) => {
          const weatherData = {
            city: selectedSearchValue.label,
            temp: data[0].Temperature.Metric.Value,
            weather: data[0].WeatherText,
            daysArray: data[1],
          };
          console.log(weatherData);
          setWeatherPageData(weatherData);
        })
        .catch((err) => {
          console.log("error fetching data");
        });
    }
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
    setWeatherPageData(emptyObj);
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
      {weatherPageData.city !== "" && (
        <div className="city-weather-container">
          <CloseIcon className="close" onClick={handleCloseWindow} />
          <div className="city-weather-add-favorites">
            <div className="city-name-temp">
              <h2>{weatherPageData.city}</h2>
              <h2>{weatherPageData.temp}°c</h2>
            </div>
            <div className="add-favorite" onClick={handleAddFavorite}>
              <FavoriteBorderIcon />
              add to favorites
            </div>
          </div>
          <h1>{weatherPageData.weather}</h1>
          <div className="days">
            {weatherPageData.daysArray.map((dayItem, index) => {
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
