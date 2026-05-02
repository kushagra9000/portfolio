    const { useState, useEffect, useRef, useCallback } = React;

    const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
      "theme": "light",
      "headlineVariant": 1,
      "showVideo": true,
      "videoOpacity": 100
    }/*EDITMODE-END*/;

    // ─── Scroll reveal hook ───────────────────────────────────────
    function useReveal() {
      useEffect(() => {
        const els = document.querySelectorAll('.reveal');
        const obs = new IntersectionObserver((entries) => {
          entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } });
        }, { threshold: 0.12 });
        els.forEach(el => obs.observe(el));
        return () => obs.disconnect();
      }, []);
    }

    // ─── Custom Cursor ────────────────────────────────────────────
    function useCursor() {
      useEffect(() => {
        const dot = document.getElementById('cursor-dot');
        const ring = document.getElementById('cursor-ring');
        let rx = 0, ry = 0;
        const onMove = e => {
          dot.style.left = e.clientX + 'px';
          dot.style.top = e.clientY + 'px';
          rx = e.clientX; ry = e.clientY;
        };
        let raf;
        const lerp = (a, b, t) => a + (b - a) * t;
        let cx = 0, cy = 0;
        const tick = () => {
          cx = lerp(cx, rx, 0.1);
          cy = lerp(cy, ry, 0.1);
          ring.style.left = cx + 'px';
          ring.style.top = cy + 'px';
          raf = requestAnimationFrame(tick);
        };
        tick();
        document.addEventListener('mousemove', onMove);
        const hoverEls = () => document.querySelectorAll('a,button,.work-card,.lab-card');
        const addHover = () => hoverEls().forEach(el => {
          el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
          el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
        });
        addHover();
        const mo = new MutationObserver(addHover);
        mo.observe(document.body, { childList: true, subtree: true });
        return () => { document.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); mo.disconnect(); };
      }, []);
    }

    // ─── Video Hero — seamless crossfade loop ─────────────────────
    function HeroVideo({ showVideo, opacity }) {
      const aRef = useRef(null);
      const bRef = useRef(null);
      const activeRef = useRef('a');
      const rafRef = useRef(null);
      const SRC = "uploads/hero.mp4";
      const CROSSFADE = 1.2; // seconds before end to start crossfade

      useEffect(() => {
        if (!showVideo) return;
        const va = aRef.current;
        const vb = bRef.current;
        if (!va || !vb) return;

        const target = opacity / 100;

        // Fade in on first play
        va.style.opacity = '0';
        vb.style.opacity = '0';

        const fadeIn = () => {
          let o = 0;
          const step = () => {
            o = Math.min(o + 0.03, target);
            va.style.opacity = o;
            if (o < target) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        };

        const crossfade = (from, to) => {
          to.currentTime = 0;
          to.play().catch(() => {});
          let t = 0;
          const step = () => {
            t = Math.min(t + 0.025, 1);
            from.style.opacity = (target * (1 - t)).toFixed(3);
            to.style.opacity   = (target * t).toFixed(3);
            if (t < 1) requestAnimationFrame(step);
            else { from.pause(); from.currentTime = 0; }
          };
          requestAnimationFrame(step);
        };

        // timeupdate watcher
        const watchA = () => {
          if (!va.duration) return;
          if (activeRef.current === 'a' && va.duration - va.currentTime < CROSSFADE) {
            activeRef.current = 'b';
            va.removeEventListener('timeupdate', watchA);
            vb.addEventListener('timeupdate', watchB);
            crossfade(va, vb);
          }
        };
        const watchB = () => {
          if (!vb.duration) return;
          if (activeRef.current === 'b' && vb.duration - vb.currentTime < CROSSFADE) {
            activeRef.current = 'a';
            vb.removeEventListener('timeupdate', watchB);
            va.addEventListener('timeupdate', watchA);
            crossfade(vb, va);
          }
        };

        va.addEventListener('timeupdate', watchA);
        va.play().catch(() => {});
        fadeIn();

        return () => {
          va.removeEventListener('timeupdate', watchA);
          vb.removeEventListener('timeupdate', watchB);
          va.pause(); vb.pause();
        };
      }, [showVideo, opacity]);

      if (!showVideo) return null;
      return (
        <div className="hero-video-wrap">
          <video ref={aRef} className="hero-video" src={SRC} muted={true} playsInline={true} preload="metadata" poster="uploads/hero-poster.jpg" style={{opacity:0,position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover'}}></video>
          <video ref={bRef} className="hero-video" src={SRC} muted={true} playsInline={true} preload="metadata" poster="uploads/hero-poster.jpg" style={{opacity:0,position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover'}}></video>
        </div>
      );
    }

    // ─── Nav ──────────────────────────────────────────────────────
    function Nav() {
      const [light, setLight] = useState(false);
      useEffect(() => {
        const hero = document.querySelector('.hero');
        const fn = () => {
          const heroH = hero ? hero.offsetHeight : window.innerHeight;
          setLight(window.scrollY > heroH - 80);
        };
        window.addEventListener('scroll', fn, { passive: true });
        return () => window.removeEventListener('scroll', fn);
      }, []);
      return (
        <nav className={`nav-outer${light ? ' nav-light' : ''}`}>
          <div className="nav-inner">
            <span className="nav-logo">KVS<sup>®</sup></span>
            <div className="nav-links">
              <a href="#work" className="active">Work</a>
              <a href="#process">About</a>
              <a href="#lab">Lab</a>
              <a href="#contact">Contact</a>
            </div>
            <button className="nav-cta" onClick={() => window.scrollTo({ top: document.getElementById('contact').offsetTop, behavior: 'smooth' })}>
              Let's Build →
            </button>
          </div>
        </nav>
      );
    }

    // ─── Hero ─────────────────────────────────────────────────────
    const headlines = [
      <><span>Designing systems,</span><br /><em>not just screens.</em></>,
      <><span>Beyond complexity,</span><br /><em>I build systems that endure.</em></>,
      <><span>Where clarity</span><br /><em>meets scale.</em></>,
    ];

    function Hero({ tweaks }) {
      return (
        <section className="hero">
          <HeroVideo showVideo={tweaks.showVideo} opacity={tweaks.videoOpacity} />
          <div className="hero-scrim"></div>
          <div className="hero-content">
            <p className="hero-tag animate-fade-rise">Systems Designer · UI/UX Engineer · Product Builder</p>
            <h1 className="hero-headline animate-fade-rise-delay">
              {headlines[tweaks.headlineVariant - 1]}
            </h1>
            <p className="hero-desc animate-fade-rise-delay-2">
              I build systems that handle complexity — from AI-powered scheduling to medical software. Clarity, scale, decisions that work in the real world.
            </p>
            <div className="hero-actions animate-fade-rise-delay-3">
              <button className="btn-primary" onClick={() => window.scrollTo({ top: document.getElementById('work').offsetTop, behavior: 'smooth' })}>Explore Work</button>
              <button className="btn-ghost liquid-glass" onClick={() => window.scrollTo({ top: document.getElementById('contact').offsetTop, behavior: 'smooth' })}>Get in touch</button>
            </div>
          </div>
        </section>
      );
    }

    // ─── Marquee ──────────────────────────────────────────────────
    function Marquee() {
      const items = ['Systems Design', 'AI Integration', 'UX Engineering', 'Product Building', 'Constraint Solving', '0→1 Execution', 'Healthcare Tech', 'Timetable AI'];
      const doubled = [...items, ...items];
      return (
        <div className="marquee-bar">
          <div className="marquee-track">
            {doubled.map((item, i) => (
              <span key={i} className="marquee-item">{item}<span className="marquee-dot"> ·</span></span>
            ))}
          </div>
        </div>
      );
    }

    // ─── Work ─────────────────────────────────────────────────────
    const projects = [
      {
        num: '01',
        title: 'Taybly — AI Timetable System',
        tags: ['Systems Design', 'AI Solver', 'Product Ownership'],
        desc: 'Designed and built a constraint-based scheduling system for schools and colleges. Handles teachers, rooms, subjects, and complex constraints — turning operational chaos into structured systems.',
        images: ['uploads/taybly-1.webp','uploads/taybly-2.webp','uploads/taybly-3.webp'],
        href: 'case-studies/taybly',
      },
      {
        num: '02',
        title: 'Pathology LIMS System',
        tags: ['Healthcare', 'Hybrid Architecture', 'Systems Design'],
        desc: 'A hybrid-first LIMS designed for unreliable infrastructure environments. Ensures uninterrupted lab operations regardless of connectivity — reliability where it matters most.',
        images: ['uploads/lims-1.webp','uploads/lims-2.webp','uploads/lims-3.webp'],
        href: 'case-studies/lims',
      },
      {
        num: '03',
        title: 'TorqUp — Automotive Intelligence',
        tags: ['Automotive Hub', 'AI Integration', 'Product Strategy'],
        desc: 'A unified platform for automotive enthusiasts — AI-powered insights, community, and decision tools without the fragmentation. Scaling digital ecosystems for passionate communities.',
        images: ['uploads/torqup-1.webp','uploads/torqup-3.webp'],
        href: 'case-studies/torqup',
      },
    ];

    // ─── Image Carousel ───────────────────────────────────────
    function ImageCarousel({ images, active }) {
      const [idx, setIdx] = React.useState(0);
      const [fade, setFade] = React.useState(true);
      React.useEffect(() => {
        if (!active || images.length <= 1) return;
        const t = setInterval(() => {
          setFade(false);
          setTimeout(() => { setIdx(i => (i + 1) % images.length); setFade(true); }, 300);
        }, 2600);
        return () => clearInterval(t);
      }, [images, active]);
      return (
        <div className="work-film-img">
          <div className="work-film-browser-bar">
            <div className="work-film-browser-dot" style={{background:'#FF5F57'}}></div>
            <div className="work-film-browser-dot" style={{background:'#FEBC2E'}}></div>
            <div className="work-film-browser-dot" style={{background:'#28C840'}}></div>
          </div>
          <div className="work-film-img-inner">
            <img src={images[idx]} alt="" style={{opacity: fade ? 1 : 0, transition:'opacity 0.3s ease'}} />
          </div>
          {images.length > 1 && (
            <div className="work-film-img-dots" style={{position:'absolute',bottom:12,left:'50%',transform:'translateX(-50%)'}}>
              {images.map((_,i) => (
                <div key={i} className={"work-film-img-dot"+(i===idx?' active':'')}
                  onClick={() => { setFade(false); setTimeout(()=>{ setIdx(i); setFade(true); },200); }}></div>
              ))}
            </div>
          )}
        </div>
      );
    }

    // ─── Work Section — Horizontal Filmstrip ──────────────────────
    function WorkSection() {
      const [active, setActive] = React.useState(0);
      const sectionRef = React.useRef(null);
      const trackRef = React.useRef(null);
      const dotsRef = React.useRef(null);
      const progressRef = React.useRef(null);
      const CARD_GAP = 24;

      React.useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;
        const onScroll = () => {
          const rect = section.getBoundingClientRect();
          const totalH = section.offsetHeight - window.innerHeight;
          const scrolled = Math.max(0, -rect.top);
          const progress = Math.min(scrolled / totalH, 1);
          // Active index
          const idx = Math.min(Math.floor(progress * projects.length), projects.length - 1);
          setActive(idx);
          // Move track
          const track = trackRef.current;
          if (track) {
            const cardW = window.innerWidth - 144;
            const offset = idx * (cardW + CARD_GAP);
            track.style.transform = `translateX(-${offset}px)`;
          }
          // Progress bar
          if (progressRef.current) {
            progressRef.current.querySelector('.work-film-bar').style.width = (progress * 100) + '%';
          }
          // Dots
          const inView = rect.top < window.innerHeight && rect.bottom > 0;
          if (dotsRef.current) dotsRef.current.classList.toggle('visible', inView);
          if (progressRef.current) progressRef.current.classList.toggle('visible', inView);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
      }, []);

      return (
        <>
          <div ref={progressRef} className="work-film-progress"><div className="work-film-bar"></div></div>
          <div ref={dotsRef} className="work-dots">
            {projects.map((_, i) => (
              <div key={i} className={"work-dot"+(i===active?' active':'')}></div>
            ))}
          </div>
          <div ref={sectionRef} className="work-film-section" id="work"
            style={{height: `${projects.length * 100 + 40}vh`}}>
            {/* Stats row — above the sticky zone */}
            <div className="section" style={{paddingTop:'64px', paddingBottom:'0', position:'relative', zIndex:1}}>
              <p className="section-label reveal">Selected Work</p>
              <div className="stats-row reveal d1">
                <div className="stat-cell"><span className="stat-val">2+</span><span className="stat-label">Production products<br/>shipped end-to-end</span></div>
                <div className="stat-cell"><span className="stat-val">AI+</span><span className="stat-label">Timetables · LIMS<br/>Automation pipelines</span></div>
                <div className="stat-cell"><span className="stat-val">0→1</span><span className="stat-label">Full execution<br/>idea to production</span></div>
              </div>
            </div>
            <div className="work-film-pin">
              <div className="work-film-header">
                <span className="work-film-label">Selected Work</span>
                <span className="work-film-counter">
                  <em>{String(active + 1).padStart(2,'0')}</em> / {String(projects.length).padStart(2,'0')}
                </span>
              </div>
              <div ref={trackRef} className="work-film-track" style={{transition:'transform 0.65s cubic-bezier(0.76,0,0.24,1)'}}>
                {projects.map((p, i) => (
                  <div key={p.num} className={"work-film-card"+(i!==active?' inactive':'')}>
                    <ImageCarousel images={p.images} active={i===active} />
                    <div className="work-film-info">
                      <div>
                        <div className="work-film-num">{p.num}</div>
                        <div className="work-film-tags">{p.tags.map(t=><span key={t} className="work-film-tag">{t}</span>)}</div>
                        <h3 className="work-film-title">{p.title}</h3>
                        <p className="work-film-desc">{p.desc}</p>
                      </div>
                      <a href={p.href} className="work-film-cta">View Case Study <span>→</span></a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      );
    }

        // ─── Process ──────────────────────────────────────────────────
    function ProcessSection() {
      const [activeStep, setActiveStep] = React.useState(0);
      const steps = [
        { num: '01', title: 'Constraint Mapping', desc: 'I start by defining the problem space — the rules, edge cases, and real-world constraints that shape every decision before a single pixel is drawn.', detail: 'What are the hard limits? What breaks first? What does success actually look like?', icon: '◈' },
        { num: '02', title: 'System Architecture', desc: 'Building scalable logic: data flows, decision trees, and system boundaries. I design how things connect, not just how they look.', detail: 'Entities, relationships, edge cases, failure modes — all mapped before any UI is designed.', icon: '⬡' },
        { num: '03', title: '0 → 1 Execution', desc: 'From architecture to working software. I bridge product thinking, engineering, and UX to take ideas from validated concept to production.', detail: 'I write the code, design the flows, and ship — one loop at a time.', icon: '↗' },
        { num: '04', title: 'Operational Clarity', desc: 'Refining for the real world — imperfect environments, real users, real infrastructure. Robustness and simplicity over theoretical perfection.', detail: 'Field-tested, edge-case-hardened, and clear enough for anyone to maintain.', icon: '◎' },
      ];
      React.useEffect(() => {
        const t = setInterval(() => setActiveStep(s => (s + 1) % steps.length), 3000);
        return () => clearInterval(t);
      }, []);
      return (
        <section className="section" id="process" style={{paddingTop:0}}>
          <p className="section-label reveal">Approach</p>
          <div className="process-new-layout reveal d1">
            <div className="process-new-left">
              <h2 className="process-new-heading">How I<br /><em>actually work.</em></h2>
              <p className="process-new-sub">Four phases. No fluff. Systems that survive contact with reality.</p>
            </div>
            <div className="process-new-right">
              {steps.map((s, i) => (
                <div
                  key={s.num}
                  className={"process-step-row" + (i === activeStep ? " active" : "")}
                  onClick={() => setActiveStep(i)}
                >
                  <div className="process-step-header">
                    <span className="process-step-icon">{s.icon}</span>
                    <span className="process-step-num">{s.num}</span>
                    <h3 className="process-step-title">{s.title}</h3>
                    <span className="process-step-chevron">{i === activeStep ? '−' : '+'}</span>
                  </div>
                  <div className="process-step-body">
                    <div className="process-step-body-inner">
                      <p className="process-step-desc">{s.desc}</p>
                      <p className="process-step-detail">{s.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    // ─── Lab ──────────────────────────────────────────────────────
    function LabSection() {
      const [hovered, setHovered] = React.useState(null);
      const experiments = [
        { id: 0, tag: 'AI · Scheduling', title: 'Constraint Solvers', desc: 'High-density scheduling with real-world feasibility. Turns impossible requirements into working timetables.', stat: '99.2% conflict-free', color: '#1a1a1a' },
        { id: 1, tag: 'AI · Language', title: 'LLM Workflows', desc: 'Natural language → system actions. Making AI behave like a precise collaborator, not a hallucinating oracle.', stat: '< 200ms response', color: '#0f1f12' },
        { id: 2, tag: 'Design · Data', title: 'Visualizing Logic', desc: 'Complex decision trees, made legible. If you can see the system, you can fix the system.', stat: 'Zero ambiguity', color: '#1a1208' },
      ];
      return (
        <section className="section" id="lab" style={{paddingTop:0}}>
          <p className="section-label reveal">Experiments</p>
          <div className="lab-new-header reveal d1">
            <h2 className="lab-new-heading">AI + <em>Systems Thinking</em></h2>
            <p className="lab-new-sub">Active explorations at the edge of constraint, intelligence, and clarity.</p>
          </div>
          <div className="lab-new-grid reveal d2">
            {experiments.map((e) => (
              <div
                key={e.id}
                className={"lab-new-card" + (hovered === e.id ? " hovered" : "")}
                onMouseEnter={() => setHovered(e.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="lab-new-top">
                  <span className="lab-new-tag">{e.tag}</span>
                  <span className="lab-new-stat">{e.stat}</span>
                </div>
                <h3 className="lab-new-title">{e.title}</h3>
                <p className="lab-new-desc">{e.desc}</p>
                <div className="lab-new-footer">
                  <span className="lab-pulse-dot"></span>
                  <span style={{fontSize:'0.7rem',color:'var(--muted)',letterSpacing:'0.1em',textTransform:'uppercase'}}>Active</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      );
    }

    // ─── Contact ──────────────────────────────────────────────────
    function ContactSection() {
      const [form, setForm] = useState({ name: '', email: '', message: '' });
      const [sent, setSent] = useState(false);
      const [loading, setLoading] = useState(false);
      const update = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
      const submit = async e => {
        e.preventDefault();
        setLoading(true);
        try {
          const response = await fetch('https://formspree.io/f/xbdqpvll', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(form)
          });
          if (response.ok) {
            setSent(true);
          } else {
            console.error('Form submission failed');
            alert('There was an issue sending your message. Please try again.');
          }
        } catch (error) {
          console.error('Error submitting form', error);
          alert('There was a network error. Please try again.');
        } finally {
          setLoading(false);
        }
      };
      return (
        <section className="contact-section" id="contact">
          <div className="contact-inner">
            <div>
              <h2 className="contact-heading reveal">Let's build<br /><em>the future</em><br />of systems.</h2>
              <div className="contact-links">
                <a className="contact-link" href="https://github.com/kushagra9000" target="_blank" rel="noopener noreferrer">↗ GitHub — kushagra9000</a>
                <a className="contact-link" href="https://linkedin.com/in/kvs24" target="_blank" rel="noopener noreferrer">↗ LinkedIn — kvs24</a>
                <a className="contact-link" href="mailto:kushagravs24@gmail.com">↗ Email — Available for opportunities</a>
              </div>
            </div>
            <div className="reveal d2">
              {sent ? (
                <div style={{ padding: '48px 0', fontFamily: "'Instrument Serif', serif", fontSize: '1.6rem' }}>
                  Message sent.<br /><em style={{ color: 'var(--muted)' }}>I'll be in touch.</em>
                </div>
              ) : (
                <form className="contact-form" onSubmit={submit}>
                  <input className="form-field" name="name" placeholder="Name" value={form.name} onChange={update('name')} required disabled={loading} />
                  <input className="form-field" type="email" name="email" placeholder="Email address" value={form.email} onChange={update('email')} required disabled={loading} />
                  <textarea className="form-field" name="message" placeholder="What are we building?" value={form.message} onChange={update('message')} required disabled={loading}></textarea>
                  <button type="submit" className="form-submit" disabled={loading}>
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      );
    }

    // ─── Footer ───────────────────────────────────────────────────
    function Footer() {
      return (
        <footer className="footer">
          <span>© 2026 Kushagra Vikram Singh. Systems Designer & Builder.</span>
          <span>Available for new opportunities</span>
        </footer>
      );
    }

    // ─── Tweaks Panel ─────────────────────────────────────────────
    function TweaksPanel({ tweaks, setTweak, onClose }) {
      return (
        <div className="tweaks-panel open">
          <h3>Tweaks</h3>
          <div className="tweak-row">
            <label>Theme</label>
            <select value={tweaks.theme} onChange={e => setTweak('theme', e.target.value)}>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <div className="tweak-row">
            <label>Headline variant</label>
            <select value={tweaks.headlineVariant} onChange={e => setTweak('headlineVariant', Number(e.target.value))}>
              <option value={1}>Beyond complexity…</option>
              <option value={2}>Designing systems…</option>
              <option value={3}>Where clarity meets scale…</option>
            </select>
          </div>
          <div className="tweak-toggle-row">
            <label>Video background</label>
            <button className={`toggle-pill${tweaks.showVideo ? ' on' : ''}`} onClick={() => setTweak('showVideo', !tweaks.showVideo)}></button>
          </div>
          <div className="tweak-row">
            <label>Video opacity ({tweaks.videoOpacity}%)</label>
            <input type="range" min={20} max={100} step={5} value={tweaks.videoOpacity} onChange={e => setTweak('videoOpacity', Number(e.target.value))} />
          </div>
          <button style={{ fontSize: '0.75rem', color: 'var(--muted)', background: 'none', border: 'none', alignSelf: 'flex-start' }} onClick={onClose}>Close ✕</button>
        </div>
      );
    }

    // ─── App ──────────────────────────────────────────────────────
    function App() {
      const [tweaks, setTweaksState] = useState(TWEAK_DEFAULTS);
      const [tweaksOpen, setTweaksOpen] = useState(false);

      const setTweak = (k, v) => {
        setTweaksState(t => {
          const next = { ...t, [k]: v };
          window.parent.postMessage({ type: '__edit_mode_set_keys', edits: next }, '*');
          return next;
        });
      };

      useEffect(() => {
        document.documentElement.setAttribute('data-theme', tweaks.theme);
      }, [tweaks.theme]);

      useEffect(() => {
        const handler = e => {
          if (e.data?.type === '__activate_edit_mode') setTweaksOpen(true);
          if (e.data?.type === '__deactivate_edit_mode') setTweaksOpen(false);
        };
        window.addEventListener('message', handler);
        window.parent.postMessage({ type: '__edit_mode_available' }, '*');
        return () => window.removeEventListener('message', handler);
      }, []);

      useCursor();
      useReveal();

      return (
        <>
          <Nav />
          <Hero tweaks={tweaks} />
          <Marquee />
          <WorkSection />
          <ProcessSection />
          <LabSection />
          <ContactSection />
          <Footer />
          {tweaksOpen && <TweaksPanel tweaks={tweaks} setTweak={setTweak} onClose={() => { setTweaksOpen(false); window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*'); }} />}
        </>
      );
    }

    ReactDOM.createRoot(document.getElementById('root')).render(<App />);
