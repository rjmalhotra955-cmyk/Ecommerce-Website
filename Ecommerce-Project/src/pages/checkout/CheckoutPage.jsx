import axios from "axios";
import { useState, useEffect } from "react";
import "./CheckoutPage.css";
import "./Checkout-Header.css";
import { PaymentSummary } from "./PaymentSummary";
import { OrderSummary } from "./orderSummary/OrderSummary";
import { CheckoutHeader } from "./CheckoutHeader";

export function CheckoutPage({ cart, loadCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    const fetchCheckoutData = async () => {
      let response = await axios.get(
        "/api/delivery-options?expand=estimatedDeliveryTime",
      );

      setDeliveryOptions(response.data);
    };

    fetchCheckoutData();
  }, []);

  useEffect(() => {
    const fetchPaymentSummary = async () => {
      let response = await axios.get("/api/payment-summary");
      setPaymentSummary(response.data);
    };

    fetchPaymentSummary();
  }, [cart]);

  return (
    <>
      <title>Checkout</title>

      {<CheckoutHeader />}

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          {
            <OrderSummary
              deliveryOptions={deliveryOptions}
              cart={cart}
              loadCart={loadCart}
            />
          }

          {
            <PaymentSummary
              paymentSummary={paymentSummary}
              loadCart={loadCart}
            />
          }
        </div>
      </div>
    </>
  );
}
