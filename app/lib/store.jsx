'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  'https://hishabi-api.vercel.app';

export const useStore = create(
  persist(
    (set, get) => ({
      transactions: [],
      members: [],
      totalDonation: 0,
      totalExpense: 0,
      netBalance: 0,
      isLoading: false,

      // ======================
      // FETCH DATA (FIXED SAFE)
      // ======================
      fetchData: async () => {
        set({ isLoading: true });

        try {
          const res = await fetch(`${API_BASE}/hishab`);

          if (!res.ok) throw new Error(`HTTP ${res.status}`);

          const data = await res.json();

          const transactions = Array.isArray(data?.transactions)
            ? data.transactions
            : [];

          // ======================
          // SAFE CALCULATION (DONATION + EXPENSE FIX)
          // ======================
          const totalDonation = transactions
            .filter((t) => t?.type === 'donation')
            .reduce((sum, t) => sum + (Number(t?.amount) || 0), 0);

          const totalExpense = transactions
            .filter((t) => t?.type === 'expense')
            .reduce((sum, t) => sum + (Number(t?.amount) || 0), 0);

          const netBalance = totalDonation - totalExpense;

          // ======================
          // MEMBERS DERIVE (SAFE)
          // ======================
          const memberMap = new Map();

          transactions.forEach((tx) => {
            if (tx?.type === 'donation' && tx?.donorName?.trim()) {
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

      // ======================
      // ADD TRANSACTION (NO CHANGE)
      // ======================
      addTransaction: async (payload) => {
        try {
          const res = await fetch(`${API_BASE}/hishab`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });

          if (!res.ok) throw new Error('Add failed');

          await get().fetchData();
          return true;
        } catch (err) {
          console.error('Add error:', err);
          return false;
        }
      },

      // ======================
      // DELETE (NO CHANGE)
      // ======================
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

      // ======================
      // EDIT (NO CHANGE LOGIC)
      // ======================
      editTransaction: async (id, payload) => {
        try {
          await fetch(`${API_BASE}/hishab/${id}`, {
            method: 'DELETE',
          });

          const res = await fetch(`${API_BASE}/hishab`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
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
      name: 'group-fund-final-v7',

      // IMPORTANT: expense store-এ persist রাখা safe
      partialize: (state) => ({
        members: state.members,
        totalDonation: state.totalDonation,
        totalExpense: state.totalExpense,
        netBalance: state.netBalance,
      }),
    }
  )
);