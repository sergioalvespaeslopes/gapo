import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Corrigindo a importação

import Home from "./pages/Home";
import MapaJammer from "./pages/MapaJammer";
import Drafts from "./pages/Drafts";
import SendEmail from "./pages/SendEmail";
import Spam from "./pages/Spam";
import Starred from "./pages/Starred";
import Trash from "./pages/Trash";
import AllMail from "./pages/AllMail";

export default function App() {
  return (
    <Router> {/* Corrigindo o nome para BrowserRouter */}
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/MapaJammer" exact element={<MapaJammer />} />
        <Route path="/drafts" exact element={<Drafts />} />
        <Route path="/sendemail" exact element={<SendEmail />} />
        <Route path="/spam" exact element={<Spam />} />
        <Route path="/starred" exact element={<Starred />} />
        <Route path="/trash" exact element={<Trash />} />
        <Route path="/allmail" exact element={<AllMail />} />
      </Routes>
    </Router>
  );
}
