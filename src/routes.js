export const siteMap = {
  HomePage: {
    title: 'Home',
    path: '/',
    description: 'iToYou home page',
  },
  SharedFiles: {
    title: 'Shared Files',
    path: '/shared-files',
    description: 'Transferred files page',
  },
  UploadedFiles: {
    title: 'Uploaded Files',
    path: '/uploaded-files',
    description: 'Users uploaded files',
  },
  PendingRequests: {
    title: 'Pending Requests',
    path: '/pending-requests',
    description: 'Pending file requests',
  },
  FileDetails: {
    title: 'Details',
    path: '/file/:file_id',
    description: 'Details of file',
  },

  /**
   * Auth Routes
   */

  LoginPage: {
    title: 'Login',
    path: '/login',
    description: 'Login page',
  },
  RegisterPage: {
    title: 'Register',
    path: '/register',
    description: 'Register page',
  },
};
