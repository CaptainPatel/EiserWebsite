import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import { useAsyncError, useParams } from "react-router-dom";
import axios from "axios";
import { fetchCart } from "../api/api";

const ProductDetail = ({ setCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch(console.log);
  }, [id]);

  const handleAddToCart = () => {
    if (parseInt(qty) < 1) {
      alert("Please enter a valid Quantity");
    } else {
      // add to cart
      axios
        .get(`http://localhost:5000/cart/${id}`)
        .then((res) => {
          if (res.data && Object.keys(res.data).length) {
            axios
              .put(`http://localhost:5000/cart/${id}`, {
                ...res.data,
                qty: parseInt(qty),
              })
              .then((res) => {
                console.log(res);
                alert("Added");
              })
              .catch(console.log);
          }
        })
        .catch((err) => {
          if (err.response.status === 404) {
            axios
              .post("http://localhost:5000/cart", {
                productid: product.id,
                productname: product.title,
                qty: parseInt(qty),
                productimage: product.image,
                price: product.price,
              })
              .then((res) => {
                if (res.status === 201) {
                  alert("Added to Cart successfully");
                  fetchCart().then((res) => setCart(res));
                  setQty(0);
                } else {
                  return Promise.reject(
                    "Some error occurred while adding to cart"
                  );
                }
              })
              .catch(console.error);
          } else {
            console.log(err);
          }
        });
    }
  };

  return (
    <Box>
      <Box>
        <BreadCrumb text="Product Details" />
      </Box>
      <Box pt={"60px"} pb={"150px"}>
        {/* Render Product Here */}
        <Box maxWidth={"1140px"} mx={"auto"}>
          <Grid container height={"580px"}>
            <Grid item xs={12} md={6} px={"50px"}>
              <img
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "contain",
                  objectPosition: "center",
                }}
                src={product?.image}
                alt="image"
              />
            </Grid>
            <Grid item xs={12} md={6} px={"20px"} py={"30px"}>
              <Typography
                variant="h2"
                sx={{
                  fontFamily: "'Heebo', sans-serif",
                  fontSize: "24px",
                  fontWeight: "500",
                  color: "#2a2a2a",
                  mb: "10px",
                  lineHeight: "1.2",
                }}
              >
                {product?.name}
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: "'Heebo', sans-serif",
                  fontSize: "24px",
                  fontWeight: "600",
                  color: "#71cd14",
                  mb: "15px",
                  lineHeight: "1.2",
                }}
              >
                ${product?.price}
              </Typography>
              <Box
                display={"flex"}
                gap={"10px"}
                alignItems={"center"}
                mb={"10px"}
              >
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontFamily: "'Roboto', sans-serif",
                    fontWeight: "300",
                    color: "#555",
                  }}
                >
                  Category &nbsp;&nbsp;:{" "}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontFamily: "'Roboto', sans-serif",
                    fontWeight: "400",
                    color: "#71cd14",
                  }}
                >
                  {product?.category}
                </Typography>
              </Box>
              <Box
                display={"flex"}
                gap={"20px"}
                alignItems={"center"}
                mb={"10px"}
              >
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontFamily: "'Roboto', sans-serif",
                    fontWeight: "300",
                    color: "#555",
                  }}
                >
                  Availibility &nbsp;&nbsp;:{" "}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontFamily: "'Roboto', sans-serif",
                    fontWeight: "400",
                    color: "#555",
                  }}
                >
                  In Stock
                </Typography>
              </Box>
              <Divider sx={{ mb: "10px" }} />
              <Box m={"20px 0 70px 0"}>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "14px",
                    fontWeight: "400",
                    fontFamily: "'Roboto', sans-serif",
                    color: "#797979",
                    pr: "50px",
                  }}
                >
                  {product?.description}
                </Typography>
              </Box>
              <Box display={"flex"} gap={"15px"}>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "14px",
                    fontWeight: "400",
                    fontFamily: "'Roboto', sans-serif",
                    color: "#797979",
                  }}
                >
                  Quantity :
                </Typography>
                <input
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  style={{
                    width: "76px",
                    border: "1px solid #eee",
                    padding: "4px 8px",
                    outline: "none",
                  }}
                  type="number"
                  id="qty"
                />
              </Box>
              <Box>
                <Button
                  onClick={handleAddToCart}
                  variant="contained"
                  sx={{
                    mt: "40px",
                    bgcolor: "#71cd14",
                    lineHeight: "44px",
                    paddingInline: "32px",
                    paddingBlock: "0px",
                    "&:hover": {
                      bgcolor: "#559712",
                    },
                  }}
                >
                  Add To Cart
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetail;
