import Producto from "../producto";
import NuevoProductoModal from "./NuevoProductoModal";
import ModificarProductoModal from "./ModificarProductoModal";
import ConfirmarBajaProductoModal from "./ConfirmarBajaProductoModal";
import styles from "./Productos.module.css"
import IconNewProduct from "../../assets/IconNewProduct.svg"
import { useMemo, useState } from "react";
import { PRODUCTOS, PAGE_SIZE , FILTROS  } from "../../data/productosData";



export default function Productos({ productos = PRODUCTOS }) {
    const [lista, setLista] = useState(productos);
    const [modal, setModal] = useState(null); // { tipo: "nuevo" | "editar" | "baja", cliente }
    const [busqueda, setBusqueda] = useState("");
    const [filtro, setFiltro] = useState("todos");
    const [pagina, setPagina] = useState(1);


    const filtrados = useMemo(() => {
        const q = busqueda.trim().toLowerCase();


        return lista.filter((c) => {
            if (filtro === "habilitados" && !c.activo) return false;
            if (filtro === "deshabilitados" && c.activo) return false;
            if (!q) return true;

            return (
                c.nombre.toLowerCase().includes(q) ||
                c.categoria.toLowerCase().includes(q)
            );
        });
    }, [lista, busqueda, filtro]);

    const totalPaginas = Math.max(1, Math.ceil(filtrados.length / PAGE_SIZE));
    const actual = Math.min(pagina, totalPaginas);
    const inicio = (actual - 1) * PAGE_SIZE;
    const visibles = filtrados.slice(inicio, inicio + PAGE_SIZE);

    const desde = filtrados.length === 0 ? 0 : inicio + 1;
    const hasta = inicio + visibles.length;

    const cambiarBusqueda = (e) => {
        setBusqueda(e.target.value);
        setPagina(1);
    };

    const cambiarFiltro = (valor) => {
        setFiltro(valor);
        setPagina(1);
    };

    const cerrarModal = () => setModal(null);

    const crearProducto = (datos) => {
        setLista((prev) => {
            const id = Math.max(0, ...prev.map((c) => c.id)) + 1;
            return [...prev, { id, ...datos }];
        });
        // Mostrar el cliente recién creado: sin filtros y en la última página
        setBusqueda("");
        setFiltro("todos");
        setPagina(Math.ceil((lista.length + 1) / PAGE_SIZE));
        cerrarModal();
    };

    const actualizarProducto = (datos) => {
        setLista((prev) =>
            prev.map((c) => (c.id === modal.cliente.id ? { ...c, ...datos } : c))
        );
        cerrarModal();
    };

    const darDeBaja = (cliente) => {
        setLista((prev) =>
            prev.map((c) => (c.id === cliente.id ? { ...c, activo: false } : c))
        );
        cerrarModal();
    };
    return (
        <>
            <main className={`${styles.main} flex-grow-1`}>
                <header className={`${styles.topbar} d-flex flex-wrap align-items-center justify-content-between gap-3`}>
                    <div className="d-flex flex-wrap align-items-center gap-3">
                        <h1 className={styles.title}>ABMC de Productos</h1>
                        <span className={styles.tag}>Soporte &amp; Productos</span>
                    </div>

                    <button type="button" className={`${styles.newButton} btn border-0`} onClick={() => setModal({ tipo: "nuevo" })}>
                        <img src={IconNewProduct} alt="" />
                        Nuevo Producto
                    </button>
                </header>

                <div className={styles.content}>
                    <section className={styles.card} aria-label="Listado de Productos">
                        <div className={`${styles.toolbar} d-flex flex-wrap align-items-center justify-content-between gap-3`}>
                            <form
                                role="search"
                                className={`${styles.search} d-flex align-items-center`}
                                onSubmit={(e) => e.preventDefault()}
                            >
                                <label htmlFor="buscar-productos" className="visually-hidden">
                                    Buscar por nombre o categoria
                                </label>
                                {/*  <img src={IconSearch} alt="" /> */}
                                <input
                                    id="buscar-productos"
                                    type="search"
                                    value={busqueda}
                                    onChange={cambiarBusqueda}
                                    placeholder="Buscar por nombre o categoria..."
                                    autoComplete="off"
                                />
                            </form>

                            <fieldset className={`${styles.segment} d-flex`}>
                                <legend className="visually-hidden">Filtrar por estado</legend>
                                {FILTROS.map(({ value, label }) => (
                                    <div key={value}>
                                        <input
                                            type="radio"
                                            className={`btn-check ${styles.segmentInput}`}
                                            name="filtro-estado"
                                            id={`filtro-${value}`}
                                            checked={filtro === value}
                                            onChange={() => cambiarFiltro(value)}
                                        />
                                        <label htmlFor={`filtro-${value}`} className={styles.segmentLabel}>
                                            {label}
                                        </label>
                                    </div>
                                ))}
                            </fieldset>
                        </div>

                        <div className="table-responsive">
                            <table className={`table ${styles.table} mb-0 align-middle`}>
                                <caption className="visually-hidden">Listado de Productos con su estado y acciones</caption>
                                <thead>
                                    <tr>
                                        <th scope="col">ID / PRODUCTO</th>
                                        <th scope="col">CATEGORIA</th>
                                        <th scope="col">PRECIO UNITARIO</th>
                                        <th scope="col" className="text-center">Estado</th>
                                        <th scope="col" className="text-end">Acciones </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {visibles.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className={styles.empty}>
                                                No se encontraron clientes con esos filtros.
                                            </td>
                                        </tr>
                                    ) : (
                                        visibles.map((p) => (
                                            <Producto
                                                key={p.id}
                                                producto={p}
                                                onEditar={(producto) => setModal({ tipo: "editar", producto })}
                                                onEliminar={(producto) => setModal({ tipo: "baja", producto })}
                                            />
                                        ))
                                    )}

                                </tbody>

                            </table>
                        </div>

                        <footer className={`${styles.footer} d-flex flex-wrap align-items-center justify-content-between gap-3`}>
                            <p className={`${styles.summary} mb-0`}>
                                Mostrando <strong>{desde}–{hasta}</strong> de <strong>{filtrados.length}</strong> usuarios
                            </p>

                            <nav aria-label="Paginación de clientes">
                                <ul className="list-unstyled d-flex align-items-center gap-2 mb-0">
                                    <li>
                                        <button
                                            type="button"
                                            className={`${styles.pageButton} btn`}
                                            disabled={actual === 1}
                                            onClick={() => setPagina(actual - 1)}
                                        >
                                            Anterior
                                        </button>
                                    </li>

                                    {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((n) => (
                                        <li key={n}>
                                            <button
                                                type="button"
                                                className={`${styles.pageButton} ${styles.pageNumber} ${n === actual ? styles.pageActive : ""} btn`}
                                                aria-current={n === actual ? "page" : undefined}
                                                aria-label={`Página ${n}`}
                                                onClick={() => setPagina(n)}
                                            >
                                                {n}
                                            </button>
                                        </li>
                                    ))}

                                    <li>
                                        <button
                                            type="button"
                                            className={`${styles.pageButton} btn`}
                                            disabled={actual === totalPaginas}
                                            onClick={() => setPagina(actual + 1)}
                                        >
                                            Siguiente
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </footer>
                    </section>
                </div>

                {modal?.tipo === "nuevo" && (
                    <NuevoProductoModal onCerrar={cerrarModal} onCrear={crearProducto} />
                )}

                {modal?.tipo === "editar" && (
                    <ModificarProductoModal
                        producto={modal.producto}
                        onCerrar={cerrarModal}
                        onActualizar={actualizarProducto}
                    />
                )}

                {modal?.tipo === "baja" && (
                    <ConfirmarBajaProductoModal
                        producto={modal.producto}
                        onCerrar={cerrarModal}
                        onConfirmar={darDeBaja}
                    />
                )}
            </main>
        </>
    )
}