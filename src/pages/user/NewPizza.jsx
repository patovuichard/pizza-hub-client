import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNewPizza } from "../../services/pizza.services";
import { uploadImageService } from "../../services/upload.services";

function NewPizza() {
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const addNewPizza = {
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
      await createNewPizza(addNewPizza);
      navigate("/user");
    } catch (error) {
      navigate("/error");
    }
  };

  return (
    <div className="ms-0 me-0 pt-5 pb-5">
      <h1>Create a pizza</h1>
      <form className="ms-3 me-3 pt-3 pb-3" onSubmit={handleSubmit}>
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
            className="form-select" aria-label="Floating label select example"
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
            name="ingredients"
            value={ingredient1}
            onChange={(event) => {
              setIngredient1(event.target.value);
            }}
          />
          <label htmlFor="ingredients">Ingredient #1</label>
        </div>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            placeholder="Ingredient #2"
            type="array"
            name="ingredients"
            value={ingredient2}
            onChange={(event) => {
              setIngredient2(event.target.value);
            }}
          />
          <label htmlFor="ingredients">Ingredient #2</label>
        </div>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            placeholder="Ingredient #3"
            type="text"
            name="address"
            value={ingredient3}
            onChange={(event) => {
              setIngredient3(event.target.value);
            }}
          />
          <label htmlFor="address">Ingredient #3</label>
        </div>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            placeholder="Ingredient #4"
            type="text"
            name="address"
            value={ingredient4}
            onChange={(event) => {
              setIngredient4(event.target.value);
            }}
          />
          <label htmlFor="address">Ingredient #4</label>
        </div>
        <div className="form-floating mb-3">
          <input
          className="form-control"
            placeholder="Ingredient #5"
            type="text"
            name="address"
            value={ingredient5}
            onChange={(event) => {
              setIngredient5(event.target.value);
            }}
          />
          <label htmlFor="address">Ingredient #5</label>
        </div>
        <div className="form-floating mb-3">
          <input
          className="form-control"
            placeholder="Ingredient #6"
            type="text"
            name="address"
            value={ingredient6}
            onChange={(event) => {
              setIngredient6(event.target.value);
            }}
          />
          <label htmlFor="address">Ingredient #6</label>
        </div>
        <div className="form-floating mb-3">
          <input
          className="form-control"
            placeholder="Price"
            type="number"
            name="price"
            value={price}
            onChange={(event) => {
              setPrice(event.target.value);
            }}
          />
          <label htmlFor="price">Price</label>
        </div>
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
        <br />
        <button className="btn btn-danger mt-3 mb-3 me-3 ms-3" type="submit">
          Create
        </button>
      </form>
    </div>
  );
}

export default NewPizza;
