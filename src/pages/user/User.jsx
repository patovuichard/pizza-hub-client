import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getOrders,
  getOrdersRestaurant,
  acceptOrder,
  removeOrder,
  rejectOrder,
} from "../../services/order.services";
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
      await removeOrder(orderId);
      navigate("/");
    } catch (error) {
      navigate("/error");
    }
  };

  const acceptOneOrder = async (acceptOrderId) => {
    try {
      await acceptOrder(acceptOrderId);
      navigate("/");
    } catch (error) {
      navigate("/error");
    }
  };

  const rejectOneOrder = async (acceptOrderId) => {
    try {
      await rejectOrder(acceptOrderId);
      navigate("/");
    } catch (error) {
      navigate("/error");
    }
  };

  return (
    <div>
      {isFetching ? (
        <img src="./pizza.svg" className="App-logo" alt="pizza" />
      ) : (
        <div className="ms-0 me-0 pt-5 pb-5">
          {/* Restaurant view */}
          {userInfo.role === "Restaurant" ? (
            <div>
              <div className="all">
                <h1 className="mb-3">
                  {userInfo.role} {userInfo.username}
                </h1>
                <img src={userInfo.imageUrl} alt="profile-img" width={250} />
                {/* <p>Username: {userInfo.username}</p> */}
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
                    <div className="all">
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
                            <button
                              type="button"
                              className="btn btn-danger mt-0 me-3 ms-3"
                              onClick={() => acceptOneOrder(elem._id)}
                            >
                              Accept
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger mt-0 me-3 ms-3"
                              onClick={() => rejectOneOrder(elem._id)}
                            >
                              Reject
                            </button>
                            <hr />
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="all">
                      <p>Not even one, start selling them!</p>
                    </div>
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
              <Link to={"/user/pizza-create"}>
                <button
                  type="button"
                  className="btn btn-danger mt-3 mb-3 me-3 ms-3"
                >
                  Create new Pizza
                </button>
              </Link>
              <div className="all">
                <h3 className="mb-3">My pizzas</h3>
                {pizzasInfo.map((elem) => {
                  return (
                    <div key={elem._id}>
                      <Link to={`/user/pizza-edit/${elem._id}`}>
                        <img src={elem.imageUrl} alt="pizza" width={250} />
                        <h4>
                          <b>{elem.pizzaName}</b>
                        </h4>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div>
              {/* User view */}
              <div className="all">
                <h1 className="mb-3">{userInfo.role} info</h1>
                <img src={userInfo.imageUrl} alt="profile-img" width={250} />
                <p>
                  Username: <b>{userInfo.username}</b>
                </p>
                {/* User info */}
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
                    <div className="all">
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
                              onClick={() => cancelOrder(elem._id)}
                            >
                              Cancel
                            </button>
                            <hr />
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="all">
                      <p>Not even one, get some PIZZA!</p>
                    </div>
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
              <div className="all">
                <h3 className="mb-3">My favourite Pizzas</h3>
                {favPizza.length > 0 ? (
                  <>
                    {favPizza.map((elem) => {
                      return (
                        <div id="pizza-card" key={elem._id}>
                          <Link to={`/pizza/${elem._id}`}>
                            <img
                              src={elem.imageUrl}
                              alt="pizza-pict"
                              width={200}
                            />
                            <h4><b>{elem.pizzaName}</b></h4>
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
