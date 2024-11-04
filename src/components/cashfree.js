import { load } from "@cashfreepayments/cashfree-js";

let cashfree;

async function initializeCashfree() {
  if (!cashfree) {
    cashfree = await load({
      mode: "sandbox",
    });
  }
  return cashfree;
}

export { initializeCashfree };
