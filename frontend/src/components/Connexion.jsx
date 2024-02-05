import axios from "axios";
import { IoIosListBox } from "react-icons/io";
import { useState } from "react";
import PropTypes from "prop-types";

function Connexion({ setUser }) {
  const [inputPassword, setInputPassword] = useState("");
  const [inputEmail, setInputEmail] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("http://localhost:3310/api/login", {
        inputEmail,
        inputPassword,
      });
      setUser(res.data.user);
      setInputEmail("");
      setInputPassword("");
      localStorage.setItem("token", res.data.token);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="login">
      <div className="invite">
        <IoIosListBox size="50px" /> <p>Please login to access your todolist</p>
      </div>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={inputEmail}
          placeholder="Email"
          onChange={(e) => setInputEmail(e.target.value)}
        />
        <input
          type="password"
          value={inputPassword}
          placeholder="Password"
          onChange={(e) => setInputPassword(e.target.value)}
        />
        <button className="button" type="submit">
          Login{" "}
        </button>
      </form>
    </div>
  );
}
Connexion.propTypes = {
  setUser: PropTypes.func.isRequired,
};
export default Connexion;
