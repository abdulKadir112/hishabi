'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const useStore = create(
  persist(
    (set, get) => ({
      members: [],
      transactions: [],
      totalDonation: 0,
      totalExpense: 0,
      netBalance: 0,
      isLoading: false,

      fetchData: async () => {
        try {
          set({ isLoading: true });

          const res = await fetch(`${API_BASE}/hishab`);

          if (!res.ok) {
            const errText = await res.text();
            throw new Error(`HTTP ${res.status} - ${errText}`);
          }

          const data = await res.json();

          console.log('API Response:', data);

          const transactions = Array.isArray(data.transactions) ? data.transactions : [];

          // totals – backend থেকে না আসলে নিজে হিসাব
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

            console.log('Fallback totals calculated:', { totalDonation, totalExpense, netBalance });
          }

          // শীর্ষ দানকারীদের জন্য members তৈরি
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
                  avatar: tx.donorImage || tx.donorAvatar || '',
                  totalDonated: 0,
                  totalReceived: 0,
                });
              }

              memberMap.get(key).totalDonated += Number(tx.amount) || 0;
            }
          });

          const derivedMembers = Array.from(memberMap.values());

          console.log('Derived members for top donors:', derivedMembers);

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

      addTransaction: async (tx) => {
        try {
          const res = await fetch(`${API_BASE}/hishab`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tx),
          });

          if (!res.ok) throw new Error('Failed to add');

          await get().fetchData();
          return true;
        } catch (err) {
          console.error('Add error:', err);
          return false;
        }
      },

      deleteTransaction: async (id) => {
        try {
          await fetch(`${API_BASE}/hishab/${id}`, { method: 'DELETE' });
          await get().fetchData();
        } catch (err) {
          console.error('Delete error:', err);
        }
      },

      addMember: (data) =>
        set((state) => ({
          members: [
            ...state.members,
            {
              id: Date.now().toString(),
              name: data.name.trim(),
              phone: data.phone || '',
              address: data.address || '',
              avatar: data.avatar || '',
              totalDonated: 0,
              totalReceived: 0,
            },
          ],
        })),

      updateMember: (id, updates) =>
        set((state) => ({
          members: state.members.map((m) =>
            m.id === id ? { ...m, ...updates } : m
          ),
        })),
    }),

    {
      name: 'group-fund-final-v5',
    }
  )
);