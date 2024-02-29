import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeLayout from "./layouts/HomeLayout";
import DrivesPage from "./pages/DrivesPage";
import SettingsPage from "./pages/SettingsPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<DrivesPage/>} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes