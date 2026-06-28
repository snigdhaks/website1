import { useState, useEffect } from 'react'
import { HiDocumentText, HiTag, HiUsers } from 'react-icons/hi'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import PageHeader from '@/components/PageHeader'
import { Section } from '@/components/Common'
import CardGrid, { BlogCard } from '@/components/Cards'
import { blogService } from '@/services/blogService'
import { subscriberService } from '@/services/subscriberService'
import { useSEO } from '@/hooks'
import { Blog } from '@/types'

const BlogPage = () => {
  useSEO({
    title: 'Blog',
    description: 'Read articles and updates from Rotaract Club MEC Thrikkakara. Stories, insights, and reflections on community service.',
    keywords: 'Blog, Articles, Updates, Rotaract Stories',
    ogDescription: 'Explore articles and stories from Rotaract Club MEC Thrikkakara.',
  })
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // Subscriber system states
  const [subscriberEmail, setSubscriberEmail] = useState('')
  const [submittingSubscriber, setSubmittingSubscriber] = useState(false)
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({
    show: false,
    message: '',
    type: 'success',
  })

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ show: true, message, type })
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }))
    }, 4000)
  }

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!subscriberEmail) {
      showToast('Please enter an email address.', 'error')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(subscriberEmail)) {
      showToast('Please enter a valid email address.', 'error')
      return
    }

    setSubmittingSubscriber(true)
    try {
      const res = await subscriberService.subscribe(subscriberEmail)
      if (res.success) {
        showToast(res.message, 'success')
        setSubscriberEmail('')
      } else {
        showToast(res.message, 'error')
      }
    } catch (err: any) {
      showToast(err.message || 'Subscription failed. Please try again.', 'error')
    } finally {
      setSubmittingSubscriber(false)
    }
  }

  const categories = ['All', 'Service', 'News', 'Membership', 'Education', 'Impact']

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await blogService.getAll()
        setBlogs(data)
        setFilteredBlogs(data)
      } catch (error) {
        console.error('Error fetching blogs:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchBlogs()
  }, [])

  useEffect(() => {
    let filtered = blogs

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((blog) => blog.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          blog.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredBlogs(filtered)
  }, [selectedCategory, searchQuery, blogs])

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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen pt-20">
      <PageHeader
        title="Blog"
        subtitle="Stories & Insights"
        description="Explore articles about community service, leadership, and our impact"
      />

      {/* Search and Filter Section */}
      <Section id="blog">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          {/* Search Bar */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-3 rounded-[14px] bg-white border border-gray-100 text-navy placeholder-textgray/60 focus:outline-none focus:border-cranberry focus:ring-2 focus:ring-cranberry/20 smooth-transition"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold smooth-transition ${
                  selectedCategory === category
                    ? 'bg-cranberry text-white shadow-premium'
                    : 'bg-white text-textgray border border-gray-100 hover:text-cranberry'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin">
              <div className="w-12 h-12 border-4 border-cranberry border-t-transparent rounded-full" />
            </div>
            <p className="text-textgray mt-4">Loading articles...</p>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-textgray text-lg">
              No articles found. Try a different search or category.
            </p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <CardGrid cols={3}>
              {filteredBlogs.map((blog) => (
                <motion.div
                  key={blog.id}
                  variants={itemVariants}
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
          </motion.div>
        )}
      </Section>

      {/* Featured Post */}
      {blogs.length > 0 && (
        <Section
          title="Featured Article"
          id="featured"
        >
          {(() => {
            const featured = blogs[0]
            return (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="glass-card p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
              >
                {featured.coverImage && (
                  <div className="overflow-hidden rounded-lg h-64 md:h-96">
                    <img
                      src={featured.coverImage}
                      alt={featured.title}
                      className="w-full h-full object-cover hover:scale-105 smooth-transition"
                    />
                  </div>
                )}
                <div>
                  <div className="mb-4">
                    {featured.tags && featured.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {featured.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2.5 py-1 bg-roseaccent/10 text-roseaccent font-medium rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-navy mb-4 font-serif">
                    {featured.title}
                  </h3>
                  <div className="flex items-center gap-4 text-textgray mb-6">
                    <span>{featured.author}</span>
                    <span>•</span>
                    <span>
                      {new Date(featured.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-lg text-textgray mb-8 leading-relaxed">
                    {featured.excerpt}
                  </p>
                  <button
                    onClick={() => navigate(`/blog/${featured.id}`)}
                    className="px-8 py-3 bg-cranberry text-white font-semibold rounded-[14px] hover:bg-cranberry/90 smooth-transition hover:shadow-premium"
                  >
                    Read Full Article
                  </button>
                </div>
              </motion.div>
            )
          })()}
        </Section>
      )}

      {/* Stats */}
      <Section id="stats">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { number: blogs.length, label: 'Articles Published', icon: HiDocumentText },
            {
              number: categories.length - 1,
              label: 'Categories',
              icon: HiTag,
            },
            { number: '100+', label: 'Readers Monthly', icon: HiUsers },
          ].map((stat, idx) => {
            const IconComponent = stat.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card p-8 text-center"
              >
                <IconComponent className="mx-auto text-5xl text-roseaccent mb-4" />
                <div className="text-4xl font-bold text-gradient mb-2 font-serif">
                  {stat.number}
                </div>
                <p className="text-textgray font-medium">{stat.label}</p>
              </motion.div>
            )
          })}
        </div>
      </Section>

      {/* Newsletter CTA */}
      <Section className="bg-gradient-to-r from-navy via-purpleaccent to-cranberry rounded-[20px] shadow-xl p-8 md:p-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center py-12"
        >
          <h3 className="text-3xl md:text-4xl font-bold font-serif text-white mb-6">
            Subscribe to Our Blog
          </h3>
          <p className="text-lg text-white/80 mb-8">
            Get the latest articles delivered to your inbox
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              value={subscriberEmail}
              onChange={(e) => setSubscriberEmail(e.target.value)}
              disabled={submittingSubscriber}
              className="flex-1 px-4 py-3 rounded-[14px] bg-white border border-gray-100 text-navy placeholder-textgray/60 focus:outline-none focus:border-cranberry disabled:opacity-75"
            />
            <button
              type="submit"
              disabled={submittingSubscriber}
              className="px-6 py-3 bg-cranberry text-white font-semibold rounded-[14px] hover:bg-cranberry/90 hover:shadow-premium smooth-transition disabled:opacity-75 flex items-center justify-center min-w-[120px]"
            >
              {submittingSubscriber ? (
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                'Subscribe'
              )}
            </button>
          </form>
        </motion.div>
      </Section>

      {/* Premium Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, x: '-50%' }}
            animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
            exit={{ opacity: 0, y: 20, scale: 0.9, x: '-50%' }}
            className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-4 rounded-[14px] shadow-premium text-white font-medium ${
              toast.type === 'success'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600'
                : 'bg-gradient-to-r from-rose-500 to-cranberry'
            }`}
          >
            {toast.type === 'success' ? (
              <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            )}
            <span className="whitespace-nowrap">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default BlogPage
