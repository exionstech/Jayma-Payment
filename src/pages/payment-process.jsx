// src/ProcessPayment.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ProcessPayment() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const params = new URLSearchParams(window.location.search);
  const storeId = params.get("store_id");
  const orderId = params.get("order_id");

  useEffect(() => {
    const handlePayment = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_WEBHOOK_STORE_URL}/${storeId}/webhook`,
          {
            storeId: storeId,
            orderId: orderId,
          }
        );

        if (response.status === 200) {
          setLoading(false);
          navigate("/checkout-success");
        } else {
          // Optionally, handle non-200 responses here
          console.error("Payment processing failed:", response);
        }
      } catch (error) {
        console.error("Error processing payment:", error);
      }
    };
    
    handlePayment();
  }, [storeId, orderId, navigate]);

  return (
    <div>
      {loading ? (
        <h1>Processing Payment...</h1>
      ) : (
        <h1>Payment Processed Successfully!</h1>
      )}
    </div>
  );
}

export default ProcessPayment;
