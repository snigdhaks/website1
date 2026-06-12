import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import PageHeader from '@/components/PageHeader'
import { Section } from '@/components/Common'
import CardGrid, { EventCard } from '@/components/Cards'
import { eventService } from '@/services/eventService'
import { useSEO } from '@/hooks'
import { Event } from '@/types'

const EventsPage = () => {
  useSEO({
    title: 'Events',
    description: 'Upcoming and past events by Rotaract Club MEC Thrikkakara. Join us for community service and leadership development.',
    keywords: 'Events, Upcoming Events, Rotaract MEC, Community',
    ogDescription: 'Check out the upcoming events hosted by Rotaract Club MEC Thrikkakara.',
  })
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([])
  const [pastEvents, setPastEvents] = useState<Event[]>([])
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const [upcoming, past] = await Promise.all([
          eventService.getUpcoming(),
          eventService.getPast(),
        ])
        setUpcomingEvents(upcoming)
        setPastEvents(past)
      } catch (error) {
        console.error('Error fetching events:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  const displayEvents = activeTab === 'upcoming' ? upcomingEvents : pastEvents
  const tabVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen pt-20">
      <PageHeader
        title="Events"
        subtitle="Join Our Community"
        description="Explore our upcoming events and celebrate our past milestones"
      />

      {/* Tab Navigation */}
      <Section id="events">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex gap-4 justify-center mb-12"
        >
          {['upcoming', 'past'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as 'upcoming' | 'past')}
              className={`px-8 py-3 font-semibold rounded-lg smooth-transition text-lg ${
                activeTab === tab
                  ? 'bg-gradient-gold text-dark-950 shadow-lg shadow-gold-500/50'
                  : 'glass-card-dark text-gold-400 hover:text-gold-300'
              }`}
            >
              {tab === 'upcoming' ? 'Upcoming Events' : 'Past Events'}
            </button>
          ))}
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin">
              <div className="w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full" />
            </div>
            <p className="text-gray-400 mt-4">Loading events...</p>
          </div>
        ) : displayEvents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              No {activeTab} events found
            </p>
          </div>
        ) : (
          <motion.div
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            key={activeTab}
          >
            <CardGrid cols={3}>
              {displayEvents.map((event) => (
                <motion.div key={event.id} variants={itemVariants}>
                  <EventCard
                    title={event.title}
                    date={new Date(event.date).toLocaleDateString()}
                    location={event.location}
                    image={event.image}
                    description={event.description}
                    registrationLink={
                      activeTab === 'upcoming' ? event.registrationLink : undefined
                    }
                  />
                </motion.div>
              ))}
            </CardGrid>
          </motion.div>
        )}
      </Section>

      {/* Calendar View Section */}
      <Section title="Event Calendar" id="calendar">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="glass-card-dark p-8"
        >
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-white mb-4">
              Monthly Overview
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-dark-800 rounded-lg border border-white border-opacity-10">
                <h4 className="text-lg font-semibold text-gold-400 mb-4">
                  📅 Upcoming Events
                </h4>
                <p className="text-4xl font-bold text-white mb-2">
                  {upcomingEvents.length}
                </p>
                <p className="text-gray-400">events planned</p>
              </div>
              <div className="p-6 bg-dark-800 rounded-lg border border-white border-opacity-10">
                <h4 className="text-lg font-semibold text-gold-400 mb-4">
                  📊 Past Events
                </h4>
                <p className="text-4xl font-bold text-white mb-2">
                  {pastEvents.length}
                </p>
                <p className="text-gray-400">events completed</p>
              </div>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* Event Categories */}
      <Section title="Event Categories" id="categories">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: 'Summit', icon: '🏔️', color: 'from-blue-500' },
            { name: 'Workshop', icon: '🔧', color: 'from-purple-500' },
            { name: 'Service', icon: '❤️', color: 'from-red-500' },
            { name: 'Fundraiser', icon: '💰', color: 'from-green-500' },
          ].map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card-dark p-6 text-center hover:shadow-glow smooth-transition"
            >
              <div className="text-4xl mb-3">{category.icon}</div>
              <h4 className="text-lg font-bold text-white">{category.name}</h4>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Featured Events */}
      {upcomingEvents.length > 0 && (
        <Section
          title="Featured Event"
          id="featured"
          className="bg-gradient-to-r from-primary-900 to-primary-800 bg-opacity-50 rounded-2xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card-dark p-8 md:p-12 max-w-3xl mx-auto"
          >
            {upcomingEvents[0].image && (
              <div className="mb-8 overflow-hidden rounded-lg h-64 md:h-80">
                <img
                  src={upcomingEvents[0].image}
                  alt={upcomingEvents[0].title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {upcomingEvents[0].title}
            </h3>
            <div className="space-y-3 mb-6 text-gray-300">
              <p className="flex items-center gap-2">
                <span className="text-gold-400">📅</span>
                {new Date(upcomingEvents[0].date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              {upcomingEvents[0].time && (
                <p className="flex items-center gap-2">
                  <span className="text-gold-400">🕐</span>
                  {upcomingEvents[0].time}
                </p>
              )}
              {upcomingEvents[0].location && (
                <p className="flex items-center gap-2">
                  <span className="text-gold-400">📍</span>
                  {upcomingEvents[0].location}
                </p>
              )}
            </div>
            {upcomingEvents[0].description && (
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                {upcomingEvents[0].description}
              </p>
            )}
            {upcomingEvents[0].registrationLink && (
              <a
                href={upcomingEvents[0].registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 bg-gradient-gold text-dark-950 font-semibold rounded-lg hover:shadow-lg hover:shadow-gold-500/50 smooth-transition"
              >
                Register Now
              </a>
            )}
          </motion.div>
        </Section>
      )}

      {/* Newsletter Section */}
      <Section className="bg-gradient-to-r from-gold-500 via-gold-600 to-primary-600 bg-opacity-20 rounded-2xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center py-12"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Don't Miss Any Events
          </h3>
          <p className="text-lg text-gray-300 mb-8">
            Subscribe to get updates on our latest events
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-dark-800 border border-white border-opacity-20 text-white placeholder-gray-500 focus:outline-none focus:border-gold-400"
            />
            <button className="px-6 py-3 bg-gradient-gold text-dark-950 font-semibold rounded-lg hover:shadow-lg hover:shadow-gold-500/50 smooth-transition">
              Subscribe
            </button>
          </div>
        </motion.div>
      </Section>
    </div>
  )
}

export default EventsPage
