import { motion } from 'framer-motion'
import React from 'react'

interface CardGridProps {
  children: React.ReactNode
  cols?: number
}

const CardGrid: React.FC<CardGridProps> = ({ children, cols = 3 }) => {
  const colsClass = {
    1: 'md:grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
  }

  return (
    <div
      className={`grid grid-cols-1 ${colsClass[cols as keyof typeof colsClass]} gap-6 md:gap-8`}
    >
      {children}
    </div>
  )
}

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  onClick?: () => void
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  hover = true,
  onClick,
}) => {
  return (
    <motion.div
      whileHover={hover ? { y: -8 } : {}}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className={`glass-card-dark p-6 md:p-8 ${hover ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </motion.div>
  )
}

export const CoordinatorCard: React.FC<{
  image?: string
  name: string
  role: string
  department?: string
  description?: string
  social?: { facebook?: string; instagram?: string; linkedin?: string }
}> = ({ image, name, role, department, description, social }) => {
  return (
    <GlassCard>
      <div className="text-center">
        {image && (
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="mb-4 overflow-hidden rounded-lg"
          >
            <img
              src={image}
              alt={name}
              className="w-full h-48 object-cover"
            />
          </motion.div>
        )}
        <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
        <p className="text-gold-400 font-semibold mb-1">{role}</p>
        {department && (
          <p className="text-sm text-gray-400 mb-3">{department}</p>
        )}
        {description && (
          <p className="text-gray-300 text-sm mb-4">{description}</p>
        )}
        {social && (
          <div className="flex justify-center gap-3 pt-4 border-t border-white border-opacity-10">
            {social.facebook && (
              <a
                href={social.facebook}
                className="text-gray-400 hover:text-gold-400 smooth-transition"
              >
                f
              </a>
            )}
            {social.instagram && (
              <a
                href={social.instagram}
                className="text-gray-400 hover:text-gold-400 smooth-transition"
              >
                ig
              </a>
            )}
            {social.linkedin && (
              <a
                href={social.linkedin}
                className="text-gray-400 hover:text-gold-400 smooth-transition"
              >
                in
              </a>
            )}
          </div>
        )}
      </div>
    </GlassCard>
  )
}

export const EventCard: React.FC<{
  title: string
  date: string
  location?: string
  image?: string
  description?: string
  registrationLink?: string
}> = ({ title, date, location, image, description, registrationLink }) => {
  return (
    <GlassCard>
      {image && (
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="mb-4 overflow-hidden rounded-lg"
        >
          <img src={image} alt={title} className="w-full h-40 object-cover" />
        </motion.div>
      )}
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <div className="space-y-2 mb-4">
        <p className="text-sm text-gold-400 font-medium">{date}</p>
        {location && <p className="text-sm text-gray-400">{location}</p>}
      </div>
      {description && (
        <p className="text-gray-300 text-sm mb-4">{description}</p>
      )}
      {registrationLink && (
        <motion.a
          whileHover={{ scale: 1.05 }}
          href={registrationLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 bg-gradient-gold text-dark-950 font-semibold rounded-lg hover:shadow-lg smooth-transition"
        >
          Register Now
        </motion.a>
      )}
    </GlassCard>
  )
}

export const BlogCard: React.FC<{
  title: string
  author: string
  date: string
  coverImage?: string
  excerpt?: string
  tags?: string[]
  onClick?: () => void
}> = ({ title, author, date, coverImage, excerpt, tags, onClick }) => {
  return (
    <GlassCard onClick={onClick} hover={!!onClick}>
      {coverImage && (
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="mb-4 overflow-hidden rounded-lg h-40"
        >
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover"
          />
        </motion.div>
      )}
      <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
        {title}
      </h3>
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
        <span>{author}</span>
        <span>•</span>
        <span>{date}</span>
      </div>
      {excerpt && (
        <p className="text-gray-300 text-sm mb-4 line-clamp-3">{excerpt}</p>
      )}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 bg-primary-600 bg-opacity-20 text-primary-300 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </GlassCard>
  )
}

export const ActivityCard: React.FC<{
  title: string
  description: string
  date?: string
  category?: string
  image?: string
}> = ({ title, description, date, category, image }) => {
  return (
    <GlassCard>
      {image && (
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="mb-4 overflow-hidden rounded-lg h-40"
        >
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </motion.div>
      )}
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      {category && (
        <span className="inline-block px-3 py-1 bg-gold-500 bg-opacity-20 text-gold-400 text-xs font-semibold rounded-full mb-3">
          {category}
        </span>
      )}
      <p className="text-gray-300 text-sm mb-3">{description}</p>
      {date && <p className="text-xs text-gray-500">{date}</p>}
    </GlassCard>
  )
}

export default CardGrid
