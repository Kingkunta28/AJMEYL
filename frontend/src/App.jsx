import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ToursPage from './pages/ToursPage'
import TourDetailPage from './pages/TourDetailPage'
import BookingPage from './pages/BookingPage'
import TransfersPage from './pages/TransfersPage'
import GalleryPage from './pages/GalleryPage'
import ContactPage from './pages/ContactPage'

function App() {
  const location = useLocation()

  return (
    <>
      <ScrollToTop />
      <div className="site-shell">
        <Navbar />
        <main>
          <div className="page-transition-shell" key={location.pathname}>
            <Routes location={location}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/booking/:tourId" element={<BookingPage />} />
              <Route path="/tours/:tourId" element={<TourDetailPage />} />
              <Route path="/tours" element={<ToursPage />} />
              <Route path="/transfers" element={<TransfersPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App
