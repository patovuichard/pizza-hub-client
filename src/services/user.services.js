import service from "./config.services";

const getAllPizzerias = () => {
  return service.get("/user/restaurant/all")
}

const getUserData = () => {
  return service.get("/user")
}

const getUserDataById = (id) => {
  return service.get(`/user/${id}`)
}

const updateOneUser = (updateUser) => {
  return service.patch("/user", updateUser)
}

const removeOneUser = () => {
  return service.delete("/user")
}

export {
  getAllPizzerias,
  getUserData,
  getUserDataById,
  updateOneUser,
  removeOneUser
}