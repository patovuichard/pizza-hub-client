# PIZZA HUB

## Description

If you are a pizza lover like me, and are tired of browsing on the same apps with plenty of other stuff to get your favourite pizza, search no more and buy it in this Pizzerias dedicated app

## User Stories

-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
-  **Signup:** As an anon I can sign up in the platform so that I can offer/buy pizzas (Pizzeria/Client roles)
-  **Login:** As a user I can login to the platform so that I can buy/offer pizzas, edit my profile, see my orders and check my favourite pizzas
-  **Logout:** As a user I can logout from the platform so no one else can use it
-  **Add Pizzeria** As a user I can create a Pizzeria with my pizzas, so that I can share it with the community
-  **List Pizzerias** As an anon/user I can see the Pizzerias so that I can choose where to make an order
-  **Map of Pizzerias** As a useranon/user I can see where the Pizzerias are so that I can choose where to make an order
-  **List Pizzas** As a anon/user I can see the Pizzas so that I can choose one to eat
-  **Search Pizzerias/Pizzas** As a user I want to search Pizzerias/Pizzas by name so that I know if it´s already in the platform
-  **List Pizzas within a Pizzeria** As a anon/user I can see the Pizzas of the choosen Pizzeria so that I can see the pizza offers
-  **Pizza details** As a anon/user I can see the Pizza details of the choosen Pizza so that I can see the pizza ingredients
-  **Add to favorites** As a client I want to add a pizza to favourites so that I can save the pizzas that I liked the most
-  **See my favorites** As a client I want to see my favorite pizzas so that I can see the ones I liked the most
-  **See-cancel/accept-reject my orders** As a Client/Pizzeria I want to see my pizza orders so that I can see the status of the order
-  **Create and edit my pizzas** As a Pizzeria I want to create/edit my pizzas so that I can offer them to clients without any mistakes


## Backlog

Pizzerias in Home page:
- show them in carousel way

Pizzas in Home page:
- show them in carousel way
  
# Client

## Routes

- / - Homepage
- /signup - Signup form
- /login - Login form
- /user - Active user data, update and remove
- /user/edit - Active user edit data
- /user/pizza-create - Active user creates a pizza
- /user/pizza-edit/:pizzaId - Active user creates a pizza
- /user/:userId - Any Pizzeria data
- /pizza/:pizzaId - All pizzas data
- /payment-success - Payment success
- 404

## Pages

- Home Page (public)
- Sign in Page (anon only)
- Log in Page (anon only)
- Pizzeria with Pizzas List Page (public)
- Pizza Details Page (public)
- My Profile Page (user only)
- My Profile Edit Data Page (user only)
- My Profile Pizza Create (user only)
- My Profile Pizza Edit (user only)
- 404 Page (public)

## Components

- Search component
  - Input: text to look for
  - Output: filtrated list of Pizzerias/Pizzas
- Navbar component
- PaymentSuccess component
  - Output: renders payment success card
- PaymentIntent component
- CheckoutForm component
  - Input: text to complete form fields
  - Output: success/error in data loading
- ClickMarker component
  - Output: creates a marker on map
- IsPrivate component
  - Output: checks if there is somebody logged in

## IO


## Services

- Auth Services
  - signupService(newuser)
  - loginService(userCredentials)
  - verifyService()
- User Services
  - getAllPizzerias()
  - getUserData(data)
  - getUserDataById(id)
  - updateOneUser(updateUser)
  - removeOneUser()
- Upload Service
  - uploadImageService(imageFile)
- Pizza Services
  - getAllPizzas()
  - getPizzasByRestaurant(id)
  - createNewPizza(newPizza)
  - updateOnePizza(id, pizzaInfo)
  - deleteOnePizza(id)
  - getOnePizza(id)
  - addFavPizza(id)
  - removeFavPizza(id)
- Payment Services
  - createPaymentIntent(productId)
  - updatePaymentIntentService(paymentIntentInfo)
- Order Services
  - createOrder(id, ownerId)
  - getOrders()
  - getOrdersRestaurant()
  - removeOrder(id)
  - acceptOrder(id)
  - rejectOrder(id)


# Server

## Models

User model

```
username - String // required & unique
password - String // required
firstName - String
lastName - String
coordinates - [String]
address - String
city - String
favoritePizzas - [ObjectID<Pizza>]
imageUrl - String
role - String // ["Client", "Restaurant"]
timestamps - Boolean // true
```

Pizza model

```
pizzaName - String // required
sauce - String // ["red", "white", "none"]
ingredients - [String]
imageUrl - String
owner - ObjectID<User>
price - Number
timestamps - Boolean // true
```

Order model

```
pendingApproval - String // ["pending", "accepted", "rejected"]
pizzaOrder - ObjectID<Pizza>
orderOwner - ObjectID<User>
pizzaOwner - ObjectID<User>
timestamps - Boolean // true
```

Payment model

```
price - Number
paymentIntentId - String
clientSecret - String
status - String // ["incomplete", "succeeded"]
product - ObjectID<Pizza>
buyer - ObjectID<User>
```

## API Endpoints/Backend Routes

- AUTH
  - GET /auth/verify
  - POST /auth/signup
    - body:
      - username
      - password
      - role
  - POST /auth/login
    - body:
      - username
      - password
  - POST /auth/logout
    - body: (empty)
- USER
  - GET /user
    - payload:
        - _id
  - PATCH /user
    - body:
      - firstName
      - lastName
      - imageUrl
      - address
      - city
      - coordinates
  - GET /user/:id
    - params:
      - id
  - GET /restaurant/all
  - DELETE /user
    - payload:
      - _id
- PIZZA
  - GET /pizza
  - POST /pizza
    - body:
      - pizzaName
      - imageUrl
      - sauce
      - ingredients
      - price
    - payload
      - _id
    - payload:
      - _id
  - GET /pizza/:id
    - params:
      - id
  - POST /pizza/:id
    - params:
      - id
  - POST /pizza/:id/remove
    - params:
      - id
  - DELETE /pizza/:id
    - params:
      - id
  - PATCH /pizza/:id
    - params:
      - id
    - body:
      - pizzaName
      - imageUrl
      - sauce
      - ingredients
      - price
    - payload:
      - _id
  - GET /pizza/owner/:id
    - params:
      - id
- ORDER
  - GET /order
    - payload:
      - _id
  - GET /order/restaurant
    - payload:
      - _id
  - POST /order/pizza/:id
    - params:
      - id
    - body:
      - ownerId
  - DELETE /order/:id
    - params:
      - id
  - PATCH /order/:id
    - params:
      - id
  - PATCH /order/:id/reject
    - params:
      - id
- PAYMENT
  - POST /create-payment-intent
    - body:
      - id
  - PATCH /update-payment-intent
    - body:
      - clientSecret
      - paymentIntentId
- UPLOAD
  - POST /upload


## Links

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/patovuichard/pizza-hub-client.git)
[Server repository Link](https://github.com/patovuichard/pizza-hub-server.git)

[Deploy Link](https://pizzas-hub.netlify.app/)

### Slides

The url to your presentation slides

[Slides Link](https://docs.google.com/presentation/d/18B1IMJRnA2oSzY57uokJkxK3uYzyHm-fGD2AbsadYeQ/edit?usp=sharing)