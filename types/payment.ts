// 📄 types/payment.ts

export type Payment = {
    id: string;
    name: string;
    surname?: string;
    email: string;
    company?: string;
    amount: number;
    status: string;
    stripePaymentId: string;
    cardLast4?: string | null;
    lastPaymentDate: string;
  };
  
  export type PaymentDetail = {
    user: {
      name: string;
      surname: string;
      email: string;
      companyName: string | null;
    };
    payment: {
      plan?: string;
      amount: number;
      last4: string | null;
      lastPaymentDate: string;
    };
    history: {
      id: string;
      createdAt: string;
      amount: number;
      cardLast4: string | null;
    }[];
  };
  