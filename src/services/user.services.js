import service from "./config.services";

const getAllPizzerias = () => {
  return service.get("/user/restaurant/all")
}

const getUserData = () => {
  return service.get("/user/")
}

export {
  getAllPizzerias,
  getUserData
}