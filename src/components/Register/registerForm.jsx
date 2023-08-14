import React, { useState } from "react";

function RegisterForm() {
  const dispatch = useDispatch();
  const registrationError = useSelector((state) => state.auth.error);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const registrationData = { username, email, password };
    try {
      const registeredUser = await dispatch(registerUser(registrationData));
      if (registeredUser.payload) {
        const loginData = { identifier: email, password };
        await dispatch(loginUser(loginData));
      }
    } catch (error) {
      console.error("Registration and login error:", error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {registrationError && <p>Error: {registrationError.message}</p>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default RegisterForm;
