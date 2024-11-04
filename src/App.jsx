import { useEffect, useState } from "react";
import "./App.css";
import { initializeCashfree } from "./components/cashfree";

function App() {
  const [cashfreeInstance, setCashfreeInstance] = useState(null);
  const params = new URLSearchParams(window.location.search);
  const paymentSessionId = params.get("session_id");

  useEffect(() => {
    if (!paymentSessionId) {
      alert("Payment Session Id not found");
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
    };

    const result = await cashfreeInstance
      .checkout(checkoutOptions)
      .then((result) => {
        if (result.error) {
          alert(result.error.message);
        } else if (result.redirect) {
          console.log("Redirection");
        }
      });
    
    console.log(result);
  };

  return (
    <div>
      <h1>Processing Payment...</h1>
    </div>
  );
}

export default App;
