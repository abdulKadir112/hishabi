'use client';

import Image from 'next/image';
import { useStore } from '../lib/store';

export default function ProfileCard({ member }) {
  const { transactions } = useStore();

  const contributed = transactions
    ?.filter((t) => t.type === 'donation' && t.donorName === member.name)
    .reduce((sum, t) => sum + (Number(t.amount) || 0), 0) || 0;

  const received = transactions
    ?.filter((t) => t.type === 'donation' && t.receiverName === member.name)
    .reduce((sum, t) => sum + (Number(t.amount) || 0), 0) || member.totalReceived || 0;

  const avatarFallback = `https://i.pravatar.cc/200?u=${encodeURIComponent(member.name || 'user')}`;

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 text-center hover:shadow-2xl transition transform hover:-translate-y-2 duration-300 border border-gray-100">
      <div className="relative w-40 h-40 mx-auto mb-6">
        <Image
          src={member.avatar || avatarFallback}
          alt={member.name || 'সদস্য'}
          fill
          className="rounded-full object-cover border-4 border-indigo-400 shadow-lg"
          sizes="(max-width: 768px) 140px, 160px"
          onError={(e) => {
            e.target.src = avatarFallback;
          }}
        />
      </div>

      <h3 className="text-2xl font-bold text-gray-900 mb-3">
        {member.name || 'নামহীন'}
      </h3>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <p className="text-3xl font-bold text-emerald-600">
            ৳ {contributed.toLocaleString('bn-BD')}
          </p>
          <p className="text-sm text-gray-600 mt-1">দান করেছেন</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-blue-600">
            ৳ {received.toLocaleString('bn-BD')}
          </p>
          <p className="text-sm text-gray-600 mt-1">পেয়েছেন</p>
        </div>
      </div>

      {(member.phone || member.address) && (
        <div className="text-sm text-gray-600 space-y-1">
          {member.phone && <p>☎ {member.phone}</p>}
          {member.address && <p>📍 {member.address}</p>}
        </div>
      )}
    </div>
  );
}