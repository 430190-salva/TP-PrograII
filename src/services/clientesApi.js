import api from "./api";

export const listar = async (signal) => {
  const { data } = await api.get("/Clientes", { signal });//signal para poder cancelar la peticion
  let products = data.map(p => parserProduct(p))
  return products;
};

export const crear = async (datos) => {
  const { data } = await api.post("/Clientes", datos);
  return data;
};

export const actualizar = async (id, datos) => {
  const { data } = await api.put(`/Clientes/${id}`, datos);
  return data;
};

export const darDeBaja = async (id) => {
  await api.patch(`/Clientes/${id}`, { activo: false });//delete?
};

const formatearDni = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const parserProduct = (producto) => ({
  id: producto.idCliente,
  nombres: producto.nombre,
  apellido: producto.apellido,
  nombre: `${producto.nombre} ${producto.apellido}`.trim(),
  dni: formatearDni(producto.dni),
  email: producto.eMail,
  activo: producto.activo,
});
/* export const mensajeError = (e, porDefecto) =>
  e.response?.data?.message ?? porDefecto; */