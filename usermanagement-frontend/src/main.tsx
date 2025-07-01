import { StrictMode, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom"; // ✅ Import BrowserRouter
import App from "./App";
import { FormProvider } from "./context/form-context";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        {" "}
        {/* ✅ Fix is here */}
        <Suspense fallback={<div>Loading...</div>}>
          <FormProvider>
            <App />
          </FormProvider>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
);
