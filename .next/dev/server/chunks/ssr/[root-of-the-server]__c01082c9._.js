module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/Desktop/New folder/front-end/my-app/app/lib/store.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useStore",
    ()=>useStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/New folder/front-end/my-app/node_modules/zustand/esm/react.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/New folder/front-end/my-app/node_modules/zustand/esm/middleware.mjs [app-ssr] (ecmascript)");
'use client';
;
;
// ✅ FIXED API BASE (IMPORTANT)
const API_BASE = ("TURBOPACK compile-time value", "https://hishabi-api.vercel.app") || 'https://hishabi-api.vercel.app';
const useStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["persist"])((set, get)=>({
        transactions: [],
        members: [],
        totalDonation: 0,
        totalExpense: 0,
        netBalance: 0,
        isLoading: false,
        // ✅ FETCH
        fetchData: async ()=>{
            set({
                isLoading: true
            });
            try {
                const res = await fetch(`${API_BASE}/hishab`);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();
                const transactions = Array.isArray(data.transactions) ? data.transactions : [];
                let totalDonation = Number(data.totalDonation) || 0;
                let totalExpense = Number(data.totalExpense) || 0;
                let netBalance = Number(data.netBalance) || 0;
                // fallback calculation
                if (totalDonation === 0 && totalExpense === 0 && transactions.length > 0) {
                    totalDonation = transactions.filter((t)=>t.type === 'donation').reduce((sum, t)=>sum + (Number(t.amount) || 0), 0);
                    totalExpense = transactions.filter((t)=>t.type === 'expense').reduce((sum, t)=>sum + (Number(t.amount) || 0), 0);
                    netBalance = totalDonation - totalExpense;
                }
                // members derive
                const memberMap = new Map();
                transactions.forEach((tx)=>{
                    if (tx.type === 'donation' && tx.donorName?.trim()) {
                        const name = tx.donorName.trim();
                        const key = name.toLowerCase();
                        if (!memberMap.has(key)) {
                            memberMap.set(key, {
                                id: `donor-${key}`,
                                name,
                                phone: tx.donorPhone || '',
                                address: tx.donorAddress || '',
                                totalDonated: 0
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
                    isLoading: false
                });
            } catch (err) {
                console.error('Fetch error:', err);
                set({
                    isLoading: false
                });
            }
        },
        // ✅ ADD TRANSACTION
        addTransaction: async (payload)=>{
            try {
                const res = await fetch(`${API_BASE}/hishab`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });
                if (!res.ok) throw new Error('Add failed');
                await get().fetchData();
                return true;
            } catch (err) {
                console.error('Add error:', err);
                return false;
            }
        },
        // ✅ DELETE
        deleteTransaction: async (id)=>{
            try {
                const res = await fetch(`${API_BASE}/hishab/${id}`, {
                    method: 'DELETE'
                });
                if (!res.ok) throw new Error('Delete failed');
                await get().fetchData();
            } catch (err) {
                console.error('Delete error:', err);
            }
        },
        // ✅ EDIT (FIXED)
        editTransaction: async (id, payload)=>{
            try {
                // delete old
                await fetch(`${API_BASE}/hishab/${id}`, {
                    method: 'DELETE'
                });
                // add new
                const res = await fetch(`${API_BASE}/hishab`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });
                if (!res.ok) throw new Error('Edit failed');
                await get().fetchData();
                return true;
            } catch (err) {
                console.error('Edit error:', err);
                return false;
            }
        }
    }), {
    name: 'group-fund-final-v7',
    partialize: (state)=>({
            members: state.members,
            totalDonation: state.totalDonation,
            totalExpense: state.totalExpense,
            netBalance: state.netBalance
        })
}));
}),
"[project]/Desktop/New folder/front-end/my-app/app/members/page.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MembersPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/New folder/front-end/my-app/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$app$2f$lib$2f$store$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/New folder/front-end/my-app/app/lib/store.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/New folder/front-end/my-app/node_modules/date-fns/format.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$date$2d$fns$2f$locale$2f$bn$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/New folder/front-end/my-app/node_modules/date-fns/locale/bn.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/New folder/front-end/my-app/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/New folder/front-end/my-app/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/Desktop/New folder/front-end/my-app/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-ssr] (ecmascript) <export default as ArrowLeft>");
'use client';
;
;
;
;
;
;
;
// ProfileCard কম্পোনেন্ট (যদি আলাদা ফাইলে না থাকে, এখানে রাখা হলো)
function ProfileCard({ member, onClick }) {
    const getInitialAvatar = (name = '')=>{
        const initial = name.trim()?.[0]?.toUpperCase() || '?';
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-24 h-24 rounded-full bg-emerald-200 flex items-center justify-center text-emerald-800 font-bold text-4xl shadow-md flex-shrink-0",
            children: initial
        }, void 0, false, {
            fileName: "[project]/Desktop/New folder/front-end/my-app/app/members/page.jsx",
            lineNumber: 15,
            columnNumber: 7
        }, this);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        onClick: onClick,
        className: "bg-white rounded-3xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 border border-gray-100 cursor-pointer",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center text-center",
            children: [
                getInitialAvatar(member.name),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-xl font-bold text-gray-800 mt-4",
                    children: member.name
                }, void 0, false, {
                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/members/page.jsx",
                    lineNumber: 28,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-emerald-600 font-semibold mt-2 text-lg",
                    children: [
                        "মোট দান: ৳ ",
                        (member.totalDonated || 0).toLocaleString('bn-BD')
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/members/page.jsx",
                    lineNumber: 29,
                    columnNumber: 9
                }, this),
                member.phone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-gray-500 mt-1 text-sm",
                    children: [
                        "ফোন: ",
                        member.phone
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/members/page.jsx",
                    lineNumber: 32,
                    columnNumber: 26
                }, this),
                member.address && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-gray-500 mt-1 text-sm",
                    children: [
                        "ঠিকানা: ",
                        member.address
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/members/page.jsx",
                    lineNumber: 33,
                    columnNumber: 28
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/New folder/front-end/my-app/app/members/page.jsx",
            lineNumber: 26,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/New folder/front-end/my-app/app/members/page.jsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
// নাম normalize করার ফাংশন (স্পেস, কেস ইস্যু সমাধানের জন্য)
const normalizeName = (name)=>{
    if (!name || typeof name !== 'string') return '';
    return name.trim().replace(/\s+/g, ' ') // একাধিক স্পেসকে একটা স্পেসে পরিণত করে
    .toLowerCase();
};
function MembersPage() {
    const { members, transactions } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$app$2f$lib$2f$store$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])();
    const [selectedMember, setSelectedMember] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const getDonationsForMember = (memberName)=>{
        const normalizedMemberName = normalizeName(memberName);
        return transactions.filter((t)=>{
            if (t.type !== 'donation') return false;
            const normalizedDonor = normalizeName(t.donorName);
            return normalizedDonor === normalizedMemberName;
        }).sort((a, b)=>new Date(b.date || b.createdAt || 0) - new Date(a.date || a.createdAt || 0));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-50 py-12 px-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-7xl mx-auto",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-medium transition shadow-md",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                        size: 24
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/New folder/front-end/my-app/app/members/page.jsx",
                                        lineNumber: 70,
                                        columnNumber: 15
                                    }, this),
                                    "হোমে ফিরে যান"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/New folder/front-end/my-app/app/members/page.jsx",
                                lineNumber: 69,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/New folder/front-end/my-app/app/members/page.jsx",
                            lineNumber: 68,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/New folder/front-end/my-app/app/members/page.jsx",
                        lineNumber: 67,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-5xl md:text-6xl font-extrabold text-gray-900 text-center mb-16",
                        children: [
                            "আমাদের সকল সদস্য",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "block text-2xl md:text-3xl font-medium text-gray-600 mt-4",
                                children: [
                                    "মোট ",
                                    members.length,
                                    " জন"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/New folder/front-end/my-app/app/members/page.jsx",
                                lineNumber: 78,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/New folder/front-end/my-app/app/members/page.jsx",
                        lineNumber: 76,
                        columnNumber: 9
                    }, this),
                    members.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-3xl p-12 md:p-16 text-center shadow-xl border border-gray-100 max-w-2xl mx-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-3xl font-bold text-gray-800 mb-6",
                                children: "এখনো কোনো সদস্য যোগ করা হয়নি"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/New folder/front-end/my-app/app/members/page.jsx",
                                lineNumber: 85,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xl text-gray-600 mb-10",
                                children: "ড্যাশবোর্ডে গিয়ে দান রেকর্ড করুন (দান করলে স্বয়ংক্রিয়ভাবে সদস্য তৈরি হবে)"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/New folder/front-end/my-app/app/members/page.jsx",
                                lineNumber: 88,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/dashboard",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-4 rounded-xl font-bold text-lg transition shadow-lg",
                                    children: "ড্যাশবোর্ডে যান"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/members/page.jsx",
                                    lineNumber: 92,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/New folder/front-end/my-app/app/members/page.jsx",
                                lineNumber: 91,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/New folder/front-end/my-app/app/members/page.jsx",
                        lineNumber: 84,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8",
                        children: members.map((member)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ProfileCard, {
                                member: member,
                                onClick: ()=>setSelectedMember(member)
                            }, member.id, false, {
                                fileName: "[project]/Desktop/New folder/front-end/my-app/app/members/page.jsx",
                                lineNumber: 100,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/Desktop/New folder/front-end/my-app/app/members/page.jsx",
                        lineNumber: 98,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/New folder/front-end/my-app/app/members/page.jsx",
                lineNumber: 66,
                columnNumber: 7
            }, this),
            selectedMember && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-3xl shadow-2xl p-6 md:p-10 max-w-3xl w-full max-h-[90vh] overflow-y-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between items-center mb-6 border-b pb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-2xl md:text-3xl font-bold text-emerald-900",
                                    children: [
                                        selectedMember.name,
                                        " এর দানের বিবরণ"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/members/page.jsx",
                                    lineNumber: 115,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setSelectedMember(null),
                                    className: "text-gray-600 hover:text-gray-900 text-3xl font-bold",
                                    children: "×"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/members/page.jsx",
                                    lineNumber: 118,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/New folder/front-end/my-app/app/members/page.jsx",
                            lineNumber: 114,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-6 text-center text-gray-700 font-medium",
                            children: [
                                "মোট দান করা হয়েছে ",
                                getDonationsForMember(selectedMember.name).length,
                                " বার"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/New folder/front-end/my-app/app/members/page.jsx",
                            lineNumber: 126,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-5",
                            children: [
                                getDonationsForMember(selectedMember.name).map((d, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-emerald-50/70 p-5 rounded-2xl border border-emerald-100 shadow-sm hover:shadow transition",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between items-start gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "font-semibold text-lg text-emerald-800",
                                                                children: [
                                                                    "→ ",
                                                                    d.receiverName?.trim() || 'অজ্ঞাত গ্রহীতা'
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/New folder/front-end/my-app/app/members/page.jsx",
                                                                lineNumber: 138,
                                                                columnNumber: 23
                                                            }, this),
                                                            d.note && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-gray-700 mt-1 italic text-sm",
                                                                children: d.note
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/New folder/front-end/my-app/app/members/page.jsx",
                                                                lineNumber: 141,
                                                                columnNumber: 34
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/New folder/front-end/my-app/app/members/page.jsx",
                                                        lineNumber: 137,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-emerald-700 font-bold text-xl whitespace-nowrap",
                                                        children: [
                                                            "৳ ",
                                                            (d.amount || 0).toLocaleString('bn-BD')
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/New folder/front-end/my-app/app/members/page.jsx",
                                                        lineNumber: 143,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/New folder/front-end/my-app/app/members/page.jsx",
                                                lineNumber: 136,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-gray-500 mt-2",
                                                children: d.date ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(d.date), 'dd MMMM yyyy', {
                                                    locale: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$date$2d$fns$2f$locale$2f$bn$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["bn"]
                                                }) : 'তারিখ নেই'
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/New folder/front-end/my-app/app/members/page.jsx",
                                                lineNumber: 147,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, index, true, {
                                        fileName: "[project]/Desktop/New folder/front-end/my-app/app/members/page.jsx",
                                        lineNumber: 132,
                                        columnNumber: 17
                                    }, this)),
                                getDonationsForMember(selectedMember.name).length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-center text-gray-500 py-10 text-lg font-medium",
                                    children: "এই সদস্যের কোনো দানের রেকর্ড পাওয়া যায়নি"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/members/page.jsx",
                                    lineNumber: 156,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/New folder/front-end/my-app/app/members/page.jsx",
                            lineNumber: 130,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-10 pt-6 border-t text-right",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xl font-bold text-emerald-900",
                                children: [
                                    "মোট দান: ৳ ",
                                    (selectedMember.totalDonated || 0).toLocaleString('bn-BD')
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/New folder/front-end/my-app/app/members/page.jsx",
                                lineNumber: 163,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/New folder/front-end/my-app/app/members/page.jsx",
                            lineNumber: 162,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/members/page.jsx",
                    lineNumber: 113,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/New folder/front-end/my-app/app/members/page.jsx",
                lineNumber: 112,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/New folder/front-end/my-app/app/members/page.jsx",
        lineNumber: 65,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__c01082c9._.js.map