// src/Register.js
import React, { useState } from 'react';
import { supabase } from './supabaseClient'; // 確保你的 supabaseClient 正確配置

function Register() {
  const [name, setName] = useState('');
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // 註冊用戶
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !account || !password) {
      setMessage('請填寫所有欄位');
      return;
    }

    try {
      // 插入用戶資料到 users 表（密碼明文存儲）
      const { data, error } = await supabase
        .from('users')
        .insert([
          {
            name: name,
            account: account,
            password: password,  // 不加密密碼
          },
        ]);

      if (error) {
        setMessage(`註冊失敗: ${error.message}`);
      } else {
        setMessage('註冊成功！');
      }
    } catch (error) {
      setMessage(`錯誤: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>註冊新帳號</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="name">名稱：</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="account">帳號：</label>
          <input
            type="text"
            id="account"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">密碼：</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">註冊</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Register;
