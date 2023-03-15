import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Search from "../components/Search";
import { getAllPizzas } from "../services/pizza.services";
import { getAllPizzerias } from "../services/user.services";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"; // for Leaflet Component imports

function Home() {
  const navigate = useNavigate();

  const [allPizzerias, setAllPizzerias] = useState(null);
  const [allPizzeriasToDisplay, setAllPizzeriasToDisplay] =
    useState(allPizzerias);
  const [allPizzas, setAllPizzas] = useState(null);
  const [allPizzasToDisplay, setAllPizzasToDisplay] = useState(allPizzas);
  const [isFetching, setIsFetching] = useState(true);
  const [isFetching2, setIsFetching2] = useState(true);
  const [showMap, setShowMap] = useState(false);

  const [center, setCenter] = useState([38.908, 1.437]); // state used to define the center of the map on first render. [51.505, -0.09] is just an example.

  useEffect(() => {
    getPizzerias();
    getPizzas();
  }, []);

  const getPizzerias = async () => {
    setIsFetching(true);
    try {
      const response = await getAllPizzerias();
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
        {isFetching ? (
          <img src="./pizza.svg" className="App-logo" alt="pizza" />
        ) : (
          <div>
            {allPizzeriasToDisplay.length > 0 ? (
              allPizzeriasToDisplay.map((elem) => {
                return (
                  <Link key={elem._id} to={`/user/${elem._id}`}>
                    <img src={elem.imageUrl} alt="pizzeria" width={100} />
                    <p>{elem.username}</p>
                  </Link>
                );
              })
            ) : (
              <p>Sorry, no Pizzerias with that name</p>
            )}
            {showMap === true ? (
              <>
                <button type="button" className="btn btn-danger" onClick={() => setShowMap(!showMap)}>Hide map</button>
                <div>
                  <MapContainer
                    center={center}
                    zoom={13}
                    scrollWheelZoom={false}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {allPizzerias.map((eachElement) => {
                      return (
                        <Marker
                          position={eachElement.coordinates}
                          key={eachElement._id}
                        >
                          <Popup>
                            <p>
                              Pizzeria: <b>{eachElement.username}</b>
                            </p>
                            <p>
                              Address: <b>{eachElement.address}</b>
                            </p>
                            <p>
                              City: <b>{eachElement.city}</b>
                            </p>
                          </Popup>
                        </Marker>
                      );
                    })}
                  </MapContainer>
                </div>
              </>
            ) : (
              <button type="button" className="btn btn-danger" onClick={() => setShowMap(!showMap)}>View map of Pizzerias</button>
            )}
          </div>
        )}
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
                <p>Sorry, no pizzas with that name</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
