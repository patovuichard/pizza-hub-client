import { useState } from "react";

function EditUser() {
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")

  return (
    <div>
      <h1>Edit Info</h1>
      <form>
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
      </form>
    </div>
  );
}

export default EditUser;
