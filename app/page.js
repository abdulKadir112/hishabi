'use client';

import { useStore } from '../app/lib/store';
import { useEffect, useState, useRef } from 'react';
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

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const safeTransactions = Array.isArray(transactions) ? transactions : [];

  const recent = safeTransactions
    .slice()
    .sort(
      (a, b) =>
        new Date(b.date || b.createdAt || 0) -
        new Date(a.date || a.createdAt || 0)
    )
    .slice(0, 5);

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
      <div className={`w-12 h-12 rounded-full ${bgColor} flex items-center justify-center text-xl font-bold ${textColor}`}>
        {initial}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <nav className="bg-emerald-700 text-white p-5 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">

          <h1 className="text-3xl font-bold flex items-center gap-3">
            গ্রুপ ফান্ড <span className="text-4xl">💰</span>
          </h1>

          <div className="hidden md:flex gap-8 text-lg">
            <a href="/">হোম</a>
            <a href="/donor">দানকারী</a>
            <a href="/receiver">গ্রহী</a>
            <a href="/members">সদস্য</a>
            <a href="/dashboard">ড্যাশবোর্ড</a>
          </div>

          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden text-3xl"
          >
            ☰
          </button>
        </div>
      </nav>

      {/* overlay */}
      {menuOpen && <div className="fixed inset-0 bg-black/40 z-40"></div>}

      {/* ✅ Sidebar (COLOR FIXED ONLY) */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 h-full w-64 shadow-2xl z-50 transform transition-transform duration-300
        bg-emerald-700 text-white ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-5 border-b border-emerald-500 flex justify-between items-center">
          <h2 className="font-bold text-lg">মেনু</h2>
          <button onClick={() => setMenuOpen(false)} className="text-2xl">
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-6 p-5 text-lg ">
          <a className='p-1' href="/" onClick={() => setMenuOpen(false)}>হোম</a>
          <a className='p-1' href="/donor" onClick={() => setMenuOpen(false)}>দানকারী</a>
          <a className='p-1' href="/receiver" onClick={() => setMenuOpen(false)}>গ্রহী</a>
          <a className='p-1' href="/members" onClick={() => setMenuOpen(false)}>সদস্য</a>
          <a className='p-1' href="/dashboard" onClick={() => setMenuOpen(false)}>ড্যাশবোর্ড</a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 md:p-10">

        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-3xl shadow-2xl p-12 text-center mb-12">
          <p className="text-xl opacity-90">মোট নেট ব্যালেন্স</p>
          <p className="text-7xl md:text-8xl font-extrabold mt-4">
            ৳ {(netBalance ?? 0).toLocaleString('bn-BD')}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard icon={<ArrowUp />} title="মোট দান" value={totalDonation} color="emerald" />
          <StatCard icon={<ArrowDown />} title="মোট খরচ" value={totalExpense} color="red" />
          <StatCard icon={<Gift />} title="মোট লেনদেন" value={safeTransactions.length} color="purple" />
          <StatCard icon={<Users />} title="মোট সদস্য" value={(members || []).length} color="blue" />
        </div>

        <h2 className="text-4xl font-bold mb-8 text-gray-800">সাম্প্রতিক লেনদেন</h2>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-12">
          {recent.length === 0 ? (
            <p className="text-center py-16 text-gray-500 text-xl">
              কোনো লেনদেন হয়নি এখনো
            </p>
          ) : (
            recent.map((t) => (
              <div key={t._id || t.id} className="flex justify-between p-6 border-b">
                <p>{t.donorName} → {t.receiverName}</p>
                <p className="text-indigo-600">
                  ৳ {(t.amount ?? 0).toLocaleString('bn-BD')}
                </p>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

function StatCard({ icon, title, value, color }) {
  const colorMap = {
    emerald: 'bg-emerald-100 text-emerald-600',
    red: 'bg-red-100 text-red-600',
    purple: 'bg-purple-100 text-purple-600',
    blue: 'bg-blue-100 text-blue-600',
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg text-center border-t-4 border-gray-200">
      <div className={`w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center ${colorMap[color]}`}>
        {icon}
      </div>

      <p className="text-4xl font-bold text-gray-800">
        {(value ?? 0).toLocaleString('bn-BD')}
      </p>

      <p className="text-gray-600 mt-2">{title}</p>
    </div>
  );
}