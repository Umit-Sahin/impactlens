// 📄 app/admin/payments/PaymentHistoryTable.tsx

'use client';

type PaymentHistory = {
  id: string;
  createdAt: string;
  amount: number;
  cardLast4: string | null;
};

export default function PaymentHistoryTable({
  history,
}: {
  history: PaymentHistory[];
}) {
  if (!history || history.length === 0) {
    return <p className="text-gray-500">No payment history available.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left border bg-white shadow-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-2 border-b">Date</th>
            <th className="px-4 py-2 border-b">Amount</th>
            <th className="px-4 py-2 border-b">Card (Last 4)</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item) => (
            <tr key={item.id} className="border-t hover:bg-gray-50 transition">
              <td className="px-4 py-2">
                {new Date(item.createdAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-2 text-green-600 font-medium">
                ${item.amount.toFixed(2)}
              </td>
              <td className="px-4 py-2">
                {item.cardLast4 ? `**** **** **** ${item.cardLast4}` : 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
