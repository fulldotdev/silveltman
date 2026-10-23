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

/** Strip URL queries and optionally limit referring URLs to their origin. */
export function scrubUrls(
  event: CaptureResult | null,
  clean: (text: string) => string = withoutQuery,
  { referrerOriginsOnly = false }: { referrerOriginsOnly?: boolean } = {}
) {
  if (!event) return null
  const seen = new WeakSet<object>()
  function scrub(value: unknown) {
    if (!value || typeof value !== "object" || seen.has(value)) return
    seen.add(value)
    for (const [key, nested] of Object.entries(value)) {
      if (typeof nested === "string") {
        let text = clean(nested)
        if (
          referrerOriginsOnly &&
          /referrer/i.test(key) &&
          /^https?:\/\//i.test(text)
        ) {
          try {
            text = new URL(text).origin + "/"
          } catch {
            text = ""
          }
        }
        ;(value as Record<string, unknown>)[key] = text
      } else scrub(nested)
    }
  }
  for (const values of [event.properties, event.$set, event.$set_once])
    scrub(values)
  return event
}
