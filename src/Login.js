import React, { useState } from 'react';
import { supabase } from './supabaseClient';

function Login() {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [message, setMessage] = useState('');
  
  // 用來存儲用戶的資訊
  const [newName, setNewName] = useState('');
  const [newAccount, setNewAccount] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // 登入功能
  const handleLogin = async (e) => {
    e.preventDefault();
    
    // 假設我們在 supabase 的 users 表中查詢帳號和密碼
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('account', account)
      .eq('password', password)
      .single();

    if (error) {
      setMessage('登入失敗，請檢查帳號和密碼');
    } else {
      setMessage(`登入成功，歡迎 ${data.name}`);
      setCurrentUser(data);  // 設置當前使用者
    }
  };

  // 更新用戶資料
  const handleUpdate = async (e) => {
    e.preventDefault();
    
    if (currentUser) {
      // 更新用戶資料
      const { error } = await supabase
        .from('users')
        .update({ name: newName, account: newAccount, password: newPassword })
        .eq('account', currentUser.account);
        
      if (error) {
        setMessage('更新資料失敗');
      } else {
        setCurrentUser({ ...currentUser, name: newName, account: newAccount, password: newPassword });
        setMessage('資料更新成功');
      }
    }
  };

  // 刪除帳號
  const handleDelete = async () => {
    if (currentUser) {
      // 刪除用戶資料
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('account', currentUser.account);

      if (error) {
        setMessage('刪除帳號失敗');
      } else {
        setMessage('帳號已刪除');
        setCurrentUser(null);  // 清除當前用戶資料
      }
    }
  };

  return (
    <div>
      {!currentUser ? (
        <div>
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
        </div>
      ) : (
        <div>
          <h3>當前使用者：{currentUser.name}</h3>
          <div>
            <h4>修改用戶資料</h4>
            <form onSubmit={handleUpdate}>
              <div>
                <label htmlFor="newName">新名稱：</label>
                <input
                  type="text"
                  id="newName"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="新名稱"
                />
              </div>
              <div>
                <label htmlFor="newAccount">新帳號：</label>
                <input
                  type="text"
                  id="newAccount"
                  value={newAccount}
                  onChange={(e) => setNewAccount(e.target.value)}
                  placeholder="新帳號"
                />
              </div>
              <div>
                <label htmlFor="newPassword">新密碼：</label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="新密碼"
                />
              </div>
              <button type="submit">更新資料</button>
            </form>
          </div>
          <button onClick={handleDelete}>刪除帳號</button>
        </div>
      )}
      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;
