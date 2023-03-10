import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Search from "../components/Search";
import { getAllPizzas } from "../services/pizza.services";
import { getAllPizzerias } from "../services/user.services";

function Home() {
  const navigate = useNavigate();

  const [allPizzerias, setAllPizzerias] = useState(null);
  const [allPizzeriasToDisplay, setAllPizzeriasToDisplay] = useState(allPizzerias);
  const [allPizzas, setAllPizzas] = useState(null);
  const [allPizzasToDisplay, setAllPizzasToDisplay] = useState(allPizzas);
  const [isFetching, setIsFetching] = useState(true);
  const [isFetching2, setIsFetching2] = useState(true);

  useEffect(() => {
    getPizzerias();
    getPizzas();
  }, []);

  const getPizzerias = async () => {
    setIsFetching(true);
    try {
      const response = await getAllPizzerias();
      // console.log(response);
      setTimeout(() => {
        setAllPizzerias(response.data);
        setAllPizzeriasToDisplay(response.data);
        setIsFetching(false);
      }, 1500);
    } catch (error) {
      navigate("/error");
    }
  };

  const getPizzas = async () => {
    setIsFetching2(true);
    try {
      const response = await getAllPizzas();
      // console.log(response);
      setTimeout(() => {
        setAllPizzas(response.data);
        setAllPizzasToDisplay(response.data);
        setIsFetching2(false);
      }, 1500);
    } catch (error) {
      navigate("/error");
    }
  };

  const selectedPizzeria = (searchInput) => {
    const filteredPizzeria = allPizzerias.filter((eachPizzeria) => {
      let nameMin = eachPizzeria.username.toLowerCase();
      let searchMin = searchInput.toLowerCase();
      if (nameMin.includes(searchMin)) {
        return true;
      } else {
        return false;
      }
    });
    setAllPizzeriasToDisplay(filteredPizzeria);
  };

  const selectedPizza = (searchInput) => {
    const filteredPizza = allPizzas.filter((eachPizza) => {
      let nameMin = eachPizza.pizzaName.toLowerCase();
      let searchMin = searchInput.toLowerCase();
      if (nameMin.includes(searchMin)) {
        return true;
      } else {
        return false;
      }
    });
    setAllPizzasToDisplay(filteredPizza);
  };

  return (
    <div>
      <div>
        <Search
          selectedPizzeria={selectedPizzeria}
          selectedPizza={selectedPizza}
        />
      </div>
      <div>
        <h1>Pizzerias</h1>
      </div>
      <div>
        <div>
          {isFetching ? (
            <img src="./pizza.svg" className="App-logo" alt="pizza"/>
          ) : (
            <div>
              {allPizzeriasToDisplay.length > 0 ? (
                allPizzeriasToDisplay.map((elem) => {
                  return (
                    <Link key={elem._id} to={`/user/${elem._id}`}>
                      <img src={elem.imageUrl} alt="pizzeria" width={100}/>
                      <p>{elem.username}</p>
                    </Link>
                  );
                })
              ) : (
                <p>No Pizzerias with that name</p>
              )}
            </div>
          )}
        </div>
      </div>
      <div>
        <div>
          <h1>Pizzas</h1>
        </div>
        <div>
          {isFetching2 ? (
            <img src="./pizza.svg" className="App-logo" alt="pizza" />
          ) : (
            <div>
              {allPizzasToDisplay.length > 0 ? (
                allPizzasToDisplay.map((elem) => {
                  return (
                    <Link key={elem._id} to={`/pizza/${elem._id}`}>
                      <img src={elem.imageUrl} alt="pizza" width={100} />
                      <p>{elem.pizzaName}</p>
                    </Link>
                  );
                })
              ) : (
                <p>No pizzas with that name</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
