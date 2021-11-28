import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import "../App.css";

export default function User() {
  let {username,databaseid} = useParams();
  let history = useHistory();
  const [user, setUser] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(Boolean);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    Axios.get(`http://localhost:3002/api/getFromId/${databaseid}`).then((data) => {
      // console.log(data);
      setUser({
        Password: data.data[0].Password,
        Name: data.data[0].Name,
        UserName: data.data[0].UserName,
        Id: data.data[0].Id,
      });

      setUserName(data.data[0].UserName);
      setPassword(data.data[0].Password);
      setName(data.data[0].Name);
    });
    setShowUpdateForm(false);
  }, [databaseid]);

  const deleteUser = (databaseid) => {
    console.log("you deleting a user");
    Axios.delete(`http://localhost:3002/api/delete/${databaseid}`)
      .then((response) => {
        console.log("you deleted a user");
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("you deleted a user");
    history.push("/");
  };
  const updateUser = (databaseid, newdata) => {
    Axios.delete(`http://localhost:3002/api/delete/${databaseid}`).then(
      (response) => {
        console.log("you deleted a user");
      }
    );
    Axios.post("http://localhost:3002/api/create", newdata);
    history.push("/");
  };
  const showform = (bool) => {
    setShowUpdateForm(bool);
  };
  const submit = () => {
    let newdata = { UserName: userName, Password: password, Name: name };
    setShowUpdateForm(false);
    updateUser(databaseid, newdata);
  };

  return (
    <div className="User individual">
      <h4>Username : {user.UserName}</h4>
      <button onClick={() => deleteUser(user.Id)}>Delete User</button>
      {!showUpdateForm && (
        <button onClick={() => showform(true)}>Update User</button>
      )}
      {showUpdateForm && (
        <form class="updateForm" onSubmit={submit}>
          <label>Username: </label>
          <input
            type="text"
            required
            pattern="[A-Za-z0-9]{1,64}"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <br></br>
          <label>Name: </label>
          <input
            type="text"
            required
            pattern=".{8,20}"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <br></br>
          <button type="submit">Update Info</button>
        </form>
      )}
    </div>
  );
}
