import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { initializeCashfree } from "./components/cashfree";

function Payment1() {
  const [cashfreeInstance, setCashfreeInstance] = useState(null);
  const [store, setStore] = useState({
    storeId: "",
    orderId: "",
  });
  const params = new URLSearchParams(window.location.search);
  const paymentSessionId = params.get("session_id");
  const storeId = params.get("store_id");
  const orderId = params.get("order_id");

  useEffect(() => {
    if (!paymentSessionId || !storeId || !orderId) {
      redirect(`${import.meta.env.VITE_FRONTEND_STORE_URL}/checkout-failed`);
      return;
    }

    localStorage.setItem(
      "url",
      `${
        import.meta.env.VITE_FRONTEND_STORE_URL
      }/checkout-success?order_id=${orderId}`
    );

    setStore({
      storeId: storeId,
      orderId: orderId,
    });

    const timeout = setTimeout(() => {
      initializeCashfree().then((instance) => {
        setCashfreeInstance(instance);
        handleRedirect(instance);
      });
    }, 1000);

    return () => clearTimeout(timeout);
  }, [paymentSessionId, storeId, orderId]);

  const handleRedirect = async (cashfreeInstance) => {
    const checkoutOptions = {
      paymentSessionId: paymentSessionId,
      returnUrl: localStorage.getItem("url"),
    };

    await cashfreeInstance.checkout(checkoutOptions);
  };

  return (
    <div>
      <h1>Processing Payment...</h1>
    </div>
  );
}

export default Payment1;
