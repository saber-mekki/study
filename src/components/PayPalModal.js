import React from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const PayPalModal = ({ show, onClose, title, price, courseId = "", studentId = "" }) => {
  if (!show) return null;

  const handleApprove = async (data, actions) => {
    const order = await actions.order.capture();
    const courseIds = Array.isArray(courseId) ? courseId : [courseId];

    await fetch(`${process.env.REACT_APP_API_BASE_URL}/purchases`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        courseIds, 
        studentId,
        paypalOrderId: order.id,
        amount: order.purchase_units[0].amount.value,
      }),
    });

    alert(`Payment successful for ${title}!`);
    onClose();
  };

  return (
    <div
      className="modal fade show d-flex align-items-center justify-content-center"
      tabIndex="-1"
      role="dialog"
    >
      <div
        className="modal-dialog modal-dialog-centered"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <div className="modal-content p-3">
          <div className="modal-header">
            <h5 className="modal-title">Pay for {title}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p>Amount: ${price}</p>
            <PayPalScriptProvider options={{ "client-id": "AS-yWifWB7ymF9cYtAFxK9QyaGYvJ4XymiWcDH6HkJp2vtd3mZjdtq2Hlh9Oq45IE9CvVMjGU-lFuYmB" }}>
              <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        description: title,
                        amount: { value: price.toString() },
                      },
                    ],
                  });
                }}
                onApprove={handleApprove}
                onError={(err) => {
                  console.error("PayPal error:", err);
                  alert("Payment failed. Try again.");
                }}
              />
            </PayPalScriptProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayPalModal;
