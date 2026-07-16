export interface AnalysisPlan {
  id: 'single' | 'professional' | 'optimization'
  name: string
  price: number
  description: string
  features: string[]
}

export interface AIScore {
  overall: number
  content: number
  technical: number
  accessibility: number
  schema: number
  semanticHtml: number
  trust: number
  performance: number
  entities: number
  citations: number
  aiReadability: number
}

export interface ScoreCategory {
  key: keyof Omit<AIScore, 'overall'>
  label: string
  score: number
  status: 'excellent' | 'good' | 'needs-work' | 'critical'
  description: string
  impact: 'high' | 'medium' | 'low'
  recommendation: string
}

export interface Report {
  id: string
  url: string
  plan: AnalysisPlan['id']
  createdAt: string
  status: 'pending' | 'analyzing' | 'complete' | 'failed'
  scores?: AIScore
  issues?: Issue[]
  recommendations?: Recommendation[]
}

export interface Issue {
  id: string
  category: string
  title: string
  description: string
  severity: 'critical' | 'high' | 'medium' | 'low'
}

export interface Recommendation {
  id: string
  category: string
  title: string
  description: string
  implementation: string
  impact: 'high' | 'medium' | 'low'
  effort: 'high' | 'medium' | 'low'
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  avatar: string
  content: string
  rating: number
}

export interface CaseStudy {
  id: string
  company: string
  industry: string
  challenge: string
  result: string
  scoreImprovement: number
  trafficIncrease: number
  aiMentionsIncrease: number
}
