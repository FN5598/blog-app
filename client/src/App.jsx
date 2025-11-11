import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ContactUsPage } from './pages/ContactUsPage';
import { BlogsPage } from './pages/blog-pages/BlogsPage';
import { BlogPage } from './pages/blog-pages/BlogPage';
import { LoginPage } from './pages/auth-pages/LoginPage';
import { CreateAccountPage } from './pages/auth-pages/CreateAccountPage';
import { ProtectedRoute } from './components/main/ProtectedRoutes';
import { CreateBlogPage } from './pages/blog-pages/CreateBlogPage';
import { BlogAuthorPage } from './pages/blog-pages/BlogAuthorPage';
import { ToastContainer } from 'react-toastify';
import { ScrollToTopComponent } from './components/main/ScrollToTopComponent';

function App() {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Router>
        <ScrollToTopComponent />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact-us" element={<ContactUsPage />} />

          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blog/:genre/:id" element={<BlogPage />} />
          <Route path="/author/:authorUsername/:authorId" element={<BlogAuthorPage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<CreateAccountPage />} />

          <Route path='create-blog'
            element={
              <ProtectedRoute>
                <CreateBlogPage />
              </ProtectedRoute>
            } />

        </Routes>
      </Router>
    </>

  )
}

export default App
