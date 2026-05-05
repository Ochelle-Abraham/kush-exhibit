"use client";
import { useState, useEffect, useRef } from "react";
import { artifacts, sections, type Artifact } from "./data/artifacts";

/* ─── UTIL ─────────────────────────────────────────────────────── */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold });
    o.observe(el); return () => o.disconnect();
  }, [threshold]);
  return { ref, v };
}

/* ─── NAVIGATION ────────────────────────────────────────────────── */
function Nav({ active }: { active: string }) {
  const [sc, setSc] = useState(false);
  const [mo, setMo] = useState(false);
  useEffect(() => {
    const fn = () => setSc(window.scrollY > 80);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const go = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMo(false); };
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      background: sc ? "rgba(8,6,3,0.97)" : "transparent",
      borderBottom: sc ? "1px solid rgba(200,150,60,0.18)" : "none",
      backdropFilter: sc ? "blur(14px)" : "none",
      padding: sc ? "0.55rem 2rem" : "1rem 2rem",
      transition: "all 0.4s ease",
    }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button onClick={() => go("entrance")} style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
          <div style={{ fontFamily: "'Cinzel Decorative',serif", fontSize: "0.8rem", color: "#c8963c", letterSpacing: "0.06em" }}>☥ CHILDREN</div>
          <div style={{ fontFamily: "'Cinzel',serif", fontSize: "0.48rem", letterSpacing: "0.32em", color: "#8a7e6e", textTransform: "uppercase" }}>OF THE SUN</div>
        </button>
        <div id="dnav" style={{ display: "flex", gap: "1.4rem", alignItems: "center" }}>
          <button onClick={() => go("intro-hall")} style={nbtn(false)}>Overview</button>
          {sections.map(s => (
            <button key={s.id} onClick={() => go(`gallery-${s.id}`)} style={nbtn(active === s.id)}>
              {s.title.split(" ").slice(0, 2).join(" ")}
            </button>
          ))}
          <button onClick={() => go("curatorial")} style={{ ...nbtn(false), background: "rgba(200,150,60,0.1)", border: "1px solid rgba(200,150,60,0.38)", color: "#c8963c", padding: "0.32rem 0.75rem" }}>Curatorial</button>
        </div>
        <button onClick={() => setMo(!mo)} id="ham" aria-label="Menu" style={{ background: "none", border: "none", cursor: "pointer", color: "#c8963c", display: "none" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {mo ? <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" /> : <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />}
          </svg>
        </button>
      </div>
      {mo && (
        <div style={{ background: "rgba(8,6,3,0.98)", borderTop: "1px solid rgba(200,150,60,0.12)", padding: "0.8rem 2rem" }}>
          {[["intro-hall","Museum Overview"],["gallery-rise","Gallery I"],["gallery-divine","Gallery II"],["gallery-synthesis","Gallery III"],["gallery-funerary","Gallery IV"],["gallery-legacy","Gallery V"],["curatorial","Curatorial Note"]].map(([id,label]) => (
            <button key={id} onClick={() => go(id)} style={{ display: "block", background: "none", border: "none", cursor: "pointer", fontFamily: "'Cinzel',serif", fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#d4b896", padding: "0.55rem 0", width: "100%", textAlign: "left", borderBottom: "1px solid rgba(200,150,60,0.07)" }}>{label}</button>
          ))}
        </div>
      )}
      <style>{`@media(max-width:900px){#dnav{display:none!important}#ham{display:block!important}}`}</style>
    </nav>
  );
}
function nbtn(active: boolean): React.CSSProperties {
  return {
    background: "none", border: "none", cursor: "pointer",
    fontFamily: "'Cinzel',serif", fontSize: "0.52rem", letterSpacing: "0.16em",
    textTransform: "uppercase", color: active ? "#c8963c" : "#8a7e6e",
    borderBottom: active ? "1px solid #c8963c" : "1px solid transparent",
    padding: "0.18rem 0", transition: "all 0.3s",
  };
}

/* ─── MUSEUM ENTRANCE ───────────────────────────────────────────── */
function Entrance() {
  const [inn, setInn] = useState(false);
  useEffect(() => { setTimeout(() => setInn(true), 150); }, []);
  return (
    <section id="entrance" style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", textAlign: "center",
      position: "relative", overflow: "hidden", padding: "6rem 2rem 5rem",
      background: "radial-gradient(ellipse at 50% 38%, rgba(26,58,92,0.18) 0%, transparent 65%), #09070400",
    }}>
      {/* Architectural frieze at top */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0 }}>
        <div style={{ height: "4px", background: "linear-gradient(to right, transparent, #c8963c, #e8c878, #c8963c, transparent)" }} />
        <div style={{ height: "18px", background: "linear-gradient(180deg,rgba(200,150,60,0.08),transparent)", borderBottom: "1px solid rgba(200,150,60,0.12)" }} />
      </div>
      {/* BG hieroglyphs */}
      <div aria-hidden style={{ position: "absolute", inset: 0, opacity: 0.032, fontSize: "7.5rem", lineHeight: 1.2, color: "#c8963c", fontFamily: "serif", userSelect: "none", pointerEvents: "none", overflow: "hidden", display: "flex", flexWrap: "wrap", alignContent: "center", justifyContent: "center" }}>
        {"𓂀 𓅓 𓆣 𓇋 𓃭 𓆑 𓅱 𓆓 𓂋 𓁹 𓅆 𓃻 𓆰 𓇯 𓂝 𓃀 𓆗 𓅃 𓂸 𓆤 𓄿 𓌀 𓉐 𓆙".split(" ").map((g,i) => <span key={i}>{g}</span>)}
      </div>
      <div style={{ opacity: inn ? 1 : 0, transform: inn ? "none" : "translateY(38px)", transition: "all 1.3s cubic-bezier(.16,1,.3,1)", maxWidth: "920px" }}>
        {/* Museum type label */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "2rem" }}>
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, rgba(200,150,60,0.35))" }} />
          <p style={{ fontFamily: "'Cinzel',serif", fontSize: "0.58rem", letterSpacing: "0.42em", textTransform: "uppercase", color: "#c8963c", whiteSpace: "nowrap" }}>Digital Humanities Museum Exhibit</p>
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, rgba(200,150,60,0.35))" }} />
        </div>
        {/* Ankh */}
        <div style={{ fontSize: "3.5rem", color: "#c8963c", marginBottom: "1.5rem", display: "inline-block", animation: "flt 4s ease-in-out infinite" }}>☥</div>
        {/* Title */}
        <h1 style={{
          fontFamily: "'Cinzel Decorative',serif",
          fontSize: "clamp(1.9rem,5.5vw,4.6rem)",
          background: "linear-gradient(175deg,#e8c878 0%,#c8963c 55%,#a07428 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          marginBottom: "0.5rem", lineHeight: 1.1,
        }}>Children of the Sun</h1>
        <h2 style={{ fontFamily: "'Cinzel',serif", fontSize: "clamp(0.82rem,2vw,1.25rem)", color: "#d4b896", fontWeight: 400, marginBottom: "0.3rem", letterSpacing: "0.07em" }}>
          The Black Pharaohs of Kush &amp; Egypt&apos;s Twenty-Fifth Dynasty
        </h2>
        <p style={{ fontFamily: "'EB Garamond',serif", fontSize: "clamp(0.85rem,1.4vw,1rem)", color: "#8a7e6e", letterSpacing: "0.1em", marginBottom: "2rem", fontStyle: "italic" }}>
          ca. 747–656 BCE · Kingdom of Kush · Nubian Sudan & Egypt
        </p>
        {/* Ornamental rule */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.6rem", marginBottom: "2rem" }}>
          <div style={{ height: "1px", width: "60px", background: "linear-gradient(to right,transparent,#c8963c)" }} />
          <span style={{ color: "#c8963c", fontSize: "0.9rem" }}>✦</span>
          <div style={{ height: "1px", width: "60px", background: "linear-gradient(to left,transparent,#c8963c)" }} />
        </div>
        {/* Lead text */}
        <p style={{ fontFamily: "'EB Garamond',serif", fontSize: "clamp(0.98rem,1.7vw,1.15rem)", color: "#d4b896", lineHeight: 1.9, maxWidth: "720px", margin: "0 auto 2.5rem", fontStyle: "italic" }}>
          Between 747 and 656 BCE, a dynasty of African kings from the Kingdom of Kush in present-day Sudan
          seized control of Egypt and ruled as pharaohs over one of the largest empires in the ancient world.
          They built more pyramids than the Egyptians, preserved Egypt&apos;s most sacred theological texts, and left
          monumental works across the Nile Valley that endure today. This exhibit restores their story through
          fourteen artifacts drawn from the world&apos;s leading museum collections.
        </p>
        {/* Stats row */}
        <div style={{ display: "flex", gap: "0px", justifyContent: "center", flexWrap: "wrap", marginBottom: "2.8rem", border: "1px solid rgba(200,150,60,0.15)" }}>
          {[["91 Years","of Kushite Rule in Egypt"],["14 Artifacts","across 5 Galleries"],["5 Sections","Chronological & Thematic"],["200+ Pyramids","Built by Nubian Kings"]].map(([n,l],i) => (
            <div key={n} style={{ padding: "1.1rem 1.8rem", borderRight: i < 3 ? "1px solid rgba(200,150,60,0.12)" : "none", textAlign: "center", flex: "1 1 140px" }}>
              <div style={{ fontFamily: "'Cinzel',serif", fontSize: "clamp(0.9rem,1.8vw,1.3rem)", color: "#c8963c", lineHeight: 1 }}>{n}</div>
              <div style={{ fontFamily: "'Cinzel',serif", fontSize: "0.48rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#8a7e6e", marginTop: "0.3rem" }}>{l}</div>
            </div>
          ))}
        </div>
        {/* CTA */}
        <button onClick={() => document.getElementById("intro-hall")?.scrollIntoView({ behavior: "smooth" })} style={{
          background: "rgba(200,150,60,0.1)", border: "1px solid rgba(200,150,60,0.45)",
          color: "#e8c878", fontFamily: "'Cinzel',serif", fontSize: "0.65rem",
          letterSpacing: "0.28em", textTransform: "uppercase", padding: "1rem 2.5rem", cursor: "pointer",
          transition: "all 0.3s",
        }}
        onMouseEnter={e => e.currentTarget.style.background = "rgba(200,150,60,0.2)"}
        onMouseLeave={e => e.currentTarget.style.background = "rgba(200,150,60,0.1)"}>
          Enter the Museum
        </button>
        <div style={{ marginTop: "2.8rem", color: "#8a7e6e", animation: "flt 2s ease-in-out infinite" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" /></svg>
        </div>
      </div>
      {/* Bottom frieze */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
        <div style={{ height: "18px", background: "linear-gradient(0deg,rgba(200,150,60,0.07),transparent)", borderTop: "1px solid rgba(200,150,60,0.1)" }} />
        <div style={{ height: "3px", background: "linear-gradient(to right, transparent, rgba(200,150,60,0.3), transparent)" }} />
      </div>
      <style>{`@keyframes flt{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}`}</style>
    </section>
  );
}

/* ─── INTRO HALL (Visitor's Guide) ─────────────────────────────── */
function IntroHall() {
  const { ref, v } = useInView();
  return (
    <section id="intro-hall" style={{ background: "linear-gradient(180deg,#090704,#0c0a06)", padding: "5rem 2rem", borderTop: "3px solid rgba(200,150,60,0.2)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }} ref={ref}>
        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem", opacity: v ? 1 : 0, transform: v ? "none" : "translateY(18px)", transition: "all 0.7s ease" }}>
          <p style={eyebrow}>Visitor&apos;s Introduction</p>
          <h2 style={sh}>Welcome to the Exhibit</h2>
          <div style={rule} />
        </div>
        {/* Two-column intro */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", marginBottom: "4rem", opacity: v ? 1 : 0, transition: "all 0.8s ease 0.1s" }} className="two-col">
          <div>
            <h3 style={{ fontFamily: "'Cinzel',serif", fontSize: "1.05rem", color: "#e8c878", marginBottom: "1rem" }}>About This Exhibition</h3>
            <p style={body}>
              <em>Children of the Sun: The Black Pharaohs of Kush &amp; Egypt&apos;s 25th Dynasty </em>  is a
             museum exhibit presenting fourteen artifacts from the world&apos;s leading collections of ancient Nubian art and
              archaeology. The exhibit examines the material evidence for the Kushite dynasty that ruled Egypt from approximately
              747 to 656 BCE, one of the most significant and least widely known periods in the history of African civilization.
            </p>
            <p style={{ ...body, marginTop: "1rem" }}>
              The artifacts presented here are drawn from the British Museum (London), the Egyptian Museum (Cairo), the Museum
              of Fine Arts (Boston), the Musée du Louvre (Paris), the Nubian Museum (Aswan), the Kerma Museum (Sudan),
              and the ISAC Museum at the University of Chicago. Each artifact is accompanied by an analysis addressing
              its function, patronage, subject matter, formal construction, and conceptual significance within the history of
              the 25th Dynasty.
            </p>
          </div>
          <div>
            <h3 style={{ fontFamily: "'Cinzel',serif", fontSize: "1.05rem", color: "#e8c878", marginBottom: "1rem" }}>How to Navigate</h3>
            <p style={body}>
              The exhibit is organized into five thematic galleries that follow a broadly chronological and conceptual
              progression. Visitors are invited to move through the galleries in sequence, beginning with the political and
              military story of the Kushite conquest of Egypt, continuing through the dynasty&apos;s religious achievements
              and artistic innovations, its royal funerary traditions, and concluding with questions of legacy, erasure,
              and modern rediscovery.
            </p>
            <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {sections.map((s, i) => (
                <button key={s.id} onClick={() => document.getElementById(`gallery-${s.id}`)?.scrollIntoView({ behavior: "smooth" })} style={{
                  display: "flex", alignItems: "center", gap: "1rem", background: "rgba(200,150,60,0.04)",
                  border: "1px solid rgba(200,150,60,0.14)", padding: "0.65rem 1rem", cursor: "pointer",
                  textAlign: "left", transition: "all 0.25s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(200,150,60,0.1)"; e.currentTarget.style.borderColor = "rgba(200,150,60,0.35)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(200,150,60,0.04)"; e.currentTarget.style.borderColor = "rgba(200,150,60,0.14)"; }}>
                  <span style={{ fontFamily: "'Cinzel',serif", fontSize: "0.65rem", color: "#c8963c", minWidth: "22px" }}>0{i+1}</span>
                  <div>
                    <div style={{ fontFamily: "'Cinzel',serif", fontSize: "0.65rem", letterSpacing: "0.1em", color: "#d4b896" }}>{s.title}</div>
                    <div style={{ fontFamily: "'EB Garamond',serif", fontSize: "0.82rem", color: "#8a7e6e", fontStyle: "italic" }}>{s.subtitle}</div>
                  </div>
                  <span style={{ marginLeft: "auto", color: "#c8963c", fontSize: "0.8rem" }}>→</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* Timeline strip */}
        <div style={{ opacity: v ? 1 : 0, transition: "all 0.8s ease 0.2s" }}>
          <p style={{ ...eyebrow, textAlign: "center", marginBottom: "1.5rem" }}>Historical Timeline</p>
          <div style={{ display: "flex", overflowX: "auto", gap: "0", borderTop: "2px solid rgba(200,150,60,0.2)", paddingTop: "1.2rem", paddingBottom: "0.5rem" }}>
            {[
              ["ca. 760 BCE","Kashta installs Amenirdis I as God's Wife of Amun in Thebes"],
              ["ca. 747 BCE","Piye founds the 25th Dynasty; Egypt unified under Kushite rule"],
              ["716 BCE","Shabaka commissions the Shabaka Stone at Memphis"],
              ["690 BCE","Taharqa's reign begins — the dynasty's apex"],
              ["674–671 BCE","First Assyrian invasions; Taharqa repels and then retreats"],
              ["664 BCE","Final Assyrian conquest; Tantamani is the last Kushite in Egypt"],
              ["656 BCE","Dynasty formally ends; Kushites continue at Napata"],
              ["592 BCE","Psamtik II destroys Kushite monuments"],
              ["2003 CE","Bonnet's team discovers the Kerma statue cache"],
            ].map(([d,e]) => (
              <div key={d} style={{ minWidth: "160px", paddingRight: "1.5rem", position: "relative" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#c8963c", marginBottom: "0.5rem", boxShadow: "0 0 8px rgba(200,150,60,0.4)" }} />
                <div style={{ fontFamily: "'Cinzel',serif", fontSize: "0.5rem", letterSpacing: "0.14em", color: "#c8963c", marginBottom: "0.25rem" }}>{d}</div>
                <p style={{ fontFamily: "'EB Garamond',serif", fontSize: "0.82rem", color: "#8a7e6e", lineHeight: 1.4 }}>{e}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`.two-col{@media(max-width:700px){grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

/* ─── SCHOLAR PULL QUOTE ────────────────────────────────────────── */
function PullQuote({ quote, attribution }: { quote: string; attribution: string }) {
  return (
    <div style={{ background: "linear-gradient(135deg,rgba(26,58,92,0.1),rgba(10,8,4,0) 60%,rgba(139,46,21,0.06)), #09070404", padding: "3rem 2rem", borderTop: "1px solid rgba(200,150,60,0.1)", borderBottom: "1px solid rgba(200,150,60,0.1)" }}>
      <div style={{ maxWidth: "780px", margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontSize: "2.5rem", color: "rgba(200,150,60,0.2)", lineHeight: 1, marginBottom: "1rem" }}>&ldquo;</div>
        <blockquote style={{ fontFamily: "'EB Garamond',serif", fontSize: "clamp(1rem,2vw,1.32rem)", color: "#d4b896", lineHeight: 1.9, fontStyle: "italic", marginBottom: "1.5rem" }}>{quote}</blockquote>
        <div style={{ width: "45px", height: "1px", margin: "0 auto 0.7rem", background: "linear-gradient(to right,transparent,#c8963c,transparent)" }} />
        <cite style={{ fontFamily: "'Cinzel',serif", fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#c8963c", fontStyle: "normal" }}>{attribution}</cite>
      </div>
    </div>
  );
}

/* ─── ARTIFACT CARD ─────────────────────────────────────────────── */
function ArtCard({ a, index, onClick }: { a: Artifact; index: number; onClick: () => void }) {
  const { ref, v } = useInView();
  const [hov, setHov] = useState(false);
  return (
    <div ref={ref} onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "rgba(22,17,10,0.99)" : "rgba(16,13,8,0.97)",
        border: `1px solid ${hov ? "rgba(200,150,60,0.42)" : "rgba(200,150,60,0.15)"}`,
        cursor: "pointer", position: "relative", overflow: "hidden",
        opacity: v ? 1 : 0, transform: v ? "none" : "translateY(26px)",
        transition: `opacity 0.55s ease ${(index % 3) * 0.08}s, transform 0.55s ease ${(index % 3) * 0.08}s, border-color 0.3s, background 0.3s`,
        display: "flex", flexDirection: "column",
      }}>
      {/* Top accent */}
      <div style={{ height: "2px", background: `linear-gradient(to right, transparent, ${hov ? "#c8963c" : "rgba(200,150,60,0.22)"}, transparent)`, flexShrink: 0, transition: "all 0.4s" }} />
      {/* Artifact number */}
      <div style={{ position: "absolute", top: "0.75rem", right: "0.75rem", fontFamily: "'Cinzel',serif", fontSize: "0.48rem", color: "#c8963c", background: "rgba(8,6,3,0.88)", border: "1px solid rgba(200,150,60,0.25)", padding: "0.15rem 0.42rem", zIndex: 2, letterSpacing: "0.1em" }}>
        {String(a.id).padStart(2,"0")}
      </div>
      {/* Image */}
      <div style={{ height: "200px", overflow: "hidden", background: "#181210", flexShrink: 0 }}>
        <img src={a.imageUrl} alt={a.imageAlt} loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "cover", transform: hov ? "scale(1.06)" : "scale(1)", transition: "transform 0.55s ease", filter: "sepia(10%) brightness(0.84)" }}
          onError={e => { (e.target as HTMLImageElement).src = `https://placehold.co/600x400/0a0804/c8963c?text=${encodeURIComponent(a.title.split(" ").slice(0,3).join("+"))}`; }}
        />
        <div style={{ position: "absolute", top: "2px", left: 0, right: 0, height: "200px", background: "linear-gradient(transparent 60%,rgba(9,7,4,0.75))", pointerEvents: "none" }} />
      </div>
      {/* Content */}
      <div style={{ padding: "1rem 1.2rem 1.2rem", flex: 1, display: "flex", flexDirection: "column" }}>
        <p style={{ fontFamily: "'Cinzel',serif", fontSize: "0.49rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c8963c", marginBottom: "0.35rem", opacity: 0.85 }}>{a.date.split(",")[0]}</p>
        <h3 style={{ fontFamily: "'Cinzel',serif", fontSize: "clamp(0.8rem,1.3vw,0.93rem)", color: hov ? "#e8c878" : "#d4b896", marginBottom: "0.55rem", lineHeight: 1.3, transition: "color 0.3s", flex: "0 0 auto" }}>{a.title}</h3>
        <p style={{ fontFamily: "'EB Garamond',serif", fontSize: "0.86rem", color: "#8a7e6e", lineHeight: 1.5, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" as const, flex: 1 }}>
          {a.function.slice(0, 145)}…
        </p>
        {/* Wall label footer */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "0.65rem", marginTop: "0.65rem", borderTop: "1px solid rgba(200,150,60,0.09)" }}>
          <span style={{ fontFamily: "'EB Garamond',serif", fontSize: "0.8rem", color: "#8a7e6e", fontStyle: "italic" }}>{a.material.split(",")[0].slice(0,30)}</span>
          <span style={{ fontFamily: "'Cinzel',serif", fontSize: "0.49rem", letterSpacing: "0.12em", color: "#c8963c" }}>View Label →</span>
        </div>
      </div>
    </div>
  );
}

/* ─── ARTIFACT MODAL (full wall label) ──────────────────────────── */
function Modal({ a, onClose }: { a: Artifact; onClose: () => void }) {
  const [tab, setTab] = useState("function");
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", fn); };
  }, [onClose]);

  const tabs = [
    { id: "function", label: "Function" },
    { id: "patronage", label: "Patronage" },
    { id: "subject", label: "Subject" },
    { id: "formal", label: "Formal Approach" },
    { id: "conceptual", label: "Conceptual Approach" },
  ];
  const content: Record<string, string> = {
    function: a.function, patronage: a.patronage,
    subject: a.subject, formal: a.formalApproach, conceptual: a.conceptualApproach,
  };

  return (
    <div onClick={e => { if (e.target === e.currentTarget) onClose(); }} style={{
      position: "fixed", inset: 0, zIndex: 100,
      background: "rgba(4,3,2,0.94)", backdropFilter: "blur(12px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem",
      animation: "fadein 0.22s ease",
    }}>
      <div style={{
        background: "linear-gradient(150deg,#0e0b07,#0b0904)",
        border: "1px solid rgba(200,150,60,0.28)",
        maxWidth: "1040px", width: "100%", maxHeight: "92vh",
        overflow: "hidden", display: "flex", flexDirection: "column",
        boxShadow: "0 40px 120px rgba(0,0,0,0.85), 0 0 80px rgba(200,150,60,0.04)",
        animation: "mslide 0.3s cubic-bezier(.16,1,.3,1)",
      }}>
        {/* Museum-style top bar */}
        <div style={{ height: "3px", background: "linear-gradient(to right,transparent,#a07428,#e8c878,#c8963c,#e8c878,#a07428,transparent)", flexShrink: 0 }} />
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: "1.2rem", padding: "1.2rem 1.8rem 0.9rem", flexShrink: 0, borderBottom: "1px solid rgba(200,150,60,0.12)", background: "rgba(200,150,60,0.02)" }}>
          <div style={{ flex: 1 }}>
            {/* Gallery breadcrumb */}
            <p style={{ fontFamily: "'Cinzel',serif", fontSize: "0.48rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#8a7e6e", marginBottom: "0.2rem" }}>
              Children of the Sun · {a.sectionTitle} · Artifact {String(a.id).padStart(2,"0")} of 15
            </p>
            <h2 style={{ fontFamily: "'Cinzel',serif", fontSize: "clamp(1rem,2vw,1.55rem)", color: "#e8c878", marginBottom: "0.2rem", lineHeight: 1.25 }}>{a.title}</h2>
            <p style={{ fontFamily: "'Cinzel',serif", fontSize: "0.6rem", color: "#8a7e6e", letterSpacing: "0.06em" }}>{a.date}</p>
          </div>
          <button onClick={onClose} style={{ background: "rgba(200,150,60,0.07)", border: "1px solid rgba(200,150,60,0.2)", color: "#8a7e6e", cursor: "pointer", padding: "0.4rem", flexShrink: 0, transition: "all 0.2s" }}
          onMouseEnter={e => { e.currentTarget.style.color = "#c8963c"; e.currentTarget.style.borderColor = "rgba(200,150,60,0.5)"; }}
          onMouseLeave={e => { e.currentTarget.style.color = "#8a7e6e"; e.currentTarget.style.borderColor = "rgba(200,150,60,0.2)"; }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" /></svg>
          </button>
        </div>
        {/* Body */}
        <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", flex: 1, overflow: "hidden", minHeight: 0 }} className="mbody">
          {/* Left: image + object data card */}
          <div style={{ overflow: "auto", borderRight: "1px solid rgba(200,150,60,0.1)", background: "rgba(200,150,60,0.015)" }}>
            <div style={{ height: "220px", overflow: "hidden", background: "#141008" }}>
              <img src={a.imageUrl} alt={a.imageAlt} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "sepia(8%) brightness(0.88)" }}
                onError={e => { (e.target as HTMLImageElement).src = `https://placehold.co/800x600/0a0804/c8963c?text=Artifact+${a.id}`; }} />
            </div>
            {/* Object data — museum wall label style */}
            <div style={{ padding: "1.2rem" }}>
              <p style={{ fontFamily: "'Cinzel',serif", fontSize: "0.5rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#c8963c", marginBottom: "0.9rem", paddingBottom: "0.5rem", borderBottom: "1px solid rgba(200,150,60,0.15)" }}>
                Object Information
              </p>
              {[
                ["Date / Period", a.date],
                ["Material", a.material],
                ["Dimensions", a.dimensions],
                ["Present Location", a.currentLocation],
              ].map(([l,v]) => (
                <div key={l} style={{ marginBottom: "0.85rem" }}>
                  <p style={{ fontFamily: "'Cinzel',serif", fontSize: "0.46rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c8963c", marginBottom: "0.2rem", opacity: 0.85 }}>{l}</p>
                  <p style={{ fontFamily: "'EB Garamond',serif", fontSize: "0.9rem", color: "#d4b896", lineHeight: 1.45 }}>{v}</p>
                </div>
              ))}
              {/* Citation block */}
              <div style={{ marginTop: "0.8rem", padding: "0.9rem", background: "rgba(200,150,60,0.04)", border: "1px solid rgba(200,150,60,0.14)" }}>
                <p style={{ fontFamily: "'Cinzel',serif", fontSize: "0.46rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c8963c", marginBottom: "0.4rem" }}>Source / Citation</p>
                <p style={{ fontFamily: "'EB Garamond',serif", fontSize: "0.82rem", color: "#8a7e6e", fontStyle: "italic", lineHeight: 1.5, marginBottom: "0.5rem" }}>{a.citation}</p>
                <a href={a.citationUrl} target="_blank" rel="noopener noreferrer" style={{
                  fontFamily: "'Cinzel',serif", fontSize: "0.47rem", letterSpacing: "0.14em",
                  textTransform: "uppercase", color: "#c8963c", textDecoration: "none",
                  borderBottom: "1px solid rgba(200,150,60,0.38)", paddingBottom: "1px",
                  display: "inline-flex", alignItems: "center", gap: "0.3rem",
                }}>
                  View Source
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" /></svg>
                </a>
              </div>
            </div>
          </div>
          {/* Right: full scholarly analysis via tabs */}
          <div style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
            {/* Tab bar */}
            <div style={{ display: "flex", borderBottom: "1px solid rgba(200,150,60,0.12)", flexShrink: 0 }}>
              {tabs.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)} style={{
                  flex: 1, padding: "0.7rem 0.3rem",
                  background: tab === t.id ? "rgba(200,150,60,0.08)" : "transparent",
                  border: "none", borderBottom: tab === t.id ? "2px solid #c8963c" : "2px solid transparent",
                  color: tab === t.id ? "#e8c878" : "#8a7e6e",
                  fontFamily: "'Cinzel',serif", fontSize: "0.47rem", letterSpacing: "0.14em",
                  textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s", minWidth: "52px",
                }}>{t.label}</button>
              ))}
            </div>
            {/* Analysis text */}
            <div style={{ flex: 1, overflow: "auto", padding: "1.5rem 2rem" }}>
              <p style={{ fontFamily: "'Cinzel',serif", fontSize: "0.5rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#c8963c", marginBottom: "0.9rem", paddingBottom: "0.5rem", borderBottom: "1px solid rgba(200,150,60,0.1)" }}>
                {tabs.find(t => t.id === tab)?.label}
              </p>
              <p style={{ fontFamily: "'EB Garamond',serif", fontSize: "1.04rem", color: "#d4b896", lineHeight: 1.88 }}>
                {content[tab]}
              </p>
            </div>
          </div>
        </div>
        <div style={{ height: "2px", background: "linear-gradient(to right,transparent,rgba(200,150,60,0.2),transparent)", flexShrink: 0 }} />
      </div>
      <style>{`
        @keyframes fadein{from{opacity:0}to{opacity:1}}
        @keyframes mslide{from{opacity:0;transform:scale(0.95) translateY(16px)}to{opacity:1;transform:none}}
        @media(max-width:680px){.mbody{grid-template-columns:1fr!important}}
      `}</style>
    </div>
  );
}

/* ─── GALLERY ROOM ──────────────────────────────────────────────── */
function Gallery({ sid, idx }: { sid: string; idx: number }) {
  const sec = sections.find(s => s.id === sid)!;
  const arts = artifacts.filter(a => a.section === sid);
  const [sel, setSel] = useState<Artifact | null>(null);
  const { ref, v } = useInView(0.04);

  // Gallery room background variants
  const bg = [
    "linear-gradient(180deg,#090704 0%,#0b0906 100%)",
    "linear-gradient(180deg,#0b0906 0%,#07090d 50%,#0b0906 100%)",
    "linear-gradient(180deg,#0b0906 0%,#090704 100%)",
    "linear-gradient(180deg,#090704 0%,#0b0906 100%)",
    "linear-gradient(180deg,#0b0906 0%,#08070400 100%)",
  ][idx % 5];

  // Pull quotes per gallery
  const pq = [
    { q: "The Kushite rulers presented themselves as pharaohs who could return Egypt to its former glory. Representations of the pharaohs show a new synthesis of Nubian and Egyptian forms with the introduction of Nubian facial features and Kushite royal regalia.", a: "Institute for the Study of Ancient Cultures, University of Chicago" },
    { q: "Piye presents himself not just as a conqueror, but as a moral ruler chosen by Amun to restore order. He is presented as more devout than the Egyptian kings he defeated—more genuinely committed to the sacred traditions of the land he was taking.", a: "Ancient Nubia: Art of the 25th Dynasty — High Museum of Art, 2023" },
    { q: "Because the first archaeologists to excavate in Sudan were trained first as Egyptologists, and because of racist and colonial biases inherent in their worldview, they often failed to recognize the ways in which Nubian art stands apart from, and sometimes surpasses, the art of Egypt.", a: "High Museum of Art — Ancient Nubia: Art of the 25th Dynasty, 2023" },
    { q: "As was often the case when Napatan rulers took on Egyptian religious accoutrements, they far outstripped the Egyptians in scale. Some Napatan kings were buried with more than a thousand shawabties—roughly double the Egyptian royal norm.", a: "High Museum of Art — Ancient Nubia: Art of the 25th Dynasty, 2023" },
    { q: "The Nubians built major cities, temples, palaces, and more pyramids than the Egyptians. Yet for many people today, this powerful history remains little known.", a: "MFA Boston — Ancient Nubia Now Exhibition" },
  ][idx];

  return (
    <>
      <section id={`gallery-${sid}`} style={{ background: bg, padding: "0", borderTop: "2px solid rgba(200,150,60,0.15)" }}>
        {/* Gallery Room Header — museum signage style */}
        <div style={{
          background: "linear-gradient(180deg,rgba(200,150,60,0.06),transparent)",
          borderBottom: "1px solid rgba(200,150,60,0.12)",
          padding: "3rem 2rem 2.5rem",
        }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "2rem" }} ref={ref}>
              {/* Gallery number pillar */}
              <div style={{
                flexShrink: 0, width: "70px",
                display: "flex", flexDirection: "column", alignItems: "center",
                opacity: v ? 1 : 0, transition: "all 0.6s ease",
              }}>
                <div style={{ fontFamily: "'Cinzel Decorative',serif", fontSize: "2.5rem", color: "rgba(200,150,60,0.2)", lineHeight: 1 }}>0{idx+1}</div>
                <div style={{ width: "1px", height: "40px", background: "linear-gradient(180deg,rgba(200,150,60,0.3),transparent)", marginTop: "0.5rem" }} />
              </div>
              {/* Gallery text */}
              <div style={{ opacity: v ? 1 : 0, transform: v ? "none" : "translateY(14px)", transition: "all 0.65s ease 0.08s" }}>
                <p style={eyebrow}>Gallery {String(idx+1).padStart(2,"0")} · {sec.subtitle}</p>
                <h2 style={{ fontFamily: "'Cinzel',serif", fontSize: "clamp(1.5rem,3vw,2.5rem)", color: "#e8c878", marginBottom: "1rem", lineHeight: 1.15 }}>{sec.title}</h2>
                <div style={{ width: "60px", height: "1px", background: "linear-gradient(to right,#c8963c,transparent)", marginBottom: "1rem" }} />
                <p style={{ ...body, maxWidth: "680px" }}>{sec.description}</p>
                <p style={{ fontFamily: "'Cinzel',serif", fontSize: "0.52rem", letterSpacing: "0.15em", color: "#8a7e6e", marginTop: "0.8rem" }}>
                  {arts.length} artifact{arts.length !== 1 ? "s" : ""} · Click any artifact to open its full scholarly wall label
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Artifact grid */}
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "2.5rem 2rem 4rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(288px,1fr))", gap: "1.4rem" }}>
            {arts.map((a, i) => <ArtCard key={a.id} a={a} index={i} onClick={() => setSel(a)} />)}
          </div>
        </div>

        {/* Pull quote between galleries */}
        <PullQuote quote={pq.q} attribution={pq.a} />
      </section>

      {sel && <Modal a={sel} onClose={() => setSel(null)} />}
    </>
  );
}

