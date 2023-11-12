import { configureStore } from "@reduxjs/toolkit";
import AppProvider from "context/AppProvider.js";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import favoritesReducer from "./features/favorites/favoritesSlice";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>

  <BrowserRouter>
    <Provider store={store}>
      <AppProvider>
        <App />
      </AppProvider>
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>
);

reportWebVitals();
