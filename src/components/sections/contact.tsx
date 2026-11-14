import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Award, Check, Copy, Languages, Mail, MapPin, Phone } from 'lucide-react'
import { CvButton } from '@/components/cv-button'
import { GitHubIcon, LinkedInIcon } from '@/components/icons'
import { MagicCard } from '@/components/magicui/magic-card'
import { TextareaWithLimit } from '@/components/originui/textarea-with-limit'
import { Portrait } from '@/components/portrait'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { profile } from '@/data/profile'
import { useCopy } from '@/hooks/use-copy'
import { useI18n } from '@/i18n'

const MAX = 800
type Errors = Partial<Record<'name' | 'email' | 'message', string>>

export function Contact() {
  const { t, tx } = useI18n()
  const c = profile.contact
  const emailCopy = useCopy()
  const msgCopy = useCopy()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState(false)

  const channels = [
    { icon: Mail, label: t('contact.email'), value: c.email, href: `mailto:${c.email}` },
    c.phone && { icon: Phone, label: t('contact.phone'), value: c.phone, href: `tel:${c.phone.replace(/\s/g, '')}` },
    { icon: GitHubIcon, label: 'GitHub', value: `github.com/${c.githubHandle}`, href: c.github },
    c.linkedin && { icon: LinkedInIcon, label: 'LinkedIn', value: c.linkedin.replace(/^https?:\/\/(www\.)?/, ''), href: c.linkedin },
    { icon: Award, label: t('contact.certs'), value: t('contact.credly'), href: c.credly },
    { icon: MapPin, label: t('contact.location'), value: tx(profile.location) },
    {
      icon: Languages,
      label: t('contact.languages'),
      value: profile.languages.map((l) => `${tx(l.name)} (${tx(l.level)})`).join(', '),
    },
  ].filter(Boolean) as { icon: React.ComponentType<{ className?: string }>; label: string; value: string; href?: string }[]

  const validate = (): Errors => {
    const e: Errors = {}
    if (!form.name.trim()) e.name = t('contact.errName')
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = t('contact.errEmail')
    if (form.message.trim().length < 10) e.message = t('contact.errMessage')
    return e
  }
  const body = `${form.message}\n\n${form.name}\n${form.email}`

  // No backend yet: the form opens the visitor's email app with everything filled in.
  // To receive messages directly, replace this with a fetch() to Formspree, Resend or your own Express API.
  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length) {
      document.getElementById(`contact-${Object.keys(e)[0]}`)?.focus()
      return
    }
    const subject = t('contact.subject', { name: form.name })
    window.location.href = `mailto:${c.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  const field = (key: keyof typeof form) => ({
    id: `contact-${key}`,
    value: form[key],
    'aria-invalid': !!errors[key] || undefined,
    'aria-describedby': errors[key] ? `contact-${key}-error` : undefined,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value }))
      if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }))
      setSent(false)
    },
  })
  const Err = ({ k }: { k: keyof Errors }) =>
    errors[k] ? (
      <p id={`contact-${k}-error`} className="mt-2 text-sm font-medium text-destructive">
        {errors[k]}
      </p>
    ) : null

  return (
    <section id="contact" className="scroll-mt-20 border-t py-20 md:py-28">
      <div className="grid items-end gap-10 md:grid-cols-[1fr_auto]">
        <div>
          <h2 className="max-w-[14ch] text-5xl leading-[0.95] font-bold tracking-[-0.045em] md:text-7xl">{t('contact.title')}</h2>
          <p className="mt-6 max-w-[38rem] text-lg text-muted-foreground">{t('contact.intro')}</p>
        </div>
        <Portrait variant="arch" className="w-40 md:w-56" />
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_minmax(0,30rem)] lg:gap-14">
        <div>
          <MagicCard className="rounded-3xl">
            <div className="p-6 md:p-8">
              <p className="text-sm text-muted-foreground">{t('contact.fastest')}</p>
              <p className="mt-2 text-2xl font-bold tracking-tight break-all md:text-4xl">{c.email}</p>
              <div className="mt-5 flex flex-wrap items-start gap-3">
                <Button onClick={() => emailCopy.copy(c.email)}>
                  {emailCopy.copied ? <Check /> : <Copy />}
                  {emailCopy.copied ? t('contact.copied') : t('contact.copy')}
                </Button>
                <Button variant="outline" asChild>
                  <a href={`mailto:${c.email}`}>{t('contact.openMail')}</a>
                </Button>
              </div>
              <div className="mt-6 border-t pt-6">
                <CvButton size="default" />
              </div>
            </div>
          </MagicCard>

          <ul className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {channels.map((ch) => (
              <li key={ch.label} className="flex items-start gap-3.5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary">
                  <ch.icon className="size-[18px]" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm text-muted-foreground">{ch.label}</p>
                  {ch.href ? (
                    <a
                      href={ch.href}
                      target={ch.href.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                      className="font-semibold break-words underline-offset-4 hover:text-primary hover:underline"
                    >
                      {ch.value}
                    </a>
                  ) : (
                    <p className="font-semibold">{ch.value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <form noValidate onSubmit={onSubmit} className="rounded-3xl border bg-card p-6 md:p-8">
          <p className="text-lg font-bold">{t('contact.formTitle')}</p>
          <div className="mt-6 space-y-6">
            <div>
              <Label htmlFor="contact-name">{t('contact.name')}</Label>
              <Input className="mt-2.5" autoComplete="name" placeholder="Anna Schmidt" {...field('name')} />
              <Err k="name" />
            </div>
            <div>
              <Label htmlFor="contact-email">{t('contact.yourEmail')}</Label>
              <Input className="mt-2.5" type="email" autoComplete="email" placeholder="anna@company.de" {...field('email')} />
              <Err k="email" />
            </div>
            <div>
              <Label htmlFor="contact-message">{t('contact.message')}</Label>
              <TextareaWithLimit
                className="mt-2.5"
                maxLength={MAX}
                placeholder={t('contact.messagePh')}
                counterText={(n) => t('chars.left', { n })}
                {...field('message')}
              />
              <Err k="message" />
            </div>
            <Button type="submit" size="lg" className="w-full">
              {t('contact.send')}
            </Button>
          </div>
          <AnimatePresence>
            {sent && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                <div role="status" className="mt-6 rounded-xl bg-secondary p-4 text-sm">
                  <p className="font-semibold">{t('contact.sent')}</p>
                  <p className="mt-1 text-muted-foreground">{t('contact.sentFallback', { email: c.email })}</p>
                  <Button type="button" variant="outline" size="sm" className="mt-3 bg-card" onClick={() => msgCopy.copy(body)}>
                    {msgCopy.copied ? <Check /> : <Copy />}
                    {msgCopy.copied ? t('contact.copied') : t('contact.copyMessage')}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </section>
  )
}
