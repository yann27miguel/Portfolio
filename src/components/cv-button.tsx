import { Download, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCvDownload } from '@/hooks/use-cv-download'
import { LANGS, useI18n, type Lang } from '@/i18n'

/** "Download CV" in the current site language, plus links to the other two versions. */
export function CvButton({ size = 'lg', showOthers = true }: { size?: 'lg' | 'default'; showOthers?: boolean }) {
  const { lang, t } = useI18n()
  const { download, busy, status } = useCvDownload()
  const others = LANGS.filter((l) => l.code !== lang)

  return (
    <div className="flex flex-col gap-2">
      <Button size={size} onClick={() => download(lang)} disabled={busy} aria-live="polite">
        {busy ? <Loader2 className="animate-spin" /> : <Download />}
        {busy ? t('cv.preparing') : t('cv.download')}
        <span className="rounded-full bg-primary-foreground/20 px-1.5 text-[11px] font-bold">{lang.toUpperCase()}</span>
      </Button>
      {showOthers && (
        <p className="text-sm text-muted-foreground">
          {t('cv.otherLangs')}{' '}
          {others.map((o, i) => (
            <span key={o.code}>
              <button
                type="button"
                lang={o.code}
                onClick={() => download(o.code as Lang)}
                className="font-semibold text-foreground underline underline-offset-4 hover:text-primary"
              >
                {o.name}
              </button>
              {i === 0 ? ` ${lang === 'fr' ? 'et' : lang === 'de' ? 'und' : 'and'} ` : ''}
            </span>
          ))}
        </p>
      )}
      {status === 'failed' && <p className="text-sm font-medium text-destructive">{t('cv.failed')}</p>}
    </div>
  )
}
