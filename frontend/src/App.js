import {useState} from "react";
import axios from "axios";
function App() {

  let [username, setUsername] = useState();
  let [password, setPassword] = useState();
  let [status, setStatus] = useState();
  let handleSubmit = async (event) => {
    event.preventDefault();

    let response = await axios.post("http://127.0.0.1:8080/api/auth/login", {
        username: username,
        password: password
    });
    console.log(response);
    axios.get("http://127.0.0.1:8080/api/user/getWithUsername", {
       params:{
           username: username
       },
       withCredentials: true,
        headers: {
           authorization: "Bearer " + response.data['accessToken']
        }
    }, ).then((res)=>{
        console.log(res);
    });


    setStatus(response.data['accessToken']);
  }
  return (
    <div className="App">
      <div>Status - {status}</div>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" onChange={(event) => {setUsername(event.target.value)}}/>
          Password:
          <input type="text" onChange={(event) => {setPassword(event.target.value)}}/>
        </label>
        <input type="submit" value="Submit"/>
      </form>
    </div>
  );
}

export default App;
