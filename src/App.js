// src/Login.js
import React, { useState } from 'react';
import { supabase } from './supabaseClient';

function Login() {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [currentUser, setCurrentUser] = useState(null); // 用來存儲當前登入的用戶

  const [newName, setNewName] = useState('');
  const [newAccount, setNewAccount] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // 登入處理
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!account || !password) {
      setMessage('請填寫所有欄位');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('account', account)
        .eq('password', password)
        .single();

      if (error || !data) {
        setMessage('帳號或密碼錯誤');
      } else {
        setCurrentUser(data); // 登入成功後，設置當前用戶資料
        setMessage(`登入成功，歡迎 ${data.name}`);
        setNewName(data.name);
        setNewAccount(data.account);
      }
    } catch (error) {
      setMessage(`錯誤: ${error.message}`);
    }
  };

  // 更新用戶資料
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!newName || !newAccount || !newPassword) {
      setMessage('請填寫所有欄位');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('users')
        .update({ name: newName, account: newAccount, password: newPassword })
        .eq('account', currentUser.account);

      if (error) {
        setMessage(`更新失敗: ${error.message}`);
      } else {
        setCurrentUser(data[0]); // 更新成功，設置新的用戶資料
        setMessage('資料更新成功！');
      }
    } catch (error) {
      setMessage(`錯誤: ${error.message}`);
    }
  };

  // 刪除用戶帳號
  const handleDeleteAccount = async () => {
    try {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('account', currentUser.account);

      if (error) {
        setMessage(`刪除失敗: ${error.message}`);
      } else {
        setMessage('帳號已成功刪除');
        setCurrentUser(null); // 刪除成功後，登出用戶
      }
    } catch (error) {
      setMessage(`錯誤: ${error.message}`);
    }
  };

  return (
    <div>
      {!currentUser ? (
        <>
          <h2>登入頁面</h2>
          <form onSubmit={handleLogin}>
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
            <button type="submit">登入</button>
          </form>
        </>
      ) : (
        <div>
          <h2>登入成功</h2>
          <p>當前用戶：{currentUser.name}</p>

          <h3>修改用戶資料</h3>
          <form onSubmit={handleUpdate}>
            <div>
              <label htmlFor="newName">新名稱：</label>
              <input
                type="text"
                id="newName"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="newAccount">新帳號：</label>
              <input
                type="text"
                id="newAccount"
                value={newAccount}
                onChange={(e) => setNewAccount(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="newPassword">新密碼：</label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">更新資料</button>
          </form>

          <h3>刪除帳號</h3>
          <button onClick={handleDeleteAccount}>刪除帳號</button>
        </div>
      )}

      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;
