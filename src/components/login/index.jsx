import { useState } from "react";
import styles from "./Login.module.css";
import logo from "../../assets/cineplanet-logo.png"



const Svg = ({ children, size = 18, ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
    {children}
  </svg>
);
const IconMail = () => (<Svg><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></Svg>);
const IconLock = () => (<Svg><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></Svg>);
const IconEye = () => (<Svg><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></Svg>);
const IconEyeOff = () => (<Svg><path d="M3 3l18 18" /><path d="M10.6 5.1A10 10 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-3.2 4.1M6.5 6.6A17 17 0 0 0 2 12s3.5 7 10 7a9.7 9.7 0 0 0 4-.9" /><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" /></Svg>);
const IconArrowLeft = () => (<Svg size={16}><path d="M19 12H5" /><path d="m11 18-6-6 6-6" /></Svg>);
const IconShield = () => (<Svg size={15} style={{ color: "#a78bfa" }}><path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></Svg>);
const IconUserCircle = () => (<Svg size={18} style={{ color: "#f59e0b" }}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="10" r="3" /><path d="M6.2 18.2a7 7 0 0 1 11.6 0" /></Svg>);
const IconPlanet = () => (
  <svg width="48" height="40" viewBox="0 0 48 40" fill="none" aria-hidden="true">
    <circle cx="24" cy="20" r="13" fill="#a78bfa" />
    <circle cx="19" cy="15" r="2.6" fill="#1a1530" /><circle cx="29" cy="15" r="2.6" fill="#1a1530" />
    <circle cx="19" cy="25" r="2.6" fill="#1a1530" /><circle cx="29" cy="25" r="2.6" fill="#1a1530" />
    <circle cx="24" cy="20" r="2.6" fill="#1a1530" />
    <ellipse cx="24" cy="21" rx="22" ry="7" transform="rotate(-18 24 21)" stroke="#a78bfa" strokeWidth="2.4" />
  </svg>
);

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ user: "", password: "", remember: false });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // conectar con  API de autenticación
    console.log("Login:", form);
  };

  return (
    <div className={styles.root}>
      <main className="container-fluid p-0">
        <div className="row g-0">
          
          <section className={`col-lg-6 ${styles.hero} d-flex flex-column`} aria-labelledby="hero-title">
            

            <div className="my-auto py-5">
              
              <img src={logo} alt="cineplanet logo"  width="300" className="mb-4"/>
              <p className={`${styles.lead} mb-4`}>
                Plataforma integral de gestión cinematográfica para explorar la cartelera de estrenos, reservar entradas en salas digitales e IMAX, administrar socios y controlar el catálogo de Candy Bar y comprobantes desde un solo lugar.
              </p>

              
            </div>

            
          </section>

         
          <section className="col-lg-6 d-flex flex-column align-items-center px-4 px-md-5 py-5" aria-labelledby="login-title">
            <div className={`${styles.formWrap} my-auto`}>
              <nav aria-label="Navegación secundaria" className="mb-5">
                <a href="/cartelera" className={styles.back}>
                  {/* <IconArrowLeft /> Volver a cartelera */}
                </a>
              </nav>

              <header className="mb-4">
                <h2 id="login-title" className={`${styles.heading} fw-bold display-6 mb-2`} style={{ fontWeight: 800 }}>
                  Iniciar sesión
                </h2>
                <p className={`${styles.muted} mb-0`}>
                  Ingresa con tu cuenta Socio Cineplanet para continuar.
                </p>
              </header>

              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="user" className={`${styles.label} d-block`}>Correo electrónico o N° de socio</label>
                  <div className={styles.inputGroup}>
                    <span className={styles.icon}><IconMail /></span>
                    <input
                      id="user" name="user" type="text" className={`form-control ${styles.input}`}
                      placeholder="tu@correo.com" autoComplete="username"
                      value={form.user} onChange={handleChange} required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-baseline">
                    <label htmlFor="password" className={styles.label}>Contraseña</label>
                    <a href="/recuperar" className={`${styles.link} small`}>¿Olvidaste tu contraseña?</a>
                  </div>
                  <div className={styles.inputGroup}>
                    <span className={styles.icon}><IconLock /></span>
                    <input
                      id="password" name="password" type={showPassword ? "text" : "password"}
                      className={`form-control ${styles.input}`} placeholder="••••••••"
                      autoComplete="current-password"
                      value={form.password} onChange={handleChange} required
                    />
                    <button
                      type="button" className={styles.toggle}
                      onClick={() => setShowPassword((s) => !s)}
                      aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                      aria-pressed={showPassword}
                    >
                      {showPassword ? <IconEyeOff /> : <IconEye />}
                    </button>
                  </div>
                </div>

                <div className="form-check d-flex align-items-center gap-2 ps-0 mb-4">
                  <input
                    id="remember" name="remember" type="checkbox"
                    className={`form-check-input ${styles.check} m-0`}
                    checked={form.remember} onChange={handleChange}
                  />
                  <label htmlFor="remember" className="form-check-label small" style={{ color: "#c4c4d6" }}>
                    Mantener mi sesión iniciada en este dispositivo
                  </label>
                </div>

                <button type="submit" className={`btn ${styles.submit} w-100`}>Ingresar a mi cuenta</button>
              </form>

              <div className={`${styles.divider} my-4`} role="separator">
                <span>o continúa con</span>
              </div>

              <div className="text-center">
                <button type="button" className={`btn ${styles.google}`}>
                  <IconUserCircle /> Google
                </button>
              </div>

              <p className={`text-center ${styles.muted} mt-4 mb-0`}>
                ¿Aún no eres Socio?{" "}
                <a href="/registro" className={`${styles.link} fw-semibold`}>Regístrate gratis aquí</a>
              </p>
            </div>

            <footer className={`${styles.copy} mt-4 w-100 text-center`}>
              <small>© 2026 Cineplanet • Todos los derechos reservados</small>
            </footer>
          </section>
        </div>
      </main>
    </div>
  );
}