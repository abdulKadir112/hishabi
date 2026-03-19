'use client';

import Image from 'next/image';
import { useStore } from '../lib/store';
import { format } from 'date-fns';
import { bn } from 'date-fns/locale/bn';

export default function DonorsList() {
  const { members, transactions, isLoading } = useStore();

  // transactions থেকে donor ভিত্তিক গ্রুপিং + total calculate
  const donorMap = new Map();

  transactions.forEach((t) => {
    if (t.type === 'donation' && t.donorName?.trim()) {
      const name = t.donorName.trim();
      if (!donorMap.has(name)) {
        const member = members.find((m) => m.name === name) || {
          name,
          avatar: t.donorImage || `https://i.pravatar.cc/200?u=${encodeURIComponent(name)}`,
          phone: t.donorPhone || '',
          address: t.donorAddress || '',
        };
        donorMap.set(name, {
          ...member,
          donations: [],
          totalGiven: 0,
        });
      }
      const donor = donorMap.get(name);
      donor.donations.push(t);
      donor.totalGiven += Number(t.amount) || 0;
    }
  });

  const donorsWithDonations = Array.from(donorMap.values()).sort(
    (a, b) => b.totalGiven - a.totalGiven
  );

  if (isLoading) {
    return <div className="text-center py-12 text-gray-600">লোড হচ্ছে...</div>;
  }

  if (donorsWithDonations.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center shadow-xl">
        <p className="text-2xl text-gray-600">এখনো কোনো দানকারী নেই</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {donorsWithDonations.map((donor) => (
        <div
          key={donor.name || donor.id || `donor-${Math.random()}`}
          className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition"
        >
          <div className="flex items-center gap-6 mb-6">
            <div className="relative w-24 h-24 flex-shrink-0">
              <Image
                src={donor.avatar}
                alt={donor.name}
                fill
                className="rounded-full object-cover border-4 border-indigo-300"
                onError={(e) => {
                  e.target.src = `https://i.pravatar.cc/200?u=${encodeURIComponent(donor.name)}`;
                }}
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-indigo-900">{donor.name}</h3>
              <p className="text-gray-700">মোট দান: {donor.donations.length} বার</p>
            </div>
          </div>

          <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
            {donor.donations.map((d, index) => (
              <div key={`${d._id || d.id || index}-${d.date}`} className="bg-indigo-50 p-5 rounded-2xl">
                <p className="font-semibold text-lg">→ {d.receiverName || 'অজ্ঞাত'}</p>
                <p className="text-indigo-700 font-bold text-xl mt-1">
                  ৳ {(d.amount || 0).toLocaleString('bn-BD')}
                </p>
                <p className="text-gray-700 mt-1">{d.note || d.reason || 'কারণ উল্লেখ নেই'}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {d.date ? format(new Date(d.date), 'dd MMM yyyy', { locale: bn }) : 'তারিখ নেই'}
                </p>
              </div>
            ))}
          </div>

          <p className="text-right mt-6 font-bold text-indigo-800 text-xl">
            মোট দানের পরিমাণ: ৳ {donor.totalGiven.toLocaleString('bn-BD')}
          </p>
        </div>
      ))}
    </div>
  );
}