import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getPizzasByRestaurant } from "../../services/pizza.services";
import { getUserDataById } from "../../services/user.services";

function AnyPizzeria() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [userData, setUserData] = useState(null);
  const [pizzasInfo, setPizzasInfo] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    setIsFetching(true);
    try {
      const user = await getUserDataById(id);
      const pizzas = await getPizzasByRestaurant(id);
      setTimeout(() => {
        setUserData(user.data);
        setPizzasInfo(pizzas);
        setIsFetching(false);
      }, 1000);
    } catch (error) {
      navigate("/error");
    }
  };

  return (
    <div>
      {isFetching ? (
        <img src="../pizza.svg" className="App-logo" alt="pizza" />
      ) : (
        <div>
          <div>
            <h1>{userData.username}</h1>
            <h4>
              Address: {userData.address}, {userData.city}
            </h4>
          </div>
          <div>
            <h2>Pizzas</h2>
            {pizzasInfo.data.map((elem) => {
              return (
                <div key={elem._id}>
                  <Link to={`/pizza/${elem._id}`}>
                    <img src={elem.imageUrl} alt="pizza" width={100} />
                    <h3>{elem.pizzaName}</h3>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default AnyPizzeria;
