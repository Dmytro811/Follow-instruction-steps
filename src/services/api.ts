const BASE_URL = import.meta.env.VITE_API_URL ?? '/api'

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  })
  if (!res.ok) throw new Error(`API error ${res.status}`)
  return res.json()
}

export const api = {
  analyze: (url: string, plan: string, aiModels: string[]) =>
    request('/analyze', {
      method: 'POST',
      body: JSON.stringify({ url, plan, aiModels }),
    }),

  createPaymentSession: (planId: string, url: string) =>
    request('/payment/session', {
      method: 'POST',
      body: JSON.stringify({ planId, url }),
    }),

  getReport: (id: string) => request(`/report/${id}`),

  getHistory: () => request('/history'),

  contact: (data: { name: string; email: string; company: string; message: string }) =>
    request('/contact', { method: 'POST', body: JSON.stringify(data) }),
}
