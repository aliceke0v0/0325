import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import Navbar from './Navbar';
import Register from './Register';
import reportWebVitals from './reportWebVitals';
import Login from './Login';  // 確保導入了 Login 組件


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
      <React.StrictMode>
        {/* 將導航條顯示在所有頁面上 */}
        <Navbar />

        <div className="App">
          <h1>歡迎來到我的應用！</h1>
          <Routes>
            {/* 定義不同的路由 */}
            <Route path="/" element={<App/>} /> 
            <Route path="/app" element={<h2>首頁</h2>} /> {/* 首頁 */}
            <Route path="/register" element={<Register />} /> {/* 註冊頁面 */}
            <Route path="/login" element={<Login />} /> {/* 登入頁面 */}
          </Routes>
        </div>
      </React.StrictMode>
    </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
