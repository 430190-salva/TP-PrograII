import { useEffect, useId, useRef, useState } from "react";
import Modal from "../clientes/Modal";
import Select from "../select";
import IconProduct from '../../assets/IconProduct.svg'
import { CATEGORIAS, TAMANOS } from "../../data/productosData";
import base from "../clientes/ClienteFormModal.module.css"; // header, body, label, input, footer, botones
import styles from "./ProductoFormModal.module.css";

export default function ProductoFormModal({
  titulo,
  descripcion,
  icono,
  tono,
  textoGuardar,
  inicial,
  mostrarIconoAuto = false,
  onCerrar,
  onGuardar,
}) {
  const uid = useId();
  const tituloId = `${uid}-titulo`;
  const descId = `${uid}-desc`;
  const nombreRef = useRef(null);

  const [datos, setDatos] = useState({
    nombre: "",
    tamano: "Grande",
    categoria: CATEGORIAS[0].value,
    precio: "",
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
      nombre: datos.nombre.trim(),
      tamano: datos.tamano,
      categoria: datos.categoria,
      precio: Number(datos.precio),
      activo: datos.activo,
    });
  };

  return (
    <Modal onCerrar={onCerrar} labelledBy={tituloId} describedBy={descId}>
      <form className={base.form} onSubmit={enviar}>
        <header className={base.header}>
          <div className="d-flex align-items-center gap-3">
            
            <div>
              <h2 id={tituloId} className={base.title}>{titulo}</h2>
              <p id={descId} className={base.subtitle}>{descripcion}</p>
            </div>
          </div>

          <button
            type="button"
            className={`${base.close} btn border-0`}
            aria-label="Cerrar"
            onClick={onCerrar}
          >
            <i className="bi bi-x-lg" aria-hidden="true" />
          </button>
        </header>

        <div className={base.body}>
          <div>
            <label htmlFor={`${uid}-nombre`} className={base.label}>
              Nombre del producto *
            </label>
            <input
              ref={nombreRef}
              id={`${uid}-nombre`}
              name="nombre"
              type="text"
              className={`${base.input} form-control`}
              placeholder="Ej. Balde Popcorn XL con Caramelo"
              autoComplete="off"
              required
              value={datos.nombre}
              onChange={cambiar}
            />
          </div>

          <div className="row g-3">
            <div className="col-6">
              <label htmlFor={`${uid}-tamano`} className={base.label}>
                Tamaño
              </label>
              <Select
                id={`${uid}-tamano`}
                name="tamano"
                className={base.input}
                value={datos.tamano}
                onChange={cambiar}
              >
                {TAMANOS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </Select>
            </div>

            <div className="col-6">
              <label htmlFor={`${uid}-categoria`} className={base.label}>
                Categoría
              </label>
              <Select
                id={`${uid}-categoria`}
                name="categoria"
                className={base.input}
                value={datos.categoria}
                onChange={cambiar}
              >
                {CATEGORIAS.map((c) => (
                  <option key={c.value} value={c.value}>{c.value}</option>
                ))}
              </Select>
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <label htmlFor={`${uid}-precio`} className={base.label}>
                Precio unitario ($) *
              </label>
              <input
                id={`${uid}-precio`}
                name="precio"
                type="number"
                inputMode="numeric"
                min="1"
                step="1"
                className={`${base.input} ${styles.mono} form-control`}
                placeholder="6800"
                required
                value={datos.precio}
                onChange={cambiar}
              />
            </div>
          </div>

          {mostrarIconoAuto && (
            <div className={styles.autoIcon}>
              <span
                className={`${styles.iconTile} d-flex align-items-center justify-content-center`}
                aria-hidden="true"
              >
                <img src={IconProduct} alt="" />
              </span>
              <div>
                <p className={styles.autoTitle}>Ícono automático de producto</p>
                <p className={styles.autoSub}>Popcorn clásico ámbar Cineplanet</p>
              </div>
            </div>
          )}

          <div className="form-check d-flex align-items-center gap-2 ps-0">
            <input
              id={`${uid}-activo`}
              name="activo"
              type="checkbox"
              className={`${base.check} form-check-input m-0`}
              checked={datos.activo}
              onChange={cambiar}
            />
            <label htmlFor={`${uid}-activo`} className={base.checkLabel}>
              Producto activo y disponible para venta
            </label>
          </div>
        </div>

        <footer className={base.footer}>
          <button type="button" className={`${base.cancel} btn`} onClick={onCerrar}>
            Cancelar
          </button>
          <button type="submit" className={`${base.submit} btn`}>
            {textoGuardar}
          </button>
        </footer>
      </form>
    </Modal>
  );
}