import classes from "./Checkout.module.css";
import { useRef, useState } from "react";

const isEmpty = (value) => value.trim() === "";
const isSixChars = (value) => value.trim().length === 6;

const Checkout = (props) => {
    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true
    });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const conFirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enterNameIsValid = !isEmpty(enteredName);
    const enterStreetIsValid = !isEmpty(enteredStreet);
    const enterPostalIsValid = isSixChars(enteredPostal);
    const enterCityIsValid = !isEmpty(enteredCity);

    setFormInputsValidity({
        name: enterNameIsValid,
        street: enterStreetIsValid,
        city: enterCityIsValid,
        postalCode: enterPostalIsValid
    });

    const formIsValid =
      enterNameIsValid &&
      enterStreetIsValid &&
      enterPostalIsValid &&
      enterCityIsValid;
    if (!formIsValid) {
        return;
    }
    props.onConfirm({
        name: enteredName,
        street: enteredStreet,
        city: enteredCity,
        postalCode: enteredPostal,
    });
  };

  return (
    <form>
      <div className={`${classes.control} ${formInputsValidity.name ? '' : classes.invalid}` }>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef}></input>
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={`${classes.control} ${formInputsValidity.street ? '' : classes.invalid}` }>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef}></input>
        {!formInputsValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={`${classes.control} ${formInputsValidity.postalCode ? '' : classes.invalid}` }>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef}></input>
        {!formInputsValidity.postalCode && <p>Please enter a valid postal code (6 characters long)!</p>}
      </div>
      <div className={`${classes.control} ${formInputsValidity.city ? '' : classes.invalid}` }>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef}></input>
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button onClick={props.onCancel}>Cancel</button>
        <button className={classes.submit} onClick={conFirmHandler}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
