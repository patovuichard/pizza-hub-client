import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteOnePizza,
  updateOnePizza,
  getOnePizza,
} from "../../services/pizza.services";
import { uploadImageService } from "../../services/upload.services";

function EditPizza() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [pizzaName, setPizzaName] = useState("");
  const [sauce, setSauce] = useState("");
  const [ingredient1, setIngredient1] = useState("");
  const [ingredient2, setIngredient2] = useState("");
  const [ingredient3, setIngredient3] = useState("");
  const [ingredient4, setIngredient4] = useState("");
  const [ingredient5, setIngredient5] = useState("");
  const [ingredient6, setIngredient6] = useState("");
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (event) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);

    if (!event.target.files[0]) {
      // to prevent accidentally clicking the choose file button and not selecting a file
      return;
    }

    setIsUploading(true); // to start the loading animation

    const uploadData = new FormData(); // images and other files need to be sent to the backend in a FormData
    uploadData.append("image", event.target.files[0]);
    //                   |
    //     this name needs to match the name used in the middleware => uploader.single("image")

    try {
      const response = await uploadImageService(uploadData);
      // or below line if not using services
      // const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/upload`, uploadData)

      setImageUrl(response.data.imageUrl);
      //                          |
      //     this is how the backend sends the image to the frontend => res.json({ imageUrl: req.file.path });

      setIsUploading(false); // to stop the loading animation
    } catch (error) {
      navigate("/error");
    }
  };

  useEffect(() => {
    getPizzaInfo();
  }, []);

  const getPizzaInfo = async (req, res, next) => {
    try {
      const response = await getOnePizza(id);
      setPizzaName(response.data.pizzaName);
      setSauce(response.data.sauce);
      setIngredient1(response.data.ingredients[0]);
      setIngredient2(response.data.ingredients[1]);
      setIngredient3(response.data.ingredients[2]);
      setIngredient4(response.data.ingredients[3]);
      setIngredient5(response.data.ingredients[4]);
      setIngredient6(response.data.ingredients[5]);
      setPrice(response.data.price);
    } catch (error) {
      navigate("/error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatePizza = {
      pizzaName: pizzaName,
      sauce: sauce,
      imageUrl: imageUrl,
      ingredients: [
        ingredient1,
        ingredient2,
        ingredient3,
        ingredient4,
        ingredient5,
        ingredient6,
      ],
      price: price,
    };
    try {
      await updateOnePizza(id, updatePizza);
      navigate("/user");
    } catch (error) {
      navigate("/error");
    }
  };

  const handleDeletePizza = async () => {
    try {
      await deleteOnePizza(id);
      navigate("/user");
    } catch (error) {
      navigate("/error");
    }
  };

  return (
    <div className="mx-0 py-5">
      <div className="all mx-0" width={300}>
        <h1 className="mb-3">Edit pizza</h1>
      </div>
      <form className="mx-0 px-0 py-3" onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            placeholder="Pizza name"
            type="text"
            name="name"
            value={pizzaName}
            onChange={(event) => {
              setPizzaName(event.target.value);
            }}
          />
          <label htmlFor="name">Pizza name</label>
        </div>
        <div className="form-floating mb-3">
          <select
            className="form-select"
            aria-label="Floating label select example"
            name="sauce"
            onChange={(event) => {
              setSauce(event.target.value);
            }}
          >
            <option value=""></option>
            <option value="none">none</option>
            <option value="red">red</option>
            <option value="white">white</option>
          </select>
          <label htmlFor="sauce">Sauce</label>
        </div>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            placeholder="Ingredient #1"
            type="array"
            name="ingredient1"
            value={ingredient1}
            onChange={(event) => {
              setIngredient1(event.target.value);
            }}
          />
          <label htmlFor="ingredient1">Ingredient #1</label>
        </div>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            placeholder="Ingredient #2"
            type="array"
            name="ingredient2"
            value={ingredient2}
            onChange={(event) => {
              setIngredient2(event.target.value);
            }}
          />
          <label htmlFor="ingredient2">Ingredient #2</label>
        </div>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            placeholder="Ingredient #3"
            type="text"
            name="ingredient3"
            value={ingredient3}
            onChange={(event) => {
              setIngredient3(event.target.value);
            }}
          />
          <label htmlFor="ingredient3">Ingredient #3</label>
        </div>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            placeholder="Ingredient #4"
            type="text"
            name="ingredient4"
            value={ingredient4}
            onChange={(event) => {
              setIngredient4(event.target.value);
            }}
          />
          <label htmlFor="ingredient4">Ingredient #4</label>
        </div>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            placeholder="Ingredient #5"
            type="text"
            name="ingredient5"
            value={ingredient5}
            onChange={(event) => {
              setIngredient5(event.target.value);
            }}
          />
          <label htmlFor="ingredient5">Ingredient #5</label>
        </div>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            placeholder="Ingredient #6"
            type="text"
            name="ingredient6"
            value={ingredient6}
            onChange={(event) => {
              setIngredient6(event.target.value);
            }}
          />
          <label htmlFor="ingredient6">Ingredient #6</label>
        </div>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            placeholder="Price €"
            type="number"
            name="price"
            value={price}
            onChange={(event) => {
              setPrice(event.target.value);
            }}
          />
          <label htmlFor="price">Price €</label>
        </div>
        <div className="all">
          <label>Image: </label>
          <input
            type="file"
            name="image"
            onChange={handleFileUpload}
            disabled={isUploading}
          />
          {isUploading ? <h3>... uploading image</h3> : null}
          {imageUrl ? (
            <div>
              <img src={imageUrl} alt="img" width={200} />
            </div>
          ) : null}
        </div>
        <br />
        <button className="btn btn-danger mt-3 mb-3 me-3 ms-3" type="submit">
          Update
        </button>
        <button
          className="btn btn-danger mt-3 mb-3 me-3 ms-3"
          onClick={() => handleDeletePizza()}
        >
          Delete pizza
        </button>
      </form>
    </div>
  );
}

export default EditPizza;
