"use client"
import { FC, useState, useEffect } from "react"
import axios from "axios"

interface TransactionResponse {
  token: string;
}

interface SnapOptions {
  onSuccess: (result: Record<string, unknown>) => void;
  onPending: (result: Record<string, unknown>) => void;
  onError: (result: Record<string, unknown>) => void;
  onClose: () => void;
}

const PaymentPage:FC = () => {

  const [token, setToken] = useState<string>("");

  const createTransaction = async() => {
    try {
      const response = await axios.post<TransactionResponse>(
        'http://localhost:8080/api/payment/create-transaction');
        setToken(response.data.token);
        loadSnap(response.data.token);
    } catch(error) {
      console.error("Error creating transaction: ", error);
      alert("Failed to create transaction");
    }
  };

  const loadSnap = (token: string) => {
    const midtransClientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;

    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute("data-client-key", midtransClientKey!);
    script.onload = () => {
      const snap = (window as unknown as {
        snap: {
          pay: (token: string, options: SnapOptions) => void
        }
      }).snap;
      snap.pay(token, {
        onSuccess: (result: Record<string, unknown>) => {
          console.log(result);
          alert("Payment successful!");
        },
        onPending: (result: Record<string, unknown>) => {
          console.log(result);
          alert("Payment pending!");
        },
        onError: (result: Record<string, unknown>) => {
          console.log(result);
          alert("Payment failed!");
        },
        onClose: () => {
          console.log("Transaction closed.")
        }
      });
    };
    document.body.appendChild(script);
  };



  return(
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Midtrans Payment</h1>
      <button 
        onClick={createTransaction}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
      >Create Transaction</button>
      {
        token && (
          <button
            onClick={() => loadSnap(token)}
            className="mt-4 px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
          >
            Pay Now
          </button>
        )
      }
    </div>
  )
}

export default PaymentPage