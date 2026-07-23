const N8N_BASE_URL = import.meta.env.VITE_N8N_BASE_URL || 'https://your-n8n-instance.com'

interface ApiError extends Error {
  status?: number
  data?: unknown
}

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const res = await fetch(url, {
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      ...options,
    })

    if (!res.ok) {
      const error: ApiError = new Error(`API error ${res.status}`)
      error.status = res.status
      try {
        error.data = await res.json()
      } catch {
        // Response might not be JSON
      }
      throw error
    }

    return res.json()
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Network error')
  }
}

export const api = {
  // Створення Payment Intent через n8n
  createPaymentIntent: (amount: number, currency: string, planId: string, websiteUrl: string) =>
    request<{ clientSecret: string; paymentIntentId: string }>(
      `${N8N_BASE_URL}${import.meta.env.VITE_N8N_CREATE_PAYMENT_WEBHOOK}`,
      {
        method: 'POST',
        body: JSON.stringify({ amount, currency, plan: planId, websiteUrl }),
      }
    ),

  // Верифікація платежу після успіху
  verifyPayment: (paymentIntentId: string, clientSecret: string) =>
    request<{ status: string; websiteUrl: string; plan: string }>(
      `${N8N_BASE_URL}${import.meta.env.VITE_N8N_VERIFY_PAYMENT_WEBHOOK}`,
      {
        method: 'POST',
        body: JSON.stringify({ payment_intent: paymentIntentId, client_secret: clientSecret }),
      }
    ),

  // Запуск аналізу сайту (викликається автоматично після верифікації або вручну)
  startAnalysis: (paymentIntentId: string, websiteUrl: string, planId: string) =>
    request<{ analysisId: string; status: string }>(
      `${N8N_BASE_URL}${import.meta.env.VITE_N8N_START_ANALYSIS_WEBHOOK}`,
      {
        method: 'POST',
        body: JSON.stringify({ paymentIntentId, websiteUrl, plan: planId }),
      }
    ),

  // Отримання статусу аналізу та даних звіту
  getReport: (analysisId: string) =>
    request<{
      status: 'pending' | 'analyzing' | 'complete' | 'failed'
      progress?: number
      pdfUrl?: string
      error?: string
    }>(
      `${N8N_BASE_URL}${import.meta.env.VITE_N8N_GET_REPORT_WEBHOOK}?analysisId=${analysisId}`,
      {
        method: 'GET',
      }
    ),

  // Завантаження PDF звіту
  downloadPDF: async (analysisId: string): Promise<Blob> => {
    const url = `${N8N_BASE_URL}${import.meta.env.VITE_N8N_DOWNLOAD_PDF_WEBHOOK}?analysisId=${analysisId}`
    const res = await fetch(url, { method: 'GET' })

    if (!res.ok) {
      throw new Error(`Failed to download PDF: ${res.status}`)
    }

    return res.blob()
  },

  // Контактна форма
  contact: (data: { name: string; email: string; company: string; message: string }) =>
    request(`${N8N_BASE_URL}/webhook/contact`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
}
