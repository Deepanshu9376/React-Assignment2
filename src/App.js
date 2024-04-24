// import logo from './logo.svg';
import NavbarHead from "./Components/NavbarHead";
import "./App.css";
import Create from "./Users/Create";
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import View from "./Users/View";
// import View2 from "./Users/View2";
const LazyCreate = React.lazy(() => import("./Users/Create3"));
const LazyView = React.lazy(() => import("./Users/View2"));

function App() {
  return (
    <>
      <BrowserRouter>
        <NavbarHead/>
        <Routes>
          <Route
            path="/"
            element={
              <React.Suspense fallback={<>..Loading create</>} >
                <LazyCreate />
              </React.Suspense>
            }
          />
          <Route path="/" element={<Navigate to="/users/create" />} />
          <Route  path="/view"
            element={
              <React.Suspense fallback={<>..Loading view</>} >
                <LazyView />
              </React.Suspense>
            }
           />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
