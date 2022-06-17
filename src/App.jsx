import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import SharedFiles from './pages/SharedFiles';
import Page404 from './pages/404Page';
import { siteMap } from './routes';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path={siteMap.LoginPage.path} element={<LoginPage />} />
        <Route
          exact
          path={siteMap.RegisterPage.path}
          element={<RegisterPage />}
        />
        <Route exact path={siteMap.HomePage.path} element={<HomePage />} />
        <Route
          exact
          path={siteMap.SharedFiles.path}
          element={<SharedFiles />}
        />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  );
};

export default App;
