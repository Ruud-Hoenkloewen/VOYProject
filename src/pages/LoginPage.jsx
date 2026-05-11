import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../services/authService';
import styles from './LoginPage.module.css';

// Iconos para mostrar/ocultar contraseña
const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
);

const EyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
);

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [globalError, setGlobalError] = useState('');
  
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function validate() {
    const next = {};
    if (!form.email.trim())      next.email = "El email es requerido";
    else if (!/\S+@\S+\.\S+/.test(form.email)) next.email = "Email inválido";
    if (!form.password)          next.password = "La contraseña es requerida";
    return next;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGlobalError('');
    const errs = validate();
    if (Object.keys(errs).length > 0) { 
      setErrors(errs); 
      return; 
    }
    
    try {
      setSubmitting(true);
      const data = await loginUser(form.email, form.password);
      login(data.token, data.usuario);
      navigate('/');
    } catch (err) {
      setGlobalError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.grain} aria-hidden="true" />

      {/* Nav mínima */}
      <nav className={styles.nav}>
        <Link to="/" className={styles.navLogo}>
          <span className={styles.navLogoBox}>V</span>
          VOY PROJECT
        </Link>
      </nav>

      <main className={styles.main}>
        {/* Columna izquierda — branding */}
        <aside className={styles.aside}>
          <div className={styles.asideInner}>
            <p className={styles.asideEyebrow}>◆ BIENVENIDO DE NUEVO</p>
            <h2 className={styles.asideTitle}>
              LA MÚSICA<br />
              QUE<br />
              <span className={styles.asideTitleAccent}>IMPORTA.</span>
            </h2>
            <p className={styles.asideDesc}>
              Accedé a tu cuenta para gestionar tus entradas, descubrir nuevos eventos y apoyar a los artistas del norte argentino.
            </p>
            <div className={styles.asideDivider} />
            <ul className={styles.asideFeatures}>
              <li><span className={styles.featureDot}>◆</span>Tus entradas 100% digitales</li>
              <li><span className={styles.featureDot}>◆</span>Recomendaciones personalizadas</li>
              <li><span className={styles.featureDot}>◆</span>Conectá con la escena local</li>
            </ul>
            <p className={styles.asideMeta}>VOY·PROJECT·v0.1-BETA — SMT·TUC·ARG·2026</p>
          </div>
        </aside>

        {/* Columna derecha — formulario */}
        <section className={styles.formSection}>
          <div className={styles.formCard}>
            <h1 className={styles.formTitle}>INICIAR SESIÓN</h1>
            <p className={styles.formSubtitle}>Ingresá a tu cuenta para continuar</p>

            {globalError && (
              <div className={styles.globalError}>
                {globalError}
              </div>
            )}

            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="email">EMAIL</label>
                <input
                  id="email" name="email" type="email" autoComplete="email"
                  placeholder="tu@email.com"
                  value={form.email} onChange={handleChange}
                  disabled={submitting}
                  className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                />
                {errors.email && <span className={styles.errorMsg}>{errors.email}</span>}
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="password">CONTRASEÑA</label>
                <div className={styles.passwordWrapper}>
                  <input
                    id="password" name="password" 
                    type={showPassword ? "text" : "password"} 
                    autoComplete="current-password"
                    placeholder="Tu contraseña"
                    value={form.password} onChange={handleChange}
                    disabled={submitting}
                    className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
                  />
                  <button 
                    type="button" 
                    className={styles.togglePassword}
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    disabled={submitting}
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
                {errors.password && <span className={styles.errorMsg}>{errors.password}</span>}
              </div>

              <button type="submit" className={styles.submitBtn} disabled={submitting}>
                {submitting ? "INGRESANDO..." : "INGRESAR →"}
              </button>
            </form>

            <p className={styles.altLink}>
              ¿No tenés cuenta?{" "}
              <Link to="/register" className={styles.altLinkBtn}>
                Registrate acá
              </Link>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
