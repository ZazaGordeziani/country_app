import "@/App.css";
// import HomeListView from "@/pages/views/list";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { lazy } from "react";
import PageNotFound from "@/pages/404";

// import CountryDetailedInfo from "@/pages/views/countryDetails";

const LazyDefaultLayout = lazy(() => import("@/layouts/default"));
const LazyAboutView = lazy(() => import("@/pages/about/views/about"));
const LazyContactView = lazy(() => import("@/pages/contact/views/index"));
const LazyBookingView = lazy(() => import("@/pages/booking/views/index"));
const LazyHomeListView = lazy(() => import("@/pages/views/list/index"));
const LazeHomeDetailedInfo = lazy(
  () => import("@/pages/views/countryDetails/index")
);

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route element={<LazyDefaultLayout />}>
              <Route path="/" element={<div>landing...</div>} />

              <Route path="home" element={<LazyHomeListView />}></Route>

              <Route path="home/:id" element={<LazeHomeDetailedInfo />} />
              <Route path="booking" element={<LazyBookingView />} />

              <Route path="about" element={<LazyAboutView />} />
              <Route path="contact" element={<LazyContactView />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
};

App.displayName = "App component";

export default App;
