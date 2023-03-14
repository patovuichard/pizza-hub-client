import service from "./config.services";

const createPaymentIntent = (productId) => {
  return service.post("/payment/create-payment-intent", productId)
}

const updatePaymentIntentService = (paymentIntentInfo) => {
  return service.patch("/payment/update-payment-intent", paymentIntentInfo)
}

export { 
  createPaymentIntent,
  updatePaymentIntentService
};