import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Footer = () => {
  return (
    <footer className="text-center text-white fixed-bottom" style="background-color: #21081a;">
  
    <div className="container p-4"></div>
  
    <div className="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);">
      © 2020 Copyright:
      <a className="text-white" href="https://mdbootstrap.com/">MDBootstrap.com</a>
    </div>
   
  </footer>
  );
};