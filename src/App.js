import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CartProvider from "./store/CartProvider";
import Header from "./components/Layout/Header";
import Cart from "./components/Cart/Cart";
import { useState } from "react";
import AdminPage from "./pages/AdminPage";

const router = createBrowserRouter([{ path: "/", element: <HomePage /> },{
  path: '/admin', element: <AdminPage/>
}]);

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };
  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler}></Cart>}
      <Header onShowCart={showCartHandler}></Header>
      <main>
        <RouterProvider router={router}></RouterProvider>;
      </main>
    </CartProvider>
  );
}

export default App;
