/**
 * CreatorBridge / Editorial Signal
 * Frontend-only prototype with local state. No customer testimonials, campaign records,
 * performance claims, payment data, or social API data are presented as real.
 */
import { useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";

type Role = "brand" | "creator" | "admin";

const navItems: Record<Role, string[]> = {
  brand: ["Overview", "Campaigns", "Applications", "Submissions", "Performance", "Payments"],
  creator: ["Overview", "Discover campaigns", "My applications", "Active campaigns", "Submissions", "Earnings"],
  admin: ["Overview", "Users", "Campaign verification", "Reports", "Disputes", "Platform statistics"],
};

function Mark({ compact = false }: { compact?: boolean }) {
  return <span className={compact ? "brand-mark compact" : "brand-mark"} aria-hidden="true"><i /><b /></span>;
}

function PublicNav({ onLogin }: { onLogin: () => void }) {
  return <header className="public-nav"><Link href="/" className="wordmark"><Mark /><span>Creator<span>Bridge</span></span></Link><nav><a href="#how">How it works</a><a href="#campaigns">Campaigns</a><a href="#for-creators">For creators</a></nav><div className="nav-actions"><button className="quiet-button" onClick={onLogin}>Log in</button><Link href="/register" className="primary-button">Create account <span>↗</span></Link></div></header>;
}

function Landing({ onLogin }: { onLogin: () => void }) {
  return <div className="public-shell"><PublicNav onLogin={onLogin} /><main>
    <section className="hero-section">
      <div className="hero-copy"><p className="kicker"><span className="orange-rule" /> The campaign marketplace for real momentum</p><h1>Where good briefs find <em>good people.</em></h1><p className="hero-lede">CreatorBridge brings brands and independent creators into the same clear, accountable workflow — from first brief to proof of impact.</p><div className="hero-actions"><button className="primary-button large" onClick={onLogin}>Explore the workspace <span>↗</span></button><a className="underlined-link" href="#how">See how it works <span>↓</span></a></div><div className="hero-note"><span className="tiny-seal">CB</span><span>Built for campaigns that care about the work<br /><b>Prototype preview · no live records connected</b></span></div></div>
      <div className="hero-art"><img src="/manus-storage/creatorbridge-hero_87f2fb2a.png" alt="Abstract collage of a creator filming a campaign" /><div className="hero-sticker">BRIEF<br /><strong>→</strong><br />PROOF</div><div className="hero-caption">A better signal<br /><span>between ideas &amp; impact.</span></div></div>
    </section>

    <section className="stat-strip"><div><strong>—</strong><span>live creator profiles</span></div><div><strong>—</strong><span>published campaigns</span></div><div><strong>—</strong><span>tracked transactions</span></div><div><strong>—</strong><span>verified performance</span></div><p>Live data is not connected.<br /><b>Frontend prototype only.</b></p></section>

    <section className="how-section" id="how"><div className="section-intro"><p className="kicker"><span className="orange-rule" /> The useful middle</p><h2>A workflow that keeps<br /><em>the work moving.</em></h2><p>Less chasing. More making. Every campaign has a clear next step, visible ownership, and the context to make a good call.</p></div><div className="steps"><div className="step"><span>01</span><h3>Write the brief</h3><p>Set the objective, content format, deadline, and the signal that matters.</p></div><div className="step featured"><span>02</span><h3>Meet the right creators</h3><p>Browse people by niche, platform, audience, and the quality of their work.</p><div className="step-arrow">↗</div></div><div className="step"><span>03</span><h3>Review the signal</h3><p>Track submissions, eligible views, and earnings in one calm workspace.</p></div></div></section>

    <section className="split-feature"><div className="split-art"><img src="/manus-storage/creatorbridge-process_8ebb25ee.png" alt="Editorial illustration of a campaign moving from brief to earnings" /></div><div className="split-copy"><p className="kicker light"><span className="orange-rule" /> For brands &amp; creators</p><h2>Make something<br /><em>worth measuring.</em></h2><p>CreatorBridge is where the creative brief becomes a shared source of truth. Brands get a reliable workflow. Creators get a fairer way to find work that fits.</p><div className="split-links"><a href="#campaigns">For brands <span>↗</span></a><a href="#for-creators">For creators <span>↗</span></a></div></div></section>

    <section className="campaign-section" id="campaigns"><div className="section-head"><div><p className="kicker"><span className="orange-rule" /> Campaign directory</p><h2>Real briefs belong<br /><em>to real data.</em></h2></div></div><div className="public-empty"><div className="empty-symbol">✳</div><h3>No live campaigns published yet.</h3><p>Campaign listings will appear here once a brand connects its workspace and publishes a real brief. Nothing on this page is presented as a customer campaign.</p><button className="primary-button" onClick={onLogin}>Enter the prototype workspace <span>↗</span></button></div></section>

    <section className="closing-cta" id="for-creators"><div><p className="kicker light"><span className="orange-rule" /> The bridge is open</p><h2>Ready to move<br /><em>the right work?</em></h2></div><div className="cta-right"><p>Start with a profile. Bring a brief. Let the work do the talking.</p><button className="cream-button" onClick={onLogin}>Enter CreatorBridge <span>↗</span></button></div></section>
  </main><footer><Link href="/" className="wordmark"><Mark compact /><span>Creator<span>Bridge</span></span></Link><span>© 2026 CreatorBridge · A frontend prototype</span><span>No testimonials or customer claims are used.</span></footer></div>;
}

function Login({ onChoose }: { onChoose: (role: Role, name: string) => void }) {
  const [role, setRole] = useState<Role>("creator");
  const [name, setName] = useState("");
  return <div className="auth-shell"><div className="auth-aside"><Link href="/" className="wordmark light-wordmark"><Mark /><span>Creator<span>Bridge</span></span></Link><div><p className="kicker light"><span className="orange-rule" /> Private workspace</p><h1>Good work<br /><em>starts here.</em></h1><p>Choose a role and enter your own name to explore the prototype workspace.</p></div><span className="auth-aside-note">Mock interface · no real payments, testimonials, or social API connections</span></div><div className="auth-panel"><Link href="/" className="back-link">← Back to home</Link><div className="auth-card"><p className="kicker"><span className="orange-rule" /> Sign in</p><h2>Enter your workspace.</h2><p className="muted">Your name will appear in the dashboard greeting, avatar, and sidebar.</p><div className="role-switch">{(["creator", "brand", "admin"] as Role[]).map(r => <button key={r} className={role === r ? "selected" : ""} onClick={() => setRole(r)}>{r === "creator" ? "Creator" : r === "brand" ? "Brand" : "Admin"}</button>)}</div><label>Your name<input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name" /></label><label>Email address<input type="email" placeholder="you@example.com" /></label><label>Password<input type="password" placeholder="••••••••" /></label><button className="primary-button full" onClick={() => onChoose(role, name.trim() || `${role.charAt(0).toUpperCase()}${role.slice(1)} account`)}>Enter as {role} <span>↗</span></button><p className="auth-foot">New here? <Link href="/register">Create a profile</Link></p></div></div></div>;
}

function EmptyPanel({ title, description }: { title: string; description: string }) {
  return <div className="empty-state"><div className="empty-symbol">✳</div><h3>{title}</h3><p>{description}</p></div>;
}

function Dashboard({ role, name, onLogout }: { role: Role; name: string; onLogout: () => void }) {
  const [active, setActive] = useState("Overview");
  const [search, setSearch] = useState("");
  const displayName = name.trim() || `${role.charAt(0).toUpperCase()}${role.slice(1)} account`;
  const initials = displayName.split(/\s+/).filter(Boolean).slice(0, 2).map(part => part.charAt(0).toUpperCase()).join("") || "CB";
  const filtered = useMemo(() => [], [search]);
  const isAdmin = role === "admin";
  const title = isAdmin ? `${displayName}, platform workspace.` : `Good morning, ${displayName}.`;
  const subtitle = isAdmin ? "Connect live records when the backend is ready." : "Your workspace is ready for real campaign data.";
  const metrics = isAdmin ? [["Total users", "—", "No live data connected"], ["Total brands", "—", "No live data connected"], ["Total creators", "—", "No live data connected"], ["Platform transactions", "—", "Payments not connected"]] : role === "creator" ? [["Active campaigns", "—", "Awaiting connected data"], ["Pending applications", "—", "Awaiting connected data"], ["Total views", "—", "Social APIs not connected"], ["Total earnings", "—", "Payments not connected"]] : [["Active campaigns", "—", "Awaiting connected data"], ["Campaign budget", "—", "No live briefs connected"], ["Applications", "—", "Awaiting connected data"], ["Total views", "—", "Social APIs not connected"]];
  const pageTitle = active === "Overview" ? "Overview" : active;
  return <div className="dashboard-shell"><aside className="sidebar"><Link href="/" className="wordmark"><Mark /><span>Creator<span>Bridge</span></span></Link><div className="workspace-label">{role} workspace</div><nav className="side-nav">{navItems[role].map(item => <button key={item} className={active === item ? "active" : ""} onClick={() => setActive(item)}><span className="nav-symbol">{item === "Overview" ? "◒" : item === "Campaigns" || item === "Discover campaigns" ? "▦" : item === "Applications" || item === "My applications" ? "≡" : item === "Performance" || item === "Platform statistics" ? "⌁" : item === "Payments" || item === "Earnings" ? "₹" : item === "Users" ? "◎" : "□"}</span>{item}</button>)}</nav><div className="sidebar-bottom"><button onClick={() => toast.info("Profile settings are part of the prototype.")}>◌ <span>{displayName}</span></button><button onClick={onLogout}>↪ <span>Sign out</span></button></div></aside><main className="dashboard-main"><header className="dash-header"><div><span className="breadcrumb">{role} / {pageTitle.toLowerCase()}</span><h1>{title}</h1><p>{subtitle}</p></div><div className="dash-header-actions"><button className="icon-button" onClick={() => toast.info("No live notifications in this prototype.")}>♧</button>{role === "brand" && <button className="primary-button" onClick={() => toast.info("Campaign creation will be connected to a backend later.")}>New campaign <span>+</span></button>}<div className="top-avatar">{initials}</div></div></header>{active === "Overview" ? <><section className="metrics-grid">{metrics.map(([label, value, detail]) => <div className="metric-card" key={label}><div className="metric-label">{label}<span>—</span></div><strong>{value}</strong><small>{detail}</small></div>)}</section><section className="dashboard-columns"><div className="panel large-panel"><div className="panel-head"><div><span className="eyebrow">Workspace records</span><h2>Nothing connected yet</h2></div><button className="underlined-link" onClick={() => setActive(role === "creator" ? "Discover campaigns" : "Campaigns")}>Open directory <span>↗</span></button></div><EmptyPanel title="No campaign records in this workspace." description="Real briefs, applications, submissions, and approvals will appear here when a backend or local data source is connected." /></div><div className="panel signal-panel"><span className="eyebrow">Performance signal</span><h2>—</h2><p>Live metrics are not connected</p><div className="no-signal">No verified performance data yet</div></div></section></> : <section className="page-panel"><div className="panel-head"><div><span className="eyebrow">{active}</span><h2>{active === "Discover campaigns" ? "Find your next good fit" : `${active}, in one place.`}</h2></div><div className="search-box"><span>⌕</span><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search connected records" /></div></div>{filtered.length ? <div className="campaign-grid dashboard-campaigns" /> : <EmptyPanel title="No connected records yet." description="This prototype keeps live campaigns, users, payments, and performance data empty until a real source is connected." />}</section>}</main></div>;
}

export default function Home() {
  const [location, navigate] = useLocation();
  const [role, setRole] = useState<Role | null>(null);
  const [userName, setUserName] = useState("");
  if (role) return <Dashboard role={role} name={userName} onLogout={() => { setRole(null); setUserName(""); }} />;
  if (location === "/login" || location === "/register") return <Login onChoose={(selectedRole, name) => { setRole(selectedRole); setUserName(name); }} />;
  return <Landing onLogin={() => navigate("/login")} />;
}
