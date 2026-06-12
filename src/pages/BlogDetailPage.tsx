import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { blogService } from '@/services/blogService'
import { useSEO } from '@/hooks'
import { Blog } from '@/types'

const BlogDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [blog, setBlog] = useState<Blog | null>(null)
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  useSEO({
    title: blog?.title || 'Blog',
    description: blog?.summary || 'Read articles and updates from Rotaract Club MEC Thrikkakara.',
    keywords: `${blog?.category || 'Blog'}, Rotaract, MEC Thrikkakara`,
    ogDescription: blog?.summary || 'Explore articles from Rotaract Club MEC Thrikkakara.',
  })

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return

      try {
        const data = await blogService.getById(id)
        if (!data) {
          navigate('/blog')
          return
        }

        setBlog(data)

        // Fetch related blogs
        let related: Blog[] = []
        if (data.category) {
          related = await blogService.getByCategory(data.category)
        } else if (data.tags && data.tags.length > 0) {
          related = await blogService.getByTag(data.tags[0])
        }

        // Filter out current blog and limit to 3
        related = related.filter((b) => b.id !== id).slice(0, 3)
        setRelatedBlogs(related)
      } catch (error) {
        console.error('Error fetching blog:', error)
        navigate('/blog')
      } finally {
        setLoading(false)
      }
    }

    fetchBlog()
  }, [id, navigate])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin">
          <div className="w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full" />
        </div>
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-lg mb-4">Blog post not found</p>
          <button
            onClick={() => navigate('/blog')}
            className="px-6 py-3 bg-gold-500 text-dark-950 font-semibold rounded-lg"
          >
            Back to Blog
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-32">
      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto px-4 pb-20"
      >
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {blog.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-gray-400 mb-8 pb-8 border-b border-white border-opacity-10">
            <span className="flex items-center gap-2">
              <span className="text-lg">✍️</span>
              <span>{blog.author}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-2">
              <span className="text-lg">📅</span>
              <span>
                {new Date(blog.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-2">
              <span className="text-lg">⏱️</span>
              <span>5 min read</span>
            </span>
          </div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-primary-600 bg-opacity-30 text-primary-300 text-sm rounded-full hover:bg-opacity-50 smooth-transition cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </motion.div>

        {/* Featured Image */}
        {blog.coverImage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-12 overflow-hidden rounded-lg shadow-lg"
          >
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-auto object-cover hover:scale-105 smooth-transition"
            />
          </motion.div>
        )}

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="prose prose-invert max-w-none mb-16"
        >
          <div className="blog-content text-gray-300 leading-relaxed text-lg">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {blog.content}
            </ReactMarkdown>
          </div>
        </motion.div>

        {/* Author Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card-dark p-8 mb-16 border border-white border-opacity-10"
        >
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-gold flex items-center justify-center flex-shrink-0">
              <span className="text-2xl font-bold text-dark-950">
                {blog.author[0]}
              </span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                About {blog.author}
              </h3>
              <p className="text-gray-300">
                {blog.author} is an active member of Rotaract Club MEC, passionate
                about community service and sharing knowledge.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Share Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 pb-16 border-b border-white border-opacity-10"
        >
          <h3 className="text-xl font-bold text-white mb-4">Share This Article</h3>
          <div className="flex gap-3">
            {[
              { name: 'Facebook', icon: '👍', color: 'hover:bg-blue-500' },
              { name: 'Twitter', icon: '🐦', color: 'hover:bg-blue-400' },
              { name: 'LinkedIn', icon: '💼', color: 'hover:bg-blue-600' },
            ].map((social) => (
              <button
                key={social.name}
                className={`p-3 rounded-lg bg-dark-800 border border-white border-opacity-20 text-xl smooth-transition ${social.color}`}
                title={`Share on ${social.name}`}
              >
                {social.icon}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Related Articles */}
        {relatedBlogs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-white mb-8">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedBlogs.map((relatedBlog, idx) => (
                <motion.button
                  key={relatedBlog.id}
                  onClick={() => navigate(`/blog/${relatedBlog.id}`)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass-card-dark p-6 hover:shadow-glow smooth-transition text-left"
                >
                  {relatedBlog.coverImage && (
                    <div className="mb-4 overflow-hidden rounded-lg h-40">
                      <img
                        src={relatedBlog.coverImage}
                        alt={relatedBlog.title}
                        className="w-full h-full object-cover hover:scale-105 smooth-transition"
                      />
                    </div>
                  )}
                  <h4 className="font-bold text-white mb-2 line-clamp-2">
                    {relatedBlog.title}
                  </h4>
                  <p className="text-sm text-gray-400 mb-3">
                    {new Date(relatedBlog.date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-300 text-sm line-clamp-2">
                    {relatedBlog.excerpt}
                  </p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </motion.article>

      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="max-w-3xl mx-auto px-4 py-8"
      >
        <button
          onClick={() => navigate('/blog')}
          className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg smooth-transition flex items-center gap-2"
        >
          ← Back to Blog
        </button>
      </motion.div>

      {/* Custom Markdown Styles */}
      <style>{`
        .blog-content h2 {
          @apply text-3xl font-bold text-white mt-8 mb-4;
        }
        .blog-content h3 {
          @apply text-2xl font-bold text-white mt-6 mb-3;
        }
        .blog-content p {
          @apply mb-4;
        }
        .blog-content ul, .blog-content ol {
          @apply mb-4 ml-6;
        }
        .blog-content li {
          @apply mb-2;
        }
        .blog-content a {
          @apply text-gold-400 hover:text-gold-300 underline smooth-transition;
        }
        .blog-content blockquote {
          @apply border-l-4 border-gold-500 pl-4 italic text-gray-400 my-4;
        }
        .blog-content code {
          @apply bg-dark-800 px-2 py-1 rounded text-gold-400 font-mono;
        }
        .blog-content pre {
          @apply bg-dark-800 p-4 rounded-lg overflow-x-auto my-4;
        }
      `}</style>
    </div>
  )
}

export default BlogDetailPage
