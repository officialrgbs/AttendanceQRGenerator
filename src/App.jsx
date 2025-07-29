import React from "react"
import { Routes, Route } from "react-router-dom"

import FormPage from "./pages/FormPage"
import ProfilePage from "./pages/ProfilePage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<FormPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  )
}

export default App
