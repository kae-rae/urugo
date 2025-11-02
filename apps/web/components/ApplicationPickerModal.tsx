
'use client';
import { useEffect, useState } from 'react';

export type ApplicationLite = {
  id: string;
  renter: { id: string; name: string; email: string };
  status: string;
  bgCheck?: { status: string | null } | null;
};

export default function ApplicationPickerModal({
  propertyId,
  open,
  onClose,
  onPick,
}: {
  propertyId: string;
  open: boolean;
  onClose: () => void;
  onPick: (appId: string) => void;
}) {
  const [rows, setRows] = useState<ApplicationLite[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const run = async () => {
      if (!open) return;
      setLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/applications/by-property?propertyId=${propertyId}`);
        setRows(await res.json());
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [open, propertyId]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-xl rounded-2xl bg-white p-4 shadow-xl">
        <div className="mb-3 flex items-center justify-between">
          <div className="text-lg font-semibold">Pick an application</div>
          <button onClick={onClose} className="rounded px-2 py-1 text-sm hover:bg-gray-100">Close</button>
        </div>
        {loading ? (
          <div className="p-4 text-sm text-gray-600">Loading applications…</div>
        ) : rows.length === 0 ? (
          <div className="p-4 text-sm text-gray-600">No applications yet.</div>
        ) : (
          <ul className="max-h-80 space-y-2 overflow-auto">
            {rows.map((a) => (
              <li key={a.id} className="flex items-center justify-between rounded border p-3">
                <div>
                  <div className="font-medium">{a.renter?.name ?? 'Renter'}</div>
                  <div className="text-xs text-gray-600">{a.renter?.email}</div>
                  <div className="mt-1 text-xs">
                    Status: <span className="font-medium">{a.status}</span>
                    {a.bgCheck?.status && (
                      <span className="ml-2 rounded bg-gray-100 px-2 py-0.5 text-[11px]">BG: {a.bgCheck.status}</span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => onPick(a.id)}
                  className="rounded bg-black px-3 py-1 text-sm text-white hover:opacity-90"
                >Select</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
