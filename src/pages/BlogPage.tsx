import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import PageHeader from '@/components/PageHeader'
import { Section } from '@/components/Common'
import CardGrid, { BlogCard } from '@/components/Cards'
import { blogService } from '@/services/blogService'
import { Blog } from '@/types'

const BlogPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

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
              className="w-full px-6 py-3 rounded-lg bg-dark-800 border border-white border-opacity-20 text-white placeholder-gray-500 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400 focus:ring-opacity-30 smooth-transition"
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
                    ? 'bg-gradient-gold text-dark-950 shadow-lg shadow-gold-500/50'
                    : 'glass-card-dark text-gold-400 hover:text-gold-300'
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
              <div className="w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full" />
            </div>
            <p className="text-gray-400 mt-4">Loading articles...</p>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
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
          className="bg-gradient-to-r from-primary-900 to-primary-800 bg-opacity-50 rounded-2xl"
        >
          {(() => {
            const featured = blogs[0]
            return (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="glass-card-dark p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
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
                            className="text-xs px-2 py-1 bg-gold-500 bg-opacity-20 text-gold-400 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {featured.title}
                  </h3>
                  <div className="flex items-center gap-4 text-gray-400 mb-6">
                    <span>{featured.author}</span>
                    <span>•</span>
                    <span>
                      {new Date(featured.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                    {featured.excerpt}
                  </p>
                  <button
                    onClick={() => navigate(`/blog/${featured.id}`)}
                    className="px-8 py-3 bg-gradient-gold text-dark-950 font-semibold rounded-lg hover:shadow-lg hover:shadow-gold-500/50 smooth-transition"
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
            { number: blogs.length, label: 'Articles Published', icon: '📝' },
            {
              number: categories.length - 1,
              label: 'Categories',
              icon: '🏷️',
            },
            { number: '100+', label: 'Readers Monthly', icon: '👥' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card-dark p-8 text-center"
            >
              <div className="text-5xl mb-4">{stat.icon}</div>
              <div className="text-4xl font-bold text-gradient mb-2">
                {stat.number}
              </div>
              <p className="text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Newsletter CTA */}
      <Section className="bg-gradient-to-r from-gold-500 via-gold-600 to-primary-600 bg-opacity-20 rounded-2xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center py-12"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Subscribe to Our Blog
          </h3>
          <p className="text-lg text-gray-300 mb-8">
            Get the latest articles delivered to your inbox
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

export default BlogPage
