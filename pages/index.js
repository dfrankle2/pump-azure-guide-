import Head from 'next/head'
import { useState, useEffect } from 'react'

const SETUP_STEPS = [
  { id: 's1', text: 'Navigate to Cost Management in Azure Portal' },
  { id: 's2', text: 'Select the billing scope with access to all subscriptions' },
  { id: 's3', text: 'Go to the Cost Management section' },
  { id: 's4', text: 'Set date range to Last 3 months' },
  { id: 's5', text: 'Set granularity to Daily' },
]

const CSV_FILES = [
  {
    id: 'f1',
    label: 'File 1',
    group: 'Service Name',
    description: 'Shows breakdown by Azure product (OpenAI, Compute, Storage…)',
    icon: '🗂',
  },
  {
    id: 'f2',
    label: 'File 2',
    group: 'Reservation',
    description: 'Reveals reserved instance usage and coverage gaps',
    icon: '📦',
  },
  {
    id: 'f3',
    label: 'File 3',
    group: 'Subscription',
    description: 'Maps spend across your Azure subscriptions',
    icon: '🏢',
  },
  {
    id: 'f4',
    label: 'File 4',
    group: 'Pricing Model',
    description: 'Highlights on-demand vs. reserved vs. spot usage',
    icon: '💰',
  },
]

