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
  const baseClasses = 'font-semibold smooth-transition rounded-[14px]'

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const variantClasses = {
    primary: 'bg-gradient-to-r from-cranberry to-roseaccent text-white hover:shadow-premium',
    secondary: 'bg-roseaccent text-white hover:bg-roseaccent/90',
    outline: 'border-2 border-cranberry text-cranberry hover:bg-cranberry hover:text-white',
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
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-sans text-navy">
              <span className="text-gradient">{title}</span>
            </h2>
          )}
          {subtitle && (
            <p className="text-textgray text-lg max-w-2xl mx-auto">{subtitle}</p>
          )}
        </motion.div>
      )}
      {children}
    </section>
  )
}

interface HeroProps {
  title: React.ReactNode
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
        background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF6FA 100%)',
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Subtle Rotaract gear watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <svg
          className="w-[450px] h-[450px] md:w-[650px] md:h-[650px] text-roseaccent opacity-[0.03]"
          viewBox="0 0 100 100"
          fill="currentColor"
        >
          <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="8" />
          <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="6" />
          <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="6" />
          <line x1="22" y1="22" x2="78" y2="78" stroke="currentColor" strokeWidth="6" />
          <line x1="22" y1="78" x2="78" y2="22" stroke="currentColor" strokeWidth="6" />
          <circle cx="50" cy="50" r="12" fill="white" stroke="currentColor" strokeWidth="4" />
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i * 360) / 16;
            return (
              <rect
                key={i}
                x="46"
                y="6"
                width="8"
                height="8"
                rx="2"
                transform={`rotate(${angle} 50 50)`}
                fill="currentColor"
              />
            )
          })}
        </svg>
      </div>

      {/* Decorative blobs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-blush rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-40 right-20 w-96 h-96 bg-roseaccent rounded-full blur-3xl opacity-[0.05]" />
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-purpleaccent rounded-full blur-3xl opacity-[0.03]" />

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
              className="text-roseaccent font-semibold text-lg md:text-xl mb-4"
            >
              {subtitle}
            </motion.p>
          )}

          <motion.h1
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold font-serif mb-6 leading-tight text-navy"
          >
            {title}
          </motion.h1>

          {description && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-textgray text-lg md:text-xl mb-8 max-w-2xl mx-auto"
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
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-textgray opacity-60"
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
