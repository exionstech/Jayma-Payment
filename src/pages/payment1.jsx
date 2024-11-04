import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { initializeCashfree } from "../components/cashfree";

function Payment1() {
  const [cashfreeInstance, setCashfreeInstance] = useState(null);
  const params = new URLSearchParams(window.location.search);
  const paymentSessionId = params.get("session_id");
  const storeId = params.get("store_id");
  const orderId = params.get("order_id");

  useEffect(() => {
    if (!paymentSessionId || !storeId || !orderId) {
      redirect(`${import.meta.env.VITE_FRONTEND_STORE_URL}/checkout-failed`);
      return;
    }

    initializeCashfree().then((instance) => {
      setCashfreeInstance(instance);
      handleRedirect(instance);
    });
  }, [paymentSessionId]);

  const handleRedirect = async (cashfreeInstance) => {
    const checkoutOptions = {
      paymentSessionId: paymentSessionId,
      // returnUrl: ${import.meta.env.VITE_FRONTEND_STORE_URL}/checkout-success,
      redirectTarget: "_self",
    };

    await cashfreeInstance.checkout(checkoutOptions);

    await axios.post(
      `${import.meta.env.VITE_WEBHOOK_STORE_URL}/${storeId}/webhook`,
      {
        storeId: storeId,
        orderId: orderId,
      }
    );
  };

  return (
    <div>
      <h1>Processing Payment...</h1>
    </div>
  );
}

export default Payment1;
