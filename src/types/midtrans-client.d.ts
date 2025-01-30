declare module 'midtrans-client'{

  interface SnapOptions{
    clientKey: string;
    isProduction: boolean
  }

  interface TransactionResult {
    transaction_time: string;
    transaction_status: string;
    transaction_id: string;
    status_code: string;
    order_id: string;
    merchant_id: string;
    gross_amount: string;
    currency: string;
    payment_type: string;
    transaction_details: string;
    fraud_status: string;
    status_message: string;
    signature_key: string;
  }

  interface SnapCallbacks {
    onSuccess: (result: TransactionResult) => void;
    onPending: (result: TransactionResult) => void;
    onError: (result: TransactionResult) => void;
    onClose: () => void;
  }


  class Snap {
    constructor(options: SnapOptions)

    pay(token: string, callbacks: SnapCallbacks): void
  }

  export { Snap }
}