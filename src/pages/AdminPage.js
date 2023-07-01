import { useState } from "react";
import { useEffect } from "react";
import classes from "./AdminPage.module.css";
import { useRef } from "react";
import { Link } from "react-router-dom";

function AdminPage() {
  const [orders, setOrders] = useState([]);
  const [isValid, setIsValid] = useState(true);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://snack-app-backend-default-rtdb.firebaseio.com/order.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();
      const loadedOrders = [];
      for (const key in responseData) {
        loadedOrders.push({
          id: key,
          orderedItems: responseData[key].orderedItems,
          user: responseData[key].user,
        });
      }
      setOrders(loadedOrders);
    };
    fetchMeals().catch((error) => {});
  }, []);

  //   let orderSummary = "";
  //   if (orders.length > 0) {
  //     orders.forEach((order) => {
  //       console.log(order);
  //       const user = order.user;
  //       let orderDetail = `${user.name}, ${user.street}, ${user.city}, ${user.postalCode}`;
  //       order.orderedItems.forEach((item) => {
  //         orderDetail += (
  //           <p>
  //             {" "}
  //             {item.amount} x {item.name}-{item.price}
  //           </p>
  //         );
  //       });
  //       console.log(orderDetail);
  //       orderSummary += orderDetail + <br />;
  //     });
  //   }

  const username = useRef();
  const password = useRef();

  const submitHandler = (event) => {
    console.log(event);
    if (
      username.current.value.trim() == "admin" &&
      password.current.value.trim() == "admin"
    ) {
        setIsValid(true);
        setIsLogin(true);
    }
    setIsValid(false);
    setTimeout(()=>{setIsValid(true)}, 2000);
  };

  const orderList = orders.map((order) => {
    const user = order.user;
    let total = 0;
    const itemList = order.orderedItems.map((item) => {
      total += item.amount * item.price;
      return (
        <div key={item.id}>
          {item.amount} x {item.price} {item.name}
        </div>
      );
    });

    return (
      <div className={classes.box} key={order.id}>
        <b>Customer Info</b>
        <br /> Name: {user.name} <br />
        Address: {user.street}, {user.city}, {user.postalCode} <br />
        <br /> <b>Ordered Items</b> {itemList}
        <br /> <span className={classes.total}>Total: ${total}</span>
      </div>
    );
  });

  return (
    <div>
      {!isLogin && (
        <div className={classes.authenBox}>
          <Link className={classes.back} to="/">
          ← Back
          </Link>
          <br />
          <br />
          Admin Login <br />
          <br />
          <input
            className={classes.input}
            type="text"
            placeholder="Username"
            ref={username}
          ></input>{" "}
          <br></br>
          <input
            className={classes.input}
            type="password"
            placeholder="Password"
            ref={password}
          ></input>{" "}
          <br></br>
          <br />
          <button onClick={submitHandler} className={classes.submit}>
            Login
          </button>
          {!isValid && <p style={{ color: "red" }}>Invalid input!</p>}
        </div>
      )}
      {isLogin && (
        <div>
          <Link className={classes.back} to="/">
          ← Back / Logout
          </Link>
          <br />
          <br />
          <div className={classes.title}>📋 Order History</div>
          {orderList}
        </div>
      )}
    </div>
  );
}

export default AdminPage;
