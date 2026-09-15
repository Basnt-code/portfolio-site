import { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

import PROFILE from './data/profile.json';
import PROJECTS from './data/projects.json';

/* ------------------------------------------------------------------ */
/* Design tokens & global styles                                       */
/* ------------------------------------------------------------------ */

const PF_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..600;1,9..144,400..500&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

.pf-root {
  --cream: #F6F4EF;
  --cream-card: #FAFAF7;
  --ink: #1A1A18;
  --muted: #737067;
  --accent: #8F3D2C;
  --line: #E2DFD7;
  background: var(--cream);
  color: var(--ink);
  min-height: 100vh;
  width: 100%;
  font-family: 'Inter', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}
.pf-root * { box-sizing: border-box; }
.pf-serif { font-family: 'Fraunces', Georgia, serif; }
.pf-mono { font-family: 'JetBrains Mono', 'SFMono-Regular', monospace; }

.pf-root h1, .pf-root h2, .pf-root h3, .pf-root h4 {
  color: var(--ink);
}

.pf-label {
  font-family: 'JetBrains Mono', 'SFMono-Regular', monospace;
  font-size: 0.6875rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--muted);
}
.pf-text-muted { color: var(--muted); }
.pf-text-accent { color: var(--accent); }
.pf-border { border: 1px solid var(--line); }
.pf-border-t { border-top: 1px solid var(--line); }
.pf-border-b { border-bottom: 1px solid var(--line); }
.pf-card { background: var(--cream-card); border: 1px solid var(--line); }
.pf-plain-btn { background: none; border: none; padding: 0; margin: 0; cursor: pointer; font: inherit; color: inherit; text-align: inherit; }
.pf-underline {
  background-image: linear-gradient(currentColor, currentColor);
  background-position: 0 100%;
  background-repeat: no-repeat;
  background-size: 0% 1px;
  transition: background-size 0.3s ease-out;
  padding-bottom: 1px;
}
.pf-underline:hover { background-size: 100% 1px; }
.pf-arrow { display: inline-block; transition: transform 0.25s ease-out; vertical-align: -1px; }
a:hover .pf-arrow, button:hover .pf-arrow { transform: translate(2px, -2px); }
.pf-pill {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.625rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border: 1px solid var(--line);
  color: var(--muted);
  border-radius: 2px;
}
.pf-avatar { border-radius: 9999px; object-fit: cover; background: var(--line); }
.pf-fade-in { animation: pfFadeIn 0.4s ease-out; }
@keyframes pfFadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
.pf-root :focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
@media (prefers-reduced-motion: reduce) {
  .pf-root *, .pf-root *::before, .pf-root *::after {
    animation-duration: 0.001ms !important;
    transition-duration: 0.001ms !important;
  }
}
`;

function Header({ onNavWork }) {
  return (
    <header className="pf-border-b">
      <div className="max-w-3xl mx-auto px-6 md:px-8 py-5 flex items-center justify-between">
        <span className="pf-serif text-lg" style={{ fontWeight: 600 }}>BN.</span>
        <nav className="flex items-center gap-6">
          <button onClick={onNavWork} className="pf-label pf-underline pf-plain-btn">Work</button>
        </nav>
      </div>
    </header>
  );
}

function Hero({ profile }) {
  return (
    <section className="max-w-3xl mx-auto px-6 md:px-8 pt-16 pb-14">
      <p className="pf-label mb-4">{profile.title}</p>
      <h1 className="pf-serif" style={{ fontSize: 'clamp(2.2rem,5vw,3.25rem)', lineHeight: 1.1, fontWeight: 600 }}>
        {profile.name}
      </h1>
      <p
        className="pf-serif mt-5 max-w-xl"
        style={{ fontStyle: 'italic', fontSize: '1.05rem', lineHeight: 1.6, color: 'var(--muted)' }}
      >
        {profile.introTagline}
      </p>
      <div className="pf-label mt-6 flex flex-wrap items-center gap-x-2 gap-y-1">
        <span>{profile.location}</span>
        <span>/</span>
        <a href={`mailto:${profile.email}`} className="pf-underline pf-text-muted">{profile.email}</a>
        <span>/</span>
        <a
          href={`https://github.com/${profile.githubUsername}`}
          target="_blank"
          rel="noreferrer"
          className="pf-underline pf-text-muted inline-flex items-center gap-1"
        >
          Github <ArrowUpRight size={11} className="pf-arrow" />
        </a>
        <span>/</span>
        <a
          href={`https://linkedin.com/${profile.linkedinPath}`}
          target="_blank"
          rel="noreferrer"
          className="pf-underline pf-text-muted inline-flex items-center gap-1"
        >
          LinkedIn <ArrowUpRight size={11} className="pf-arrow" />
        </a>
      </div>
    </section>
  );
}

