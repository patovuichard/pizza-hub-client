import service from "./config.services";

// Service to create a new user
const signupService = (newUser) => {
  return service.post("/auth/signup", newUser);
};

// Service to login
const loginService = (userCredentials) => {
  return service.post("/auth/login", userCredentials);
};

// Service to verify if user is autheticated
const verifyService = () => {
  return service.get("/auth/verify");
};

export { signupService, loginService, verifyService };
