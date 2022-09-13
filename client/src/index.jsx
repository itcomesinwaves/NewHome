import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './components/App.jsx';
import Profile from './components/Profile.jsx';
import Login from './components/Login.jsx';
import HomeFeed from './components/HomeFeed.jsx';
import Search from './components/Search.jsx';

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="profile" element={<Profile />} />
      <Route path="login" element={<Login />} />
      <Route path="search" element={<Search />} />
      <Route path="home" element={<HomeFeed />} />
    </Routes>
  </BrowserRouter>,
);
