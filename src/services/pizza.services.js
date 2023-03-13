import service from "./config.services";

const getAllPizzas = () => {
  return service.get("/pizza")
}

const getPizzasByRestaurant = (id) => {
  return service.get(`/pizza/owner/${id}`)
}

const createNewPizza = (newPizza) => {
  return service.post(`/pizza`, newPizza)
}

const updateOnePizza = (id, pizzaInfo) => {
  return service.patch(`/pizza/${id}`, pizzaInfo)
}

const deleteOnePizza = (id) => {
  return service.delete(`/pizza/${id}`)
}

const getOnePizza = (id)=> {
  return service.get(`/pizza/${id}`)
}

export {
  getAllPizzas,
  getPizzasByRestaurant,
  createNewPizza,
  updateOnePizza,
  deleteOnePizza,
  getOnePizza
}