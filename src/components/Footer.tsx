import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { motion } from 'framer-motion'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/introduction' },
    { label: 'Coordinators', path: '/coordinators' },
    { label: 'Events', path: '/events' },
    { label: 'Blog', path: '/blog' },
  ]

  const socialLinks = [
    { icon: FaFacebook, url: '#', label: 'Facebook' },
    { icon: FaInstagram, url: '#', label: 'Instagram' },
    { icon: FaLinkedin, url: '#', label: 'LinkedIn' },
    { icon: FaTwitter, url: '#', label: 'Twitter' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <footer className="bg-gray-50 border-t border-pink-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12"
        >
          {/* Brand */}
          <motion.div variants={itemVariants} className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                <img src="/821BEB28-B6DD-4E85-A1EF-C60BA699FE9B.PNG" alt="Logo" className="w-8 h-8 object-contain" />
              </div>
              <h3 className="text-xl font-bold text-pink-600">ROTARACT MEC</h3>
            </div>
            <p className="text-gray-700 text-sm">
              Service, Leadership, and Fellowship at Model Engineering College, Thrikkakara.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-gray-900 font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-700 hover:text-pink-600 smooth-transition text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants}>
            <h4 className="text-gray-900 font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                <a href="mailto:rotaract@mec.ac.in" className="hover:text-pink-600 smooth-transition">
                  rotaract@mec.ac.in
                </a>
              </li>
              <li>Model Engineering College</li>
              <li>Thrikkakara, Kerala</li>
            </ul>
          </motion.div>

          {/* Social */}
          <motion.div variants={itemVariants}>
            <h4 className="text-gray-900 font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    className="p-2 rounded-lg bg-pink-100 hover:bg-gradient-primary hover:text-white smooth-transition"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-pink-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm">
            <p>&copy; {currentYear} Rotaract Club MEC Thrikkakara. All rights reserved.</p>
            <p className="mt-4 md:mt-0">
              Made with <span className="text-pink-500">💗</span> by Rotaract
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
