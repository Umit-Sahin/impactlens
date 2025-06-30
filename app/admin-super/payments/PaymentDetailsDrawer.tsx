// 📄 app/admin-super/payments/PaymentDetailsDrawer.tsx

'use client';

import { Drawer } from 'vaul';
import { useEffect, useState } from 'react';
import PaymentHistoryTable from './PaymentHistoryTable';

/* ----------------- Tip Tanımı ------------------ */
type PaymentDetail = {
  user: {
    name: string;
    surname: string;
    email: string;
    companyName: string | null;
    plan: string | null;
  };
  payment: {
    amount: number;
    last4: string | null;
    lastPaymentDate: string;
    status: string;
  };
  history: {
    id: string;
    createdAt: string;
    amount: number;
    cardLast4: string | null;
  }[];
};

/* ----------------- Props Tanımı ------------------ */
type Props = {
  paymentId: string;
  trigger?: React.ReactNode;
  onClose: () => void; // Drawer kapandığında çağrılır
};

export default function PaymentDetailsDrawer({ paymentId, trigger, onClose }: Props) {
  const [data, setData] = useState<PaymentDetail | null>(null);

  /* ----------------- API'den detay veriyi çek ------------------ */
  useEffect(() => {
    if (!paymentId) return;
    const fetchData = async () => {
      const res = await fetch(`/api/admin/payments/${paymentId}`);
      const json = await res.json();
      setData(json);
    };
    fetchData();
  }, [paymentId]);

  return (
    <Drawer.Root
      open={!!paymentId}
      onOpenChange={(open) => {
        if (!open) onClose(); // Drawer kapanınca tetiklenir
      }}
    >
      {/* Drawer'ı tetikleyen buton */}
      <Drawer.Trigger asChild>{trigger}</Drawer.Trigger>

      <Drawer.Portal>
        {/* Karanlık arkaplan */}
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />

        {/* Drawer içeriği */}
        <Drawer.Content className="fixed bottom-0 left-0 right-0 bg-white max-h-[80vh] rounded-t-lg p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-xl font-semibold">Payment Details</h2>

            {/* 👤 Kullanıcı Bilgileri */}
            {data && (
              <div className="border p-4 rounded bg-gray-50">
                <h3 className="font-medium mb-2">User Info</h3>
                <p><strong>Name:</strong> {data.user.name} {data.user.surname}</p>
                <p><strong>Email:</strong> {data.user.email}</p>
                <p><strong>Company:</strong> {data.user.companyName ?? 'N/A'}</p>
                <p><strong>Plan:</strong> {data.user.plan ?? 'N/A'}</p>
              </div>
            )}

            {/* 💳 Ödeme Bilgileri */}
            {data && (
              <div className="border p-4 rounded bg-gray-50">
                <h3 className="font-medium mb-2">Payment Info</h3>
                <p><strong>Amount:</strong> ${data.payment.amount.toFixed(2)}</p>
                <p><strong>Status:</strong> {data.payment.status}</p>
                <p><strong>Card (Last 4):</strong> {data.payment.last4 ?? 'N/A'}</p>
                <p><strong>Last Payment Date:</strong> {new Date(data.payment.lastPaymentDate).toLocaleDateString()}</p>
              </div>
            )}

            {/* 🧾 Ödeme Geçmişi */}
            {data && (
              <div className="border p-4 rounded bg-gray-50">
                <h3 className="font-medium mb-2">Payment History</h3>
                <PaymentHistoryTable history={data.history} />
              </div>
            )}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
