'use client';

import Image from 'next/image';
import { useStore } from '../lib/store';
import { format } from 'date-fns';
import { bn } from 'date-fns/locale/bn';

export default function ReceiversList() {
  const { members, transactions, isLoading } = useStore();

  const receiverMap = new Map();

  transactions.forEach((t) => {
    if (t.receiverName?.trim()) {
      const name = t.receiverName.trim();
      if (!receiverMap.has(name)) {
        const member = members.find((m) => m.name === name) || {
          name,
          avatar: t.receiverImage || `https://i.pravatar.cc/200?u=${encodeURIComponent(name)}`,
        };
        receiverMap.set(name, {
          ...member,
          received: [],
          totalReceived: 0,
        });
      }
      const receiver = receiverMap.get(name);
      if (t.type === 'donation') {
        receiver.received.push(t);
        receiver.totalReceived += Number(t.amount) || 0;
      }
    }
  });

  const receiversWithDonations = Array.from(receiverMap.values()).sort(
    (a, b) => b.totalReceived - a.totalReceived
  );

  if (isLoading) {
    return <div className="text-center py-12 text-gray-600">লোড হচ্ছে...</div>;
  }

  if (receiversWithDonations.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center shadow-xl">
        <p className="text-2xl text-gray-600">এখনো কোনো গ্রহীতা নেই</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {receiversWithDonations.map((receiver) => (
        <div
          key={receiver.name || receiver.id || `receiver-${Math.random()}`}
          className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition"
        >
          <div className="flex items-center gap-6 mb-6">
            <div className="relative w-24 h-24 flex-shrink-0">
              <Image
                src={receiver.avatar}
                alt={receiver.name}
                fill
                className="rounded-full object-cover border-4 border-blue-300"
                onError={(e) => {
                  e.target.src = `https://i.pravatar.cc/200?u=${encodeURIComponent(receiver.name)}`;
                }}
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-blue-900">{receiver.name}</h3>
              <p className="text-gray-700">মোট পেয়েছে: {receiver.received.length} বার</p>
            </div>
          </div>

          <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
            {receiver.received.map((d, index) => (
              <div key={`${d._id || d.id || index}-${d.date}`} className="bg-blue-50 p-5 rounded-2xl">
                <p className="font-semibold text-lg">← {d.donorName || 'অজ্ঞাত'}</p>
                <p className="text-blue-700 font-bold text-xl mt-1">
                  ৳ {(d.amount || 0).toLocaleString('bn-BD')}
                </p>
                <p className="text-gray-700 mt-1">{d.note || d.reason || 'কারণ উল্লেখ নেই'}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {d.date ? format(new Date(d.date), 'dd MMM yyyy', { locale: bn }) : 'তারিখ নেই'}
                </p>
              </div>
            ))}
          </div>

          <p className="text-right mt-6 font-bold text-blue-800 text-xl">
            মোট গ্রহণের পরিমাণ: ৳ {receiver.totalReceived.toLocaleString('bn-BD')}
          </p>
        </div>
      ))}
    </div>
  );
}