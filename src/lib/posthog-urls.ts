import type { CaptureResult } from "posthog-js"

/**
 * An http(s) address without its query and fragment, which can hold what
 * someone typed or was sent, such as a sign-in ticket; other text stays.
 */
function withoutQuery(value: string) {
  if (!/^https?:\/\//i.test(value)) return value
  try {
    const url = new URL(value)
    url.search = ""
    url.hash = ""
    return url.href
  } catch {
    return value
  }
}

/**
 * PostHog's before_send for addresses: every text in an event's
 * properties, $set and $set_once, also nested, such as $current_url,
 * $referrer, $initial_current_url and a web vital's URLs, goes through
 * `clean`, by default `withoutQuery`. Campaign parameters are read before.
 */
export function scrubUrls(
  event: CaptureResult | null,
  clean: (text: string) => string = withoutQuery
) {
  if (!event) return null
  const seen = new WeakSet<object>()
  function scrub(value: unknown) {
    if (!value || typeof value !== "object" || seen.has(value)) return
    seen.add(value)
    for (const [key, nested] of Object.entries(value)) {
      if (typeof nested === "string")
        (value as Record<string, unknown>)[key] = clean(nested)
      else scrub(nested)
    }
  }
  for (const values of [event.properties, event.$set, event.$set_once])
    scrub(values)
  return event
}
