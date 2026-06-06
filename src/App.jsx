import { useState, useEffect } from 'react'
import './App.css'

/* ── Theme Toggle ────────────────────────────────────────────────── */
function useTheme() {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem('theme')
    if (stored) return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
    // Override CSS variables for forced theme
    if (theme === 'dark') {
      document.documentElement.style.setProperty('color-scheme', 'dark')
    } else {
      document.documentElement.style.setProperty('color-scheme', 'light')
    }
  }, [theme])

  const toggle = () => setTheme(t => t === 'dark' ? 'light' : 'dark')
  return [theme, toggle]
}

/* ── Nav ─────────────────────────────────────────────────────────── */
function Nav({ theme, toggleTheme }) {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href="#top" className="nav-brand">Obed Frimpong · QSS 20</a>
        <ul className="nav-links">
          <li><a href="#question">Question</a></li>
          <li><a href="#data">Data</a></li>
          <li><a href="#methods">Methods</a></li>
          <li><a href="#results">Results</a></li>
          <li><a href="#takeaway">Takeaway</a></li>
        </ul>
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  )
}

/* ── Hero ────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero-tag">QSS 20 · Final Project · EJI 2024</div>
      <h1>
        Environmental Racism<br />
        <em>in the Data</em>
      </h1>
      <p className="hero-subtitle">
        State- and County-Level Disparities in Environmental Burden
        Using the CDC/ATSDR Environmental Justice Index 2024
      </p>
      <div className="hero-meta">
        <div className="hero-author">
          <span className="hero-author-name">Obed Frimpong</span>
          <span className="hero-author-info">Class of 2027 · Computer Science &amp; QSS · Dartmouth College</span>
        </div>
        <div className="hero-divider" aria-hidden="true" />
        <span className="hero-badge">QSS 20 · June 2026</span>
        <span className="hero-badge">CDC/ATSDR EJI 2024</span>
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <span className="stat-value">74K</span>
          <span className="stat-label">Census Tracts Analyzed</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">36</span>
          <span className="stat-label">EJI Indicators</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">β̂ = 0.93</span>
          <span className="stat-label">OLS Slope (Minority–Burden)</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">Δ ≈ 506</span>
          <span className="stat-label">Michigan's Within-State Gap</span>
        </div>
      </div>
    </section>
  )
}

/* ── Abstract Banner ─────────────────────────────────────────────── */
function Abstract() {
  return (
    <section style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '2rem 1.5rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontSize: '1rem', fontStyle: 'italic', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          Using the CDC/ATSDR Environmental Justice Index 2024, we show that environmental burden is
          spatially concentrated, internally unequal within states, and positively associated with minority
          population at the census-tract level. Idaho, North Dakota, and South Dakota lead state rankings;
          St. John the Baptist Parish (Louisiana) anchors the county list, corroborating the Cancer Alley
          narrative; Michigan shows the largest within-state gap (Δ ≈ 506 rank units); and the OLS slope
          between minority population count and environmental burden is <strong style={{ color: 'var(--accent)' }}>β̂ = 0.93</strong>.
        </p>
      </div>
    </section>
  )
}

