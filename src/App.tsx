import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import SplashScreen from './components/SplashScreen'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import IntroductionPage from './pages/IntroductionPage'
import CoordinatorsPage from './pages/CoordinatorsPage'
import ActivitiesPage from './pages/ActivitiesPage'
import EventsPage from './pages/EventsPage'
import BlogPage from './pages/BlogPage'
import BlogDetailPage from './pages/BlogDetailPage'

function App() {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <Router>
      <AnimatePresence>
        {showSplash ? (
          <SplashScreen key="splash" />
        ) : (
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="min-h-screen flex flex-col"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(255,225,240,0.9) 25%, rgba(255,240,248,0.7) 50%, rgba(255,225,240,0.9) 75%, rgba(255,255,255,1) 100%)',
              backgroundAttachment: 'fixed',
            }}
          >
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/introduction" element={<IntroductionPage />} />
                <Route path="/coordinators" element={<CoordinatorsPage />} />
                <Route path="/activities" element={<ActivitiesPage />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:id" element={<BlogDetailPage />} />
              </Routes>
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </Router>
  )
}

export default App
