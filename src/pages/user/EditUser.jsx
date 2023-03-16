import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import { useNavigate } from "react-router-dom";
import { uploadImageService } from "../../services/upload.services.js";
import {
  getUserData,
  removeOneUser,
  updateOneUser,
} from "../../services/user.services.js";

import { MapContainer, TileLayer, Marker } from "react-leaflet"; // for Leaflet Component imports
import ClickMarker from "../../components/ClickMarker";

function EditUser() {
  const navigate = useNavigate();

  const { authenticateUSer } = useContext(AuthContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [role, setRole] = useState("");
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
      setFirstName(response.data.firstName);
      setLastName(response.data.lastName);
      setAddress(response.data.address);
      setCity(response.data.city);
      setRole(response.data.role);
    } catch (error) {
      navigate("/error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateUser = {
      firstName: firstName,
      lastName: lastName,
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
    <div className="ms-0 me-0 pt-5 pb-5">
      <div className="all">
        <h1>Edit Info</h1>
      </div>
      <form className="ms-3 me-3" onSubmit={handleSubmit}>
        {role === "Client" ? (
          <>
            <div className="form-floating mb-3">
              <input
                className="form-control"
                placeholder="Name"
                type="text"
                name="name"
                value={firstName}
                onChange={(event) => {
                  setFirstName(event.target.value);
                }}
              />
              <label htmlFor="name">Name</label>
            </div>

            <div className="form-floating mb-3">
              <input
                className="form-control"
                placeholder="Lastname"
                type="text"
                name="lastname"
                value={lastName}
                onChange={(event) => {
                  setLastName(event.target.value);
                }}
              />
              <label htmlFor="lastname">Lastame</label>
            </div>
          </>
        ) : null}
        <div className="form-floating mb-3">
          <input
            className="form-control"
            placeholder="Address"
            type="text"
            name="address"
            value={address}
            onChange={(event) => {
              setAddress(event.target.value);
            }}
          />
          <label htmlFor="address">Address</label>
        </div>

        <div className="form-floating mb-3">
          <input
            className="form-control"
            placeholder="City"
            type="text"
            name="city"
            value={city}
            onChange={(event) => {
              setCity(event.target.value);
            }}
          />
          <label htmlFor="city">City</label>
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
              <img src={imageUrl} alt="img" width={150} padding={0} />
            </div>
          ) : null}
        </div>
        <br />
        {role === "Restaurant" ? (
          <div className="all center ms-3 me-3">
            <p className="ps-5 pe-5">
              When you have found the right address, click on the map and a
              marker will appear
            </p>
            <div className="mt-1 mb-3 ms-4 me-3">
              <MapContainer center={center} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* invoke Marker Componentes here */}
                <ClickMarker setClickedPosition={setClickedPosition} />
                {clickedPosition !== null && (
                  <Marker position={clickedPosition} />
                )}
              </MapContainer>
            </div>
          </div>
        ) : null}
        <button type="submit" className="btn btn-danger mt-3 me-3 ms-3">
          Update
        </button>
        <button
          type="button"
          className="btn btn-danger mt-3 me-3 ms-3"
          onClick={() => handleRemoveUser()}
        >
          Remove user
        </button>
      </form>
      <br />
    </div>
  );
}

export default EditUser;
