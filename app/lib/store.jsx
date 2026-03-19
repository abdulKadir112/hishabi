// lib/store.js   বা   app/lib/store.js

'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const API_BASE = process.env.NEXT_PUBLIC_API_URL 
  || (process.env.NODE_ENV === 'development' 
      ? 'http://localhost:5000' 
      : 'https://hishabi-api.vercel.app');

export const useStore = create(
  persist(
    (set, get) => ({
      // persist হবে না (বড় ডাটা)
      transactions: [],

      // persist হবে (ছোট ডাটা)
      members: [],
      totalDonation: 0,
      totalExpense: 0,
      netBalance: 0,
      isLoading: false,

      fetchData: async () => {
        set({ isLoading: true });

        try {
          const res = await fetch(`${API_BASE}/hishab`);

          if (!res.ok) {
            const errText = await res.text();
            throw new Error(`HTTP ${res.status} - ${errText}`);
          }

          const data = await res.json();

          const transactions = Array.isArray(data.transactions) ? data.transactions : [];

          let totalDonation = Number(data.totalDonation) || 0;
          let totalExpense = Number(data.totalExpense) || 0;
          let netBalance = Number(data.netBalance) || 0;

          // যদি backend থেকে total না আসে তাহলে নিজে ক্যালকুলেট
          if (totalDonation === 0 && totalExpense === 0 && transactions.length > 0) {
            totalDonation = transactions
              .filter(t => t.type === 'donation')
              .reduce((sum, t) => sum + (Number(t.amount) || 0), 0);

            totalExpense = transactions
              .filter(t => t.type === 'expense')
              .reduce((sum, t) => sum + (Number(t.amount) || 0), 0);

            netBalance = totalDonation - totalExpense;
          }

          // members derive from transactions (top donors)
          const memberMap = new Map();

          transactions.forEach(tx => {
            if (tx.type === 'donation' && tx.donorName?.trim()) {
              const name = tx.donorName.trim();
              const key = name.toLowerCase();

              if (!memberMap.has(key)) {
                memberMap.set(key, {
                  id: `donor-${key}`,
                  name,
                  phone: tx.donorPhone || '',
                  address: tx.donorAddress || '',
                  avatar: tx.donorImage || '',
                  totalDonated: 0,
                });
              }

              memberMap.get(key).totalDonated += Number(tx.amount) || 0;
            }
          });

          const derivedMembers = Array.from(memberMap.values());

          // state update
          set({
            transactions,
            members: derivedMembers,
            totalDonation,
            totalExpense,
            netBalance,
            isLoading: false,
          });
        } catch (err) {
          console.error('Fetch error:', err.message || err);
          set({ isLoading: false });
        }
      },

      addTransaction: async (formData) => {
        try {
          const res = await fetch(`${API_BASE}/hishab`, {
            method: 'POST',
            body: formData,
          });

          if (!res.ok) {
            const errText = await res.text();
            throw new Error(`Add failed: ${errText}`);
          }

          await get().fetchData();
          return true;
        } catch (err) {
          console.error('Add transaction error:', err);
          return false;
        }
      },

      deleteTransaction: async (id) => {
        try {
          const res = await fetch(`${API_BASE}/hishab/${id}`, {
            method: 'DELETE',
          });

          if (!res.ok) throw new Error('Delete failed');

          await get().fetchData();
        } catch (err) {
          console.error('Delete error:', err);
        }
      },

      // যদি আরও কোনো action থাকে তাহলে এখানে যোগ করুন
    }),

    {
      name: 'group-fund-final-v5',

      // এটাই মূল পরিবর্তন — transactions persist করা হচ্ছে না
      partialize: (state) => ({
        members: state.members,
        totalDonation: state.totalDonation,
        totalExpense: state.totalExpense,
        netBalance: state.netBalance,
        // transactions ইচ্ছাকৃতভাবে বাদ দেওয়া হয়েছে
      }),

      // optional: storage limit check করতে চাইলে
      onRehydrateStorage: () => {
        return (state, error) => {
          if (error) {
            console.warn('Rehydrate storage error:', error);
          }
        };
      },
    }
  )
);