import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
      console.log(pizzas);
      setTimeout(() => {
        setUserData(user);
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
        <p>... loading</p>
      ) : (
        <div>
          <div>
            <h1>{userData.data.username}</h1>
            <h4>Address: {userData.data.address}, {userData.data.city}</h4>
          </div>
          <div>
            <h2>Pizzas</h2>
            {pizzasInfo.data.map((elem) => {
              return (
                <div key={elem._id}>
                  <img src={elem.imageUrl} alt="pizza" width={100}/>
                  <h3>{elem.pizzaName}</h3>
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
