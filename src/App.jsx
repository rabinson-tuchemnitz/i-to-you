import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
  useLocation,
} from 'react-router-dom';

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
import { authUserInfo, isAuthenticated } from './utils/jwt';

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
          path={siteMap.SharedFiles.path}
          element={<SharedFilesPage />}
        />
        <Route path={siteMap.FileDetails.path} element={<FileDetails />} />

        {/* User Routes */}
        <Route element={<RequiredAuth role={'user'} />}>
          <Route
            exact
            path={siteMap.UploadedFiles.path}
            element={<UploadedFilesPage />}
          />
        </Route>

        {/* Admin Routes */}
        <Route element={<RequiredAuth role="admin" />}>
          <Route
            exact
            path={siteMap.PendingRequests.path}
            element={<PendingRequests />}
          />
        </Route>

        {/* Error Routes */}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  );
};

export default App;

function RequiredAuth({ role }) {
  let location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (authUserInfo().role != role) {
    return <h1>You don't have valid role</h1>;
  }

  return <Outlet />;
}
