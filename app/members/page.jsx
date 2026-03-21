'use client';

import { useStore } from '../lib/store';
import { format } from 'date-fns';
import { bn } from 'date-fns/locale/bn';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

// ProfileCard কম্পোনেন্ট (যদি আলাদা ফাইলে না থাকে, এখানে রাখা হলো)
function ProfileCard({ member, onClick }) {
  const getInitialAvatar = (name = '') => {
    const initial = name.trim()?.[0]?.toUpperCase() || '?';
    return (
      <div className="w-24 h-24 rounded-full bg-emerald-200 flex items-center justify-center text-emerald-800 font-bold text-4xl shadow-md flex-shrink-0">
        {initial}
      </div>
    );
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 border border-gray-100 cursor-pointer"
    >
      <div className="flex flex-col items-center text-center">
        {getInitialAvatar(member.name)}
        <h3 className="text-xl font-bold text-gray-800 mt-4">{member.name}</h3>
        <p className="text-emerald-600 font-semibold mt-2 text-lg">
          মোট দান: ৳ {(member.totalDonated || 0).toLocaleString('bn-BD')}
        </p>
        {member.phone && <p className="text-gray-500 mt-1 text-sm">ফোন: {member.phone}</p>}
        {member.address && <p className="text-gray-500 mt-1 text-sm">ঠিকানা: {member.address}</p>}
      </div>
    </div>
  );
}

// নাম normalize করার ফাংশন (স্পেস, কেস ইস্যু সমাধানের জন্য)
const normalizeName = (name) => {
  if (!name || typeof name !== 'string') return '';
  return name
    .trim()
    .replace(/\s+/g, ' ')   // একাধিক স্পেসকে একটা স্পেসে পরিণত করে
    .toLowerCase();
};

export default function MembersPage() {
  const { members, transactions } = useStore();
  const [selectedMember, setSelectedMember] = useState(null);

  const getDonationsForMember = (memberName) => {
    const normalizedMemberName = normalizeName(memberName);

    return transactions
      .filter((t) => {
        if (t.type !== 'donation') return false;
        const normalizedDonor = normalizeName(t.donorName);
        return normalizedDonor === normalizedMemberName;
      })
      .sort((a, b) => new Date(b.date || b.createdAt || 0) - new Date(a.date || a.createdAt || 0));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <Link href="/">
            <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-medium transition shadow-md">
              <ArrowLeft size={24} />
              হোমে ফিরে যান
            </button>
          </Link>
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 text-center mb-16">
          আমাদের সকল সদস্য
          <span className="block text-2xl md:text-3xl font-medium text-gray-600 mt-4">
            মোট {members.length} জন
          </span>
        </h1>

        {members.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 md:p-16 text-center shadow-xl border border-gray-100 max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-800 mb-6">
              এখনো কোনো সদস্য যোগ করা হয়নি
            </h3>
            <p className="text-xl text-gray-600 mb-10">
              ড্যাশবোর্ডে গিয়ে দান রেকর্ড করুন (দান করলে স্বয়ংক্রিয়ভাবে সদস্য তৈরি হবে)
            </p>
            <Link href="/dashboard">
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-4 rounded-xl font-bold text-lg transition shadow-lg">
                ড্যাশবোর্ডে যান
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {members.map((member) => (
              <ProfileCard
                key={member.id}
                member={member}
                onClick={() => setSelectedMember(member)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal - দানের বিস্তারিত */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <h2 className="text-2xl md:text-3xl font-bold text-emerald-900">
                {selectedMember.name} এর দানের বিবরণ
              </h2>
              <button
                onClick={() => setSelectedMember(null)}
                className="text-gray-600 hover:text-gray-900 text-3xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="mb-6 text-center text-gray-700 font-medium">
              মোট দান করা হয়েছে {getDonationsForMember(selectedMember.name).length} বার
            </div>

            <div className="space-y-5">
              {getDonationsForMember(selectedMember.name).map((d, index) => (
                <div
                  key={index}
                  className="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-100 shadow-sm hover:shadow transition"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <p className="font-semibold text-lg text-emerald-800">
                        → {d.receiverName?.trim() || 'অজ্ঞাত গ্রহীতা'}
                      </p>
                      {d.note && <p className="text-gray-700 mt-1 italic text-sm">{d.note}</p>}
                    </div>
                    <p className="text-emerald-700 font-bold text-xl whitespace-nowrap">
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

              {getDonationsForMember(selectedMember.name).length === 0 && (
                <p className="text-center text-gray-500 py-10 text-lg font-medium">
                  এই সদস্যের কোনো দানের রেকর্ড পাওয়া যায়নি
                </p>
              )}
            </div>

            <div className="mt-10 pt-6 border-t text-right">
              <p className="text-xl font-bold text-emerald-900">
                মোট দান: ৳ {(selectedMember.totalDonated || 0).toLocaleString('bn-BD')}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}