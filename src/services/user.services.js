import service from "./config.services";

const getAllPizzerias = () => {
  return service.get("/user/restaurant/all")
}

const getUserData = () => {
  return service.get("/user")
}

const updateOneUser = (updateUser) => {
  return service.patch("/user", updateUser)
}

export {
  getAllPizzerias,
  getUserData,
  updateOneUser
}