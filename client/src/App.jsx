import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { AboutUsPage } from './pages/AboutUsPage';
import { ContactUsPage } from './pages/ContactUsPage';
import { BlogsPage } from './pages/blog-pages/BlogsPage';
import { BlogPage } from './pages/blog-pages/BlogPage';
import { LastVisitedBlogPage } from './pages/blog-pages/LastVisitedBlogPage';
import { LoginPage } from './pages/auth-pages/LoginPage';
import { CreateAccountPage } from './pages/auth-pages/CreateAccountPage';
import { ProtectedRoute } from './components/main/ProtectedRoutes';
import { CreateBlogPage } from './pages/blog-pages/CreateBlogPage';
import { BlogAuthorPage } from './pages/blog-pages/BlogAuthorPage';
import { ToastContainer } from 'react-toastify';

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
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/contact-us" element={<ContactUsPage />} />

          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blog/:genre/:id" element={<BlogPage />} />
          <Route path="/author/:authorUsername/:authorId" element={<BlogAuthorPage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<CreateAccountPage />} />

          <Route path='last-visited'
            element={
              <ProtectedRoute>
                <LastVisitedBlogPage />
              </ProtectedRoute>
            } />

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
