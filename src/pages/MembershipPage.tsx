import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HiCheckCircle, HiUsers, HiCalendar, HiHeart } from 'react-icons/hi'
import { FiTarget } from 'react-icons/fi'
import PageHeader from '@/components/PageHeader'
import { Section, Button } from '@/components/Common'
import { useSEO } from '@/hooks'

interface MembershipData {
  title: string
  tagline: string
  introduction: string
  benefits: Array<{
    title: string
    description: string
    icon: string
  }>
  eligibility: string[]
  process: Array<{
    step: number
    title: string
    description: string
  }>
  joinButtonText: string
  contactEmail: string
}

const MembershipPage = () => {
  const [data, setData] = useState<MembershipData | null>(null)
  const [selectedProcess, setSelectedProcess] = useState(0)

  useSEO({
    title: 'Membership',
    description: 'Join Rotaract Club MEC Thrikkakara. Learn about membership benefits, eligibility, and the application process.',
    keywords: 'Membership, Join Rotaract, Benefits, Application',
    ogDescription: 'Join Rotaract Club MEC Thrikkakara and be part of our service community.',
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/content.json')
        const json = await response.json()
        setData(json.membership)
      } catch (error) {
        console.error('Error fetching membership data:', error)
      }
    }
    fetchData()
  }, [])

  if (!data) return <div>Loading...</div>

  return (
    <div className="min-h-screen pt-20">
      <PageHeader
        title={data.title}
        subtitle={data.tagline}
        description={data.introduction}
      />

      {/* Benefits Section */}
      <Section title="Why Join Rotaract?" id="benefits">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card-dark p-8 hover:shadow-glow smooth-transition"
            >
              <div className="text-5xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Eligibility Section */}
      <Section title="Eligibility Criteria" id="eligibility">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card-dark p-12 max-w-3xl mx-auto"
        >
          <ul className="space-y-4">
            {data.eligibility.map((criterion, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start text-lg text-gray-300"
              >
                <HiCheckCircle className="text-gold-400 mr-4 mt-1 text-lg flex-shrink-0" />
                <span>{criterion}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </Section>

      {/* Process Section */}
      <Section title="Membership Process" id="process">
        <div className="max-w-4xl mx-auto">
          {/* Timeline */}
          <div className="relative mb-12">
            <div className="flex justify-between relative">
              {data.process.map((_, idx) => (
                <div
                  key={idx}
                  className="flex-1"
                  onClick={() => setSelectedProcess(idx)}
                >
                  <motion.div
                    className="relative flex justify-center"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <button
                      className={`w-12 h-12 rounded-full font-bold text-lg smooth-transition cursor-pointer ${
                        selectedProcess === idx
                          ? 'bg-gradient-gold text-dark-950 shadow-lg shadow-gold-500/50'
                          : 'bg-primary-600 text-white hover:bg-primary-500'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  </motion.div>
                  {idx < data.process.length - 1 && (
                    <div className="absolute top-6 left-1/2 w-[calc(100%-2rem)] h-1 bg-primary-600 -z-10" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Process Details */}
          <motion.div
            key={selectedProcess}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="glass-card-dark p-8 text-center"
          >
            <div className="mb-6">
              <h3 className="text-3xl font-bold text-gradient mb-2">
                Step {data.process[selectedProcess].step}
              </h3>
              <h4 className="text-2xl font-semibold text-white">
                {data.process[selectedProcess].title}
              </h4>
            </div>
            <p className="text-lg text-gray-300 leading-relaxed">
              {data.process[selectedProcess].description}
            </p>
            {selectedProcess < data.process.length - 1 && (
              <div className="mt-8">
                <button
                  onClick={() => setSelectedProcess(selectedProcess + 1)}
                  className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg smooth-transition"
                >
                  Next Step →
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </Section>

      {/* Quick Facts */}
      <Section id="facts">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { number: '200+', label: 'Active Members', icon: HiUsers },
            { number: '9', label: 'Years of Service', icon: HiCalendar },
            { number: '50+', label: 'Projects Completed', icon: FiTarget },
            { number: '5L+', label: 'Lives Impacted', icon: HiHeart },
          ].map((fact, idx) => {
            const IconComponent = fact.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card-dark p-8 text-center"
              >
                <IconComponent className="mx-auto text-5xl text-pink-500 mb-4" />
                <h3 className="text-3xl font-bold text-white mb-2">{fact.number}</h3>
                <p className="text-gray-400">{fact.label}</p>
              </motion.div>
            )
          })}
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-gradient-to-r from-gold-500 via-gold-600 to-primary-600 bg-opacity-20 rounded-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center py-12"
        >
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Join Us?
          </h3>
          <p className="text-xl text-gray-300 mb-2">
            Send us an email or fill out the application form
          </p>
          <p className="text-gold-400 font-semibold text-lg mb-8">
            {data.contactEmail}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`mailto:${data.contactEmail}`}
              className="px-8 py-3 bg-gradient-gold text-dark-950 font-semibold rounded-lg hover:shadow-lg hover:shadow-gold-500/50 smooth-transition"
            >
              Send Email
            </a>
            <Button
              label="Download Application"
              variant="outline"
              size="lg"
              href="#"
            />
          </div>
        </motion.div>
      </Section>

      {/* FAQ Section */}
      <Section title="Frequently Asked Questions" id="faq">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            {
              question: 'What is the time commitment?',
              answer:
                'Members are expected to attend meetings and participate in at least 2-3 projects per year. Most activities are scheduled on weekends.',
            },
            {
              question: 'Is there a membership fee?',
              answer:
                'Yes, there is a nominal membership fee that helps fund our projects and activities. Details are provided during the induction process.',
            },
            {
              question: 'Can I join if I am not a student?',
              answer:
                'Rotaract welcomes young professionals between 18-30 years old. Contact us to discuss opportunities for non-student members.',
            },
            {
              question: 'How often do you meet?',
              answer:
                'We have regular meetings twice a month on campus. Additional project meetings are scheduled as needed.',
            },
          ].map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card-dark p-6"
            >
              <h4 className="text-lg font-bold text-gold-400 mb-3">
                {faq.question}
              </h4>
              <p className="text-gray-300 text-sm">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </Section>
    </div>
  )
}

export default MembershipPage
