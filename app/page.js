'use client';

import { useStore } from '../app/lib/store';
import { useEffect } from 'react';
import { format } from 'date-fns';
import bn from 'date-fns/locale/bn';
import { ArrowUp, ArrowDown, Gift, Users } from 'lucide-react';

export default function Home() {
  const {
    netBalance,
    totalDonation,
    totalExpense,
    members,
    transactions,
    fetchData,
  } = useStore();

  // ✅ FIXED useEffect
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const safeTransactions = Array.isArray(transactions) ? transactions : [];

  // ✅ recent
  const recent = safeTransactions
    .slice()
    .sort(
      (a, b) =>
        new Date(b.date || b.createdAt || 0) -
        new Date(a.date || a.createdAt || 0)
    )
    .slice(0, 5);

  // ✅ top donors
  const topDonors = (members || [])
    .filter((m) => (m.totalDonated || 0) > 0)
    .sort((a, b) => (b.totalDonated || 0) - (a.totalDonated || 0))
    .slice(0, 4);

  const getInitialAvatar = (
    name = '',
    bgColor = 'bg-gray-300',
    textColor = 'text-gray-700'
  ) => {
    const initial = name?.trim()?.[0]?.toUpperCase() || '?';

    return (
      <div
        className={`w-12 h-12 rounded-full ${bgColor} flex items-center justify-center text-xl font-bold ${textColor} flex-shrink-0`}
      >
        {initial}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-emerald-700 text-white p-5 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            গ্রুপ ফান্ড <span className="text-4xl">💰</span>
          </h1>

          <div className="flex gap-8 text-lg">
            <a href="/" className="hover:underline">হোম</a>
            <a href="/donor" className="hover:underline">দানকারী</a>
            <a href="/receiver" className="hover:underline">গ্রহী</a>
            <a href="/members" className="hover:underline">সদস্য</a>
            <a href="/dashboard" className="hover:underline">ড্যাশবোর্ড</a>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6 md:p-10">

        {/* net balance */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-3xl shadow-2xl p-12 text-center mb-12">
          <p className="text-xl opacity-90">মোট নেট ব্যালেন্স</p>
          <p className="text-7xl md:text-8xl font-extrabold mt-4">
            ৳ {(netBalance ?? 0).toLocaleString('bn-BD')}
          </p>
        </div>

        {/* stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard icon={<ArrowUp />} title="মোট দান" value={totalDonation} color="emerald" />
          <StatCard icon={<ArrowDown />} title="মোট খরচ" value={totalExpense} color="red" />
          <StatCard icon={<Gift />} title="মোট লেনদেন" value={safeTransactions.length} color="purple" />
          <StatCard icon={<Users />} title="মোট সদস্য" value={(members || []).length} color="blue" />
        </div>

        {/* recent */}
        <h2 className="text-4xl font-bold mb-8 text-gray-800">সাম্প্রতিক লেনদেন</h2>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-12">
          {recent.length === 0 ? (
            <p className="text-center py-16 text-gray-500 text-xl">
              কোনো লেনদেন হয়নি এখনো
            </p>
          ) : (
            recent.map((t) => {
              const isDonation = t.type === 'donation';

              return (
                <div
                  key={t._id || t.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 border-b last:border-0 hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    {isDonation ? (
                      <>
                        {getInitialAvatar(t.donorName, 'bg-indigo-200', 'text-indigo-800')}

                        <div>
                          <p className="font-semibold text-lg">
                            <span className="text-indigo-700">{t.donorName || 'অজ্ঞাত'}</span>
                            <span className="text-gray-500 mx-2">→</span>
                            <span className="text-blue-700">{t.receiverName || 'অজ্ঞাত'}</span>
                          </p>

                          <p className="text-sm text-gray-500 mt-1">
                            {t.date
                              ? format(new Date(t.date), 'dd MMMM yyyy', { locale: bn })
                              : 'তারিখ নেই'}
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        {getInitialAvatar(t.receiverName, 'bg-red-200', 'text-red-800')}

                        <div>
                          <p className="font-semibold text-lg text-red-700">
                            খরচ: {t.receiverName || 'অজ্ঞাত'}
                          </p>

                          <p className="text-sm text-gray-500 mt-1">
                            {t.date
                              ? format(new Date(t.date), 'dd MMMM yyyy', { locale: bn })
                              : 'তারিখ নেই'}
                          </p>

                          {t.note && (
                            <p className="text-sm text-gray-600 mt-1 italic">
                              {t.note}
                            </p>
                          )}
                        </div>
                      </>
                    )}
                  </div>

                  <p
                    className={`font-bold text-xl whitespace-nowrap ${
                      isDonation ? 'text-indigo-600' : 'text-red-600'
                    }`}
                  >
                    {isDonation ? '+' : '-'} ৳ {(t.amount ?? 0).toLocaleString('bn-BD')}
                  </p>
                </div>
              );
            })
          )}
        </div>

        {/* top donors */}
        <h2 className="text-4xl font-bold mb-8 text-gray-800">শীর্ষ দানকারী</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {topDonors.length === 0 ? (
            <p className="col-span-full text-center py-16 text-gray-600 text-xl">
              এখনো কোনো দানকারী নেই। ড্যাশবোর্ডে গিয়ে দান রেকর্ড করুন।
            </p>
          ) : (
            topDonors.map((m) => (
              <div
                key={m.id}
                className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition border border-gray-100"
              >
                <div className="flex flex-col items-center text-center">
                  {getInitialAvatar(m.name, 'bg-emerald-200', 'text-emerald-800')}

                  <h3 className="text-xl font-bold text-gray-800 mt-4">
                    {m.name}
                  </h3>

                  <p className="text-emerald-600 font-semibold mt-2 text-lg">
                    ৳ {(m.totalDonated || 0).toLocaleString('bn-BD')}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// ✅ SAFE StatCard (NO dynamic tailwind issue)
function StatCard({ icon, title, value, color }) {
  const colorMap = {
    emerald: 'bg-emerald-100 text-emerald-600',
    red: 'bg-red-100 text-red-600',
    purple: 'bg-purple-100 text-purple-600',
    blue: 'bg-blue-100 text-blue-600',
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg text-center border-t-4 border-gray-200 hover:border-indigo-500 transition">
      <div
        className={`w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center ${colorMap[color]}`}
      >
        {icon}
      </div>

      <p className="text-4xl font-bold text-gray-800">
        {(value ?? 0).toLocaleString('bn-BD')}
      </p>

      <p className="text-gray-600 mt-2">{title}</p>
    </div>
  );
}