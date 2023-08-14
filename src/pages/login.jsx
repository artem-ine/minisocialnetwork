import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const data = {
//       identifier: username,
//       password: password,
//     };

//     try {
//       const response = await fetch("http://localhost:1337/api/auth/local", {
//         method: "post",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });

//       if (response.ok) {
//         const responseData = await response.json();
//         const jwtToken = responseData.jwt;
//         Cookies.set("token", jwtToken);
//         dispatch(loginSuccess(jwtToken, responseData.user.username));
//         navigate("/");
//       } else {
//         throw new Error("Erreur lors de la connexion");
//       }
//     } catch (error) {
//       console.error("Erreur lors de la requête: ", error);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2 className="mb-4">Connexion</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label htmlFor="username" className="form-label">
//             Username:
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="password" className="form-label">
//             Password:
//           </label>
//           <input
//             type="password"
//             className="form-control"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         <button type="submit" className="btn btn-primary">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };
// export default Login;
