import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    // backgroundImage: "url('/background.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundColor: "white"
  },
  searchBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: "24px",
    padding: "8px 16px",
    width: "50%",
    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
  },
  searchInput: {
    width: "100%",
    border: "none",
    outline: "none",
    fontSize: "1.5rem",
    marginRight: "8px",
  },
  imageContainer: {
    display: "flex",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  leftImages: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    marginRight: "auto",
  },
  rightImages: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    marginLeft: "auto",
  },
  image: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    margin: "16px",
    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
  },
}));

const HomePage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.searchBox}>
        <input type="text" placeholder="Search Google" className={classes.searchInput} />
        <button>Search</button>
      </div>
      <div className={classes.imageContainer}>
        <div className={classes.leftImages}>
          <img src="https://picsum.photos/200" alt="image1" className={classes.image} />
          <img src="https://picsum.photos/200" alt="image2" className={classes.image} />
          <img src="https://picsum.photos/200" alt="image3" className={classes.image} />
        </div>
        <div className={classes.rightImages}>
          <img src="https://picsum.photos/200" alt="image4" className={classes.image} />
          <img src="https://picsum.photos/200" alt="image5" className={classes.image} />
          <img src="https://picsum.photos/200" alt="image6" className={classes.image} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;