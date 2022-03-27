import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './components/auth/LoginPage/LoginPage';
import RequireAuth from './components/auth/RequireAuth';
import NewAdvertPage from './components/adverts/NewAdvertPage/NewAdvertPage';
import AdvertPage from './components/adverts/AdvertPage/AdvertPage';
import AdvertsPage from './components/adverts/AdvertsPage/AdvertsPage';
import { AuthContextProvider } from './components/auth/context';
import Layout from './components/layout/Layout';

function App({ isInitiallyLogged }) {
  const [isLogged, setIsLogged] = useState(isInitiallyLogged);

  const handleLogin = () => {
    setIsLogged(true);
  };

  const handleLogout = () => {
    setIsLogged(false);
  };

  return (
    <div className="App">
      <AuthContextProvider value={{ isLogged, handleLogin, handleLogout }}>
        <Routes>
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/adverts" element={<Layout />}>
            <Route index element={<AdvertsPage />} />
            <Route path=":advertId" element={<AdvertPage />} />
            <Route
              path="/adverts/new"
              element={
                <RequireAuth>
                  <NewAdvertPage />
                </RequireAuth>
              }
            />
          </Route>
          <Route path="/" element={<Navigate to="/adverts" />} />
          <Route path="/404" element={<div>404 | Not Found Page</div>} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
