import { useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { useEvents } from "../hooks/useEvents";
import EventCard from "../design-system/composites/EventCard/EventCard";
import EditorialHeader from "../design-system/composites/EditorialHeader/EditorialHeader";
import styles from "./LandingPage.module.css";



const FEATURES = [
  {
    icon: "🎸",
    title: "Descubrí Bandas",
    description: "Encontrá los artistas emergentes de la escena tucumana antes que nadie.",
  },
  {
    icon: "🎟️",
    title: "Conseguí Entradas",
    description: "Comprá tus tickets de forma rápida y segura, sin colas ni intermediarios.",
  },
  {
    icon: "🤘",
    title: "Unite a la Escena",
    description: "Conectate con el underground local y apoyá la música en vivo.",
  },
  {
    icon: "📍",
    title: "Todos los Venues",
    description: "Bares, clubs y teatros de Tucumán en un solo lugar.",
  },
];

/**
 * HOOK: useScrollAnimation
 * Aplica la clase 'visible' a elementos con data-animate cuando entran al viewport.
 * Usa Intersection Observer API nativa — sin librerías externas.
 */
function useScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            observer.unobserve(entry.target); // animar solo una vez
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll("[data-animate]");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

/**
 * FlyerCard — Imagen del flyer con tilt 3D reactivo al mouse + esquinas bracket
 * Inspirado en la estética de Warp Records / Black Midi
 */
function FlyerCard() {
  const cardRef = useRef(null);
  const animFrameRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(() => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      // Inclinación un poquito más que antes (era 5/7)
      const rotX = -y * 6;
      const rotY = x * 9;
      const imgX = x * 4;
      const imgY = y * 4;
      // scale más sutil: 1.015 en vez de 1.03
      card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.015)`;
      const img = card.querySelector('img');
      if (img) img.style.transform = `translate(${imgX}px, ${imgY}px) scale(1.05)`;
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)';
    const img = card.querySelector('img');
    if (img) img.style.transform = 'translate(0,0) scale(1)';
  }, []);

  return (
    // flyerOuter: contenedor columna SIN filter
    <div className={styles.flyerOuter}>
      <div className={styles.flyerShadowWrap}>
        <div
          ref={cardRef}
          className={styles.flyerCard}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <span className={styles.flyerCornerTL} aria-hidden="true" />
          <span className={styles.flyerCornerBR} aria-hidden="true" />
          <img
            src="/flyer-lacrifagia.png"
            alt="Lacrifagia — 08.05.2026 Bar Floresta"
            className={styles.flyerImg}
            draggable={false}
          />
        </div>
      </div>
      <Link to="/events" className={styles.flyerEventLink}>
        VER DETALLES DEL EVENTO →
      </Link>
      {/* Meta strip del evento — datos decorativos contextales */}
      <div className={styles.flyerMeta} aria-hidden="true">
        <span>08.05.2026</span>
        <span className={styles.flyerMetaDot}>◆</span>
        <span>BAR FLORESTA</span>
        <span className={styles.flyerMetaDot}>◆</span>
        <span>POST-HARDCORE</span>
        <span className={styles.flyerMetaDot}>◆</span>
        <span className={styles.flyerMetaBlink}>● LIVE</span>
      </div>
    </div>
  );
}

/**
 * COMPONENTE: LandingPage
 * Página de entrada al producto con estética editorial underground.
 * Inspirada en discográficas como Sub Pop, Factory Records y Pitchfork.
 * Header propio con nav links — no usa el Navbar global (que tiene buscador).
 * Ruta: /
 */
export default function LandingPage() {
  const { events, isLoading } = useEvents();
  const previewEvents = events.slice(0, 3);

  useScrollAnimation();

  return (
    <div className={styles.page}>

      {/* ── HEADER EDITORIAL (compartido, scroll-aware) ─── */}
      <EditorialHeader ctaLabel="ACCEDER" ctaTo="/login" />

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className={styles.hero}>
        {/* Grain film overlay — textura análoga muy sutil */}
        <div className={styles.heroGrain} aria-hidden="true" />
        <div className={styles.heroContent}>
          <span className={styles.heroEyebrow}>♦ SHOW DESTACADO</span>
          <h1 className={styles.heroTitle}>
            WELCOME<br />
            TO THE<br />
            <span className={styles.heroTitleAccent}>POGO</span>
          </h1>
          <p className={styles.heroSubtitle}>LA ESCENA EMERGENTE Y UNDERGROUND</p>
          <p className={styles.heroDescription}>
            La plataforma de eventos musicales del noroeste argentino.<br />
            Punk, Rock, Metal, Grunge y más — todo en un solo lugar.
          </p>
          <div className={styles.heroCtas}>
            <Link to="/register" className={`${styles.ctaPrimary} ${styles.ctaFull}`}>CREAR TU CUENTA →</Link>
          </div>
        </div>
        {/* Flyer con efecto parallax/tilt al hover */}
        <FlyerCard />
      </section>


      {/* ── MARQUEE TICKER ───────────────────────────────────── */}
      <div className={styles.marqueeWrapper} aria-hidden="true">
        <div className={styles.marqueeTrack}>
          {["TOQUE PUNK UNDER", "FESTIVAL DE ROCK TUCUMANO", "NOCHE DE GRUNGE ALTERNATIVO", "APOYÁ LA ESCENA LOCAL", "SAN MIGUEL DE TUCUMÁN", "ENCUENTRO DE METAL EXTREMO", "CICLO DE POP INDIE"].map((item, i) => (
            <span key={i} className={styles.marqueeItem}>♦ {item}</span>
          ))}
          {/* Duplicado para el loop infinito */}
          {["TOQUE PUNK UNDER", "FESTIVAL DE ROCK TUCUMANO", "NOCHE DE GRUNGE ALTERNATIVO", "APOYÁ LA ESCENA LOCAL", "SAN MIGUEL DE TUCUMÁN", "ENCUENTRO DE METAL EXTREMO", "CICLO DE POP INDIE"].map((item, i) => (
            <span key={`dup-${i}`} className={styles.marqueeItem} aria-hidden="true">♦ {item}</span>
          ))}
        </div>
      </div>

      {/* ── QUÉ ES VOY ───────────────────────────────────────── */}
      <section className={styles.features}>
        <div className={styles.sectionHeader} data-animate>
          <span className={styles.sectionLabel}>♦ QUÉ ES VOY</span>
          <div className={styles.sectionDivider} />
          <span className={styles.sectionSpacer} />
        </div>
        <div className={styles.featuresGrid}>
          {FEATURES.map((f, i) => (
            <div key={i} className={styles.featureCard} data-animate style={{ transitionDelay: `${i * 80}ms` }}>
              <span className={styles.featureIcon}>{f.icon}</span>
              <h3 className={styles.featureTitle}>{f.title}</h3>
              <p className={styles.featureDescription}>{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── EVENTOS DESTACADOS — ticker horizontal ───────────── */}
      <section className={styles.eventsPreview}>
        <div className={styles.sectionHeader} data-animate>
          <span className={styles.sectionLabel}>♦ EN CARTELERA</span>
          <div className={styles.sectionDivider} />
          <Link to="/events" className={styles.seeAllLink}>VER TODOS &gt;</Link>
        </div>

        {/* Ticker: overflow oculto + track animado */}
        <div className={styles.eventsTicker}>
          <div className={styles.eventsTrack}>
            {/* Set principal */}
            {(isLoading ? [1, 2, 3, 4] : previewEvents).map((evt, i) =>
              isLoading ? (
                <div key={i} className={styles.eventsTickerItem}>
                  <EventCard isLoading={true} />
                </div>
              ) : (
                <div key={evt.id} className={styles.eventsTickerItem}>
                  <EventCard
                    id={evt.id}
                    title={evt.title}
                    date={evt.date}
                    time={evt.time}
                    venue={evt.venue}
                    price={evt.price}
                    genres={evt.genres}
                    status={evt.estado || evt.status}
                    statusTone={
                      (evt.estado || evt.status) === "AGOTADO" ? "danger"
                      : (evt.estado || evt.status) === "ÚLTIMAS ENTRADAS" ? "warning"
                      : "success"
                    }
                    imageUrl={evt.imageUrl}
                  />
                </div>
              )
            )}
            {/* Duplicado para el loop infinito — aria-hidden */}
            {(!isLoading && previewEvents.length > 0) && previewEvents.map((evt) => (
              <div key={`dup-${evt.id}`} className={styles.eventsTickerItem} aria-hidden="true">
                <EventCard
                  id={evt.id}
                  title={evt.title}
                  date={evt.date}
                  time={evt.time}
                  venue={evt.venue}
                  price={evt.price}
                  genres={evt.genres}
                  status={evt.estado || evt.status}
                  statusTone={
                    (evt.estado || evt.status) === "AGOTADO" ? "danger"
                    : (evt.estado || evt.status) === "ÚLTIMAS ENTRADAS" ? "warning"
                    : "success"
                  }
                  imageUrl={evt.imageUrl}
                />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.eventsCtaWrapper} data-animate>
          <Link to="/events" className={styles.ctaPrimary}>VER TODOS LOS EVENTOS</Link>
        </div>
      </section>



      {/* ── FOOTER ───────────────────────────────────────── */}
      <footer className={styles.footer}>
        <div className={styles.footerBar}>
          PRIVACY POLICY &nbsp;|&nbsp; TÉRMINOS Y CONDICIONES &nbsp;|&nbsp; APOYÁ LA ESCENA EMERGENTE DE TUCUMÁN &nbsp;|&nbsp; © 2026 VOY PROJECT
        </div>
      </footer>

    </div>
  );
}
