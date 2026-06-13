import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import PageHeader from '@/components/PageHeader'
import { Section } from '@/components/Common'
import { useSEO } from '@/hooks'
import { fetchStrapi, normalizeStrapiItem } from '@/services/strapi'

interface IntroductionData {
  title: string
  vision: string
  mission: string
  purpose: string
  history: string
  values: Array<{ title: string; description: string }>
}

const IntroductionPage = () => {
  const [data, setData] = useState<IntroductionData | null>(null)

  useSEO({
    title: 'About Us',
    description: 'Learn about Rotaract Club of Model Engineering College, Thrikkakara - our vision, mission, values, and history.',
    keywords: 'About Rotaract, MEC Thrikkakara, Vision, Mission, Leadership',
    ogDescription: 'Discover the vision and mission of Rotaract Club MEC Thrikkakara.',
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchStrapi('/api/introduction?populate=*')
        if (response && response.data) {
          setData(normalizeStrapiItem<IntroductionData>(response.data))
        }
      } catch (error) {
        console.error('Error fetching introduction data from Strapi:', error)
      }
    }
    fetchData()
  }, [])

  if (!data) return <div>Loading...</div>

  return (
    <div className="min-h-screen pt-20">
      <PageHeader
        title={data.title}
        subtitle="Empowering Leaders Since 2015"
        description="Discover our story, values, and commitment to community service"
      />

      {/* Vision & Mission Section */}
      <Section title="Our Vision & Mission" id="vision-mission">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8"
          >
            <h3 className="text-3xl font-bold text-gradient mb-4 font-serif">Vision</h3>
            <p className="text-textgray text-lg leading-relaxed">
              {data.vision}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8"
          >
            <h3 className="text-3xl font-bold text-gradient mb-4 font-serif">Mission</h3>
            <p className="text-textgray text-lg leading-relaxed">
              {data.mission}
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Purpose Section */}
      <Section title="Our Purpose" id="purpose">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-12 max-w-3xl mx-auto text-center"
        >
          <p className="text-xl text-textgray leading-relaxed">
            {data.purpose}
          </p>
        </motion.div>
      </Section>

      {/* History Section */}
      <Section title="Our History" id="history">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-12 max-w-3xl mx-auto"
        >
          <p className="text-lg text-textgray leading-relaxed mb-6">
            {data.history}
          </p>
          <div className="border-t border-gray-100 pt-8 mt-8">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-4xl font-bold text-gradient">2015</div>
                <p className="text-textgray mt-2">Founded</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-gradient">200+</div>
                <p className="text-textgray mt-2">Active Members</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-gradient">50+</div>
                <p className="text-textgray mt-2">Projects</p>
              </div>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* Core Values Section */}
      <Section title="Our Core Values" id="values">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.values.map((value, idx) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-8"
            >
              <div className="w-16 h-16 rounded-lg bg-roseaccent/10 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-roseaccent">
                  {idx + 1}
                </span>
              </div>
              <h4 className="text-xl font-bold text-navy mb-3">
                {value.title}
              </h4>
              <p className="text-textgray text-sm leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Impact Section */}
      <Section title="Our Impact" id="impact">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              number: '150+',
              label: 'Students Supported',
              description: 'Educational assistance and mentorship',
            },
            {
              number: '50+',
              label: 'Projects Completed',
              description: 'Community service initiatives',
            },
            {
              number: '5L+',
              label: 'Funds Raised',
              description: 'For charitable causes',
            },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-8 text-center"
            >
              <div className="text-5xl font-bold text-gradient mb-4 font-serif">
                {stat.number}
              </div>
              <h4 className="text-xl font-bold text-navy mb-2">
                {stat.label}
              </h4>
              <p className="text-textgray text-sm">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Call to Action */}
      <Section className="bg-gradient-to-r from-navy via-purpleaccent to-cranberry rounded-[20px] shadow-xl p-8 md:p-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center py-12"
        >
          <h3 className="text-3xl md:text-4xl font-bold font-serif text-white mb-6">
            Join Our Community Today
          </h3>
          <p className="text-lg text-white/80 mb-8">
            Be part of a movement that's changing lives and building leaders
          </p>
          <a
            href="/membership"
            className="inline-block px-8 py-3 bg-cranberry text-white font-semibold rounded-[14px] hover:bg-cranberry/90 smooth-transition hover:shadow-premium"
          >
            Become a Member
          </a>
        </motion.div>
      </Section>
    </div>
  )
}

export default IntroductionPage
