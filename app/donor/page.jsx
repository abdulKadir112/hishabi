'use client';

import { useStore } from '../lib/store';
import { format } from 'date-fns';
import { bn } from 'date-fns/locale/bn';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import { ArrowLeft, Search, Filter } from 'lucide-react';

export default function DonorsList() {
  const { members, transactions, isLoading } = useStore();
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // all, top10, bottom10, frequent

  // donors প্রস্তুত করা
  const donors = useMemo(() => {
    let list = (members || [])
      .filter((m) => (m.totalDonated || 0) > 0);

    // সার্চ ফিল্টার
    if (searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase();
      list = list.filter((m) => m.name.toLowerCase().includes(term));
    }

    // ফিল্টার টাইপ অনুযায়ী সাজানো/কাটা
    switch (filterType) {
      case 'top10':
        return list
          .sort((a, b) => (b.totalDonated || 0) - (a.totalDonated || 0))
          .slice(0, 10);

      case 'bottom10':
        return list
          .sort((a, b) => (a.totalDonated || 0) - (b.totalDonated || 0))
          .slice(0, 10);

      case 'frequent':
        return list
          .map((m) => ({
            ...m,
            count: transactions.filter(
              (t) =>
                t.type === 'donation' &&
                t.donorName?.trim().toLowerCase() === m.name.toLowerCase()
            ).length,
          }))
          .filter((m) => m.count >= 5)
          .sort((a, b) => b.totalDonated - a.totalDonated);

      default: // 'all'
        return list.sort((a, b) => (b.totalDonated || 0) - (a.totalDonated || 0));
    }
  }, [members, transactions, searchTerm, filterType]);

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

  if (donors.length === 0 && !searchTerm && filterType === 'all') {
    return (
      <div className="bg-white rounded-3xl p-12 text-center shadow-2xl border border-gray-100">
        <p className="text-2xl font-medium text-gray-600">এখনো কোনো দানকারী নেই</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Link href="/">
            <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-medium transition shadow-md w-full sm:w-auto">
              <ArrowLeft size={24} />
              হোমে ফিরে যান
            </button>
          </Link>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="দানকারীর নাম খুঁজুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* Filter Dropdown */}
            <div className="relative">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full sm:w-48 pl-4 pr-10 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer"
              >
                <option value="all">সব দানকারী</option>
                <option value="top10">শীর্ষ ১০ দানকারী</option>
                <option value="bottom10">সর্বনিম্ন ১০ দানকারী</option>
                <option value="frequent">৫+ বার দানকারী</option>
              </select>
              <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
            </div>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold mb-10 text-indigo-900 text-center">
          দানকারীদের তালিকা
        </h1>

        {donors.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-xl border border-gray-200">
            <p className="text-xl text-gray-600">
              কোনো দানকারী পাওয়া যায়নি {searchTerm ? `"${searchTerm}"` : ''} এর সাথে মিলে
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {donors.map((donor) => {
              const donationCount = transactions.filter(
                (t) =>
                  t.type === 'donation' &&
                  t.donorName?.trim().toLowerCase() === donor.name.toLowerCase()
              ).length;

              return (
                <div
                  key={donor.id || donor.name}
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
                        মোট দান: {donationCount} বার
                      </p>
                    </div>
                  </div>

                  <p className="text-right font-bold text-indigo-800 text-xl md:text-2xl">
                    ৳ {(donor.totalDonated || 0).toLocaleString('bn-BD')}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal - একই রাখা হয়েছে, শুধু ছোট্ট স্টাইল আপডেট */}
        {selectedDonor && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-8 border-b pb-4">
                <h2 className="text-2xl md:text-3xl font-bold text-indigo-900">
                  {selectedDonor.name} এর দানের বিবরণ
                </h2>
                <button
                  onClick={() => setSelectedDonor(null)}
                  className="text-gray-600 hover:text-gray-900 text-3xl font-bold"
                >
                  ×
                </button>
              </div>

              <div className="space-y-5">
                {transactions
                  .filter(
                    (t) =>
                      t.type === 'donation' &&
                      t.donorName?.trim().toLowerCase() === selectedDonor.name.toLowerCase()
                  )
                  .sort((a, b) => new Date(b.date || b.createdAt || 0) - new Date(a.date || a.createdAt || 0))
                  .map((d, index) => (
                    <div
                      key={index}
                      className="bg-indigo-50/70 p-5 rounded-2xl border border-indigo-100 shadow-sm hover:shadow transition"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-lg text-indigo-800">
                            → {d.receiverName || 'অজ্ঞাত গ্রহীতা'}
                          </p>
                          {d.note && <p className="text-gray-700 mt-1 italic text-sm">{d.note}</p>}
                        </div>
                        <p className="text-indigo-700 font-bold text-xl whitespace-nowrap">
                          ৳ {(d.amount || 0).toLocaleString('bn-BD')}
                        </p>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        {d.date || d.createdAt
                          ? format(new Date(d.date || d.createdAt), 'dd MMMM yyyy', { locale: bn })
                          : 'তারিখ অনুপলব্ধ'}
                      </p>
                    </div>
                  ))}

                {transactions.filter(
                  (t) =>
                    t.type === 'donation' &&
                    t.donorName?.trim().toLowerCase() === selectedDonor.name.toLowerCase()
                ).length === 0 && (
                  <p className="text-center text-gray-500 py-8 text-lg">
                    কোনো দানের রেকর্ড পাওয়া যায়নি
                  </p>
                )}
              </div>

              <div className="mt-10 pt-6 border-t text-right">
                <p className="text-xl font-bold text-indigo-900">
                  মোট দান: ৳ {(selectedDonor.totalDonated || 0).toLocaleString('bn-BD')}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}