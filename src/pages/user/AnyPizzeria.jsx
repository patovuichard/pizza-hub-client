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
    <div className="ms-0 me-0 pt-5 pb-5">
      {isFetching ? (
        <img src="../pizza.svg" className="App-logo" alt="pizza" />
      ) : (
        <div>
          <div className="card mt-5 mb-3" maxwidth={250} >
            <img src={userData.imageUrl} alt="userImage"/>
            <div className="card-body">
              <h1 className="card-title">{userData.username}</h1>
              <hr />
              <p className="card-text">Address:</p>
              <p className="card-text">{userData.address}</p>
              <p className="card-text">{userData.city}</p>
            </div>
          </div>
          <div className="all">
            <h2 className="mb-3">Pizzas</h2>
            {pizzasInfo.data.map((elem) => {
              return (
                <div key={elem._id}>
                  <hr />
                  <Link to={`/pizza/${elem._id}`}>
                    <img src={elem.imageUrl} alt="pizza" width={250} />
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
