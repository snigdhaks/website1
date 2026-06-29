import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/introduction' },
    { label: 'Members', path: '/coordinators' },
    { label: 'Activities', path: '/activities' },
    { label: 'Events', path: '/events' },
    { label: 'Blog', path: '/blog' },
  ]

  const isActive = (path: string) => location.pathname === path

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 border-b border-white/20 shadow-soft backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100">
              <img src="/821BEB28-B6DD-4E85-A1EF-C60BA699FE9B.PNG" alt="Logo" className="w-11 h-11 object-contain" />
            </div>
            <span className="hidden sm:block text-2xl font-bold text-navy" style={{ fontFamily: "'Inter', sans-serif" }}>
              Rotaract MEC
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <button
                  className={`px-4 py-2 rounded-lg smooth-transition relative font-semibold text-sm ${isActive(item.path)
                    ? 'text-cranberry'
                    : 'text-textgray hover:text-cranberry'
                    }`}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {item.label}
                  {isActive(item.path) && (
                    <motion.div
                      layoutId="underline"
                      className="absolute bottom-0 left-0 right-0 h-1 bg-cranberry rounded-t-lg"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-blush smooth-transition text-navy"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <HiX className="w-6 h-6" />
            ) : (
              <HiMenu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="md:hidden bg-white/95 border-t border-gray-100 shadow-lg"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <motion.div key={item.path} variants={itemVariants}>
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-lg smooth-transition font-semibold ${isActive(item.path)
                      ? 'bg-blush text-cranberry'
                      : 'text-textgray hover:bg-blush hover:text-cranberry'
                      }`}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
