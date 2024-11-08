import "@/App.css";
// import HomeListView from "@/pages/views/list";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense } from "react";
import { lazy } from "react";
import PageNotFound from "@/pages/404";

// import CountryDetailedInfo from "@/pages/views/countryDetails";

const LazyDefaultLayout = lazy(() => import("@/layouts/default"));
const LazyValidationView = lazy(() => import("@/pages/validation/views/index"));

const LazyAboutView = lazy(() => import("@/pages/about/views/about"));
const LazyContactView = lazy(() => import("@/pages/contact/views/index"));
const LazyBookingView = lazy(() => import("@/pages/booking/views/index"));
const LazyHomeListView = lazy(() => import("@/pages/views/list/index"));
const LazyHomeDetailedInfo = lazy(
  () => import("@/pages/views/countryDetails/index"),
);
const LazeLangInfo = lazy(() => import("@/pages/language/views/lang"));

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/:lang" element={<LazyDefaultLayout />}>
            <Route path="home" element={<LazyHomeListView />}></Route>

            <Route path="home/:id" element={<LazyHomeDetailedInfo />} />

            <Route path="booking" element={<LazyBookingView />} />

            <Route path="about" element={<LazyAboutView />} />
            <Route path="contact" element={<LazyContactView />} />
            <Route path="validation" element={<LazyValidationView />} />
            <Route path="lang" element={<LazeLangInfo />} />
          </Route>
          <Route path="/" element={<Navigate to="ka/home" />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

App.displayName = "App component";

export default App;
