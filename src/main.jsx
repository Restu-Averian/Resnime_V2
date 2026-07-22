import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "./components/ui/provider.jsx";
import Layout from "./components/global/Layout.jsx";
import "./style/main.css";
import ErrorBoundary from "./components/global/ErrorBoundary.jsx";
import FallbackErr from "./pages/FallbackErr.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider>
      <BrowserRouter>
        <ErrorBoundary fallback={<FallbackErr isNavbar />}>
          <Layout>
            <ErrorBoundary fallback={<FallbackErr />}>
              <App />
            </ErrorBoundary>
          </Layout>
        </ErrorBoundary>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
