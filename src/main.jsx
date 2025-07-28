import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import { Provider } from "react-redux";
import store from "./Redux/Store/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const persister = persistStore(store);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate loading={null} persistor={persister}>
          <App />
        </PersistGate>
        <Toaster richColors position="top-center" />
      </BrowserRouter>
    </Provider>
  // </StrictMode>
);
