import ProductoFormModal from "./ProductoFormModal";

export default function ModificarProductoModal({ producto, onCerrar, onActualizar }) {
  return (
    <ProductoFormModal
      titulo="Modificar Producto"
      descripcion="Edite precio, inventario o categoría"
      icono="bi-pencil"
      tono="violet"
      textoGuardar="Guardar Cambios"
      inicial={{
        nombre: producto.nombre,
        tamano: producto.tamano,
        categoria: producto.categoria,
        precio: String(producto.precio),
        activo: producto.activo,
      }}
      onCerrar={onCerrar}
      onGuardar={onActualizar}
    />
  );
}