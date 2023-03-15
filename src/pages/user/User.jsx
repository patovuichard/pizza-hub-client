import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getPizzasByRestaurant } from "../../services/pizza.services";
import { getUserData } from "../../services/user.services";

function User() {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState(null);
  const [pizzasInfo, setPizzasInfo] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setIsFetching(true);
    try {
      const user = await getUserData();
      setTimeout(() => {
        setUserInfo(user.data);
      }, 800);
      const pizzas = await getPizzasByRestaurant(user.data._id);
      setTimeout(() => {
        setPizzasInfo(pizzas.data);
        setIsFetching(false);
      }, 1000);
    } catch (error) {
      navigate("/error");
    }
  };

  return (
    <>
      {isFetching ? (
        <p>... loading</p>
      ) : (
        <div>
          {userInfo.role === "Restaurant" ? (
            <div>
              <h1>{userInfo.role} {userInfo.username}</h1>
              <div>
                <img src={userInfo.imageUrl} alt="profile-img" width={100} />
                {/* <p>Username: {userInfo.username}</p> */}
              </div>
              <div>
                <p>
                  Address: {userInfo.address}, {userInfo.city}
                </p>
                <Link to={`/user/edit`}>
                  <button>Edit</button>
                </Link>
              </div>
              {/* <p>Pending Orders</p>
              <p>...</p> */}
              <p>My pizzas</p>
              <Link to={"/user/pizza-create"}>
                <button>Create new Pizza</button>
              </Link>
              <div>
                {pizzasInfo.map((elem) => {
                  return (
                    <div key={elem._id}>
                      <Link to={`/user/pizza-edit/${elem._id}`}>
                        <img src={elem.imageUrl} alt="pizza" width={100} />
                        <p>{elem.pizzaName}</p>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div>
            <h1>{userInfo.role} info</h1>
              <div>
                <img src={userInfo.imageUrl} alt="profile-img" width={100} />
                <p>Username: {userInfo.username}</p>
              </div>
              <div>
                <p>Name: {userInfo.firstName}</p>
                <p>Lastname: {userInfo.lastName}</p>
                <p>
                  Address: {userInfo.address}, {userInfo.city}
                </p>
                <Link to={`/user/edit`}>
                  <button>Edit</button>
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default User;
