import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOnePizza } from "../../services/pizza.services";

function Pizza() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [singlePizza, setSinglePizza] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getPizzaInfo();
  }, []);

  const getPizzaInfo = async (req, res, next) => {
    setIsFetching(true);
    try {
      const response = await getOnePizza(id);
      setTimeout(() => {
        setSinglePizza(response.data);
        setIsFetching(false);
      }, 1000);
    } catch (error) {
      navigate("/error");
    }
  };

  return (
    <>
      <h1>Pizza details</h1>
      {isFetching ? (
        <img src="../pizza.svg" className="App-logo" alt="pizza" />
      ) : (
        <>
          <div>
            <img src={singlePizza.imageUrl} alt="pizza" width={100}/>
          </div>
          <div>
            <h2>{singlePizza.pizzaName}</h2>
            <h4>Sauce: {singlePizza.sauce}</h4>
            <h4>Ingredients:</h4>
              {singlePizza.ingredients.map((elem) => {
                return <p key={elem._id}>{elem}</p>;
              })}
          </div>
          <button>Buy</button>
        </>
      )}
    </>
  );
}

export default Pizza;
