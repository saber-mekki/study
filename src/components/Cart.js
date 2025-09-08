import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "./context/CartContext";
import SectionTwo from "./layouts/SectionTwo";
import PayPalModal from "./PayPalModal"; // ✅ import your PayPal modal
import { useSelector } from "react-redux";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

 const user = useSelector((state) => state.user);
  const total = cart.reduce((sum, item) => sum + parseFloat(item.price || 0), 0);

  if (cart.length === 0) {
    return (
      <SectionTwo title={"Cart"}>
        <section className="section-padding">
          <div className="container text-center">
            <h3 className="mb-4">Your cart is empty 🛒</h3>
            <Link to="/courses" className="btn btn-primary">
              Browse Courses
            </Link>
          </div>
        </section>
      </SectionTwo>
    );
  }

  return (
    <SectionTwo title={"Cart"}>
      <section className="section-padding">
        <div className="container">
          <h2 className="text-secondary font-weight-bold mb-4">Your Cart</h2>
          <div className="row">
            {/* Cart items */}
            <div className="col-lg-8">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="card mb-3 shadow-sm d-flex flex-row align-items-center p-2"
                >
                  <img
                    src={
                      item.image ||
                      process.env.PUBLIC_URL + "/assets/images/video-thumb-2.jpg"
                    }
                    alt={item.title}
                    className="img-fluid rounded"
                    style={{
                      width: "120px",
                      height: "80px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="ml-3 flex-grow-1">
                    <h5 className="mb-1">
                      <Link
                        to={`/course-details-one/${item.id}`}
                        className="text-blue"
                      >
                        {item.title}
                      </Link>
                    </h5>
                    <p className="mb-1">${item.price}</p>
                  </div>
                  <button
                    className="btn btn-sm btn-danger ml-auto"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Cart summary */}
            <div className="col-lg-4">
              <div className="widget p-3 shadow-sm">
                <h4 className="widget-title">Order Summary</h4>
                <p className="font-weight-600">
                  Total: <span className="text-blue">${total.toFixed(2)}</span>
                </p>

                <button
                  className="btn btn-warning btn-block mb-2"
                  onClick={() => setCheckoutOpen(true)}
                >
                  Checkout with PayPal
                </button>

                <button
                  className="btn btn-danger btn-block"
                  onClick={clearCart}
                >
                  Clear Cart
                </button>
                <Link
                  to="/courses"
                  className="btn btn-outline-primary btn-block mt-2"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PayPalModal
        show={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        title={"Cart Checkout"}
        price={total.toFixed(2)}
        courseId={"cart"} 
        studentId={user.idUser} 
      />
    </SectionTwo>
  );
};

export default Cart;
