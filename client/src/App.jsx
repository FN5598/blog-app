import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { AboutUsPage } from './pages/AboutUsPage';
import { ContactUsPage } from './pages/ContactUsPage';
import { BlogPage } from './pages/BlogPage';
import { LastVisitedBlog } from './pages/LastVisitedBlog';
import { LoginPage } from './pages/auth-pages/LoginPage';
import { CreateAccountPage } from './pages/auth-pages/CreateAccountPage';
import { ProtectedRoute } from './components/ProtectedRoutes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<CreateAccountPage />} />

        <Route path='last-visited' 
        element={
          <ProtectedRoute>
            <LastVisitedBlog />
          </ProtectedRoute>
        } />

      </Routes>
    </Router>
  )
}

export default App
