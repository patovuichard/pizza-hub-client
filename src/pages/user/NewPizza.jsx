import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createNewPizza } from "../../services/pizza.services"
import { uploadImageService } from "../../services/upload.services"


function NewPizza() {

  const navigate = useNavigate()

  const [pizzaName, setPizzaName] = useState("")
  const [sauce, setSauce] = useState("")
  const [ingredients, setIngredients] = useState([])
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
      ingredients: ingredients,
    };
    try {
      await createNewPizza(addNewPizza);
      navigate("/user");
    } catch (error) {
      navigate("/error");
    }
  };

  return (
    <div>
      <h1>Create a pizza</h1>
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
        <input
          type="sauce"
          name="lastname"
          value={sauce}
          onChange={(event) => {
            setSauce(event.target.value);
          }}
        />
        <br />
        <label htmlFor="ingredients">Ingredient #1: </label>
        <input
          type="array"
          name="ingredients"
          value={ingredients}
          onChange={(event) => {
            setIngredients(event.target.value);
          }}
        />
        <br />
        <label htmlFor="ingredients">Ingredient #2: </label>
        <input
          type="array"
          name="ingredients"
          value={ingredients}
          onChange={(event) => {
            setIngredients(event.target.value);
          }}
        />
        <br />
        <label htmlFor="address">Ingredient #3: </label>
        <input
          type="text"
          name="address"
          value={ingredients}
          onChange={(event) => {
            setIngredients(event.target.value);
          }}
        />
        <br />
        <label htmlFor="address">Ingredient #4: </label>
        <input
          type="text"
          name="address"
          value={ingredients}
          onChange={(event) => {
            setIngredients(event.target.value);
          }}
        />
        <br />
        <label htmlFor="address">Ingredient #5: </label>
        <input
          type="text"
          name="address"
          value={ingredients}
          onChange={(event) => {
            setIngredients(event.target.value);
          }}
        />
        <br />
        <label htmlFor="address">Ingredient #6: </label>
        <input
          type="text"
          name="address"
          value={ingredients}
          onChange={(event) => {
            setIngredients(event.target.value);
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
    </div>
  )
}

export default NewPizza