import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const SplashScreen = () => {
  const [showText, setShowText] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 800)
    return () => clearTimeout(timer)
  }, [])

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.8 } },
  }

  const logoVariants = {
    initial: { scale: 0, rotate: -180, opacity: 0 },
    animate: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: { duration: 1, ease: 'easeOut' },
    },
  }

  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  const letterVariants = {
    initial: { opacity: 0, y: 20 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.6,
      },
    }),
  }

  const clubName = 'ROTARACT CLUB'
  const tagline = 'Model Engineering College, Thrikkakara'

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-white via-pink-50 to-white z-50 overflow-hidden"
    >
      {/* Background animated circles */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 2 }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-pink-300 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-200 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 text-center px-4">
        {/* Logo */}
        <motion.div variants={logoVariants} className="mb-8 flex justify-center">
          <img 
            src="/821BEB28-B6DD-4E85-A1EF-C60BA699FE9B.PNG" 
            alt="Rotaract Club MEC Icon" 
            className="w-32 h-32 object-contain"
          />
        </motion.div>

        {/* Club Name */}
        <div className="mb-4 h-20 flex items-center justify-center">
          {showText && (
            <motion.div className="flex gap-1 justify-center flex-wrap">
              {clubName.split('').map((letter, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterVariants}
                  initial="initial"
                  animate="animate"
                  className="text-4xl md:text-5xl font-bold text-pink-600 font-space-grotesk"
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>
          )}
        </div>

        {/* Tagline */}
        {showText && (
          <motion.div variants={textVariants} className="mb-12">
            <p className="text-xl md:text-2xl text-gray-700 font-light">
              {tagline}
            </p>
          </motion.div>
        )}

        {/* Loading indicator */}
        {showText && (
          <motion.div
            className="flex gap-2 justify-center mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 rounded-full bg-pink-500"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>
        )}

        {/* Subtitle text */}
        <motion.p
          className="text-sm text-gray-600 mt-12 font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
        >
          Service • Leadership • Fellowship
        </motion.p>
      </div>
    </motion.div>
  )
}

export default SplashScreen
