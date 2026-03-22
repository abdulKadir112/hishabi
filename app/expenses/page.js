"use client";

import { useStore } from "../lib/store";
import { format } from "date-fns";
import { bn } from "date-fns/locale/bn";
import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import { ArrowLeft, Search, Filter } from "lucide-react";

export default function ExpensesList() {
  const { transactions, isLoading, fetchData } = useStore();

  const [selectedExpense, setSelectedExpense] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    if (!isLoading && transactions.length === 0) {
      fetchData();
    }
  }, [transactions, isLoading, fetchData]);

  const expenses = useMemo(() => {
    if (!Array.isArray(transactions)) return [];

    const map = new Map();

    transactions.forEach((t) => {
      if (t?.type === "expense") {
        const name = t?.receiverName?.trim() || "অজানা রিসিভার";

        if (!map.has(name)) {
          map.set(name, {
            name,
            totalSpent: 0,
            count: 0,
            items: [],
          });
        }

        const item = map.get(name);

        item.totalSpent += Number(t.amount) || 0;
        item.count += 1;

        item.items.push({
          amount: t.amount,
          date: t.date,
          note: t.note || "",
        });
      }
    });

    let list = Array.from(map.values());

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      list = list.filter((r) =>
        r.name.toLowerCase().includes(term)
      );
    }

    switch (filterType) {
      case "top10":
        return list.sort((a, b) => b.totalSpent - a.totalSpent).slice(0, 10);
      case "bottom10":
        return list.sort((a, b) => a.totalSpent - b.totalSpent).slice(0, 10);
      case "frequent":
        return list.filter((r) => r.count >= 5);
      default:
        return list.sort((a, b) => b.totalSpent - a.totalSpent);
    }
  }, [transactions, searchTerm, filterType]);

  const getInitialAvatar = (name = "") => {
    const initial = name?.[0]?.toUpperCase() || "?";
    return (
      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-blue-200 flex items-center justify-center text-blue-800 font-bold text-3xl md:text-4xl shadow-md">
        {initial}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="text-center py-12 text-gray-600 text-xl animate-pulse">
        লোড হচ্ছে...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          <Link href="/">
            <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-medium transition shadow-md">
              <ArrowLeft size={24} />
              হোমে ফিরে যান
            </button>
          </Link>

          <div className="flex flex-col sm:flex-row gap-3">

            {/* SEARCH */}
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" />
              <input
                className="text-gray-800 pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="খরচ খুঁজুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* FILTER */}
            <div className="relative">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="text-gray-800 px-6 py-3 border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">সব খরচ</option>
                <option value="top10">শীর্ষ ১০</option>
                <option value="bottom10">সর্বনিম্ন ১০</option>
                <option value="frequent">৫+ বার</option>
              </select>

              <Filter className="absolute right-5 top-3 text-gray-400 pointer-events-none" />
            </div>

          </div>
        </div>

        {/* TITLE */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-blue-900 mb-12">
          খরচের তালিকা
        </h1>

        {/* LIST */}
        {expenses.length === 0 ? (
          <p className="text-center text-gray-500">
            কোনো খরচ পাওয়া যায়নি
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {expenses.map((exp, i) => (
              <div
                key={i}
                onClick={() => setSelectedExpense(exp)}
                className="bg-white p-6 rounded-3xl shadow-xl cursor-pointer border border-gray-100"
              >
                <div className="flex items-center gap-4">
                  {getInitialAvatar(exp.name)}

                  <div>
                    <h2 className="font-bold text-xl text-blue-900">
                      {exp.name}
                    </h2>
                    <p className="text-gray-600">
                      {exp.count} বার খরচ
                    </p>
                  </div>
                </div>

                <p className="text-right text-blue-800 font-bold text-xl mt-4">
                  ৳ {exp.totalSpent.toLocaleString("bn-BD")}
                </p>
              </div>
            ))}

          </div>
        )}

        {/* MODAL */}
        {selectedExpense && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-3xl w-full max-w-2xl">

              <h2 className="text-2xl font-bold mb-4 text-blue-900">
                {selectedExpense.name}
              </h2>

              <div className="space-y-3">
                {selectedExpense.items?.map((t, i) => (
                  <div key={i} className="border p-3 rounded-xl">
                    <p className="font-bold text-blue-800">
                      ৳ {t.amount}
                    </p>

                    <p className="text-sm text-gray-500">
                      {t.date
                        ? format(new Date(t.date), "dd MMMM yyyy", {
                            locale: bn,
                          })
                        : "No date"}
                    </p>

                    {t.note && (
                      <p className="text-sm text-gray-600">
                        {t.note}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={() => setSelectedExpense(null)}
                className="mt-6 bg-emerald-600 text-white px-4 py-2 rounded-xl"
              >
                বন্ধ করুন
              </button>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}