function About({ profile, githubStats, githubStatsLoading, githubStatsError }) {
  const reposDisplay = githubStatsLoading || !githubStats ? '—' : githubStats.repos;
  const followersDisplay = githubStatsLoading || !githubStats ? '—' : githubStats.followers.toLocaleString();
  const initials = profile.name.split(' ').map((n) => n[0]).slice(0, 2).join('');

  return (
    <section className="pf-border-t pf-border-b">
      <div className="max-w-3xl mx-auto px-6 md:px-8 py-14 md:grid md:grid-cols-4 md:gap-8">
        <p className="pf-label md:col-span-1">About</p>
        <div className="md:col-span-3 mt-4 md:mt-0">
          <p style={{ lineHeight: 1.7, fontSize: '1rem' }} className="max-w-xl">{profile.about}</p>

          <div className="pf-card mt-6 flex items-center gap-4 px-4 py-3 max-w-md flex-wrap">
            {githubStats && githubStats.avatarUrl ? (
              <img src={githubStats.avatarUrl} alt="" className="pf-avatar" style={{ width: 40, height: 40 }} />
            ) : (
              <div
                className="pf-avatar pf-mono flex items-center justify-center"
                style={{ width: 40, height: 40, fontSize: '0.75rem' }}
              >
                {initials}
              </div>
            )}
            <div className="flex items-center gap-4">
              <div>
                <p className="pf-serif" style={{ fontSize: '1.1rem', fontWeight: 600, lineHeight: 1 }}>{reposDisplay}</p>
                <p className="pf-label mt-1" style={{ fontSize: '0.6rem' }}>Repos</p>
              </div>
              <div>
                <p className="pf-serif" style={{ fontSize: '1.1rem', fontWeight: 600, lineHeight: 1 }}>{followersDisplay}</p>
                <p className="pf-label mt-1" style={{ fontSize: '0.6rem' }}>Followers</p>
              </div>
            </div>
            <a
              href={`https://github.com/${profile.githubUsername}`}
              target="_blank"
              rel="noreferrer"
              className="pf-label ml-auto inline-flex items-center gap-1"
              style={{ color: 'var(--ink)' }}
            >
              @{profile.githubUsername} <ArrowUpRight size={11} className="pf-arrow" />
            </a>
          </div>
          {githubStatsError && (
            <p className="pf-label mt-3">Live GitHub stats unavailable right now.</p>
          )}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, githubUsername }) {
  return (
    <div className="pf-card p-5 flex flex-col">
      <p className="pf-label">{project.year}{project.role ? ` · ${project.role}` : ''}</p>
      <h3 className="pf-serif mt-2" style={{ fontSize: '1.25rem', fontWeight: 600 }}>{project.title}</h3>
      <p className="mt-2 flex-1" style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--muted)' }}>
        {project.summary}
      </p>
      <div className="flex flex-wrap gap-2 mt-4">
        {project.techTags.map((tag) => (
          <span key={tag} className="pf-pill px-2 py-1">{tag}</span>
        ))}
      </div>
      <div className="flex items-center gap-4 mt-4 pf-border-t pt-4">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="pf-label inline-flex items-center gap-1"
            style={{ color: 'var(--ink)' }}
          >
            Visit <ArrowUpRight size={11} className="pf-arrow" />
          </a>
        )}
        <a
          href={`https://github.com/${githubUsername}/${project.repoName}`}
          target="_blank"
          rel="noreferrer"
          className="pf-label pf-text-muted inline-flex items-center gap-1"
        >
          Source <ArrowUpRight size={11} className="pf-arrow" />
        </a>
      </div>
    </div>
  );
}

