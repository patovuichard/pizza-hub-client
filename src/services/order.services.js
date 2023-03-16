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

const acceptOrder = (id) => {
  return service.patch(`order/${id}`)
}

const rejectOrder = (id) => {
  return service.patch(`order/${id}/reject`)
}

export {
  createOrder,
  getOrders,
  getOrdersRestaurant,
  removeOrder,
  acceptOrder,
  rejectOrder,
}