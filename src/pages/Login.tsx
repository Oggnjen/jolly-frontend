import { useState } from "react";
import { login } from "../backend-layer/login/loginService";

const Login = () => {
  const loginCallback = login();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex-row gap-2 ">
      <div>
        <label>Email:</label>
        <input
          type="text"
          value={email}
          onChange={(state) => setEmail(state.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="text"
          value={password}
          onChange={(state) => setPassword(state.target.value)}
        />
      </div>
      <div onClick={() => loginCallback({ email, password })}>Klik</div>
    </div>
  );
};

export default Login;
