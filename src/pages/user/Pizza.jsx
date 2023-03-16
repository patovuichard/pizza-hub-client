import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PaymentIntent from "../../components/PaymentIntent";
import { addFavPizza, getOnePizza, removeFavPizza } from "../../services/pizza.services";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function Pizza() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { isLoggedIn } = useContext(AuthContext);

  const [singlePizza, setSinglePizza] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [pizzaAddedFavs, setPizzaAddedFavs] = useState(false)
  const [showPaymentIntent, setShowPaymentIntent] = useState(false);

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

  const handleAddFavPizzas = async () => {
    try {
      await addFavPizza(id);
      setPizzaAddedFavs(true)
    } catch (error) {
      navigate("/error");
    }
  };
  const handleRmoveFavPizzas = async () => {
    try {
      await removeFavPizza(id)
      setPizzaAddedFavs(false)
    } catch (error) {
      navigate("/error");
    }
  }

  return (
    <div className="ms-0 me-0 pt-5 pb-5">
      <h1>Pizza details</h1>
      {isFetching ? (
        <img src="../pizza.svg" className="App-logo" alt="pizza" />
      ) : (
        <>
          <div className="card mt-5 mb-3">
            <img
              src={singlePizza.imageUrl}
              className="card-img-top"
              alt="pizza"
              width={100}
            />
            <div className="card-body">
              <h2 className="card-title">
                <b>{singlePizza.pizzaName}</b>
              </h2>
              <ul className="list-group list-group-flush">
                <h4 className="list-group-item">
                  Price: <b>€{singlePizza.price}</b>
                </h4>
                <h4 className="list-group-item">
                  Sauce: <b>{singlePizza.sauce}</b>
                </h4>
                <h4>Ingredients:</h4>
                {singlePizza.ingredients.map((elem) => {
                  return (
                    <p key={elem._id} className="card-text">
                      {elem}
                    </p>
                  );
                })}
                {isLoggedIn ? (
                  <>
                    {pizzaAddedFavs ? (
                      <button
                        className="btn btn-danger ms-4 me-4"
                        onClick={handleRmoveFavPizzas}
                      >
                      Remove from favourites
                      </button>
                    ) : (
                      <button
                        className="btn btn-danger ms-5 me-5"
                        onClick={handleAddFavPizzas}
                      >
                        Add to favourites
                      </button>
                    )}
                  </>
                ) : null}
              </ul>
            </div>
          </div>
          {isLoggedIn ? (
            <div>
              {showPaymentIntent === false ? (
                <button
                  type="button"
                  className="btn btn-danger mt-3 mb-3 me-3 ms-3"
                  onClick={() => setShowPaymentIntent(true)}
                >
                  Buy
                </button>
              ) : (
                <PaymentIntent productDetails={singlePizza} />
              )}
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}

export default Pizza;
