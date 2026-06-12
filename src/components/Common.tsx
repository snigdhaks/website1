import { motion } from 'framer-motion'
import React from 'react'

interface ButtonProps {
  label: string
  onClick?: () => void
  href?: string
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  disabled?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
}) => {
  const baseClasses = 'font-semibold smooth-transition rounded-lg'

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const variantClasses = {
    primary: 'bg-gradient-primary text-white hover:shadow-lg hover:shadow-pink-500/50',
    secondary: 'bg-pink-500 text-white hover:bg-pink-600',
    outline: 'border-2 border-pink-500 text-pink-600 hover:bg-pink-500 hover:text-white',
  }

  const content = (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
    >
      {label}
    </motion.button>
  )

  if (href) {
    return <a href={href}>{content}</a>
  }

  return content
}

interface SectionProps {
  title?: string
  subtitle?: string
  children: React.ReactNode
  id?: string
  className?: string
}

export const Section: React.FC<SectionProps> = ({
  title,
  subtitle,
  children,
  id,
  className = '',
}) => {
  return (
    <section
      id={id}
      className={`py-16 md:py-24 px-4 max-w-7xl mx-auto ${className}`}
    >
      {(title || subtitle) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          {title && (
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-gradient">{title}</span>
            </h2>
          )}
          {subtitle && (
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">{subtitle}</p>
          )}
        </motion.div>
      )}
      {children}
    </section>
  )
}

interface HeroProps {
  title: string
  subtitle?: string
  description?: string
  backgroundImage?: string
  cta?: { label: string; onClick?: () => void; href?: string }[]
  children?: React.ReactNode
}

export const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  description,
  backgroundImage,
  cta,
  children,
}) => {
  return (
    <div
      className="relative min-h-screen flex items-center justify-center pt-20 md:pt-24 px-4 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(255,240,245,0.8) 50%, rgba(255,255,255,1) 100%)',
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Decorative pink blobs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-pink-200 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-40 right-20 w-96 h-96 bg-pink-300 rounded-full blur-3xl opacity-15" />
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-pink-100 rounded-full blur-3xl opacity-15" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-pink-500 font-semibold text-lg md:text-xl mb-4"
            >
              {subtitle}
            </motion.p>
          )}

          <motion.h1
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="text-gradient">{title}</span>
          </motion.h1>

          {description && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-600 text-lg md:text-xl mb-8 max-w-2xl mx-auto"
            >
              {description}
            </motion.p>
          )}

          {cta && cta.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
            >
              {cta.map((btn, idx) => (
                <Button
                  key={idx}
                  label={btn.label}
                  onClick={btn.onClick}
                  href={btn.href}
                  variant={idx === 0 ? 'primary' : 'outline'}
                  size="lg"
                />
              ))}
            </motion.div>
          )}
        </motion.div>

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            {children}
          </motion.div>
        )}
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>
    </div>
  )
}

export const AnimatedCounter: React.FC<{
  from: number
  to: number
  duration?: number
  suffix?: string
  prefix?: string
}> = ({ from, to, duration = 2, suffix = '', prefix = '' }) => {
  const [count, setCount] = React.useState(from)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= to) {
          clearInterval(interval)
          return to
        }
        return prev + Math.ceil((to - from) / (duration * 60))
      })
    }, 1000 / 60)

    return () => clearInterval(interval)
  }, [from, to, duration])

  return (
    <span>
      {prefix}
      {count}
      {suffix}
    </span>
  )
}