/* ─── CURATORIAL NOTE ───────────────────────────────────────────── */
function Curatorial() {
  const { ref, v } = useInView();
  return (
    <section id="curatorial" style={{ background: "linear-gradient(180deg,#090704,#06050300)", padding: "5rem 2rem", borderTop: "2px solid rgba(200,150,60,0.18)" }}>
      <div style={{ maxWidth: "1020px", margin: "0 auto" }} ref={ref}>
        <div style={{ opacity: v ? 1 : 0, transform: v ? "none" : "translateY(16px)", transition: "all 0.7s ease" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <p style={eyebrow}>Curatorial Note</p>
            <h2 style={sh}>About This Exhibition</h2>
            <div style={rule} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.8fr", gap: "3.5rem" }} className="cur-g">
            {/* Left column */}
            <div>
              <h3 style={{ fontFamily: "'Cinzel',serif", fontSize: "0.95rem", color: "#e8c878", marginBottom: "1rem" }}>Exhibition Summary</h3>
              {[["14","Artifacts from World Collections"],["5","Thematic Galleries"],["7+","Institutional Sources"]].map(([n,l]) => (
                <div key={l} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.75rem 0", borderBottom: "1px solid rgba(200,150,60,0.08)" }}>
                  <span style={{ fontFamily: "'Cinzel',serif", fontSize: "1.2rem", color: "#c8963c", minWidth: "50px" }}>{n}</span>
                  <span style={{ fontFamily: "'EB Garamond',serif", fontSize: "0.95rem", color: "#8a7e6e" }}>{l}</span>
                </div>
              ))}
              <div style={{ marginTop: "2rem" }}>
                <h3 style={{ fontFamily: "'Cinzel',serif", fontSize: "0.9rem", color: "#e8c878", marginBottom: "0.8rem" }}>Lending Institutions</h3>
                {["British Museum, London","Egyptian Museum, Cairo","MFA Boston","Musée du Louvre, Paris","Nubian Museum, Aswan","Kerma Museum, Sudan","ISAC Museum, Univ. of Chicago"].map(i => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
                    <span style={{ color: "rgba(200,150,60,0.4)", fontSize: "0.7rem" }}>☥</span>
                    <span style={{ fontFamily: "'EB Garamond',serif", fontSize: "0.9rem", color: "#8a7e6e" }}>{i}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Right column */}
            <div>
              <p style={{ ...body, marginBottom: "1.3rem" }}>
                <em>Children of the Sun: The Black Pharaohs of Kush &amp; Egypt&apos;s 25th Dynasty </em> is a museum
                exhibit presenting fourteen artifacts from the world&apos;s leading museum collections of ancient Nubian art and
                archaeology. The exhibit explores the material evidence for the Kushite dynasty (ca. 747–656 BCE), examining how
                these African kings from the Kingdom of Kush conquered and governed Egypt, preserved its sacred traditions,
                developed a sophisticated hybrid artistic identity, and left a monumental legacy that was deliberately suppressed
                by subsequent rulers and long underrepresented in modern scholarship.
              </p>
              <p style={{ ...body, marginBottom: "1.3rem" }}>
                The exhibition is organized into five thematic galleries that proceed broadly from the political and military
                story of Kushite rule (Gallery I: Rise of the Black Pharaohs), through the dynasty&apos;s profound religious
                engagement (Gallery II: Divine Authority) and its distinctive artistic synthesis of Egyptian and Nubian
                traditions (Gallery III: The Kushite Synthesis), to its royal funerary practices (Gallery IV: Monuments to
                Eternity), and concluding with questions of legacy, erasure, and modern rediscovery (Gallery V: Legacy &amp;
                Suppressed Memory).
              </p>
              <p style={{ ...body, marginBottom: "2rem" }}>
                Research for this exhibition draws exclusively on credible museum websites, university publications,
                and peer-reviewed scholarly sources. Primary sources include the British Museum Research Collection,
                the MFA Boston&apos;s &apos;Ancient Nubia Now&apos; exhibition documentation, the ISAC at the University of Chicago,
                UNESCO&apos;s Museums for Intercultural Dialogue, the High Museum of Art&apos;s 2023 exhibition catalogue,
                Smarthistory (peer-reviewed open-access art history), and National Geographic&apos;s archaeological reporting.
              </p>
              {/* Bibliography */}
              <div style={{ padding: "1.4rem", border: "1px solid rgba(200,150,60,0.16)", background: "rgba(200,150,60,0.025)" }}>
                <p style={{ fontFamily: "'Cinzel',serif", fontSize: "0.5rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#c8963c", marginBottom: "0.9rem" }}>
                  Selected Bibliography &amp; Primary Sources
                </p>
                {[
                  ["British Museum Collection Online (EA1770, EA498, EA1779)","https://www.britishmuseum.org/collection"],
                  ["MFA Boston — Ancient Nubia Now Exhibition","https://www.mfa.org/exhibitions/nubia"],
                  ["Smarthistory — King Piye and the Kushite Control of Egypt","https://smarthistory.org/king-piye-kushite-egypt/"],
                  ["ISAC University of Chicago — Kushite Kingdom","https://isac.uchicago.edu/museum-exhibits/nubia/kushite-kingdom"],
                  ["UNESCO Museums for Intercultural Dialogue — Amenirdis I","http://www.unesco.org/culture/museum-for-dialogue/item/en/79/"],
                  ["High Museum of Art — Ancient Nubia: Art of the 25th Dynasty, 2023","https://high.org/exhibition/ancient-nubia/"],
                  ["National Geographic — Nubian Pharaohs (history/archaeology)","https://www.nationalgeographic.com/history/article/nubian-pharaohs-kushite-ancient-egypt"],
                  ["Egypt Museum — Sphinx of Taharqa","https://egypt-museum.com/sphinx-of-taharqa/"],
                  ["Wonderful Things Art — Ram of Amun and Taharqa","https://www.wonderfulthingsart.com/post/statue-of-amun-and-king-taharqa-british-museum"],
                ].map(([text,url]) => (
                  <a key={url} href={url} target="_blank" rel="noopener noreferrer" style={{
                    display: "flex", alignItems: "flex-start", gap: "0.45rem", marginBottom: "0.45rem",
                    fontFamily: "'EB Garamond',serif", fontSize: "0.88rem", color: "#8a7e6e",
                    textDecoration: "none", transition: "color 0.2s", lineHeight: 1.4,
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = "#c8963c"}
                  onMouseLeave={e => e.currentTarget.style.color = "#8a7e6e"}>
                    <span style={{ color: "rgba(200,150,60,0.4)", fontSize: "0.7rem", marginTop: "0.2rem", flexShrink: 0 }}>→</span>{text}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:680px){.cur-g{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

/* ─── FOOTER ────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ background: "#060503", padding: "2.5rem 2rem", borderTop: "2px solid rgba(200,150,60,0.14)", textAlign: "center" }}>
      <div style={{ fontFamily: "'Cinzel Decorative',serif", fontSize: "1.1rem", color: "#c8963c", marginBottom: "0.4rem" }}>☥ Children of the Sun</div>
      <p style={{ fontFamily: "'Cinzel',serif", fontSize: "0.52rem", letterSpacing: "0.24em", textTransform: "uppercase", color: "#8a7e6e", marginBottom: "0.75rem" }}>
        The Black Pharaohs of Kush · A Digital Humanities Museum Exhibit · 25th Dynasty, ca. 747–656 BCE
      </p>
      <div style={{ width: "45px", height: "1px", margin: "0 auto 0.75rem", background: "linear-gradient(to right,transparent,rgba(200,150,60,0.35),transparent)" }} />
      
    </footer>
  );
}

/* ─── DESIGN TOKENS ─────────────────────────────────────────────── */
const eyebrow: React.CSSProperties = {
  fontFamily: "'Cinzel',serif", fontSize: "0.57rem",
  letterSpacing: "0.38em", textTransform: "uppercase",
  color: "#c8963c", marginBottom: "0.7rem",
};
const sh: React.CSSProperties = {
  fontFamily: "'Cinzel',serif",
  fontSize: "clamp(1.5rem,2.8vw,2.4rem)",
  color: "#e8c878", marginBottom: "0.8rem",
};
const rule: React.CSSProperties = {
  width: "65px", height: "1px", margin: "0 auto",
  background: "linear-gradient(to right,transparent,#c8963c,transparent)",
};
const body: React.CSSProperties = {
  fontFamily: "'EB Garamond',serif",
  fontSize: "clamp(0.96rem,1.6vw,1.07rem)",
  color: "#d4b896", lineHeight: 1.88,
};

/* ─── MAIN ──────────────────────────────────────────────────────── */
export default function Page() {
  const [active, setActive] = useState("rise");
  useEffect(() => {
    const o = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const id = e.target.id.replace("gallery-","");
          if (sections.find(s => s.id === id)) setActive(id);
        }
      });
    }, { threshold: 0.25 });
    sections.forEach(s => { const el = document.getElementById(`gallery-${s.id}`); if (el) o.observe(el); });
    return () => o.disconnect();
  }, []);

  return (
    <main style={{ background: "#090704", minHeight: "100vh" }}>
      <Nav active={active} />
      <Entrance />
      <IntroHall />
      {sections.map((s,i) => <Gallery key={s.id} sid={s.id} idx={i} />)}
      <Curatorial />
      <Footer />
    </main>
  );
}
