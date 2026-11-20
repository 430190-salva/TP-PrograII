import styles from "./Cliente.module.css";
import IconUser from "../../assets/IconUser.svg"
import IconEdit from "../../assets/IconEdit.svg"
import IconDelete from "../../assets/IconDelete.svg"

export default function Cliente({ cliente, onEditar, onEliminar }) {
  const { id, nombre, dni, email, activo, destacado } = cliente;

  return (
    <tr className={activo ? "" : styles.rowInactive}>
      <th scope="row">
        <div className="d-flex align-items-center gap-3">
          <span
            className={`${styles.avatar} d-flex align-items-center justify-content-center`}
            aria-hidden="true"
          >
            <img src={IconUser} alt="" />
          </span>
          <div>
            <p className={`${styles.name} mb-0`}>
              {nombre}
              {destacado && (
                <>
                  <i className={`bi bi-star ${styles.star}`} aria-hidden="true" />
                  <span className="visually-hidden"> (cliente destacado)</span>
                </>
              )}
            </p>
            <p className={`${styles.clientId} mb-0`}>
              ID #{String(id).padStart(4, "0")}
            </p>
          </div>
        </div>
      </th>

      <td className={styles.dni}>{dni}</td>
      <td className={styles.email}>{email}</td>

      <td className="text-center">
        <span className={`${styles.status} ${activo ? styles.statusOn : styles.statusOff}`}>
          {activo ? "Activo" : "Inactivo"}
        </span>
      </td>

      <td>
        <div className={`${styles.actions} d-flex justify-content-end gap-2`}>
          <button
            type="button"
            className={`${styles.iconButton} ${styles.edit} btn border-0`}
            aria-label={`Editar a ${nombre}`}
            onClick={() => onEditar?.(cliente)}
          >
            <img src={IconEdit} alt="" />
          </button>
          <button
            type="button"
            className={`${styles.iconButton} ${styles.remove} btn border-0`}
            aria-label={`Eliminar a ${nombre}`}
            onClick={() => onEliminar?.(cliente)}
          >
            <img src={IconDelete} alt="" />
          </button>
        </div>
      </td>
    </tr>
  );
}