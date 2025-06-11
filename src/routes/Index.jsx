import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import MainLayout from "../layouts/MainLayout";

export default function Router() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </MainLayout>
  );
}
