import './styles/style.scss';
import React from 'react';
import { BrowserRouter } from "react-router-dom";

import Header from './shared-features/header';
import Footer from './shared-features/footer';
import Sidebar from './shared-features/sidebar';

import Content from './features/content';



const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Sidebar />
      <Content />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
