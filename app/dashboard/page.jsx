'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Gift, ArrowDown, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function Dashboard() {
  const [isLogged, setIsLogged] = useState(false);
  const [pass, setPass] = useState('');

  const [donation, setDonation] = useState({
    donorName: '', donorPhone: '', donorAddress: '', donorImageFile: null,
    receiverName: '', receiverPhone: '', receiverAddress: '', receiverImageFile: null,
    amount: '', reason: ''
  });

  const [expense, setExpense] = useState({
    receiverName: '', receiverPhone: '', receiverAddress: '', receiverImageFile: null,
    amount: '', reason: ''
  });

  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (pass === 'admin123') {
      setIsLogged(true);
      setPass('');
    } else {
      alert('ভুল পাসওয়ার্ড!');
    }
  };

  const handleImageChange = (e, field, formType = 'donation') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (formType === 'donation') {
      if (field === 'donor') {
        setDonation(prev => ({ ...prev, donorImageFile: file }));
      } else {
        setDonation(prev => ({ ...prev, receiverImageFile: file }));
      }
    } else {
      setExpense(prev => ({ ...prev, receiverImageFile: file }));
    }
  };

  const handleAddDonation = async () => {
    if (!donation.amount || Number(donation.amount) <= 0) {
      return alert('টাকার পরিমাণ দিন');
    }
    if (!donation.donorName.trim()) {
      return alert('দাতার নাম দিন');
    }
    if (!donation.receiverName.trim()) {
      return alert('গ্রহীতার নাম দিন');
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append('type', 'donation');
      formData.append('amount', donation.amount);
      formData.append('note', donation.reason.trim());

      formData.append('donorName', donation.donorName.trim());
      formData.append('donorPhone', donation.donorPhone.trim());
      formData.append('donorAddress', donation.donorAddress.trim());
      if (donation.donorImageFile) {
        formData.append('donorImage', donation.donorImageFile);
      }

      formData.append('receiverName', donation.receiverName.trim());
      formData.append('receiverPhone', donation.receiverPhone.trim());
      formData.append('receiverAddress', donation.receiverAddress.trim());
      if (donation.receiverImageFile) {
        formData.append('receiverImage', donation.receiverImageFile);
      }

      const res = await fetch(`${API_BASE}/hishab`, {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'সার্ভারে সমস্যা হয়েছে');
      }

      alert('দান সফলভাবে যোগ হয়েছে!');

      setDonation({
        donorName: '', donorPhone: '', donorAddress: '', donorImageFile: null,
        receiverName: '', receiverPhone: '', receiverAddress: '', receiverImageFile: null,
        amount: '', reason: ''
      });

    } catch (err) {
      console.error(err);
      alert('দান যোগ করতে ব্যর্থ: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async () => {
    if (!expense.amount || Number(expense.amount) <= 0) {
      return alert('টাকার পরিমাণ দিন');
    }
    if (!expense.receiverName.trim()) {
      return alert('গ্রহীতার নাম দিন');
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append('type', 'expense');
      formData.append('amount', expense.amount);
      formData.append('note', expense.reason.trim());

      formData.append('receiverName', expense.receiverName.trim());
      formData.append('receiverPhone', expense.receiverPhone.trim());
      formData.append('receiverAddress', expense.receiverAddress.trim());

      if (expense.receiverImageFile) {
        formData.append('receiverImage', expense.receiverImageFile);
      }

      const res = await fetch(`${API_BASE}/hishab`, {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'সার্ভারে সমস্যা হয়েছে');
      }

      alert('খরচ সফলভাবে রেকর্ড হয়েছে!');

      setExpense({
        receiverName: '', receiverPhone: '', receiverAddress: '', receiverImageFile: null,
        amount: '', reason: ''
      });

    } catch (err) {
      console.error(err);
      alert('খরচ যোগ করতে ব্যর্থ: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isLogged) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="bg-white/10 backdrop-blur-lg p-10 rounded-3xl shadow-2xl text-center max-w-md w-full border border-white/20">
          <h1 className="text-4xl font-bold mb-6 text-white">অ্যাডমিন লগইন</h1>
          <input
            type="password"
            placeholder="পাসওয়ার্ড"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="bg-white/20 border border-white/30 p-4 rounded-xl w-full text-xl mb-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <button
            onClick={handleLogin}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-4 rounded-xl text-xl w-full transition shadow-lg"
          >
            লগইন
          </button>
          <p className="text-sm text-gray-300 mt-4">demo password: admin123</p>
        </div>
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

        <h1 className="text-5xl md:text-6xl font-extrabold mb-12 text-emerald-800 text-center">
          অ্যাডমিন ড্যাশবোর্ড
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          {/* দান ফর্ম */}
          <div className="bg-white p-8 rounded-3xl shadow-2xl border border-purple-100">
            <h2 className="text-3xl font-bold mb-8 text-purple-800 flex items-center gap-3">
              <Gift size={32} className="text-purple-600" /> নতুন দান রেকর্ড
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* দাতা */}
              <div className="space-y-5 bg-purple-50/70 p-6 rounded-2xl border border-purple-200">
                <h3 className="text-2xl font-semibold text-purple-900">দাতা</h3>
                <input
                  placeholder="দাতার পুরো নাম"
                  value={donation.donorName}
                  onChange={(e) => setDonation({ ...donation, donorName: e.target.value })}
                  className="w-full p-4 rounded-xl border border-purple-300 bg-white text-gray-900 placeholder-purple-400/60 focus:border-purple-500 focus:ring-2 focus:ring-purple-400/50 outline-none transition-all duration-200"
                />
                <input
                  placeholder="ফোন নম্বর"
                  value={donation.donorPhone}
                  onChange={(e) => setDonation({ ...donation, donorPhone: e.target.value })}
                  className="w-full p-4 rounded-xl border border-purple-300 bg-white text-gray-900 placeholder-purple-400/60 focus:border-purple-500 focus:ring-2 focus:ring-purple-400/50 outline-none transition-all duration-200"
                />
                <input
                  placeholder="ঠিকানা"
                  value={donation.donorAddress}
                  onChange={(e) => setDonation({ ...donation, donorAddress: e.target.value })}
                  className="w-full p-4 rounded-xl border border-purple-300 bg-white text-gray-900 placeholder-purple-400/60 focus:border-purple-500 focus:ring-2 focus:ring-purple-400/50 outline-none transition-all duration-200"
                />
                <div>
                  <label className="block text-sm font-medium text-purple-700 mb-2">দাতার ছবি</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, 'donor', 'donation')}
                    className="w-full p-3 rounded-xl border border-purple-300 bg-white text-gray-800 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200 cursor-pointer transition"
                  />
                </div>
              </div>

              {/* গ্রহীতা */}
              <div className="space-y-5 bg-blue-50/70 p-6 rounded-2xl border border-blue-200">
                <h3 className="text-2xl font-semibold text-blue-900">গ্রহীতা</h3>
                <input
                  placeholder="গ্রহীতার পুরো নাম"
                  value={donation.receiverName}
                  onChange={(e) => setDonation({ ...donation, receiverName: e.target.value })}
                  className="w-full p-4 rounded-xl border border-blue-300 bg-white text-gray-900 placeholder-blue-400/60 focus:border-blue-500 focus:ring-2 focus:ring-blue-400/50 outline-none transition-all duration-200"
                />
                <input
                  placeholder="ফোন নম্বর"
                  value={donation.receiverPhone}
                  onChange={(e) => setDonation({ ...donation, receiverPhone: e.target.value })}
                  className="w-full p-4 rounded-xl border border-blue-300 bg-white text-gray-900 placeholder-blue-400/60 focus:border-blue-500 focus:ring-2 focus:ring-blue-400/50 outline-none transition-all duration-200"
                />
                <input
                  placeholder="ঠিকানা"
                  value={donation.receiverAddress}
                  onChange={(e) => setDonation({ ...donation, receiverAddress: e.target.value })}
                  className="w-full p-4 rounded-xl border border-blue-300 bg-white text-gray-900 placeholder-blue-400/60 focus:border-blue-500 focus:ring-2 focus:ring-blue-400/50 outline-none transition-all duration-200"
                />
                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-2">গ্রহীতার ছবি</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, 'receiver', 'donation')}
                    className="w-full p-3 rounded-xl border border-blue-300 bg-white text-gray-800 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 cursor-pointer transition"
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 space-y-5">
              <input
                type="number"
                placeholder="দানের পরিমাণ (টাকা)"
                value={donation.amount}
                onChange={(e) => setDonation({ ...donation, amount: e.target.value })}
                className="w-full p-5 rounded-xl border border-indigo-300 bg-white text-gray-900 placeholder-indigo-400/60 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400/50 outline-none transition-all duration-200 text-lg font-medium"
                min="1"
              />
              <input
                placeholder="কেন / কার জন্য দান করা হলো"
                value={donation.reason}
                onChange={(e) => setDonation({ ...donation, reason: e.target.value })}
                className="w-full p-5 rounded-xl border border-indigo-300 bg-white text-gray-900 placeholder-indigo-400/60 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400/50 outline-none transition-all duration-200"
              />

              <button
                onClick={handleAddDonation}
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-5 rounded-xl font-bold text-xl transition shadow-lg flex items-center justify-center gap-3 disabled:opacity-60"
              >
                <Gift size={28} />
                {loading ? 'যোগ হচ্ছে...' : 'দান রেকর্ড করুন'}
              </button>
            </div>
          </div>

          {/* খরচ ফর্ম */}
          <div className="bg-white p-8 rounded-3xl shadow-2xl border border-red-100">
            <h2 className="text-3xl font-bold mb-8 text-red-800 flex items-center gap-3">
              <ArrowDown size={32} className="text-red-600" /> নতুন খরচ রেকর্ড
            </h2>

            <div className="space-y-6">
              <div className="bg-red-50/70 p-6 rounded-2xl border border-red-200">
                <h3 className="text-2xl font-semibold text-red-900 mb-5">
                  গ্রহীতা (যাকে টাকা দেওয়া হলো)
                </h3>
                <div className="space-y-4">
                  <input
                    placeholder="নাম"
                    value={expense.receiverName}
                    onChange={(e) => setExpense({ ...expense, receiverName: e.target.value })}
                    className="w-full p-4 rounded-xl border border-red-300 bg-white text-gray-900 placeholder-red-400/60 focus:border-red-500 focus:ring-2 focus:ring-red-400/50 outline-none transition-all duration-200"
                  />
                  <input
                    placeholder="ফোন নম্বর"
                    value={expense.receiverPhone}
                    onChange={(e) => setExpense({ ...expense, receiverPhone: e.target.value })}
                    className="w-full p-4 rounded-xl border border-red-300 bg-white text-gray-900 placeholder-red-400/60 focus:border-red-500 focus:ring-2 focus:ring-red-400/50 outline-none transition-all duration-200"
                  />
                  <input
                    placeholder="ঠিকানা"
                    value={expense.receiverAddress}
                    onChange={(e) => setExpense({ ...expense, receiverAddress: e.target.value })}
                    className="w-full p-4 rounded-xl border border-red-300 bg-white text-gray-900 placeholder-red-400/60 focus:border-red-500 focus:ring-2 focus:ring-red-400/50 outline-none transition-all duration-200"
                  />
                </div>

                <div className="mt-5">
                  <label className="block text-sm font-medium text-red-700 mb-2">ছবি (ঐচ্ছিক)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, 'receiver', 'expense')}
                    className="w-full p-3 rounded-xl border border-red-300 bg-white text-gray-800 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-100 file:text-red-700 hover:file:bg-red-200 cursor-pointer transition"
                  />
                </div>
              </div>

              <input
                type="number"
                placeholder="খরচের পরিমাণ (টাকা)"
                value={expense.amount}
                onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
                className="w-full p-5 rounded-xl border border-rose-300 bg-white text-gray-900 placeholder-rose-400/60 focus:border-rose-500 focus:ring-2 focus:ring-rose-400/50 outline-none transition-all duration-200 text-lg font-medium"
                min="1"
              />
              <input
                placeholder="কারণ / বিবরণ (যেমন: চিকিৎসা, শিক্ষা ইত্যাদি)"
                value={expense.reason}
                onChange={(e) => setExpense({ ...expense, reason: e.target.value })}
                className="w-full p-5 rounded-xl border border-rose-300 bg-white text-gray-900 placeholder-rose-400/60 focus:border-rose-500 focus:ring-2 focus:ring-rose-400/50 outline-none transition-all duration-200"
              />

              <button
                onClick={handleAddExpense}
                disabled={loading}
                className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white py-5 rounded-xl font-bold text-xl transition shadow-lg flex items-center justify-center gap-3 disabled:opacity-60"
              >
                <ArrowDown size={28} />
                {loading ? 'যোগ হচ্ছে...' : 'খরচ রেকর্ড করুন'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}