import service from "./config.services";

const createOrder = (id, ownerId) => {
  return service.post(`/order/pizza/${id}`, ownerId)
}

const getOrders = () => {
  return service.get("/order")
}

const getOrdersRestaurant = () => {
  return service.get("/order/restaurant")
}

const removeOrder = (id) => {
  return service.delete(`/order/${id}`)
}

export {
  createOrder,
  getOrders,
  getOrdersRestaurant,
  removeOrder,
}