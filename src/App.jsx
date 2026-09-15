import { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowRight, X, ChevronLeft, Plus, LogOut, Check } from 'lucide-react';

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
  font-family: 'Inter', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}
.pf-root * { box-sizing: border-box; }
.pf-serif { font-family: 'Fraunces', Georgia, serif; }
.pf-mono { font-family: 'JetBrains Mono', 'SFMono-Regular', monospace; }
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
.pf-btn {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6875rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  transition: background-color 0.25s ease-out, border-color 0.25s ease-out, opacity 0.25s ease-out;
  cursor: pointer;
  border-radius: 2px;
}
.pf-btn-dark { background: var(--ink); color: var(--cream); border: 1px solid var(--ink); }
.pf-btn-dark:hover { background: #000; }
.pf-btn-dark:disabled { opacity: 0.55; cursor: not-allowed; }
.pf-btn-accent { background: var(--accent); color: var(--cream); border: 1px solid var(--accent); }
.pf-btn-accent:hover { background: #7a3324; }
.pf-btn-outline { background: transparent; color: var(--ink); border: 1px solid var(--line); }
.pf-btn-outline:hover { border-color: var(--ink); }
.pf-input, .pf-textarea {
  width: 100%;
  background: var(--cream-card);
  border: 1px solid var(--line);
  color: var(--ink);
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  border-radius: 2px;
  transition: border-color 0.2s ease-out;
}
.pf-input:focus, .pf-textarea:focus { outline: none; border-color: var(--accent); }
.pf-input::placeholder, .pf-textarea::placeholder { color: #ACA89B; }
.pf-textarea { resize: vertical; line-height: 1.5; }
.pf-pill {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.625rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border: 1px solid var(--line);
  color: var(--muted);
  border-radius: 2px;
}
.pf-badge-featured {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: var(--accent);
  color: var(--cream);
  border-radius: 2px;
}
.pf-avatar { border-radius: 9999px; object-fit: cover; background: var(--line); }
.pf-fade-in { animation: pfFadeIn 0.4s ease-out; }
@keyframes pfFadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
.pf-modal-overlay { background: rgba(26,26,24,0.45); animation: pfOverlayIn 0.2s ease-out; }
@keyframes pfOverlayIn { from { opacity: 0; } to { opacity: 1; } }
.pf-modal { animation: pfModalIn 0.25s ease-out; border-radius: 3px; }
@keyframes pfModalIn { from { opacity: 0; transform: translateY(8px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
.pf-root :focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
@media (prefers-reduced-motion: reduce) {
  .pf-root *, .pf-root *::before, .pf-root *::after {
    animation-duration: 0.001ms !important;
    transition-duration: 0.001ms !important;
  }
}
`;

/* ------------------------------------------------------------------ */
/* Default / seed data                                                 */
/* ------------------------------------------------------------------ */

const PASSPHRASE = 'studio';

const DEFAULT_PROFILE = {
  name: 'Bastian Nevan',
  title: 'Informatics Engineer Student',
  location: 'Malang, Indonesia',
  email: 'bassstian06@gmail.com',
  githubUsername: 'Basnt-Code',
  linkedinPath: 'in/bastian-nevan',
  introTagline:
    "I design resilient systems and quiet interfaces — the kind of infrastructure that stays out of the way while carrying real weight.",
  about:
    'Seven years building distributed services, developer tooling, and the connective tissue between teams. I care about latency budgets, legible codebases, and shipping things that age well. Currently focused on event-driven platforms and the ergonomics of internal tooling.',
};

const DEFAULT_PROJECTS = [
  {
    id: 'meridian',
    title: 'Meridian',
    summary:
      'A schema-first event gateway that turns Kafka topics into typed, self-documenting APIs for product teams.',
    year: '2025',
    role: 'Lead Engineer',
    techTags: ['GO', 'KAFKA', 'GRPC'],
    repoName: 'meridian',
    liveUrl: 'https://meridian.arya.dev',
    isFeatured: true,
  },
  {
    id: 'lantern',
    title: 'Lantern',
    summary:
      'Observability layer that correlates traces, logs, and deploy markers into a single readable timeline.',
    year: '2024',
    role: 'Creator',
    techTags: ['TYPESCRIPT', 'OPENTELEMETRY', 'CLICKHOUSE'],
    repoName: 'lantern',
    liveUrl: 'https://lantern.arya.dev',
    isFeatured: true,
  },
  {
    id: 'quill-cli',
    title: 'Quill CLI',
    summary:
      'A developer CLI for scaffolding services with sensible defaults, linting, and one-command deploys.',
    year: '2023',
    role: '',
    techTags: ['RUST', 'CLI', 'UX'],
    repoName: 'quill-cli',
    liveUrl: '',
    isFeatured: false,
  },
];

function emptyForm() {
  return {
    title: '',
    summary: '',
    year: String(new Date().getFullYear()),
    role: '',
    tech: '',
    repoName: '',
    liveUrl: '',
    isFeatured: false,
  };
}

/* ------------------------------------------------------------------ */
/* Small shared pieces                                                 */
/* ------------------------------------------------------------------ */

function Field({ label, value, onChange, type = 'text', textarea = false, className = '', placeholder = '', rows = 3 }) {
  const id = 'f-' + label.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return (
    <div className={className}>
      <label htmlFor={id} className="pf-label block mb-2">{label}</label>
      {textarea ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          placeholder={placeholder}
          className="pf-textarea px-3 py-2.5"
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="pf-input px-3 py-2.5"
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Public site sections                                                */
/* ------------------------------------------------------------------ */

function Header({ onNavAdmin, onNavWork }) {
  return (
    <header className="pf-border-b">
      <div className="max-w-3xl mx-auto px-6 md:px-8 py-5 flex items-center justify-between">
        <span className="pf-serif text-lg" style={{ fontWeight: 600 }}>BN.</span>
        <nav className="flex items-center gap-6">
          <button onClick={onNavWork} className="pf-label pf-underline pf-plain-btn">Work</button>
          <button onClick={onNavAdmin} className="pf-label pf-underline pf-plain-btn">Admin</button>
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

function Footer({ profile, onNavAdmin }) {
  return (
    <footer className="pf-border-t">
      <div className="max-w-3xl mx-auto px-6 md:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="pf-label">© {new Date().getFullYear()} {profile.name}</p>
        <div className="flex items-center gap-5">
          <a href={`https://github.com/${profile.githubUsername}`} target="_blank" rel="noreferrer" className="pf-label pf-underline">Github</a>
          <a href={`https://linkedin.com/${profile.linkedinPath}`} target="_blank" rel="noreferrer" className="pf-label pf-underline">LinkedIn</a>
          <button onClick={onNavAdmin} className="pf-label pf-underline pf-plain-btn">Admin</button>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* Admin: login                                                        */
/* ------------------------------------------------------------------ */

function AdminLogin({ onBack, onSubmit, passInput, setPassInput, error }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm pf-fade-in">
        <button onClick={onBack} className="pf-label pf-plain-btn inline-flex items-center gap-1 mb-10">
          <ChevronLeft size={12} /> Back to site
        </button>
        <h1 className="pf-serif" style={{ fontSize: '1.75rem', fontWeight: 600 }}>Admin</h1>
        <p className="mt-2 pf-text-muted" style={{ fontSize: '0.9rem' }}>Enter the passphrase to manage your portfolio.</p>
        <form onSubmit={onSubmit} className="mt-8">
          <label htmlFor="passphrase" className="pf-label block mb-2">Passphrase</label>
          <input
            id="passphrase"
            type="password"
            autoFocus
            value={passInput}
            onChange={(e) => setPassInput(e.target.value)}
            placeholder="Hint: studio"
            className="pf-input px-3 py-2.5"
          />
          {error && <p className="pf-text-accent mt-2" style={{ fontSize: '0.8rem' }}>Incorrect passphrase — try again.</p>}
          <button type="submit" className="pf-btn pf-btn-dark w-full py-3 mt-4">Enter</button>
        </form>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Admin: dashboard                                                     */
/* ------------------------------------------------------------------ */

function AdminDashboard({
  profileForm, setProfileForm, onSaveProfile, savingProfile, profileSaved,
  projects, onNewProject, onEditProject, onDeleteRequest, onConfirmDelete, onCancelDelete, deleteConfirmId,
  onSignOut, onViewSite, storageError,
  resetConfirm, onResetRequest, onResetConfirm, onResetCancel,
}) {
  function field(key, value) {
    setProfileForm((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="pf-fade-in">
      <div className="max-w-3xl mx-auto px-6 md:px-8 py-10">
        <div className="flex flex-wrap items-start justify-between gap-4 pf-border-b pb-6 mb-10">
          <div>
            <p className="pf-label mb-2">Admin panel</p>
            <h1 className="pf-serif" style={{ fontSize: '1.75rem', fontWeight: 600 }}>Manage portfolio</h1>
          </div>
          <div className="flex items-center gap-4 pt-2">
            <button onClick={onViewSite} className="pf-label pf-underline pf-plain-btn inline-flex items-center gap-1">
              View site <ArrowUpRight size={11} />
            </button>
            <button onClick={onSignOut} className="pf-label pf-underline pf-plain-btn inline-flex items-center gap-1">
              <LogOut size={11} /> Sign out
            </button>
          </div>
        </div>

        {storageError && (
          <div className="pf-border pf-text-accent px-4 py-3 mb-8" style={{ fontSize: '0.85rem' }}>
            {storageError}
          </div>
        )}

        <section className="mb-14">
          <h2 className="pf-serif mb-6" style={{ fontSize: '1.25rem', fontWeight: 600 }}>Profile</h2>
          <form onSubmit={onSaveProfile} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Name" value={profileForm.name} onChange={(v) => field('name', v)} />
            <Field label="Title" value={profileForm.title} onChange={(v) => field('title', v)} />
            <Field label="Location" value={profileForm.location} onChange={(v) => field('location', v)} />
            <Field label="Email" type="email" value={profileForm.email} onChange={(v) => field('email', v)} />
            <Field label="Github username" value={profileForm.githubUsername} onChange={(v) => field('githubUsername', v)} />
            <Field label="LinkedIn path" value={profileForm.linkedinPath} onChange={(v) => field('linkedinPath', v)} placeholder="in/yourname" />
            <Field
              label="Intro (hero tagline)"
              value={profileForm.introTagline}
              onChange={(v) => field('introTagline', v)}
              textarea
              rows={3}
              className="sm:col-span-2"
            />
            <Field
              label="About"
              value={profileForm.about}
              onChange={(v) => field('about', v)}
              textarea
              rows={4}
              className="sm:col-span-2"
            />
            <div className="sm:col-span-2 flex items-center gap-4">
              <button type="submit" disabled={savingProfile} className="pf-btn pf-btn-dark px-6 py-2.5">
                {savingProfile ? 'Saving…' : 'Save profile'}
              </button>
              {profileSaved && (
                <span className="pf-label pf-text-accent inline-flex items-center gap-1">
                  <Check size={12} /> Saved
                </span>
              )}
            </div>
          </form>
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="pf-serif" style={{ fontSize: '1.25rem', fontWeight: 600 }}>Projects</h2>
            <button onClick={onNewProject} className="pf-btn pf-btn-accent px-4 py-2 inline-flex items-center gap-1">
              <Plus size={12} /> New project
            </button>
          </div>
          <div className="pf-border">
            {projects.length === 0 && (
              <p className="px-5 py-8 text-center pf-text-muted" style={{ fontSize: '0.9rem' }}>
                No projects yet — add your first one.
              </p>
            )}
            {projects.map((project, i) => (
              <div
                key={project.id}
                className={'px-5 py-4 flex items-start justify-between gap-4 flex-wrap' + (i !== 0 ? ' pf-border-t' : '')}
              >
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="pf-label">{project.year}</span>
                    <span className="pf-serif" style={{ fontWeight: 600 }}>{project.title}</span>
                    {project.isFeatured && <span className="pf-badge-featured px-2 py-0.5">Featured</span>}
                  </div>
                  <p className="mt-1 pf-text-muted" style={{ fontSize: '0.85rem', maxWidth: '42ch' }}>
                    {project.summary}
                  </p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0 pt-1">
                  {deleteConfirmId === project.id ? (
                    <>
                      <span className="pf-label pf-text-accent">Delete?</span>
                      <button onClick={() => onConfirmDelete(project.id)} className="pf-label pf-underline pf-plain-btn pf-text-accent">Yes</button>
                      <button onClick={onCancelDelete} className="pf-label pf-underline pf-plain-btn">No</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => onEditProject(project)} className="pf-label pf-underline pf-plain-btn">Edit</button>
                      <button onClick={() => onDeleteRequest(project.id)} className="pf-label pf-underline pf-plain-btn">Delete</button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-12 pt-6 pf-border-t">
          {resetConfirm ? (
            <span className="pf-label inline-flex items-center gap-3">
              This overwrites your changes with sample data.
              <button onClick={onResetConfirm} className="pf-underline pf-plain-btn pf-text-accent">Confirm</button>
              <button onClick={onResetCancel} className="pf-underline pf-plain-btn">Cancel</button>
            </span>
          ) : (
            <button onClick={onResetRequest} className="pf-label pf-underline pf-plain-btn">Reset to sample data</button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Admin: new / edit project modal                                     */
/* ------------------------------------------------------------------ */

function ProjectModal({ form, setForm, onClose, onSubmit, isEditing }) {
  function f(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }
  return (
    <div
      className="pf-modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="pf-modal pf-card w-full max-w-md p-6" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="pf-serif" style={{ fontSize: '1.25rem', fontWeight: 600 }}>
            {isEditing ? 'Edit project' : 'New project'}
          </h3>
          <button onClick={onClose} className="pf-label pf-plain-btn inline-flex items-center gap-1">
            Close <X size={13} />
          </button>
        </div>
        <form onSubmit={onSubmit} className="space-y-5">
          <Field label="Title" value={form.title} onChange={(v) => f('title', v)} />
          <Field label="Summary" value={form.summary} onChange={(v) => f('summary', v)} textarea rows={3} />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Year" value={form.year} onChange={(v) => f('year', v)} />
            <Field label="Role" value={form.role} onChange={(v) => f('role', v)} />
          </div>
          <Field label="Tech (comma separated)" value={form.tech} onChange={(v) => f('tech', v)} placeholder="Go, Kafka, gRPC" />
          <Field label="Github repo name" value={form.repoName} onChange={(v) => f('repoName', v)} placeholder="my-repo" />
          <Field label="Live link" value={form.liveUrl} onChange={(v) => f('liveUrl', v)} placeholder="https://" />
          <label className="flex items-center gap-2" style={{ cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={form.isFeatured}
              onChange={(e) => f('isFeatured', e.target.checked)}
              style={{ accentColor: '#8F3D2C' }}
            />
            <span className="pf-label">Feature on homepage</span>
          </label>
          <div className="flex items-center gap-3 pt-2">
            <button type="button" onClick={onClose} className="pf-btn pf-btn-outline px-5 py-2.5">Cancel</button>
            <button type="submit" className="pf-btn pf-btn-accent px-5 py-2.5">Save project</button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* App                                                                  */
/* ------------------------------------------------------------------ */

export default function App() {
  const [view, setView] = useState('public'); // 'public' | 'login' | 'admin'
  const [authed, setAuthed] = useState(false);
  const [passInput, setPassInput] = useState('');
  const [passError, setPassError] = useState(false);

  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [profileForm, setProfileForm] = useState(DEFAULT_PROFILE);
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);

  const [savingProfile, setSavingProfile] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);
  const [storageError, setStorageError] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm());
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [resetConfirm, setResetConfirm] = useState(false);

  const [githubStats, setGithubStats] = useState(null);
  const [githubStatsLoading, setGithubStatsLoading] = useState(false);
  const [githubStatsError, setGithubStatsError] = useState(false);

  // Load persisted data once on mount
  useEffect(() => {
    let cancelled = false;
    (async () => {
      let p = DEFAULT_PROFILE;
      let pr = DEFAULT_PROJECTS;
      try {
        const res = await window.storage.get('profile');
        if (res && res.value) p = JSON.parse(res.value);
      } catch (e) {
        /* no saved profile yet — keep default */
      }
      try {
        const res = await window.storage.get('projects');
        if (res && res.value) pr = JSON.parse(res.value);
      } catch (e) {
        /* no saved projects yet — keep default */
      }
      if (!cancelled) {
        setProfile(p);
        setProfileForm(p);
        setProjects(pr);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Live GitHub stats for the profile's username
  useEffect(() => {
    let cancelled = false;
    if (!profile.githubUsername) {
      setGithubStats(null);
      return;
    }
    setGithubStatsLoading(true);
    setGithubStatsError(false);
    fetch(`https://api.github.com/users/${encodeURIComponent(profile.githubUsername)}`)
      .then((res) => {
        if (!res.ok) throw new Error('not ok');
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        setGithubStats({ repos: data.public_repos, followers: data.followers, avatarUrl: data.avatar_url });
        setGithubStatsLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setGithubStats(null);
        setGithubStatsError(true);
        setGithubStatsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [profile.githubUsername]);

  async function persistProfile(newProfile) {
    setSavingProfile(true);
    setStorageError(null);
    setProfile(newProfile);
    try {
      await window.storage.set('profile', JSON.stringify(newProfile));
      setProfileSaved(true);
      setTimeout(() => setProfileSaved(false), 2000);
    } catch (e) {
      setStorageError("Couldn't save your profile — please try again.");
    }
    setSavingProfile(false);
  }

  async function persistProjects(newProjects) {
    setProjects(newProjects);
    setStorageError(null);
    try {
      await window.storage.set('projects', JSON.stringify(newProjects));
    } catch (e) {
      setStorageError("Couldn't save your projects — please try again.");
    }
  }

  function handleSaveProfile(e) {
    e.preventDefault();
    persistProfile(profileForm);
  }

  function handleNavAdmin() {
    setView(authed ? 'admin' : 'login');
  }

  function handleNavWork() {
    const scroll = () => document.getElementById('selected-work')?.scrollIntoView({ behavior: 'smooth' });
    if (view !== 'public') {
      setView('public');
      setTimeout(scroll, 60);
    } else {
      scroll();
    }
  }

  function handleLoginSubmit(e) {
    e.preventDefault();
    if (passInput === PASSPHRASE) {
      setAuthed(true);
      setView('admin');
      setPassError(false);
      setPassInput('');
    } else {
      setPassError(true);
    }
  }

  function handleSignOut() {
    setAuthed(false);
    setView('public');
  }

  function openNewProject() {
    setForm(emptyForm());
    setEditingId(null);
    setModalOpen(true);
  }

  function openEditProject(project) {
    setForm({
      title: project.title,
      summary: project.summary,
      year: project.year,
      role: project.role,
      tech: project.techTags.join(', '),
      repoName: project.repoName,
      liveUrl: project.liveUrl || '',
      isFeatured: project.isFeatured,
    });
    setEditingId(project.id);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  function submitProjectForm(e) {
    e.preventDefault();
    const techTags = form.tech.split(',').map((t) => t.trim().toUpperCase()).filter(Boolean);
    if (editingId) {
      const updated = projects.map((p) =>
        p.id === editingId
          ? {
              ...p,
              title: form.title,
              summary: form.summary,
              year: form.year,
              role: form.role,
              techTags,
              repoName: form.repoName,
              liveUrl: form.liveUrl,
              isFeatured: form.isFeatured,
            }
          : p
      );
      persistProjects(updated);
    } else {
      const newProject = {
        id: `p-${Date.now()}`,
        title: form.title,
        summary: form.summary,
        year: form.year,
        role: form.role,
        techTags,
        repoName: form.repoName,
        liveUrl: form.liveUrl,
        isFeatured: form.isFeatured,
      };
      persistProjects([...projects, newProject]);
    }
    setModalOpen(false);
  }

  function requestDelete(id) {
    setDeleteConfirmId(id);
  }
  function cancelDelete() {
    setDeleteConfirmId(null);
  }
  function confirmDelete(id) {
    persistProjects(projects.filter((p) => p.id !== id));
    setDeleteConfirmId(null);
  }

  function handleResetConfirm() {
    persistProfile(DEFAULT_PROFILE);
    setProfileForm(DEFAULT_PROFILE);
    persistProjects(DEFAULT_PROJECTS);
    setResetConfirm(false);
  }

  return (
    <div className="pf-root">
      <style>{PF_STYLES}</style>

      {view === 'public' && (
        <div className="pf-fade-in" key="public">
          <Header onNavAdmin={handleNavAdmin} onNavWork={handleNavWork} />
          <Hero profile={profile} />
          <About
            profile={profile}
            githubStats={githubStats}
            githubStatsLoading={githubStatsLoading}
            githubStatsError={githubStatsError}
          />
          <SelectedWork projects={projects} githubUsername={profile.githubUsername} />
          <Contact profile={profile} />
          <Footer profile={profile} onNavAdmin={handleNavAdmin} />
        </div>
      )}

      {view === 'login' && (
        <AdminLogin
          onBack={() => setView('public')}
          onSubmit={handleLoginSubmit}
          passInput={passInput}
          setPassInput={setPassInput}
          error={passError}
        />
      )}

      {view === 'admin' && (
        <AdminDashboard
          profileForm={profileForm}
          setProfileForm={setProfileForm}
          onSaveProfile={handleSaveProfile}
          savingProfile={savingProfile}
          profileSaved={profileSaved}
          projects={projects}
          onNewProject={openNewProject}
          onEditProject={openEditProject}
          onDeleteRequest={requestDelete}
          onConfirmDelete={confirmDelete}
          onCancelDelete={cancelDelete}
          deleteConfirmId={deleteConfirmId}
          onSignOut={handleSignOut}
          onViewSite={() => setView('public')}
          storageError={storageError}
          resetConfirm={resetConfirm}
          onResetRequest={() => setResetConfirm(true)}
          onResetConfirm={handleResetConfirm}
          onResetCancel={() => setResetConfirm(false)}
        />
      )}

      {modalOpen && (
        <ProjectModal
          form={form}
          setForm={setForm}
          onClose={closeModal}
          onSubmit={submitProjectForm}
          isEditing={!!editingId}
        />
      )}
    </div>
  );
}
