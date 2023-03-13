import service from "./config.services";

const getAllPizzas = () => {
  return service.get("/pizza")
}

const getPizzasByRestaurant = (id) => {
  return service.get(`/pizza/owner/${id}`)
}

export {
  getAllPizzas,
  getPizzasByRestaurant
}