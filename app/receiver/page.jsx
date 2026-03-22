'use client';

import { useStore } from '../lib/store'; // পাথ ঠিক করে নিও (যেমন '@/lib/store')
import { format } from 'date-fns';
import { bn } from 'date-fns/locale/bn';
import Link from 'next/link';
import { useState, useMemo, useEffect } from 'react';
import { ArrowLeft, Search, Filter } from 'lucide-react';

export default function ReceiversList() {
  const { transactions, isLoading, fetchData } = useStore();
  const [selectedReceiver, setSelectedReceiver] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // প্রথম লোডে বা transactions খালি হলে fetchData কল করো
  useEffect(() => {
    if (!isLoading && transactions.length === 0) {
      console.log('[ReceiversList] No transactions → fetching data now...');
      fetchData();
    }
  }, [transactions, isLoading, fetchData]);

  // ডিবাগ লগ (কনসোলে দেখো কী হচ্ছে)
  useEffect(() => {
    console.log('[ReceiversList] Transactions count:', transactions?.length || 0);
    if (transactions?.length > 0) {
      console.log('[ReceiversList] First receiverName:', transactions[0]?.receiverName || 'N/A');
      console.log('[ReceiversList] Unique receivers:', 
        [...new Set(transactions
          .filter(t => t.type === 'donation' && t.receiverName?.trim())
          .map(t => t.receiverName.trim())
        )]
      );
    }
  }, [transactions]);

  const receivers = useMemo(() => {
    if (!Array.isArray(transactions) || transactions.length === 0) {
      return [];
    }

    const receiverMap = new Map();

    transactions.forEach((t) => {
      if (t?.type === 'donation' && t?.receiverName?.trim?.()) {
        const name = t.receiverName.trim();
        if (!receiverMap.has(name)) {
          receiverMap.set(name, {
            name,
            totalReceived: 0,
            count: 0,
          });
        }
        const r = receiverMap.get(name);
        r.totalReceived += Number(t.amount) || 0;
        r.count += 1;
      }
    });

    console.log('[ReceiversList] Extracted unique receivers:', receiverMap.size);

    let list = Array.from(receiverMap.values()).filter(r => r.totalReceived > 0);

    // সার্চ ফিল্টার
    if (searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase();
      list = list.filter(r => r.name.toLowerCase().includes(term));
    }

    // ফিল্টার টাইপ
    switch (filterType) {
      case 'top10':
        return list.sort((a, b) => b.totalReceived - a.totalReceived).slice(0, 10);
      case 'bottom10':
        return list.sort((a, b) => a.totalReceived - b.totalReceived).slice(0, 10);
      case 'frequent':
        return list.filter(r => r.count >= 5).sort((a, b) => b.totalReceived - a.totalReceived);
      default:
        return list.sort((a, b) => b.totalReceived - a.totalReceived);
    }
  }, [transactions, searchTerm, filterType]);

  const getInitialAvatar = (name = '') => {
    const initial = name.trim()?.[0]?.toUpperCase() || '?';
    return (
      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-blue-200 flex items-center justify-center text-blue-800 font-bold text-3xl md:text-4xl shadow-md flex-shrink-0">
        {initial}
      </div>
    );
  };

  if (isLoading) {
    return <div className="text-center py-12 text-gray-600 text-xl animate-pulse">লোড হচ্ছে...</div>;
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
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="গ্রহীতার নাম খুঁজুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-gray-800 pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="relative">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full text-gray-800 sm:w-48 pl-4 pr-10 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
              >
                <option value="all">সব গ্রহীতা</option>
                <option value="top10">শীর্ষ ১০ গ্রহীতা</option>
                <option value="bottom10">সর্বনিম্ন ১০ গ্রহীতা</option>
                <option value="frequent">৫+ বার গ্রহণকারী</option>
              </select>
              <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
            </div>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold mb-12 text-blue-900 text-center">
          গ্রহীতাদের তালিকা
        </h1>

        {receivers.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-2xl border border-gray-100">
            <p className="text-2xl font-medium text-gray-600 mb-4">
              {transactions.length === 0 
                ? 'কোনো লেনদেন লোড হয়নি এখনো (fetchData চেক করুন)' 
                : 'কোনো গ্রহীতা পাওয়া যায়নি (receiverName চেক করুন)'}
            </p>
            <p className="text-gray-500">
              ড্যাশবোর্ড থেকে donation যোগ করে receiverName দিন।
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {receivers.map((receiver) => (
              <div
                key={receiver.name}
                onClick={() => setSelectedReceiver(receiver)}
                className="bg-white rounded-3xl shadow-xl p-6 md:p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100 cursor-pointer"
              >
                <div className="flex items-center gap-5 md:gap-6 mb-6">
                  {getInitialAvatar(receiver.name)}
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-blue-900">
                      {receiver.name}
                    </h3>
                    <p className="text-gray-600 mt-1">
                      মোট পেয়েছে: {receiver.count} বার
                    </p>
                  </div>
                </div>

                <p className="text-right font-bold text-blue-800 text-xl md:text-2xl">
                  ৳ {receiver.totalReceived.toLocaleString('bn-BD')}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {selectedReceiver && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-8 border-b pb-4">
                <h2 className="text-2xl md:text-3xl font-bold text-blue-900">
                  {selectedReceiver.name} এর গ্রহণের বিবরণ
                </h2>
                <button
                  onClick={() => setSelectedReceiver(null)}
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
                      t.receiverName?.trim().toLowerCase() === selectedReceiver.name.toLowerCase()
                  )
                  .sort((a, b) => new Date(b.date || b.createdAt || 0) - new Date(a.date || a.createdAt || 0))
                  .map((d, index) => (
                    <div
                      key={index}
                      className="bg-blue-50/70 p-5 rounded-2xl border border-blue-100 shadow-sm hover:shadow transition"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-lg text-blue-800">
                            ← {d.donorName || 'অজ্ঞাত দানকারী'}
                          </p>
                          {d.note && <p className="text-gray-700 mt-1 italic text-sm">{d.note}</p>}
                        </div>
                        <p className="text-blue-700 font-bold text-xl whitespace-nowrap">
                          ৳ {(d.amount || 0).toLocaleString('bn-BD')}
                        </p>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        {d.date
                          ? format(new Date(d.date), 'dd MMMM yyyy', { locale: bn })
                          : 'তারিখ নেই'}
                      </p>
                    </div>
                  ))}

                {transactions.filter(
                  (t) =>
                    t.type === 'donation' &&
                    t.receiverName?.trim().toLowerCase() === selectedReceiver.name.toLowerCase()
                ).length === 0 && (
                  <p className="text-center text-gray-500 py-8 text-lg">
                    কোনো রেকর্ড পাওয়া যায়নি
                  </p>
                )}
              </div>

              <div className="mt-10 pt-6 border-t text-right">
                <p className="text-xl font-bold text-blue-900">
                  মোট গ্রহণ: ৳ {selectedReceiver.totalReceived.toLocaleString('bn-BD')}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}