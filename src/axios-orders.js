import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-burger-54301.firebaseio.com/"
});

export default instance;
