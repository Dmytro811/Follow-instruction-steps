/**
 * Валідація URL
 */
export function validateUrl(url: string): { valid: boolean; error?: string } {
  if (!url || !url.trim()) {
    return { valid: false, error: 'URL не може бути порожнім' }
  }

  try {
    const urlObj = new URL(url)

    if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:') {
      return { valid: false, error: 'URL повинен починатися з http:// або https://' }
    }

    if (!urlObj.hostname || urlObj.hostname === 'localhost' || urlObj.hostname === '127.0.0.1') {
      return { valid: false, error: 'Локальні адреси не підтримуються' }
    }

    return { valid: true }
  } catch {
    return { valid: false, error: 'Некоректний формат URL' }
  }
}

/**
 * Нормалізація URL (додає https:// якщо немає протоколу)
 */
export function normalizeUrl(url: string): string {
  let normalized = url.trim()

  if (!normalized.startsWith('http://') && !normalized.startsWith('https://')) {
    normalized = 'https://' + normalized
  }

  return normalized
}

/**
 * Валідація email
 */
export function validateEmail(email: string): { valid: boolean; error?: string } {
  if (!email || !email.trim()) {
    return { valid: false, error: 'Email не може бути порожнім' }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Некоректний формат email' }
  }

  return { valid: true }
}

/**
 * Форматування помилок API
 */
export function formatApiError(error: unknown): string {
  if (error instanceof Error) {
    // Перевіряємо чи є це API помилка з даними
    const apiError = error as Error & { status?: number; data?: { message?: string } }

    if (apiError.status === 404) {
      return 'Ресурс не знайдено'
    }

    if (apiError.status === 500) {
      return 'Помилка сервера. Спробуйте пізніше'
    }

    if (apiError.status === 429) {
      return 'Забагато запитів. Зачекайте хвилину'
    }

    if (apiError.data?.message) {
      return apiError.data.message
    }

    return error.message || 'Невідома помилка'
  }

  return 'Невідома помилка'
}
