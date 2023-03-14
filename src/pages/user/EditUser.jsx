import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import { useNavigate } from "react-router-dom";
import { uploadImageService } from "../../services/upload.services.js";
import {
  getUserData,
  removeOneUser,
  updateOneUser,
} from "../../services/user.services.js";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"; // for Leaflet Component imports
import ClickMarker from "../../components/ClickMarker";

function EditUser() {
  const navigate = useNavigate();

  const { authenticateUSer } = useContext(AuthContext);

  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const [clickedPosition, setClickedPosition] = useState(null);
  const [center, setCenter] = useState([38.908, 1.437]); // state used to define the center of the map on first render. [51.505, -0.09] is just an example.

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
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await getUserData();
      setFirstNameInput(response.data.firstNameInput);
      setLastNameInput(response.data.lastNameInput);
      setAddress(response.data.address);
      setCity(response.data.city);
    } catch (error) {
      navigate("/error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateUser = {
      firstName: firstNameInput,
      lastName: lastNameInput,
      imageUrl: imageUrl,
      address: address,
      city: city,
      coordinates: clickedPosition, 
    };
    try {
      await updateOneUser(updateUser);
      navigate("/user");
    } catch (error) {
      navigate("/error");
    }
  };

  const handleRemoveUser = async () => {
    try {
      await removeOneUser();
      localStorage.removeItem("authToken");
      authenticateUSer();
      navigate("/");
    } catch (error) {
      navigate("/error");
    }
  };

  return (
    <div>
      <h1>Edit Info</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={firstNameInput}
          onChange={(event) => {
            setFirstNameInput(event.target.value);
          }}
        />
        <br />
        <label htmlFor="lastname">Lastame</label>
        <input
          type="text"
          name="lastname"
          value={lastNameInput}
          onChange={(event) => {
            setLastNameInput(event.target.value);
          }}
        />
        <br />
        <label htmlFor="address">Address</label>
        <input
          type="text"
          name="address"
          value={address}
          onChange={(event) => {
            setAddress(event.target.value);
          }}
        />
        <br />
        <label htmlFor="city">City</label>
        <input
          type="text"
          name="city"
          value={city}
          onChange={(event) => {
            setCity(event.target.value);
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
      <button onClick={() => handleRemoveUser()}>Remove user</button>

      <MapContainer center={center} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* invoke Marker Componentes here */}
        <ClickMarker setClickedPosition={setClickedPosition} />
        { clickedPosition !== null && <Marker position={clickedPosition} /> }
      </MapContainer>
      
    </div>
  );
}

export default EditUser;
