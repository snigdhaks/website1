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
    { label: 'Coordinators', path: '/coordinators' },
    { label: 'Membership', path: '/membership' },
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
    <nav className="fixed top-0 left-0 right-0 z-40 glass-card-dark border-b border-white border-opacity-10 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center">
              <span className="text-dark-950 font-bold text-lg">R</span>
            </div>
            <span className="hidden sm:block text-xl font-bold text-gradient">
              ROTARACT
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <button
                  className={`px-4 py-2 rounded-lg smooth-transition relative font-medium text-sm ${
                    isActive(item.path)
                      ? 'text-gold-400'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive(item.path) && (
                    <motion.div
                      layoutId="underline"
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-gold rounded-t-lg"
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
            className="md:hidden p-2 rounded-lg hover:bg-dark-800 smooth-transition"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <HiX className="w-6 h-6 text-gold-400" />
            ) : (
              <HiMenu className="w-6 h-6 text-gold-400" />
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
            className="md:hidden glass-card-dark border-t border-white border-opacity-10"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <motion.div key={item.path} variants={itemVariants}>
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-lg smooth-transition font-medium ${
                      isActive(item.path)
                        ? 'bg-primary-600 bg-opacity-20 text-gold-400 border border-gold-500 border-opacity-30'
                        : 'text-gray-300 hover:bg-dark-800 hover:text-white'
                    }`}
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
