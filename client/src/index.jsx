import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './components/App.jsx';
import Profile from './components/Profile.jsx';
import Login from './components/Login.jsx';
import AdoptionFeed from './components/AdoptionFeed.jsx';
import Search from './components/Search.jsx';
import PostForms from './components/PostForms.jsx';
import PetView from './components/PetView.jsx';

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="profile" element={<Profile />} />
      <Route path="login" element={<Login />} />
      <Route path="search" element={<Search />} />
      <Route path="home" element={<AdoptionFeed />} />
      <Route path="postforms" element={<PostForms />} />
      <Route path="petview" element={<PetView />} />
    </Routes>
  </BrowserRouter>,
);
