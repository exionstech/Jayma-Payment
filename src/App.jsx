import { useEffect, useState } from "react";
import "./App.css";
import { initializeCashfree } from "./components/cashfree";
import { load } from "@cashfreepayments/cashfree-js";

function Payment1() {
  const [cashfreeInstance, setCashfreeInstance] = useState(null);
  cashfreeInstance;
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
      `${import.meta.env.VITE_FRONTEND_STORE_URL}/progress?order_id=${orderId}`
    );

    // const timeout = setTimeout(() => {
    //   initializeCashfree().then((instance) => {
    //     setCashfreeInstance(instance);
    //     handleRedirect(instance);
    //   });
    // }, 1000);

    // return () => clearTimeout(timeout);

    initializeSDK().then((instance) => doPayment(instance));
  }, [paymentSessionId, storeId, orderId]);

  // const handleRedirect = async (cashfreeInstance) => {
  //   const checkoutOptions = {
  //     paymentSessionId: paymentSessionId,
  //     returnUrl: localStorage.getItem("url"),
  //   };

  //   cashfreeInstance.checkout(checkoutOptions);
  // };

  let cashfree;
  var initializeSDK = async function () {
    return (cashfree = await load({
      mode: "sandbox",
    }));
  };

  const doPayment = async (instance) => {
    let checkoutOptions = {
      paymentSessionId: paymentSessionId,
      returnUrl: localStorage.getItem("url"),
    };

    instance.checkout(checkoutOptions);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="relative w-full h-full max-w-screen-lg min-h-svh  md:max-h-screen flex items-center justify-center">
        <img
          src="/logos/site-logo.svg"
          alt="Loader"
          width={150}
          height={150}
          className="animate-zoom hidden md:block"
        />
        <img
          src="/logos/site-logo.svg"
          alt="Loader"
          width={90}
          height={90}
          className="animate-zoom md:hidden"
        />
      </div>
    </div>
  );
}

export default Payment1;
