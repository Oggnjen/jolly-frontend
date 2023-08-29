import { useState } from "react";
import { register } from "../backend-layer/registration/registrationService";

const Registration = () => {
  const registerCallback = register();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex-row gap-2 ">
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(state) => setName(state.target.value)}
        />
      </div>
      <div>
        <label>Surname:</label>
        <input
          type="text"
          value={surname}
          onChange={(state) => setSurname(state.target.value)}
        />
      </div>
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
      <div onClick={() => registerCallback({ name, surname, email, password })}>
        Klik
      </div>
    </div>
  );
};

export default Registration;
