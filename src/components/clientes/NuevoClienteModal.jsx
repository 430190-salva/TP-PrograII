import ClienteFormModal from "./ClienteFormModal";

export default function NuevoClienteModal({ onCerrar, onCrear }) {
  return (
    <ClienteFormModal
      titulo="Nuevo Cliente"
      descripcion="Complete los datos obligatorios para dar de alta"
      textoGuardar="Crear Cliente"
      onCerrar={onCerrar}
      onGuardar={onCrear}
    />
  );
}