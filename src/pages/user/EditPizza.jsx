import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { deleteOnePizza, updateOnePizza, getOnePizza } from "../../services/pizza.services";
import { uploadImageService } from "../../services/upload.services";

function EditPizza() {
  
  const navigate = useNavigate()

  const {id} = useParams()

  const [pizzaName, setPizzaName] = useState("")
  const [sauce, setSauce] = useState("")
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
    getPizzaInfo()
  }, [])

  const getPizzaInfo = async (req, res, next) => {
    try {
      const response = await getOnePizza(id)
      setPizzaName(response.data.pizzaName)
      setSauce(response.data.sauce)
      setIngredient1(response.data.ingredients[0])
      setIngredient2(response.data.ingredients[1])
      setIngredient3(response.data.ingredients[2])
      setIngredient4(response.data.ingredients[3])
      setIngredient5(response.data.ingredients[4])
      setIngredient6(response.data.ingredients[5])
      setPrice(response.data.price)
    } catch (error) {
      navigate("/error")
    }
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatePizza = {
      pizzaName: pizzaName,
      sauce: sauce,
      imageUrl: imageUrl,
      ingredients: [ingredient1, ingredient2, ingredient3, ingredient4,ingredient5, ingredient6],
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
      await deleteOnePizza(id)
      navigate("/user")
    } catch (error) {
      navigate("/error")
    }
  }
  
  return (
    <div>
      <h1>Edit pizza</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Pizza name: </label>
        <input
          type="text"
          name="name"
          value={pizzaName}
          onChange={(event) => {
            setPizzaName(event.target.value);
          }}
        />
        <br />
        <label htmlFor="sauce">Sauce: </label>
        <select
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
        <br />
        <label htmlFor="ingredient1">Ingredient #1: </label>
        <input
          type="array"
          name="ingredient1"
          value={ingredient1}
          onChange={(event) => {
            setIngredient1(event.target.value);
          }}
        />
        <br />
        <label htmlFor="ingredient2">Ingredient #2: </label>
        <input
          type="array"
          name="ingredient2"
          value={ingredient2}
          onChange={(event) => {
            setIngredient2(event.target.value);
          }}
        />
        <br />
        <label htmlFor="ingredient3">Ingredient #3: </label>
        <input
          type="text"
          name="ingredient3"
          value={ingredient3}
          onChange={(event) => {
            setIngredient3(event.target.value);
          }}
        />
        <br />
        <label htmlFor="ingredient4">Ingredient #4: </label>
        <input
          type="text"
          name="ingredient4"
          value={ingredient4}
          onChange={(event) => {
            setIngredient4(event.target.value);
          }}
        />
        <br />
        <label htmlFor="ingredient5">Ingredient #5: </label>
        <input
          type="text"
          name="ingredient5"
          value={ingredient5}
          onChange={(event) => {
            setIngredient5(event.target.value);
          }}
        />
        <br />
        <label htmlFor="ingredient6">Ingredient #6: </label>
        <input
          type="text"
          name="ingredient6"
          value={ingredient6}
          onChange={(event) => {
            setIngredient6(event.target.value);
          }}
        />
        <br />
        <label htmlFor="price">Price </label>
        <input
          type="number"
          name="price"
          value={price}
          onChange={(event) => {
            setPrice(event.target.value);
          }}
        />
        <br />
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
        <button type="submit">Update</button>
      </form>
      <button onClick={() => handleDeletePizza() }>Delete pizza</button>
    </div>
  )
}

export default EditPizza