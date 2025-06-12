// app/components/admin/DeleteButton.tsx

'use client';

type Props = {
  datasetId: string;
};

export default function DeleteButton({ datasetId }: Props) {
  const handleSubmit = (e: React.FormEvent) => {
    if (!confirm("Are you sure you want to delete this dataset?")) {
      e.preventDefault();
    }
  };

  return (
    <form
      action={`/api/admin/dataset/${datasetId}/delete`}
      method="POST"
      className="inline"
      onSubmit={handleSubmit}
    >
      <button
        type="submit"
        className="text-red-600 hover:underline"
      >
        Delete
      </button>
    </form>
  );
}
