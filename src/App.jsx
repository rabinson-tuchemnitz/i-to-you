import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/Home';
import SharedFiles from './pages/SharedFiles';
import Page404 from './pages/404';
import { siteMap } from './routes';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import UploadedFilesPage from './pages/UploadedFiles';
import SharedFilesPage from './pages/SharedFiles';
import PendingRequests from './pages/PendingRequests';
import FileDetails from './pages/FileDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route exact path={siteMap.LoginPage.path} element={<LoginPage />} />
        <Route
          exact
          path={siteMap.RegisterPage.path}
          element={<RegisterPage />}
        />

        {/* App Routes */}
        <Route exact path={siteMap.HomePage.path} element={<HomePage />} />
        <Route
          exact
          path={siteMap.UploadedFiles.path}
          element={<UploadedFilesPage />}
        />
        <Route
          exact
          path={siteMap.SharedFiles.path}
          element={<SharedFilesPage />}
        />
        <Route
          exact
          path={siteMap.PendingRequests.path}
          element={<PendingRequests />}
        />
        <Route path={siteMap.FileDetails.path} element={<FileDetails />} />
        {/* Error Routes */}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  );
};

export default App;
