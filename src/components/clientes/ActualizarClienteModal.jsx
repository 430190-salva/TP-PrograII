import ClienteFormModal from "./ClienteFormModal";

export default function ActualizarClienteModal({ cliente, onCerrar, onActualizar }) {
  return (
    <ClienteFormModal
      titulo="Actualizar Cliente"
      descripcion="Edite los datos y guarde los cambios"
      textoGuardar="Guardar Cambios"
      inicial={{
        nombre: cliente.nombre,
        apellido: cliente.apellido,
        dni: cliente.dni,
        email: cliente.email,
        activo: cliente.activo,
      }}
      onCerrar={onCerrar}
      onGuardar={onActualizar}
    />
  );
}