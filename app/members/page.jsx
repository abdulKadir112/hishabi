'use client';
import { useStore } from '../lib/store';
import ProfileCard from '../components/ProfileCard';
import Link from 'next/link';

export default function MembersPage() {
  const members = useStore((state) => state.members);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
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
              অ্যাডমিন ড্যাশবোর্ডে গিয়ে নতুন সদস্য যোগ করুন
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
              <ProfileCard key={member.id} member={member} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}