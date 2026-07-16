import { useState } from 'react'
import {
  LayoutDashboard, FileText, TrendingUp, Download, Bell,
  Settings, CreditCard, ChevronRight, CheckCircle2,
  AlertCircle, ExternalLink, LogOut, Loader2
} from 'lucide-react'
import { Link } from 'react-router-dom'
import ProgressBar from '../components/ui/ProgressBar'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'

const mockReports = [
  {
    id: 'r1',
    url: 'dataflow.io',
    plan: 'Professional Multi-AI',
    date: 'Jul 14, 2026',
    status: 'complete' as const,
    score: 82,
  },
  {
    id: 'r2',
    url: 'dataflow.io',
    plan: 'Single AI Analysis',
    date: 'Jun 28, 2026',
    status: 'complete' as const,
    score: 67,
  },
  {
    id: 'r3',
    url: 'dataflow.io/pricing',
    plan: 'Professional Multi-AI',
    date: 'Jul 15, 2026',
    status: 'analyzing' as const,
    score: 0,
  },
]

const scoreCategories = [
  { label: 'Content Quality', score: 78 },
  { label: 'Technical Structure', score: 91 },
  { label: 'Accessibility', score: 84 },
  { label: 'Schema Markup', score: 65 },
  { label: 'Semantic HTML', score: 88 },
  { label: 'Trust Signals', score: 72 },
  { label: 'Performance', score: 93 },
  { label: 'Entity Optimization', score: 58 },
  { label: 'Citation Readiness', score: 61 },
  { label: 'AI Readability', score: 76 },
]

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', id: 'overview' },
  { icon: FileText, label: 'Reports', id: 'reports' },
  { icon: TrendingUp, label: 'Analytics', id: 'analytics' },
  { icon: CreditCard, label: 'Billing', id: 'billing' },
  { icon: Bell, label: 'Notifications', id: 'notifications' },
  { icon: Settings, label: 'Settings', id: 'settings' },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-60 bg-white border-r border-[#e2e8f0] fixed top-16 bottom-0">
        <div className="p-4 border-b border-[#e2e8f0]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#0f3460] rounded-full flex items-center justify-center text-white text-xs font-bold">SC</div>
            <div>
              <div className="text-sm font-semibold text-[#0a1628]">Sarah Chen</div>
              <div className="text-xs text-[#94a3b8]">sarah@dataflow.io</div>
            </div>
          </div>
        </div>
        <nav className="p-3 flex-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors mb-0.5 ${
                activeTab === item.id
                  ? 'bg-[#e8f0fb] text-[#0f3460] font-medium'
                  : 'text-[#64748b] hover:text-[#0f3460] hover:bg-[#f8fafc]'
              }`}
            >
              <item.icon size={16} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-[#e2e8f0]">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#64748b] hover:text-[#ef4444] hover:bg-red-50 transition-colors">
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 md:ml-60 p-6 pt-8">
        {activeTab === 'overview' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-[#0a1628]" style={{ fontFamily: 'var(--font-heading)' }}>
                  Dashboard
                </h1>
                <p className="text-sm text-[#94a3b8]">Welcome back, Sarah</p>
              </div>
              <Link to="/pricing">
                <Button size="sm">New Analysis</Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Latest Score', value: '82', unit: '/100', up: true },
                { label: 'Analyses Run', value: '3', unit: ' total', up: true },
                { label: 'Score Improvement', value: '+22', unit: ' pts', up: true },
                { label: 'AI Models Covered', value: '7', unit: ' active', up: false },
              ].map(stat => (
                <div key={stat.label} className="bg-white border border-[#e2e8f0] rounded-xl p-4">
                  <div className="text-xs text-[#94a3b8] mb-1">{stat.label}</div>
                  <div className="text-2xl font-bold text-[#0a1628]" style={{ fontFamily: 'var(--font-heading)' }}>
                    {stat.value}<span className="text-sm font-normal text-[#94a3b8]">{stat.unit}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* In-progress analysis */}
            {mockReports.find(r => r.status === 'analyzing') && (
              <div className="bg-[#0f3460] rounded-xl p-5 mb-6 text-white">
                <div className="flex items-center gap-3 mb-3">
                  <Loader2 size={16} className="animate-spin text-[#10b981]" />
                  <span className="font-semibold text-sm">Analysis in progress</span>
                  <span className="ml-auto text-xs text-white/50">dataflow.io/pricing</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#10b981] rounded-full w-[62%] transition-all" />
                </div>
                <div className="mt-2 text-xs text-white/40">Evaluating AI readability and entity signals… 62%</div>
              </div>
            )}

            {/* Latest report scores */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-white border border-[#e2e8f0] rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-[#0a1628] text-sm" style={{ fontFamily: 'var(--font-heading)' }}>
                    Latest Report Scores
                  </h2>
                  <Link to="/report/r1" className="text-xs text-[#0f3460] hover:text-[#10b981] flex items-center gap-1">
                    Full Report <ChevronRight size={12} />
                  </Link>
                </div>
                <div className="space-y-3">
                  {scoreCategories.slice(0, 6).map(cat => (
                    <ProgressBar key={cat.label} label={cat.label} value={cat.score} height={5} />
                  ))}
                </div>
              </div>

              <div className="bg-white border border-[#e2e8f0] rounded-xl p-5">
                <h2 className="font-bold text-[#0a1628] text-sm mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                  Recent Reports
                </h2>
                <div className="space-y-3">
                  {mockReports.map(report => (
                    <div key={report.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#f8fafc] transition-colors">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        report.status === 'complete' ? 'bg-emerald-50' :
                        report.status === 'analyzing' ? 'bg-blue-50' : 'bg-red-50'
                      }`}>
                        {report.status === 'complete' ? <CheckCircle2 size={16} className="text-[#10b981]" /> :
                         report.status === 'analyzing' ? <Loader2 size={16} className="text-blue-500 animate-spin" /> :
                         <AlertCircle size={16} className="text-red-500" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-[#0a1628] truncate">{report.url}</div>
                        <div className="text-xs text-[#94a3b8]">{report.plan} · {report.date}</div>
                      </div>
                      {report.status === 'complete' ? (
                        <Link to={`/report/${report.id}`} className="text-sm font-bold text-[#10b981]">
                          {report.score}
                        </Link>
                      ) : (
                        <Badge variant="info">Analyzing</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-[#0a1628]" style={{ fontFamily: 'var(--font-heading)' }}>Reports</h1>
              <Link to="/pricing"><Button size="sm">New Analysis</Button></Link>
            </div>
            <div className="bg-white border border-[#e2e8f0] rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#e2e8f0] bg-[#f8fafc]">
                    {['URL', 'Plan', 'Date', 'Score', 'Status', ''].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[#94a3b8] uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {mockReports.map(r => (
                    <tr key={r.id} className="border-b border-[#f1f5f9] last:border-0 hover:bg-[#f8fafc] transition-colors">
                      <td className="px-4 py-3 font-medium text-[#0a1628]">{r.url}</td>
                      <td className="px-4 py-3 text-[#64748b]">{r.plan}</td>
                      <td className="px-4 py-3 text-[#64748b]">{r.date}</td>
                      <td className="px-4 py-3">
                        {r.status === 'complete' ? (
                          <span className="font-bold text-[#10b981]">{r.score}</span>
                        ) : '—'}
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={r.status === 'complete' ? 'success' : r.status === 'analyzing' ? 'info' : 'error'}>
                          {r.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right">
                        {r.status === 'complete' && (
                          <div className="flex gap-2 justify-end">
                            <Link to={`/report/${r.id}`}>
                              <button className="p-1.5 hover:bg-[#e8f0fb] rounded text-[#64748b] hover:text-[#0f3460] transition-colors">
                                <ExternalLink size={14} />
                              </button>
                            </Link>
                            <button className="p-1.5 hover:bg-[#e8f0fb] rounded text-[#64748b] hover:text-[#0f3460] transition-colors">
                              <Download size={14} />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab !== 'overview' && activeTab !== 'reports' && (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="text-4xl mb-3">🔧</div>
              <h2 className="font-bold text-[#0a1628] mb-1">{navItems.find(n => n.id === activeTab)?.label}</h2>
              <p className="text-sm text-[#94a3b8]">This section is coming soon.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
