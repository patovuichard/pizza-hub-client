import service from "./config.services";

const createOrder = (id) => {
  return service.post(`/order/pizza/${id}`)
}

const getOrders = () => {
  return service.get("/order")
}

export {
  createOrder,
  getOrders,
}