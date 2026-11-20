import ProductoFormModal from "./ProductoFormModal";

export default function NuevoProductoModal({ onCerrar, onCrear }) {
  return (
    <ProductoFormModal
      titulo="Nuevo Producto"
      descripcion="Complete los datos obligatorios para el catálogo"
      icono="bi-plus-square"
      tono="green"
      textoGuardar="Crear Producto"
      mostrarIconoAuto
      onCerrar={onCerrar}
      onGuardar={onCrear}
    />
  );
}