function CompactProjectRow({ project, githubUsername }) {
  const href = project.liveUrl || `https://github.com/${githubUsername}/${project.repoName}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="pf-card flex items-center justify-between gap-4 px-5 py-4 mt-4"
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div className="flex items-baseline gap-3 flex-wrap">
        <span className="pf-label" style={{ minWidth: '2.5rem' }}>{project.year}</span>
        <span className="pf-serif" style={{ fontWeight: 600 }}>{project.title}</span>
        <span className="pf-text-muted" style={{ fontSize: '0.875rem' }}>— {project.summary}</span>
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        <div className="hidden sm:flex gap-2">
          {project.techTags.map((tag) => (
            <span key={tag} className="pf-pill px-2 py-1">{tag}</span>
          ))}
        </div>
        <ArrowRight size={14} className="pf-arrow" />
      </div>
    </a>
  );
}

function SelectedWork({ projects, githubUsername }) {
  const featured = projects.filter((p) => p.isFeatured);
  const rest = projects.filter((p) => !p.isFeatured);
  return (
    <section id="selected-work" className="max-w-3xl mx-auto px-6 md:px-8 py-14">
      <div className="flex items-baseline justify-between mb-8">
        <h2 className="pf-serif" style={{ fontSize: '1.75rem', fontWeight: 600 }}>Selected Work</h2>
        <span className="pf-label">{String(projects.length).padStart(2, '0')} Projects</span>
      </div>
      {featured.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {featured.map((project) => (
            <ProjectCard key={project.id} project={project} githubUsername={githubUsername} />
          ))}
        </div>
      )}
      {rest.map((project) => (
        <CompactProjectRow key={project.id} project={project} githubUsername={githubUsername} />
      ))}
      {projects.length === 0 && (
        <p className="pf-text-muted" style={{ fontSize: '0.9rem' }}>No projects yet.</p>
      )}
    </section>
  );
}

function Contact({ profile }) {
  return (
    <section className="pf-border-t">
      <div className="max-w-3xl mx-auto px-6 md:px-8 py-20 text-center">
        <p className="pf-label mb-4">Get in touch</p>
        <h2 className="pf-serif" style={{ fontSize: 'clamp(1.75rem,4vw,2.5rem)', lineHeight: 1.25, fontWeight: 600 }}>
          Let&rsquo;s build something<br className="hidden sm:block" /> that lasts.
        </h2>
        <a
          href={`mailto:${profile.email}`}
          className="pf-underline pf-text-accent pf-mono inline-flex items-center gap-1 mt-6"
          style={{ fontSize: '0.8rem', letterSpacing: '0.05em' }}
        >
          {profile.email} <ArrowUpRight size={13} />
        </a>
      </div>
    </section>
  );
}

function Footer({ profile }) {
  return (
    <footer className="pf-border-t">
      <div className="max-w-3xl mx-auto px-6 md:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="pf-label">© {new Date().getFullYear()} {profile.name}</p>
        <div className="flex items-center gap-5">
          <a href={`https://github.com/${profile.githubUsername}`} target="_blank" rel="noreferrer" className="pf-label pf-underline">Github</a>
          <a href={`https://linkedin.com/${profile.linkedinPath}`} target="_blank" rel="noreferrer" className="pf-label pf-underline">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* Main Application                                                   */
/* ------------------------------------------------------------------ */

export default function App() {
  const [githubStats, setGithubStats] = useState(null);
  const [githubStatsLoading, setGithubStatsLoading] = useState(false);
  const [githubStatsError, setGithubStatsError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const CACHE_KEY = 'gh_stats_data';
    const CACHE_TIME_KEY = 'gh_stats_timestamp';
    const ONE_HOUR = 60 * 60 * 1000; // Interval refresh: 1 jam (dalam milidetik)

    // 1. Cek ketersediaan data cache di browser
    const cachedData = localStorage.getItem(CACHE_KEY);
    const cachedTime = localStorage.getItem(CACHE_TIME_KEY);
    const isFresh = cachedTime && Date.now() - Number(cachedTime) < ONE_HOUR;

    // Jika data masih dalam rentang 1 jam, gunakan cache tanpa memanggil API
    if (cachedData && isFresh) {
      setGithubStats(JSON.parse(cachedData));
      return;
    }

    if (!PROFILE.githubUsername) {
      setGithubStats(null);
      return;
    }

    // Tampilkan indikator loading hanya jika belum ada cache sama sekali
    if (!cachedData) setGithubStatsLoading(true);
    setGithubStatsError(false);

    fetch(`https://api.github.com/users/${encodeURIComponent(PROFILE.githubUsername)}`)
      .then((res) => {
        if (!res.ok) throw new Error('API limit reached or user not found');
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        const stats = {
          repos: data.public_repos,
          followers: data.followers,
          avatarUrl: data.avatar_url,
        };
        setGithubStats(stats);
        setGithubStatsLoading(false);

        // Simpan hasil panggilan terbaru beserta penanda waktu
        localStorage.setItem(CACHE_KEY, JSON.stringify(stats));
        localStorage.setItem(CACHE_TIME_KEY, String(Date.now()));
      })
      .catch(() => {
        if (cancelled) return;
        // Jika limit tercapai tetapi ada cache lama, tetap tampilkan data lama
        if (cachedData) {
          setGithubStats(JSON.parse(cachedData));
        } else {
          setGithubStats(null);
          setGithubStatsError(true);
        }
        setGithubStatsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  function handleNavWork() {
    document.getElementById('selected-work')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className="pf-root">
      <style>{PF_STYLES}</style>
      <div className="pf-fade-in">
        <Header onNavWork={handleNavWork} />
        <Hero profile={PROFILE} />
        <About
          profile={PROFILE}
          githubStats={githubStats}
          githubStatsLoading={githubStatsLoading}
          githubStatsError={githubStatsError}
        />
        <SelectedWork projects={PROJECTS} githubUsername={PROFILE.githubUsername} />
        <Contact profile={PROFILE} />
        <Footer profile={PROFILE} />
      </div>
    </div>
  );
}