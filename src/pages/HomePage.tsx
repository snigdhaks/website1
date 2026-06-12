import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { HiSparkles, HiEye } from 'react-icons/hi'
import { FaLightbulb, FaStar } from 'react-icons/fa'
import { Hero, Section, Button } from '@/components/Common'
import CardGrid, { BlogCard, EventCard, ActivityCard } from '@/components/Cards'
import { blogService } from '@/services/blogService'
import { eventService } from '@/services/eventService'
import { activityService } from '@/services/activityService'
import { useSEO } from '@/hooks'
import { Blog, Event, Activity } from '@/types'

const HomePage = () => {
  const [featuredBlogs, setFeaturedBlogs] = useState<Blog[]>([])
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([])
  const [recentActivities, setRecentActivities] = useState<Activity[]>([])
  const navigate = useNavigate()

  useSEO({
    title: 'Home',
    description: 'Rotaract Club of Model Engineering College, Thrikkakara - Service and Leadership. Join us for meaningful community engagement and volunteer opportunities.',
    keywords: 'Rotaract MEC, Thrikkakara, Community Service, Leadership, Volunteer, Events',
    ogDescription: 'Explore the Rotaract Club MEC Thrikkakara - dedicated to service, leadership, and fellowship.',
  })

  useEffect(() => {
    const loadData = async () => {
      const [blogs, events, activities] = await Promise.all([
        blogService.getLatest(3),
        eventService.getUpcoming(),
        activityService.getRecent(3),
      ])
      setFeaturedBlogs(blogs)
      setUpcomingEvents(events.slice(0, 3))
      setRecentActivities(activities)
    }
    loadData()
  }, [])

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(255,225,240,0.9) 25%, rgba(255,240,248,0.7) 50%, rgba(255,225,240,0.9) 75%, rgba(255,255,255,1) 100%)',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Decorative pink blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-pink-200 rounded-full blur-3xl opacity-25" />
      <div className="absolute bottom-40 right-20 w-96 h-96 bg-pink-300 rounded-full blur-3xl opacity-20" />
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-pink-100 rounded-full blur-3xl opacity-20" />
      {/* Hero Section */}
      <Hero
        title="Rotaract Club MEC Thrikkakara"
        subtitle="Service • Leadership • Fellowship"
        description="Empowering young leaders to make a positive impact through community service and meaningful engagement."
        cta={[
          { label: 'Explore Events', href: '/events' },
          { label: 'Join Us', href: '/membership' },
        ]}
      >
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="mt-12"
        >
          <div className="flex justify-center">
            <HiSparkles className="text-gold-400 text-6xl" />
          </div>
        </motion.div>
      </Hero>

      {/* About Section */}
      <Section
        title="About Our Club"
        subtitle="Making a Difference Since 2015"
        id="about"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: HiEye,
              title: 'Vision',
              description:
                'To be a catalyst for positive change in society through service, leadership, and fellowship.',
            },
            {
              icon: FaLightbulb,
              title: 'Mission',
              description:
                'To develop emerging leaders through service projects and community engagement.',
            },
            {
              icon: FaStar,
              title: 'Impact',
              description:
                'Creating lasting change in our community through dedicated service and collaboration.',
            },
          ].map((item, idx) => {
            const IconComponent = item.icon
            return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="glass-card-dark p-8 text-center"
            >
              <IconComponent className="mx-auto text-5xl text-pink-500 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
              <p className="text-gray-300">{item.description}</p>
            </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Button
            label="Learn More About Us"
            href="/introduction"
            variant="primary"
            size="lg"
          />
        </motion.div>
      </Section>

      {/* Upcoming Events Section */}
      {upcomingEvents.length > 0 && (
        <Section
          title="Upcoming Events"
          subtitle="Join Us in Making a Difference"
          id="events"
        >
          <CardGrid cols={3}>
            {upcomingEvents.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <EventCard
                  title={event.title}
                  date={new Date(event.date).toLocaleDateString()}
                  location={event.location}
                  image={event.image}
                  description={event.description}
                  registrationLink={event.registrationLink}
                />
              </motion.div>
            ))}
          </CardGrid>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Button
              label="View All Events"
              href="/events"
              variant="secondary"
              size="lg"
            />
          </motion.div>
        </Section>
      )}

      {/* Recent Activities Section */}
      {recentActivities.length > 0 && (
        <Section
          title="Our Activities"
          subtitle="Impactful Projects and Initiatives"
          id="activities"
        >
          <CardGrid cols={3}>
            {recentActivities.map((activity) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <ActivityCard
                  title={activity.title}
                  description={activity.description}
                  category={activity.category}
                  image={activity.image}
                  date={
                    activity.date
                      ? new Date(activity.date).toLocaleDateString()
                      : undefined
                  }
                />
              </motion.div>
            ))}
          </CardGrid>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Button
              label="Explore All Activities"
              href="/activities"
              variant="secondary"
              size="lg"
            />
          </motion.div>
        </Section>
      )}

      {/* Featured Blog Section */}
      {featuredBlogs.length > 0 && (
        <Section
          title="Latest Blog Posts"
          subtitle="Insights and Stories from Our Community"
          id="blog"
        >
          <CardGrid cols={3}>
            {featuredBlogs.map((blog) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onClick={() => navigate(`/blog/${blog.id}`)}
              >
                <BlogCard
                  title={blog.title}
                  author={blog.author}
                  date={new Date(blog.date).toLocaleDateString()}
                  coverImage={blog.coverImage}
                  excerpt={blog.excerpt}
                  tags={blog.tags}
                />
              </motion.div>
            ))}
          </CardGrid>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Button
              label="Read More Articles"
              href="/blog"
              variant="secondary"
              size="lg"
            />
          </motion.div>
        </Section>
      )}

      {/* CTA Section */}
      <Section className="bg-gradient-to-r from-primary-900 to-primary-800 bg-opacity-50 rounded-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center py-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Make a <span className="text-gradient">Difference?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join Rotaract Club MEC and become part of a community dedicated to
            service, leadership, and fellowship.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              label="Become a Member"
              href="/membership"
              variant="primary"
              size="lg"
            />
            <Button
              label="Contact Us"
              href="#"
              variant="outline"
              size="lg"
            />
          </div>
        </motion.div>
      </Section>
    </div>
  )
}

export default HomePage
