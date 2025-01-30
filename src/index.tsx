import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";

const divPortal = document.getElementById("root");
if (!divPortal) {
   throw new Error("render error");
}
const root = ReactDOM.createRoot(divPortal);
root.render(
   <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
         <BrowserRouter>
            <App />
         </BrowserRouter>
      </PersistGate>
   </Provider>
);
