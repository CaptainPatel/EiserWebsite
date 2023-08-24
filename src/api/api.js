import axios from "axios";

async function fetchCart() {
  try {
    let res = await axios.get("http://localhost:5000/cart");
    return res.data;
  } catch (error) {
    return error.message || error.response.data.message || "Something went wrong";
  }
}

export { fetchCart };
