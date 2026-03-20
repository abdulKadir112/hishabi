'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const API_BASE = process.env.NEXT_PUBLIC_API_URL 
  || (process.env.NODE_ENV === 'development' 
      ? 'http://localhost:5000' 
      : 'https://hishabiapi.onrender.com');

export const useStore = create(
  persist(
    (set, get) => ({
      transactions: [],
      members: [],
      totalDonation: 0,
      totalExpense: 0,
      netBalance: 0,
      isLoading: false,

      fetchData: async () => {
        set({ isLoading: true });
        try {
          const res = await fetch(`${API_BASE}/hishab`);
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const data = await res.json();

          const transactions = Array.isArray(data.transactions) ? data.transactions : [];

          let totalDonation = Number(data.totalDonation) || 0;
          let totalExpense = Number(data.totalExpense) || 0;
          let netBalance = Number(data.netBalance) || 0;

          if (totalDonation === 0 && totalExpense === 0 && transactions.length > 0) {
            totalDonation = transactions
              .filter(t => t.type === 'donation')
              .reduce((sum, t) => sum + (Number(t.amount) || 0), 0);
            totalExpense = transactions
              .filter(t => t.type === 'expense')
              .reduce((sum, t) => sum + (Number(t.amount) || 0), 0);
            netBalance = totalDonation - totalExpense;
          }

          // Derive members from transactions
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
                  totalDonated: 0,
                });
              }
              memberMap.get(key).totalDonated += Number(tx.amount) || 0;
            }
          });

          set({
            transactions,
            members: Array.from(memberMap.values()),
            totalDonation,
            totalExpense,
            netBalance,
            isLoading: false,
          });
        } catch (err) {
          console.error('Fetch error:', err);
          set({ isLoading: false });
        }
      },

      addTransaction: async (formData) => {
        try {
          const res = await fetch(`${API_BASE}/hishab`, {
            method: 'POST',
            body: formData,
          });
          if (!res.ok) throw new Error('Add failed');
          await get().fetchData();
          return true;
        } catch (err) {
          console.error('Add error:', err);
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

      // Edit: backend-এ PATCH না থাকলে delete + add করে simulate
      editTransaction: async (id, updatedFormData) => {
        try {
          // প্রথমে delete
          await fetch(`${API_BASE}/hishab/${id}`, { method: 'DELETE' });
          // তারপর নতুন add
          const res = await fetch(`${API_BASE}/hishab`, {
            method: 'POST',
            body: updatedFormData,
          });
          if (!res.ok) throw new Error('Edit failed');
          await get().fetchData();
          return true;
        } catch (err) {
          console.error('Edit error:', err);
          return false;
        }
      },
    }),

    {
      name: 'group-fund-final-v6',
      partialize: (state) => ({
        members: state.members,
        totalDonation: state.totalDonation,
        totalExpense: state.totalExpense,
        netBalance: state.netBalance,
      }),
    }
  )
);