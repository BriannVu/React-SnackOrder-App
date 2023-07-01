import { Fragment } from "react";
import mealsImage from "../../assets/meals.jpg"
import classes from './Header.module.css'
import HeaderCartButton from "./HeaderCardButton";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>React Snack</h1>
        <HeaderCartButton onClick={props.onShowCart}></HeaderCartButton>
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage}></img>
      </div>
    </Fragment>
  );
};

export default Header;
