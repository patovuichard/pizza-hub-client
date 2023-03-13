import service from "./config.services";

const getAllPizzas = () => {
  return service.get("/pizza")
}

export {
  getAllPizzas
}