/* ── Question Section ────────────────────────────────────────────── */
function QuestionSection() {
  return (
    <section id="question" className="section">
      <div className="section-number">01 — Research Question</div>
      <h2 className="section-title">Does the data confirm environmental racism?</h2>
      <div className="section-body">
        <div>
          <div className="prose">
            <p>
              Environmental justice (EJ) — the principle that no community should bear a
              disproportionate share of environmental hazards — has anchored U.S. public health
              advocacy since the 1987 United Church of Christ report <em>Toxic Wastes and Race in the
              United States</em>. Decades of scholarship confirm that proximity to industrial facilities,
              hazardous waste sites, and elevated ambient pollution clusters in communities that are
              disproportionately Black, Hispanic, Indigenous, or low-income.
            </p>
            <p>
              The CDC/ATSDR EJI 2024 addresses the data availability gap by providing
              census-tract-level rankings for all U.S. census tracts — approximately 74,000 rows —
              combining 36 indicators across Environmental Burden, Social Vulnerability, and Health
              Vulnerability modules. The 2024 edition adds climate indicators for the first time,
              making it the most comprehensive federal EJ tool to date.
            </p>
          </div>
        </div>
        <div className="question-cards">
          <div className="q-card">
            <span className="q-num">i</span>
            <span className="q-text">Which states and counties carry the highest mean environmental burden as measured by RPL_EBM?</span>
          </div>
          <div className="q-card">
            <span className="q-num">ii</span>
            <span className="q-text">Do tracts with larger minority populations systematically face greater environmental burden?</span>
          </div>
          <div className="q-card">
            <span className="q-num">iii</span>
            <span className="q-text">Does the empirical picture confirm or complicate regional narratives — Cancer Alley, the Rust Belt, contaminated tribal lands?</span>
          </div>

          <div className="callout alert" style={{ marginTop: '0.5rem' }}>
            <span className="callout-icon">⚖️</span>
            <div className="callout-text">
              <strong>Disparate Impact Framework</strong>
              Federal civil rights enforcement under Title VI focuses on unequal outcomes regardless of intent — making empirical documentation of burden disparities more critical as legal standards erode.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Data Section ────────────────────────────────────────────────── */
function DataSection() {
  return (
    <section id="data" className="section">
      <div className="section-number">02 — Data</div>
      <h2 className="section-title">CDC/ATSDR Environmental Justice Index 2024</h2>
      <div className="section-body">
        <div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Variable</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code className="var-name">RPL_EBM</code></td>
                <td>National percentile rank on the Environmental Burden Module. Higher = greater burden. Derived from 10 domains: ozone, PM2.5, diesel PM, air-toxics cancer risk, Superfund sites, TRI facilities, hazardous waste, RMP facilities, coal dust, and lead paint.</td>
              </tr>
              <tr>
                <td><code className="var-name">E_MINRTY</code></td>
                <td>Estimated count of non-Hispanic minority residents per tract (ACS 5-year estimates).</td>
              </tr>
              <tr>
                <td><code className="var-name">StateDesc</code></td>
                <td>Full state name.</td>
              </tr>
              <tr>
                <td><code className="var-name">COUNTY</code></td>
                <td>County name.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="data-info-cards">
          <div className="data-info-card">
            <h4>Coverage</h4>
            <p>All U.S. census tracts (~74,000 rows), combining 36 indicators across three modules: Environmental Burden (EBM), Social Vulnerability (SVM), and Health Vulnerability (HVM).</p>
          </div>
          <div className="data-info-card">
            <h4>New in 2024</h4>
            <p>Climate indicators added for the first time — making EJI 2024 the most comprehensive federal environmental justice tool released to date.</p>
          </div>
          <div className="data-info-card">
            <h4>Cleaning Steps</h4>
            <p><code className="var-name">RPL_EBM</code> coerced to numeric; sentinel values of −999 (suppressed data) became NaN. Rows missing RPL_EBM dropped. Seven territories excluded (AK, HI, PR, GU, VI, AS, CNMI) — their raw values extend to −3,000, two orders of magnitude outside the contiguous-state range.</p>
          </div>
          <div className="data-info-card">
            <h4>Source</h4>
            <p>Downloaded directly from the ATSDR website. Publicly available at no cost. Analysis notebook and cleaned CSVs available in the project repository.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Methods Section ─────────────────────────────────────────────── */
function MethodsSection() {
  return (
    <section id="methods" className="section">
      <div className="section-number">03 — Methods</div>
      <h2 className="section-title">Three analytical approaches</h2>
      <div className="section-body">
        <div className="method-cards">
          <div className="method-card">
            <div className="method-icon">📊</div>
            <div>
              <h4>State &amp; County Summaries</h4>
              <p>Mean, median, SD, min, and max of RPL_EBM computed via <code>groupby</code> at state and county levels. Top-10 states and top-20 counties by mean RPL_EBM extracted for visualization.</p>
            </div>
          </div>
          <div className="method-card">
            <div className="method-icon">📐</div>
            <div>
              <h4>Within-State Inequality (Δ)</h4>
              <p>Within-state county gap defined as the difference between the max and min county mean RPL_EBM within each state — capturing spread independent of the statewide mean.</p>
            </div>
          </div>
          <div className="method-card">
            <div className="method-icon">📈</div>
            <div>
              <h4>Minority–Burden OLS Regression</h4>
              <p>Tract-level OLS via <code>numpy.polyfit</code> on all non-missing observations (~74K tracts). A random 5,000-tract sample (seed 42) drawn for scatter display; trend line fit on full dataset.</p>
            </div>
          </div>
          <div className="method-card">
            <div className="method-icon">🐍</div>
            <div>
              <h4>Stack</h4>
              <p>Python 3.11 · pandas 2.1 · numpy 1.26 · matplotlib 3.8 · seaborn 0.13</p>
            </div>
          </div>
        </div>
        <div>
          <div className="formula-block">
            <h4>Within-State Gap Formula</h4>
            <div className="formula">Δ<sub>s</sub> = max<sub>c∈s</sub> r̄<sub>cs</sub> − min<sub>c∈s</sub> r̄<sub>cs</sub></div>
            <p className="formula-caption">where r̄<sub>cs</sub> is the mean RPL_EBM for county c in state s. This captures the spread between the most- and least-burdened counties within each state, independent of the statewide mean.</p>
          </div>

          <div className="callout info" style={{ marginTop: '1.5rem' }}>
            <span className="callout-icon">💡</span>
            <div className="callout-text">
              <strong>Why this matters</strong>
              A state can have a low average burden while harboring extreme internal inequality — meaning resources allocated at the state level would systematically bypass the most affected communities.
            </div>
          </div>

          <div className="callout success" style={{ marginTop: '1rem' }}>
            <span className="callout-icon">🔬</span>
            <div className="callout-text">
              <strong>Territories excluded intentionally</strong>
              Puerto Rico, Guam, USVI, American Samoa, CNMI raw RPL_EBM values extend to −3,000 — discovered only after plotting all jurisdictions together. A separate inset scale was required.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Results Section ─────────────────────────────────────────────── */
function ResultsSection() {
  return (
    <section id="results" className="section">
      <div className="section-number">04 — Results</div>
      <h2 className="section-title">Four key findings</h2>

      {/* Finding cards */}
      <div className="finding-cards">
        <div className="finding-card">
          <div className="finding-stat">Idaho #1</div>
          <h4>State Burden Leaders</h4>
          <p>Idaho, North Dakota, and South Dakota lead — driven by mining operations, agricultural diesel, and tribal land legacy contamination captured by Superfund, TRI, and air-toxics metrics.</p>
        </div>
        <div className="finding-card">
          <div className="finding-stat">St. John</div>
          <h4>Cancer Alley Confirmed</h4>
          <p>St. John the Baptist Parish, LA — the heart of the Cancer Alley petrochemical corridor — ranks in the top 15 counties by mean RPL_EBM, empirically confirming community advocates' claims.</p>
        </div>
        <div className="finding-card">
          <div className="finding-stat">Δ ≈ 506</div>
          <h4>Michigan's Hidden Crisis</h4>
          <p>Michigan ranks lowest among contiguous states in mean burden yet harbors the nation's largest within-state gap. Detroit and Kalamazoo River corridor are masked by rural averages.</p>
        </div>
        <div className="finding-card">
          <div className="finding-stat">β̂ = 0.93</div>
          <h4>Minority–Burden Slope</h4>
          <p>OLS slope across all ~74,000 tracts: for each additional minority resident per tract, environmental burden rank rises by 0.93. p &lt; 0.001. Consistent across the full range of values.</p>
        </div>
      </div>

      {/* Figure 1 */}
      <div className="figure-block mt-lg">
        <h3 style={{ marginBottom: '1rem' }}>Figure 1 — Average Environmental Burden by State</h3>
        <img
          src="/figures/top_states_burden.png"
          alt="Bar chart ranking contiguous U.S. states by mean RPL_EBM. Idaho, North Dakota, and South Dakota lead. Michigan ranks lowest."
        />
        <p className="figure-caption">
          <strong>Fig. 1.</strong> Contiguous U.S. states ranked by mean RPL_EBM (EJI 2024).
          Idaho, North Dakota, and South Dakota lead — reflecting mining, agricultural diesel, and
          tribal-land contamination. Michigan ranks lowest despite harboring the nation's largest
          within-state county gap (Δ ≈ 506). Note: territories excluded (values extend to −3,000).
        </p>
      </div>

      {/* Cancer Alley callout */}
      <div className="callout alert">
        <span className="callout-icon">🏭</span>
        <div className="callout-text">
          <strong>Cancer Alley — Empirically Confirmed</strong>
          St. John the Baptist Parish (Louisiana) ranks in the top 15 counties nationally. Its high RPL_EBM score
          reflects elevated exposure to air-toxics cancer risk, RMP facility proximity, and TRI facility density —
          precisely the hazard types community advocates have documented for decades.
        </div>
      </div>

      {/* Figure 2 */}
      <div className="figure-block mt-md">
        <h3 style={{ marginBottom: '1rem' }}>Figure 2 — County Burden &amp; Within-State Inequality</h3>
        <img
          src="/figures/top_counties_burden.png"
          alt="Top 20 counties by mean RPL_EBM. St. Louis City MO leads, with St. John Baptist Parish LA annotated as Cancer Alley."
        />
        <p className="figure-caption">
          <strong>Fig. 2a.</strong> Top 20 counties by mean RPL_EBM. St. Louis City (MO) ranks first,
          followed by Union County (NJ), Passaic County (NJ), Sutter County (CA), and Bergen County (NJ).
          St. John the Baptist Parish (LA) is annotated as the heart of Cancer Alley. Geographic spread
          spans MO, NJ, CA, OR, PA, LA, VA, and ID — confirming that high-burden counties are not confined
          to any single region.
        </p>
      </div>

      <div className="figure-block">
        <img
          src="/figures/state_county_disparity_gaps.png"
          alt="Within-state county burden gaps. Michigan leads with delta approximately 506, followed by West Virginia at 332."
        />
        <p className="figure-caption">
          <strong>Fig. 2b.</strong> Within-state gap Δ<sub>s</sub> for the 10 states with the largest internal disparities.
          Michigan leads with Δ ≈ 506 rank units, followed by West Virginia (Δ ≈ 332), Tennessee, Virginia, and Texas
          (all Δ &gt; 300). Michigan's low statewide mean (Fig. 1) would suggest a low-burden state — but it harbors
          the nation's largest internal disparity.
        </p>
      </div>

      {/* Figure 3 */}
      <div className="figure-block">
        <h3 style={{ marginBottom: '1rem' }}>Figure 3 — Minority Population vs. Environmental Burden</h3>
        <img
          src="/figures/minority-pop-env-burden.png"
          alt="Scatter plot of minority population count versus RPL_EBM at census tract level. OLS trend line shows slope of 0.93."
        />
        <p className="figure-caption">
          <strong>Fig. 3.</strong> Minority population count (E_MINRTY) vs. environmental burden rank (RPL_EBM)
          at the census-tract level. OLS slope β̂ = 0.93 (p &lt; 0.001, n ≈ 74,000 tracts). 5,000-tract random
          sample displayed (seed 42); trend line fit on full dataset. Note: E_MINRTY is a raw count, not a
          proportion — the slope reflects a count-unit effect, not a percentage-point effect.
        </p>
      </div>
    </section>
  )
}

/* ── Takeaway Section ────────────────────────────────────────────── */
function TakeawaySection() {
  return (
    <section id="takeaway" className="section">
      <div className="section-number">05 — Takeaway</div>
      <h2 className="section-title">What the evidence demands</h2>

      <div className="takeaway-section">
        <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--text)' }}>
          Environmental burden in the United States is <strong>spatially concentrated</strong>,{' '}
          <strong>internally unequal within states</strong>, and{' '}
          <strong>positively associated with minority population count</strong> (β̂ = 0.93, n ≈ 74,000 tracts).
          The empirical picture both confirms and complicates familiar narratives.
        </p>

        <div className="takeaway-grid">
          <div className="takeaway-item">
            <div className="t-icon">✅</div>
            <h4>Cancer Alley Confirmed</h4>
            <p>St. John the Baptist Parish's top-county ranking corroborates decades of community advocacy with federal data.</p>
          </div>
          <div className="takeaway-item">
            <div className="t-icon">🌲</div>
            <h4>Broader Geography</h4>
            <p>High burden in Idaho and the Dakotas reveals a geography of injustice broader than canonical Rust Belt or Southern narratives. Indigenous and agricultural communities are systematically underrepresented in popular discourse.</p>
          </div>
          <div className="takeaway-item">
            <div className="t-icon">⚠️</div>
            <h4>Aggregation Misleads</h4>
            <p>Michigan's Δ ≈ 506 internal gap shows how statewide averages systematically misrepresent local conditions. State-level resource allocation would miss Detroit and the Kalamazoo River corridor entirely.</p>
          </div>
          <div className="takeaway-item">
            <div className="t-icon">🎯</div>
            <h4>Place-Based Policy</h4>
            <p>Results argue for sub-state, place-based targeting of EJ resources rather than block-grant-style state-level allocation. Justice40-style proxy approaches are empirically grounded.</p>
          </div>
        </div>
      </div>

      <div className="section-body mt-lg">
        <div>
          <h3 style={{ fontFamily: 'var(--sans)', fontSize: '1rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>Limitations</h3>
          <ul className="limitations-list">
            <li>RPL_EBM is a national percentile rank — a "high-burden" tract in Vermont and one in Louisiana share a rank but not necessarily comparable absolute pollution levels.</li>
            <li>E_MINRTY is a raw count, not a proportion. The slope β̂ = 0.93 reflects a count-unit effect, not a percentage-point effect — a meaningful interpretive distinction.</li>
            <li>The positive slope establishes disparate impact but cannot adjudicate between discriminatory siting and demographic sorting. Longitudinal or quasi-experimental designs are required for causal inference.</li>
          </ul>
        </div>
        <div>
          <h3 style={{ fontFamily: 'var(--sans)', fontSize: '1rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>Policy Implications</h3>
          <div className="prose">
            <p>
              The legal erosion of the Title VI disparate-impact standard makes empirical documentation
              of disparate outcomes more, not less, critical. It supplies the evidentiary foundation
              for state-level enforcement and community litigation even as federal mechanisms are contested.
            </p>
            <p>
              Future work should recompute within-state percentile ranks for fair comparisons, replace
              minority counts with proportions in regression models, run regional subgroup analyses,
              and incorporate the HVM module to model compounding disadvantage.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── References ──────────────────────────────────────────────────── */
function References() {
  const refs = [
    'United Church of Christ Commission for Racial Justice. Toxic wastes and race in the United States. Technical report, UCC, New York, NY, 1987.',
    'Bullard RD, Mohai P, Saha R, Wright B. Toxic wastes and race at twenty: 1987–2007. Technical report, UCC Justice and Witness Ministries, Cleveland, OH, 2007.',
    'Gao Y, Zheng Q, Peng W, et al. PM2.5 polluters disproportionately and systemically affect people of color in the United States. Science Advances, 9(18):eadf4491, 2023.',
    'Agency for Toxic Substances and Disease Registry. Technical documentation for the 2024 Environmental Justice Index. U.S. Dept. of HHS, CDC/ATSDR, Atlanta, GA, 2024.',
    'Mohai P, Pellow D, Roberts JT. Environmental justice. Annual Review of Environment and Resources, 34:405–430, 2009.',
    'Nardone A, Chiang J, Shonkoff ET. Environmental health and justice screening tools: a critical examination and path forward. Frontiers in Public Health, 8:571298, 2020.',
    'The New York Times. Court blocks federal civil rights tool for environmental justice enforcement. 2024.',
    'Agency for Toxic Substances and Disease Registry. Using the Environmental Justice Index: A resource for state, local, and tribal government. CDC/ATSDR, Atlanta, GA, 2024.',
    'Morello-Frosch R, Zuk M, Jerrett M, Shamasunder B, Kyle AD. Understanding the cumulative impacts of inequalities in environmental health: implications for policy. Health Affairs, 30(5):879–887, 2011.',
  ]
  return (
    <div className="references">
      <h3>References</h3>
      <ol className="ref-list">
        {refs.map((ref, i) => <li key={i}>{ref}</li>)}
      </ol>
    </div>
  )
}

/* ── Footer ──────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p>
          <strong>Obed Frimpong</strong> · Dartmouth College Class of 2027 · Computer Science &amp; QSS ·{' '}
          QSS 20 Final Project, June 2026
        </p>
        <p style={{ marginTop: '0.4rem' }}>
          Data: <a href="https://www.atsdr.cdc.gov/placeandhealth/eji/index.html" target="_blank" rel="noopener noreferrer">CDC/ATSDR Environmental Justice Index 2024</a> — publicly available.
          Thanks to Prof. Herbert Freeze and the QSS 20 teaching staff.
        </p>
      </div>
    </footer>
  )
}

/* ── App ─────────────────────────────────────────────────────────── */
export default function App() {
  const [theme, toggleTheme] = useTheme()

  return (
    <>
      <Nav theme={theme} toggleTheme={toggleTheme} />
      <Hero />
      <Abstract />
      <main className="main">
        <QuestionSection />
        <DataSection />
        <MethodsSection />
        <ResultsSection />
        <TakeawaySection />
        <References />
      </main>
      <Footer />
    </>
  )
}
