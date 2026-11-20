import { useEffect, useId, useRef, useState } from "react";
import Modal from "./Modal";
import styles from "./ClienteFormModal.module.css";

export default function ClienteFormModal({
  titulo,
  descripcion,
  textoGuardar,
  inicial,
  onCerrar,
  onGuardar,
}) {
  const uid = useId();
  const tituloId = `${uid}-titulo`;
  const descId = `${uid}-desc`;
  const nombreRef = useRef(null);

  const [datos, setDatos] = useState({
    nombre: "",
    apellido:"",
    dni: "",
    email: "",
    activo: true,
    ...inicial,
  });

  useEffect(() => {
    nombreRef.current?.focus();
  }, []);

  const cambiar = (e) => {
    const { name, type, value, checked } = e.target;
    setDatos((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const enviar = (e) => {
    e.preventDefault();
    onGuardar({
      ...datos,
      nombre: datos.nombre.trim(),
      apellido: datos.apellido.trim(),
      email: datos.email.trim(),
    });
  };

  return (
    <Modal onCerrar={onCerrar} labelledBy={tituloId} describedBy={descId}>
      <form className={styles.form} onSubmit={enviar}>
        <header className={styles.header}>
          <div>
            <h2 id={tituloId} className={styles.title}>{titulo}</h2>
            <p id={descId} className={styles.subtitle}>{descripcion}</p>
          </div>
          <button
            type="button"
            className={`${styles.close} btn border-0`}
            aria-label="Cerrar"
            onClick={onCerrar}
          >
            <i className="bi bi-x-lg" aria-hidden="true" />
          </button>
        </header>

        <div className={styles.body}>
          <div className="row g-3">
            <div className="col-6">
              <label htmlFor={`${uid}-nombres`} className={styles.label}>
                Nombre *
              </label>
              <input
                ref={nombreRef}
                id={`${uid}-nombres`}
                name="nombres"
                type="text"
                className={`${styles.input} form-control`}
                placeholder="Ej. Camila"
                autoComplete="given-name"
                required
                value={datos.nombres}
                onChange={cambiar}
              />
            </div>

            <div className="col-6">
              <label htmlFor={`${uid}-apellido`} className={styles.label}>
                Apellido *
              </label>
              <input
                id={`${uid}-apellido`}
                name="apellido"
                type="text"
                className={`${styles.input} form-control`}
                placeholder="Ej. Morales"
                autoComplete="family-name"
                required
                value={datos.apellido}
                onChange={cambiar}
              />
            </div>
          </div>

          <div>
            <label htmlFor={`${uid}-dni`} className={styles.label}>
              DNI *
            </label>
            <input
              id={`${uid}-dni`}
              name="dni"
              type="text"
              inputMode="numeric"
              className={`${styles.input} form-control`}
              placeholder="42.890.112"
              autoComplete="off"
              pattern="[0-9.]{7,10}"
              title="Ingresá entre 7 y 8 dígitos, con o sin puntos"
              required
              value={datos.dni}
              onChange={cambiar}
            />
          </div>

          <div>
            <label htmlFor={`${uid}-email`} className={styles.label}>
              Correo electrónico *
            </label>
            <input
              id={`${uid}-email`}
              name="email"
              type="email"
              className={`${styles.input} form-control`}
              placeholder="camila@ejemplo.com"
              autoComplete="email"
              required
              value={datos.email}
              onChange={cambiar}
            />
          </div>

          <div className="form-check d-flex align-items-center gap-2 ps-0">
            <input
              id={`${uid}-activo`}
              name="activo"
              type="checkbox"
              className={`${styles.check} form-check-input m-0`}
              checked={datos.activo}
              onChange={cambiar}
            />
            <label htmlFor={`${uid}-activo`} className={styles.checkLabel}>
              Cliente activo en el sistema
            </label>
          </div>
        </div>

        <footer className={styles.footer}>
          <button type="button" className={`${styles.cancel} btn`} onClick={onCerrar}>
            Cancelar
          </button>
          <button type="submit" className={`${styles.submit} btn`}>
            {textoGuardar}
          </button>
        </footer>
      </form>
    </Modal>
  );
}