export default function Home() {
  const [setupDone, setSetupDone] = useState({})
  const [filesDone, setFilesDone] = useState({})
  const [copied, setCopied] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const toggleSetup = (id) =>
    setSetupDone((prev) => ({ ...prev, [id]: !prev[id] }))

  const toggleFile = (id) =>
    setFilesDone((prev) => ({ ...prev, [id]: !prev[id] }))

  const setupCount = Object.values(setupDone).filter(Boolean).length
  const filesCount = Object.values(filesDone).filter(Boolean).length
  const totalSteps = SETUP_STEPS.length + CSV_FILES.length
  const totalDone = setupCount + filesCount
  const pct = Math.round((totalDone / totalSteps) * 100)
  const allDone = totalDone === totalSteps

  const copyEmail = () => {
    const template = `Hi,

I'm working with Pump.co on a cloud cost optimization analysis for your Azure environment.

To generate a savings estimate, we need 4 CSV exports from Azure Cost Management — it takes about 3–5 minutes and contains no sensitive or customer data, only service usage and costs.

Please follow the guide here: ${typeof window !== 'undefined' ? window.location.href : ''}

Files needed (all with Last 3 months / Daily granularity):
• Group by Service Name → Download CSV
• Group by Reservation → Download CSV
• Group by Subscription → Download CSV
• Group by Pricing Model → Download CSV

Once you have the files, reply to this email with them attached. We'll have your estimate ready within 6–12 hours.

Thanks,
David Frankle
Pump.co | david@pump.co | 408-596-6721`

    navigator.clipboard.writeText(template).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  if (!mounted) return null

  return (
    <>
      <Head>
        <title>Azure Billing Export Guide — Pump.co</title>
        <meta name="description" content="Step-by-step guide to export Azure billing data for a Pump savings estimate." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={styles.main}>

        {/* ── Header ── */}
        <header style={styles.header}>
          <div style={styles.headerInner}>
            <div style={styles.logo}>
              <span style={styles.logoMark}>⚡</span>
              <span style={styles.logoText}>pump<span style={styles.logoDot}>.co</span></span>
            </div>
            <div style={styles.headerBadge}>Azure Cost Export Guide</div>
          </div>
        </header>

        {/* ── Hero ── */}
        <section style={styles.hero}>
          <div style={styles.heroEyebrow}>~3–5 minutes · No sensitive data</div>
          <h1 style={styles.heroTitle}>
            Get your Azure<br />
            <span style={styles.heroAccent}>savings estimate</span>
          </h1>
          <p style={styles.heroSub}>
            Export 4 CSV files from Azure Cost Management. We&apos;ll turn them into
            a precise savings analysis within 6–12 hours.
          </p>

          {/* Progress bar */}
          <div style={styles.progressWrap}>
            <div style={styles.progressHeader}>
              <span style={styles.progressLabel}>Overall progress</span>
              <span style={styles.progressPct}>{pct}%</span>
            </div>
            <div style={styles.progressTrack}>
              <div
                style={{
                  ...styles.progressFill,
                  width: `${pct}%`,
                  background: allDone
                    ? 'var(--pump-green)'
                    : 'linear-gradient(90deg, var(--azure) 0%, var(--azure-bright) 100%)',
                }}
              />
            </div>
            <div style={styles.progressFooter}>
              <span>{totalDone} of {totalSteps} steps complete</span>
              {allDone && <span style={styles.allDoneLabel}>🎉 Ready to send!</span>}
            </div>
          </div>
        </section>

        <div style={styles.content}>

          {/* ── Why we need this ── */}
          <section style={styles.card}>
            <div style={styles.cardTag}>Context</div>
            <h2 style={styles.cardTitle}>Why we need this data</h2>
            <p style={styles.cardBody}>
              To calculate your precise savings estimate, Pump needs to understand your Azure cost structure:
            </p>
            <div style={styles.pillRow}>
              {['Azure services used', 'Daily spend patterns (30–60 days)', 'Utilization trends'].map((p) => (
                <div key={p} style={styles.pill}>{p}</div>
              ))}
            </div>
            <div style={styles.privacyBox}>
              <span style={styles.privacyIcon}>🔒</span>
              <div>
                <strong style={{ color: 'var(--text-primary)' }}>Privacy note</strong>
                <p style={styles.privacyText}>
                  These exports contain <em>no</em> customer information, proprietary code, or sensitive business data —
                  only service usage and costs. GDPR-compliant and safe to share.
                </p>
              </div>
            </div>
          </section>

          {/* ── Step 1: Initial Setup ── */}
          <section style={styles.card}>
            <div style={styles.stepHeader}>
              <div style={styles.stepBadge}>Step 1</div>
              <div style={styles.stepProgress}>
                <span style={{ color: setupCount === SETUP_STEPS.length ? 'var(--pump-green)' : 'var(--azure-bright)' }}>
                  {setupCount}/{SETUP_STEPS.length}
                </span> complete
              </div>
            </div>
            <h2 style={styles.cardTitle}>Initial setup <span style={styles.doOnce}>(do once)</span></h2>
            <p style={styles.cardBody}>
              In the Azure portal, configure Cost Management with the right scope and date range before exporting.
            </p>
            <div style={styles.checkList}>
              {SETUP_STEPS.map((step, i) => {
                const done = !!setupDone[step.id]
                return (
                  <button
                    key={step.id}
                    style={{ ...styles.checkItem, ...(done ? styles.checkItemDone : {}) }}
                    onClick={() => toggleSetup(step.id)}
                    aria-label={`Toggle: ${step.text}`}
                  >
                    <div style={{ ...styles.checkBox, ...(done ? styles.checkBoxDone : {}) }}>
                      {done ? '✓' : i + 1}
                    </div>
                    <span style={{ ...styles.checkText, ...(done ? styles.checkTextDone : {}) }}>
                      {step.text}
                    </span>
                  </button>
                )
              })}
            </div>
          </section>

          {/* ── Step 2: Export CSVs ── */}
          <section style={styles.card}>
            <div style={styles.stepHeader}>
              <div style={styles.stepBadge}>Step 2</div>
              <div style={styles.stepProgress}>
                <span style={{ color: filesCount === CSV_FILES.length ? 'var(--pump-green)' : 'var(--azure-bright)' }}>
                  {filesCount}/{CSV_FILES.length}
                </span> downloaded
              </div>
            </div>
            <h2 style={styles.cardTitle}>Export 4 CSV files</h2>
            <p style={styles.cardBody}>
              Using the same date range (<strong>Last 3 months</strong>) and granularity (<strong>Daily</strong>),
              group by each dimension below and download a separate CSV.
            </p>

            <div style={styles.settingsBanner}>
              <div style={styles.settingItem}>
                <span style={styles.settingIcon}>📅</span>
                <div>
                  <div style={styles.settingKey}>Date range</div>
                  <div style={styles.settingVal}>Last 3 months</div>
                </div>
              </div>
              <div style={styles.settingDivider} />
              <div style={styles.settingItem}>
                <span style={styles.settingIcon}>📊</span>
                <div>
                  <div style={styles.settingKey}>Granularity</div>
                  <div style={styles.settingVal}>Daily</div>
                </div>
              </div>
            </div>

            <div style={styles.fileGrid}>
              {CSV_FILES.map((f) => {
                const done = !!filesDone[f.id]
                return (
                  <button
                    key={f.id}
                    style={{ ...styles.fileCard, ...(done ? styles.fileCardDone : {}) }}
                    onClick={() => toggleFile(f.id)}
                    aria-label={`Toggle ${f.label}: Group by ${f.group}`}
                  >
                    <div style={styles.fileCardTop}>
                      <span style={styles.fileIcon}>{f.icon}</span>
                      <div style={{ ...styles.fileCheck, ...(done ? styles.fileCheckDone : {}) }}>
                        {done ? '✓' : ''}
                      </div>
                    </div>
                    <div style={styles.fileLabel}>{f.label}</div>
                    <div style={styles.fileGroup}>Group by: <strong>{f.group}</strong></div>
                    <div style={styles.fileDesc}>{f.description}</div>
                    <div style={{ ...styles.fileAction, ...(done ? styles.fileActionDone : {}) }}>
                      {done ? 'Downloaded ✓' : '→ Download CSV'}
                    </div>
                  </button>
                )
              })}
            </div>

            <div style={styles.proTip}>
              <span style={styles.proTipIcon}>💡</span>
              <span><strong>Pro tip:</strong> Keep date range and granularity identical across all 4 exports for clean comparison.</span>
            </div>
          </section>

          {/* ── Send to Pump ── */}
          <section style={{ ...styles.card, ...(allDone ? styles.cardGlow : {}) }}>
            <div style={styles.cardTag} className="tag-green">Next step</div>
            <h2 style={styles.cardTitle}>Send files to Pump</h2>
            <p style={styles.cardBody}>
              Email the 4 CSV files to David Frankle. We&apos;ll reply with your savings estimate within 6–12 hours.
            </p>

            <div style={styles.contactGrid}>
              <a href="mailto:david@pump.co?subject=Azure Billing Data — Cost Export" style={styles.contactCard}>
                <span style={styles.contactIcon}>✉️</span>
                <div>
                  <div style={styles.contactLabel}>Email</div>
                  <div style={styles.contactValue}>david@pump.co</div>
                </div>
              </a>
              <a href="tel:4085966721" style={styles.contactCard}>
                <span style={styles.contactIcon}>📞</span>
                <div>
                  <div style={styles.contactLabel}>Phone</div>
                  <div style={styles.contactValue}>408-596-6721</div>
                </div>
              </a>
            </div>

            <button style={styles.copyBtn} onClick={copyEmail}>
              {copied ? '✓ Copied to clipboard!' : '📋 Copy forwardable email template'}
            </button>

            <p style={styles.turnaround}>
              ⚡ Estimates typically delivered within <strong>6–12 hours</strong> of receiving data.
            </p>
          </section>

        </div>

        {/* ── Footer ── */}
        <footer style={styles.footer}>
          <div style={styles.footerInner}>
            <span style={{ color: 'var(--text-muted)' }}>© 2025 Pump.co — Cloud Cost Optimization</span>
            <a href="https://pump.co" style={styles.footerLink} target="_blank" rel="noopener noreferrer">pump.co ↗</a>
          </div>
        </footer>

      </main>
    </>
  )
}

/* ─────────────── Styles ─────────────── */
const styles = {
  main: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },

  /* Header */
  header: {
    borderBottom: '1px solid var(--border)',
    background: 'rgba(10,15,30,0.8)',
    backdropFilter: 'blur(12px)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  headerInner: {
    maxWidth: 780,
    margin: '0 auto',
    padding: '14px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontFamily: 'Syne, sans-serif',
    fontWeight: 700,
    fontSize: 18,
    color: 'var(--text-primary)',
    letterSpacing: '-0.03em',
  },
  logoMark: { fontSize: 20 },
  logoText: { color: 'var(--text-primary)' },
  logoDot: { color: 'var(--azure-bright)' },
  headerBadge: {
    fontSize: 12,
    fontWeight: 500,
    color: 'var(--azure-bright)',
    background: 'var(--azure-glow)',
    border: '1px solid rgba(0,163,255,0.2)',
    padding: '4px 12px',
    borderRadius: 100,
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
  },

  /* Hero */
  hero: {
    maxWidth: 780,
    margin: '0 auto',
    padding: '60px 24px 40px',
    width: '100%',
  },
  heroEyebrow: {
    fontSize: 13,
    fontWeight: 500,
    color: 'var(--azure-bright)',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  heroTitle: {
    fontFamily: 'Syne, sans-serif',
    fontSize: 'clamp(36px, 6vw, 56px)',
    fontWeight: 800,
    lineHeight: 1.1,
    letterSpacing: '-0.04em',
    color: 'var(--text-primary)',
    marginBottom: 16,
  },
  heroAccent: {
    background: 'linear-gradient(135deg, var(--azure-bright) 0%, #60cfff 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  heroSub: {
    fontSize: 17,
    color: 'var(--text-secondary)',
    lineHeight: 1.65,
    maxWidth: 520,
    marginBottom: 36,
  },

  /* Progress */
  progressWrap: {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 16,
    padding: '20px 24px',
  },
  progressHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  progressLabel: { fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 },
  progressPct: { fontSize: 13, color: 'var(--text-primary)', fontWeight: 600 },
  progressTrack: {
    height: 6,
    background: 'rgba(255,255,255,0.06)',
    borderRadius: 100,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    borderRadius: 100,
    transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  progressFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 12,
    color: 'var(--text-muted)',
  },
  allDoneLabel: {
    color: 'var(--pump-green)',
    fontWeight: 600,
  },

  /* Content */
  content: {
    maxWidth: 780,
    margin: '0 auto',
    padding: '0 24px 60px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  /* Card */
  card: {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 18,
    padding: '32px',
    transition: 'border-color 0.3s',
  },
  cardGlow: {
    borderColor: 'rgba(0, 230, 118, 0.35)',
    boxShadow: '0 0 40px rgba(0, 230, 118, 0.06)',
  },
  cardTag: {
    display: 'inline-block',
    fontSize: 11,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: 'var(--azure-bright)',
    background: 'var(--azure-glow)',
    border: '1px solid rgba(0,163,255,0.2)',
    padding: '3px 10px',
    borderRadius: 100,
    marginBottom: 14,
  },
  cardTitle: {
    fontFamily: 'Syne, sans-serif',
    fontSize: 22,
    fontWeight: 700,
    letterSpacing: '-0.03em',
    color: 'var(--text-primary)',
    marginBottom: 10,
  },
  cardBody: {
    fontSize: 15,
    color: 'var(--text-secondary)',
    lineHeight: 1.65,
    marginBottom: 20,
  },
  doOnce: {
    fontFamily: 'DM Sans, sans-serif',
    fontSize: 13,
    fontWeight: 400,
    color: 'var(--text-muted)',
    letterSpacing: 0,
  },

  /* Pills */
  pillRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  pill: {
    fontSize: 13,
    color: 'var(--text-secondary)',
    background: 'var(--surface-2)',
    border: '1px solid var(--border)',
    padding: '5px 14px',
    borderRadius: 100,
  },

  /* Privacy box */
  privacyBox: {
    display: 'flex',
    gap: 14,
    background: 'rgba(0,163,255,0.05)',
    border: '1px solid rgba(0,163,255,0.15)',
    borderRadius: 12,
    padding: '16px 18px',
    alignItems: 'flex-start',
  },
  privacyIcon: { fontSize: 20, flexShrink: 0, marginTop: 2 },
  privacyText: {
    fontSize: 13,
    color: 'var(--text-secondary)',
    lineHeight: 1.6,
    marginTop: 4,
  },

  /* Step header */
  stepHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  stepBadge: {
    fontSize: 11,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: 'var(--azure-bright)',
    background: 'var(--azure-glow)',
    border: '1px solid rgba(0,163,255,0.2)',
    padding: '3px 10px',
    borderRadius: 100,
  },
  stepProgress: {
    fontSize: 13,
    color: 'var(--text-muted)',
  },

  /* Checklist */
  checkList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  checkItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    background: 'var(--surface-2)',
    border: '1px solid var(--border)',
    borderRadius: 12,
    padding: '14px 16px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    textAlign: 'left',
    width: '100%',
    outline: 'none',
  },
  checkItemDone: {
    background: 'rgba(0, 230, 118, 0.05)',
    borderColor: 'rgba(0, 230, 118, 0.25)',
  },
  checkBox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    border: '1.5px solid var(--border-active)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
    fontWeight: 700,
    color: 'var(--azure-bright)',
    flexShrink: 0,
    background: 'var(--azure-glow)',
    transition: 'all 0.2s',
  },
  checkBoxDone: {
    background: 'var(--pump-green)',
    border: '1.5px solid var(--pump-green)',
    color: '#0a1a0f',
  },
  checkText: {
    fontSize: 14,
    color: 'var(--text-secondary)',
    lineHeight: 1.4,
    transition: 'color 0.2s',
  },
  checkTextDone: {
    color: 'var(--text-muted)',
    textDecoration: 'line-through',
    textDecorationColor: 'rgba(0, 230, 118, 0.4)',
  },

  /* Settings banner */
  settingsBanner: {
    display: 'flex',
    gap: 0,
    background: 'var(--surface-2)',
    border: '1px solid var(--border)',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
  },
  settingItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '14px 20px',
    flex: 1,
  },
  settingDivider: {
    width: 1,
    background: 'var(--border)',
  },
  settingIcon: { fontSize: 20 },
  settingKey: { fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 },
  settingVal: { fontSize: 15, color: 'var(--text-primary)', fontWeight: 600, marginTop: 2 },

  /* File grid */
  fileGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: 12,
    marginBottom: 16,
  },
  fileCard: {
    background: 'var(--surface-2)',
    border: '1px solid var(--border)',
    borderRadius: 14,
    padding: '20px',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 0.25s',
    outline: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  fileCardDone: {
    background: 'rgba(0, 230, 118, 0.05)',
    borderColor: 'rgba(0, 230, 118, 0.3)',
  },
  fileCardTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  fileIcon: { fontSize: 22 },
  fileCheck: {
    width: 22,
    height: 22,
    borderRadius: 6,
    border: '1.5px solid var(--border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
    fontWeight: 700,
    color: '#0a1a0f',
    transition: 'all 0.2s',
  },
  fileCheckDone: {
    background: 'var(--pump-green)',
    borderColor: 'var(--pump-green)',
  },
  fileLabel: {
    fontSize: 11,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: 'var(--text-muted)',
  },
  fileGroup: {
    fontSize: 14,
    color: 'var(--text-primary)',
    fontWeight: 400,
  },
  fileDesc: {
    fontSize: 12,
    color: 'var(--text-muted)',
    lineHeight: 1.5,
    flex: 1,
  },
  fileAction: {
    fontSize: 12,
    fontWeight: 600,
    color: 'var(--azure-bright)',
    marginTop: 8,
    transition: 'color 0.2s',
  },
  fileActionDone: {
    color: 'var(--pump-green)',
  },

  /* Pro tip */
  proTip: {
    display: 'flex',
    gap: 10,
    background: 'rgba(255, 200, 0, 0.05)',
    border: '1px solid rgba(255, 200, 0, 0.15)',
    borderRadius: 10,
    padding: '12px 16px',
    fontSize: 13,
    color: 'var(--text-secondary)',
    lineHeight: 1.5,
    alignItems: 'flex-start',
  },
  proTipIcon: { flexShrink: 0, marginTop: 1 },

  /* Contact */
  contactGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 12,
    marginBottom: 20,
  },
  contactCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    background: 'var(--surface-2)',
    border: '1px solid var(--border)',
    borderRadius: 12,
    padding: '16px',
    textDecoration: 'none',
    transition: 'border-color 0.2s',
  },
  contactIcon: { fontSize: 22 },
  contactLabel: { fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 },
  contactValue: { fontSize: 14, color: 'var(--azure-bright)', fontWeight: 500, marginTop: 2 },

  /* Copy button */
  copyBtn: {
    width: '100%',
    padding: '14px',
    background: 'var(--azure-glow)',
    border: '1px solid rgba(0,163,255,0.3)',
    borderRadius: 12,
    color: 'var(--azure-bright)',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
    marginBottom: 16,
    fontFamily: 'DM Sans, sans-serif',
    letterSpacing: '-0.01em',
  },
  turnaround: {
    textAlign: 'center',
    fontSize: 13,
    color: 'var(--text-muted)',
    lineHeight: 1.5,
  },

  /* Footer */
  footer: {
    borderTop: '1px solid var(--border)',
    marginTop: 'auto',
  },
  footerInner: {
    maxWidth: 780,
    margin: '0 auto',
    padding: '20px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 13,
    alignItems: 'center',
  },
  footerLink: {
    color: 'var(--azure-bright)',
    textDecoration: 'none',
    fontWeight: 500,
  },
}
