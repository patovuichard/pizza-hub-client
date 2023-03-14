import service from "./config.services";

const createPaymentIntent = (productId) => {
  return service.post("/payment/create-payment-intent", productId)
}

export { createPaymentIntent };