import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getOrders, getOrdersRestaurant, removeOrder } from "../../services/order.services";
import { getPizzasByRestaurant } from "../../services/pizza.services";
import { getUserData } from "../../services/user.services";

function User() {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState(null);
  const [pizzasInfo, setPizzasInfo] = useState(null);
  const [orders, setOrders] = useState([]);
  const [ordersRestaurant, setOrdersRestaurant] = useState([]);
  const [favPizza, setFavPizza] = useState([]);

  const [isFetching, setIsFetching] = useState(true);
  const [showOrders, setShowOrders] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setIsFetching(true);
    try {
      const user = await getUserData();
      setUserInfo(user.data);
      setFavPizza(user.data.favouritePizzas);

      const pizzas = await getPizzasByRestaurant(user.data._id);
      setPizzasInfo(pizzas.data);

      const allOrders = await getOrders();
      setOrders(allOrders.data);

      const allOrdersRestaurant = await getOrdersRestaurant();
      setOrdersRestaurant(allOrdersRestaurant.data);

      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      await removeOrder(orderId)
      navigate("/user")
    } catch (error) {
      navigate("/error")
    }
  }

  return (
    <div>
      {isFetching ? (
        <img src="./pizza.svg" className="App-logo" alt="pizza" />
      ) : (
        <div className="ms-0 me-0 pt-5 pb-5">
          {/* Restaurant view */}
          {userInfo.role === "Restaurant" ? (
            <div>
              <h1>
                {userInfo.role} {userInfo.username}
              </h1>
              <div>
                <img src={userInfo.imageUrl} alt="profile-img" width={100} />
                {/* <p>Username: {userInfo.username}</p> */}
              </div>
              <div>
                <p>
                  Address:{" "}
                  <b>
                    {userInfo.address}, {userInfo.city}
                  </b>
                </p>
                <Link to={`/user/edit`}>
                  <button
                    type="button"
                    className="btn btn-danger mt-3 mb-3 me-3 ms-3"
                  >
                    Edit
                  </button>
                </Link>
              </div>
              {/* Pending Orders  */}
              {showOrders ? (
                <div>
                  <button
                    type="button"
                    className="btn btn-danger mt-3"
                    onClick={() => setShowOrders(false)}
                  >
                    Hide Pizza orders
                  </button>
                  {ordersRestaurant.length > 0 ? (
                    <>
                      <hr />
                      {ordersRestaurant.map((elem) => {
                        return (
                          <div key={elem._id}>
                            <p>
                              Order: <b>{elem.pizzaOrder.pizzaName}</b> pizza
                            </p>
                            <p>
                              Status: <b>{elem.pendingApproval}</b>
                            </p>
                            <hr />
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    <p>Not even one, start selling them!</p>
                  )}
                </div>
              ) : (
                <div>
                  <button
                    type="button"
                    className="btn btn-danger mt-3 mb-3"
                    onClick={() => setShowOrders(true)}
                  >
                    Show Pizza orders
                  </button>
                </div>
              )}
              {/* Restaurant pizzas */}
              <h3>My pizzas</h3>
              <Link to={"/user/pizza-create"}>
                <button
                  type="button"
                  className="btn btn-danger mt-3 mb-3 me-3 ms-3"
                >
                  Create new Pizza
                </button>
              </Link>
              <div>
                {pizzasInfo.map((elem) => {
                  return (
                    <div key={elem._id}>
                      <Link to={`/user/pizza-edit/${elem._id}`}>
                        <img src={elem.imageUrl} alt="pizza" width={100} />
                        <p>
                          <b>{elem.pizzaName}</b>
                        </p>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div>
              {/* User view */}
              <h1>{userInfo.role} info</h1>
              <div>
                <img src={userInfo.imageUrl} alt="profile-img" width={100} />
                <p>
                  Username: <b>{userInfo.username}</b>
                </p>
              </div>
              {/* User info */}
              <div>
                <p>
                  Name: <b>{userInfo.firstName}</b>
                </p>
                <p>
                  Lastname: <b>{userInfo.lastName}</b>
                </p>
                <p>
                  Address:{" "}
                  <b>
                    {userInfo.address}, {userInfo.city}
                  </b>
                </p>
                <Link to={`/user/edit`}>
                  <button
                    type="button"
                    className="btn btn-danger mt-3 mb-3 me-3 ms-3"
                  >
                    Edit
                  </button>
                </Link>
              </div>
              {/* Orders */}
              {showOrders ? (
                <div>
                  <button
                    type="button"
                    className="btn btn-danger mt-3"
                    onClick={() => setShowOrders(false)}
                  >
                    Hide Pizza orders
                  </button>
                  {orders.length > 0 ? (
                    <>
                      <hr />
                      {orders.map((elem) => {
                        return (
                          <div key={elem._id}>
                            <p>
                              <b>{elem.pizzaOrder.pizzaName}</b> pizza order
                            </p>
                            <p>
                              Status: <b>{elem.pendingApproval}</b>
                            </p>
                            <button
                              type="button"
                              className="btn btn-danger mt-0"
                              onClick={()=>cancelOrder(elem._id)}
                            >
                              Cancel
                            </button>
                            <hr />
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    <p>Not even one, get some PIZZA!</p>
                  )}
                </div>
              ) : (
                <div>
                  <button
                    type="button"
                    className="btn btn-danger mt-3 mb-3"
                    onClick={() => setShowOrders(true)}
                  >
                    Show Pizza orders
                  </button>
                </div>
              )}
              {/* favourite pizzas */}
              <div>
                <h3>My favourite Pizzas</h3>
                {favPizza.length > 0 ? (
                  <>
                    {favPizza.map((elem) => {
                      return (
                        <div id="pizza-card" key={elem._id}>
                          <Link to={`/pizza/${elem._id}`}>
                            <img
                              src={elem.imageUrl}
                              alt="pizza-pict"
                              width={100}
                            />
                            <h4>{elem.pizzaName}</h4>
                          </Link>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <p>No favourites at the moment</p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default User;
