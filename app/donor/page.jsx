'use client';

import { useStore } from '../lib/store';
import { format } from 'date-fns';
import { bn } from 'date-fns/locale/bn';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function DonorsList() {
  const { members, transactions, isLoading } = useStore();
  const [selectedDonor, setSelectedDonor] = useState(null);

  const donorMap = new Map();

  transactions.forEach((t) => {
    if (t.type === 'donation' && t.donorName?.trim()) {
      const name = t.donorName.trim();
      if (!donorMap.has(name)) {
        donorMap.set(name, {
          name,
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

  const getInitialAvatar = (name = '') => {
    const initial = name.trim()?.[0]?.toUpperCase() || '?';
    return (
      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-800 font-bold text-3xl md:text-4xl shadow-md flex-shrink-0">
        {initial}
      </div>
    );
  };

  if (isLoading) {
    return <div className="text-center py-12 text-gray-600 text-xl animate-pulse">লোড হচ্ছে...</div>;
  }

  if (donorsWithDonations.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center shadow-2xl border border-gray-100">
        <p className="text-2xl font-medium text-gray-600">এখনো কোনো দানকারী নেই</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <Link href="/">
            <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-medium transition shadow-md">
              <ArrowLeft size={24} />
              হোমে ফিরে যান
            </button>
          </Link>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold mb-12 text-indigo-900 text-center">
          দানকারীদের তালিকা
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {donorsWithDonations.map((donor) => (
            <div
              key={donor.name}
              onClick={() => setSelectedDonor(donor)}
              className="bg-white rounded-3xl shadow-xl p-6 md:p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100 cursor-pointer"
            >
              <div className="flex items-center gap-5 md:gap-6 mb-6">
                {getInitialAvatar(donor.name)}
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-indigo-900">
                    {donor.name}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    মোট দান: {donor.donations.length} বার
                  </p>
                </div>
              </div>

              <p className="text-right font-bold text-indigo-800 text-xl md:text-2xl">
                ৳ {donor.totalGiven.toLocaleString('bn-BD')}
              </p>
            </div>
          ))}
        </div>

        {/* Donor Details Modal */}
        {selectedDonor && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-indigo-900">
                  {selectedDonor.name} এর দানের বিবরণ
                </h2>
                <button
                  onClick={() => setSelectedDonor(null)}
                  className="text-gray-500 hover:text-gray-800 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                {selectedDonor.donations.map((d, index) => (
                  <div
                    key={index}
                    className="bg-indigo-50/60 p-5 rounded-2xl border border-indigo-100"
                  >
                    <p className="font-semibold text-lg text-indigo-800">
                      → {d.receiverName || 'অজ্ঞাত'}
                    </p>
                    <p className="text-indigo-700 font-bold text-xl mt-2">
                      ৳ {(d.amount || 0).toLocaleString('bn-BD')}
                    </p>
                    {d.note && <p className="text-gray-700 mt-2">{d.note}</p>}
                    <p className="text-sm text-gray-500 mt-2">
                      {d.date
                        ? format(new Date(d.date), 'dd MMMM yyyy', { locale: bn })
                        : 'তারিখ নেই'}
                    </p>
                  </div>
                ))}
              </div>

              <p className="text-right mt-8 font-bold text-indigo-900 text-2xl">
                মোট দান: ৳ {selectedDonor.totalGiven.toLocaleString('bn-BD')}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}