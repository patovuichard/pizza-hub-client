import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserData } from "../../services/user.services";

function User() {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setIsFetching(true);
    try {
      const response = await getUserData();
      console.log(response);
      setTimeout(() => {
        setUserInfo(response);
        setIsFetching(false);
      }, 1000);
    } catch (error) {
      navigate("/error");
    }
  };

  return (
    <>
      <h1>User info</h1>
      {isFetching ? (
        <p>... loading</p>
      ) : (
        <div>
          <div>
            <img src={userInfo.data.imageUrl} alt="profile-img" />
          </div>
          <div>
            <p>Username: {userInfo.data.username}</p>
            <p>Name: {userInfo.data.firstName}</p>
            <p>Lastname: {userInfo.data.lastName}</p>
            <p>Address: {userInfo.data.address}, {userInfo.data.city}</p>
            <Link to={`/user/edit`}>
              <button>Edit</button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default User;
