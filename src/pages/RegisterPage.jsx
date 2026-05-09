import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from "./RegisterPage.module.css";

/**
 * RegisterPage — Formulario de registro / acceso
 * Estética editorial underground: monocromática con acento ácido (#c6ff00)
 * Ruta: /register → modo registro  |  /login → modo acceso
 */
export default function RegisterPage() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [mode, setMode] = useState(pathname === "/login" ? "login" : "register");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const isLogin = mode === "login";

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Limpiar error al escribir
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function validate() {
    const next = {};
    if (!isLogin && !form.name.trim()) next.name = "El nombre es requerido";
    if (!form.email.trim()) next.email = "El email es requerido";
    else if (!/\S+@\S+\.\S+/.test(form.email)) next.email = "Email inválido";
    if (!form.password) next.password = "La contraseña es requerida";
    else if (form.password.length < 6)
      next.password = "Mínimo 6 caracteres";
    if (!isLogin && form.password !== form.confirmPassword)
      next.confirmPassword = "Las contraseñas no coinciden";
    return next;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    // Placeholder: conectar con el backend después
    setTimeout(() => {
      setSubmitting(false);
      navigate("/events");
    }, 1200);
  }

  return (
    <div className={styles.page}>
      {/* Grain overlay */}
      <div className={styles.grain} aria-hidden="true" />

      {/* Nav mínima */}
      <nav className={styles.nav}>
        <Link to="/" className={styles.navLogo}>
          <span className={styles.navLogoBox}>V</span>
          VOY PROJECT
        </Link>
      </nav>

      <main className={styles.main}>
        {/* Columna izquierda — branding editorial */}
        <aside className={styles.aside}>
          <div className={styles.asideInner}>
            <p className={styles.asideEyebrow}>◆ ESCENA EMERGENTE</p>
            <h2 className={styles.asideTitle}>
              LA MÚSICA<br />
              QUE<br />
              <span className={styles.asideTitleAccent}>IMPORTA.</span>
            </h2>
            <p className={styles.asideDesc}>
              Eventos de punk, rock, metal y grunge del
              noroeste argentino — todo en un solo lugar.
            </p>
            <div className={styles.asideDivider} />
            <ul className={styles.asideFeatures}>
              <li>
                <span className={styles.featureDot}>◆</span>
                Descubrí shows antes que todos
              </li>
              <li>
                <span className={styles.featureDot}>◆</span>
                Guardá eventos en tu agenda
              </li>
              <li>
                <span className={styles.featureDot}>◆</span>
                Apoyá la escena local tucumana
              </li>
            </ul>
            <p className={styles.asideMeta}>
              VOY·PROJECT·v0.1-BETA — SMT·TUC·ARG·2026
            </p>
          </div>
        </aside>

        {/* Columna derecha — formulario */}
        <section className={styles.formSection}>
          {/* Toggle registro / acceso */}
          <div className={styles.modeToggle}>
            <button
              className={`${styles.modeBtn} ${!isLogin ? styles.modeBtnActive : ""}`}
              onClick={() => { setMode("register"); setErrors({}); }}
              type="button"
            >
              CREAR CUENTA
            </button>
            <button
              className={`${styles.modeBtn} ${isLogin ? styles.modeBtnActive : ""}`}
              onClick={() => { setMode("login"); setErrors({}); }}
              type="button"
            >
              ACCEDER
            </button>
          </div>

          <div className={styles.formCard}>
            <h1 className={styles.formTitle}>
              {isLogin ? "Bienvenido de vuelta" : "Creá tu cuenta"}
            </h1>
            <p className={styles.formSubtitle}>
              {isLogin
                ? "Ingresá con tu cuenta de VOY Project"
                : "Unite a la escena — es gratis"}
            </p>

            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              {/* Nombre — solo en registro */}
              {!isLogin && (
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="name">
                    NOMBRE
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Tu nombre o apodo"
                    value={form.name}
                    onChange={handleChange}
                    className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
                  />
                  {errors.name && (
                    <span className={styles.errorMsg}>{errors.name}</span>
                  )}
                </div>
              )}

              {/* Email */}
              <div className={styles.field}>
                <label className={styles.label} htmlFor="email">
                  EMAIL
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="tu@email.com"
                  value={form.email}
                  onChange={handleChange}
                  className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                />
                {errors.email && (
                  <span className={styles.errorMsg}>{errors.email}</span>
                )}
              </div>

              {/* Contraseña */}
              <div className={styles.field}>
                <label className={styles.label} htmlFor="password">
                  CONTRASEÑA
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  placeholder={isLogin ? "Tu contraseña" : "Mínimo 6 caracteres"}
                  value={form.password}
                  onChange={handleChange}
                  className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
                />
                {errors.password && (
                  <span className={styles.errorMsg}>{errors.password}</span>
                )}
              </div>

              {/* Confirmar contraseña — solo en registro */}
              {!isLogin && (
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="confirmPassword">
                    CONFIRMAR CONTRASEÑA
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Repetí tu contraseña"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ""}`}
                  />
                  {errors.confirmPassword && (
                    <span className={styles.errorMsg}>
                      {errors.confirmPassword}
                    </span>
                  )}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                className={styles.submitBtn}
                disabled={submitting}
              >
                {submitting
                  ? "CARGANDO..."
                  : isLogin
                  ? "INGRESAR →"
                  : "CREAR MI CUENTA →"}
              </button>

              {/* Link alternativo */}
              <p className={styles.altLink}>
                {isLogin ? "¿No tenés cuenta?" : "¿Ya tenés cuenta?"}{" "}
                <button
                  type="button"
                  className={styles.altLinkBtn}
                  onClick={() => { setMode(isLogin ? "register" : "login"); setErrors({}); }}
                >
                  {isLogin ? "Registrate gratis" : "Accedé acá"}
                </button>
              </p>
            </form>
          </div>

          {/* Footer mínimo */}
          <p className={styles.footerNote}>
            Al registrarte aceptás los términos de uso de VOY Project.
          </p>
        </section>
      </main>
    </div>
  );
}
