/** Merge marketing / attribution fields for contact API (public forms only). */
export function buildContactPayload(
  base: {
    firstName: string
    lastName: string
    email: string
    phone?: string
    subject: string
    message: string
  },
  venue: 'restaurant' | 'bar',
  extra?: {
    leadSource?: string
    relatedEventTitle?: string
  }
) {
  const params =
    typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search)
      : new URLSearchParams()

  const pagePath =
    typeof window !== 'undefined'
      ? `${window.location.pathname}${window.location.search}`
      : ''

  return {
    ...base,
    venue,
    pagePath,
    referrer: typeof document !== 'undefined' ? document.referrer || '' : '',
    utmSource: params.get('utm_source') || '',
    utmMedium: params.get('utm_medium') || '',
    utmCampaign: params.get('utm_campaign') || '',
    leadSource:
      extra?.leadSource ||
      params.get('leadSource') ||
      (venue === 'restaurant' ? 'restaurant_contact' : 'bar_contact'),
    relatedEventTitle: (() => {
      const raw = extra?.relatedEventTitle || params.get('relatedEvent') || ''
      if (!raw) return ''
      try {
        return decodeURIComponent(raw.replace(/\+/g, ' '))
      } catch {
        return raw
      }
    })(),
  }
}
