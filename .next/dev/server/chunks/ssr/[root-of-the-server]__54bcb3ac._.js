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
"[project]/Desktop/New folder/front-end/my-app/app/donor/page.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DonorsList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/New folder/front-end/my-app/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$app$2f$lib$2f$store$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/New folder/front-end/my-app/app/lib/store.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/New folder/front-end/my-app/node_modules/date-fns/format.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$date$2d$fns$2f$locale$2f$bn$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/New folder/front-end/my-app/node_modules/date-fns/locale/bn.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/New folder/front-end/my-app/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/New folder/front-end/my-app/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/Desktop/New folder/front-end/my-app/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-ssr] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/Desktop/New folder/front-end/my-app/node_modules/lucide-react/dist/esm/icons/search.js [app-ssr] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$funnel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Filter$3e$__ = __turbopack_context__.i("[project]/Desktop/New folder/front-end/my-app/node_modules/lucide-react/dist/esm/icons/funnel.js [app-ssr] (ecmascript) <export default as Filter>");
'use client';
;
;
;
;
;
;
;
function DonorsList() {
    const { members, transactions, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$app$2f$lib$2f$store$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])();
    const [selectedDonor, setSelectedDonor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [filterType, setFilterType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('all'); // all, top10, bottom10, frequent
    // donors প্রস্তুত করা
    const donors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        let list = (members || []).filter((m)=>(m.totalDonated || 0) > 0);
        // সার্চ ফিল্টার
        if (searchTerm.trim()) {
            const term = searchTerm.trim().toLowerCase();
            list = list.filter((m)=>m.name.toLowerCase().includes(term));
        }
        // ফিল্টার টাইপ অনুযায়ী সাজানো/কাটা
        switch(filterType){
            case 'top10':
                return list.sort((a, b)=>(b.totalDonated || 0) - (a.totalDonated || 0)).slice(0, 10);
            case 'bottom10':
                return list.sort((a, b)=>(a.totalDonated || 0) - (b.totalDonated || 0)).slice(0, 10);
            case 'frequent':
                return list.map((m)=>({
                        ...m,
                        count: transactions.filter((t)=>t.type === 'donation' && t.donorName?.trim().toLowerCase() === m.name.toLowerCase()).length
                    })).filter((m)=>m.count >= 5).sort((a, b)=>b.totalDonated - a.totalDonated);
            default:
                return list.sort((a, b)=>(b.totalDonated || 0) - (a.totalDonated || 0));
        }
    }, [
        members,
        transactions,
        searchTerm,
        filterType
    ]);
    const getInitialAvatar = (name = '')=>{
        const initial = name.trim()?.[0]?.toUpperCase() || '?';
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-20 h-20 md:w-24 md:h-24 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-800 font-bold text-3xl md:text-4xl shadow-md flex-shrink-0",
            children: initial
        }, void 0, false, {
            fileName: "[project]/Desktop/New folder/front-end/my-app/app/donor/page.jsx",
            lineNumber: 60,
            columnNumber: 7
        }, this);
    };
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center py-12 text-gray-600 text-xl animate-pulse",
            children: "লোড হচ্ছে..."
        }, void 0, false, {
            fileName: "[project]/Desktop/New folder/front-end/my-app/app/donor/page.jsx",
            lineNumber: 67,
            columnNumber: 12
        }, this);
    }
    if (donors.length === 0 && !searchTerm && filterType === 'all') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-3xl p-12 text-center shadow-2xl border border-gray-100",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-2xl font-medium text-gray-600",
                children: "এখনো কোনো দানকারী নেই"
            }, void 0, false, {
                fileName: "[project]/Desktop/New folder/front-end/my-app/app/donor/page.jsx",
                lineNumber: 73,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Desktop/New folder/front-end/my-app/app/donor/page.jsx",
            lineNumber: 72,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-10",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-medium transition shadow-md w-full sm:w-auto",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                        size: 24
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/New folder/front-end/my-app/app/donor/page.jsx",
                                        lineNumber: 84,
                                        columnNumber: 15
                                    }, this),
                                    "হোমে ফিরে যান"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/New folder/front-end/my-app/app/donor/page.jsx",
                                lineNumber: 83,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/New folder/front-end/my-app/app/donor/page.jsx",
                            lineNumber: 82,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col sm:flex-row gap-3 w-full sm:w-auto",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative flex-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                            className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400",
                                            size: 20
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/New folder/front-end/my-app/app/donor/page.jsx",
                                            lineNumber: 92,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            placeholder: "দানকারীর নাম খুঁজুন...",
                                            value: searchTerm,
                                            onChange: (e)=>setSearchTerm(e.target.value),
                                            className: "w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/New folder/front-end/my-app/app/donor/page.jsx",
                                            lineNumber: 93,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/donor/page.jsx",
                                    lineNumber: 91,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: filterType,
                                            onChange: (e)=>setFilterType(e.target.value),
                                            className: "w-full sm:w-48 pl-4 pr-10 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "all",
                                                    children: "সব দানকারী"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/donor/page.jsx",
                                                    lineNumber: 109,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "top10",
                                                    children: "শীর্ষ ১০ দানকারী"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/donor/page.jsx",
                                                    lineNumber: 110,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "bottom10",
                                                    children: "সর্বনিম্ন ১০ দানকারী"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/donor/page.jsx",
                                                    lineNumber: 111,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "frequent",
                                                    children: "৫+ বার দানকারী"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/donor/page.jsx",
                                                    lineNumber: 112,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/New folder/front-end/my-app/app/donor/page.jsx",
                                            lineNumber: 104,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$funnel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Filter$3e$__["Filter"], {
                                            className: "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none",
                                            size: 18
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/New folder/front-end/my-app/app/donor/page.jsx",
                                            lineNumber: 114,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/donor/page.jsx",
                                    lineNumber: 103,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/New folder/front-end/my-app/app/donor/page.jsx",
                            lineNumber: 89,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/donor/page.jsx",
                    lineNumber: 81,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-4xl md:text-5xl font-extrabold mb-10 text-indigo-900 text-center",
                    children: "দানকারীদের তালিকা"
                }, void 0, false, {
                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/donor/page.jsx",
                    lineNumber: 119,
                    columnNumber: 9
                }, this),
                donors.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-3xl p-12 text-center shadow-xl border border-gray-200",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xl text-gray-600",
                        children: [
                            "কোনো দানকারী পাওয়া যায়নি ",
                            searchTerm ? `"${searchTerm}"` : '',
                            " এর সাথে মিলে"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/New folder/front-end/my-app/app/donor/page.jsx",
                        lineNumber: 125,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/donor/page.jsx",
                    lineNumber: 124,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8",
                    children: donors.map((donor)=>{
                        const donationCount = transactions.filter((t)=>t.type === 'donation' && t.donorName?.trim().toLowerCase() === donor.name.toLowerCase()).length;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            onClick: ()=>setSelectedDonor(donor),
                            className: "bg-white rounded-3xl shadow-xl p-6 md:p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100 cursor-pointer",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-5 md:gap-6 mb-6",
                                    children: [
                                        getInitialAvatar(donor.name),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-xl md:text-2xl font-bold text-indigo-900",
                                                    children: donor.name
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/donor/page.jsx",
                                                    lineNumber: 147,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-gray-600 mt-1",
                                                    children: [
                                                        "মোট দান: ",
                                                        donationCount,
                                                        " বার"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/donor/page.jsx",
                                                    lineNumber: 150,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/New folder/front-end/my-app/app/donor/page.jsx",
                                            lineNumber: 146,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/donor/page.jsx",
                                    lineNumber: 144,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-right font-bold text-indigo-800 text-xl md:text-2xl",
                                    children: [
                                        "৳ ",
                                        (donor.totalDonated || 0).toLocaleString('bn-BD')
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/donor/page.jsx",
                                    lineNumber: 156,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, donor.id || donor.name, true, {
                            fileName: "[project]/Desktop/New folder/front-end/my-app/app/donor/page.jsx",
                            lineNumber: 139,
                            columnNumber: 17
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/donor/page.jsx",
                    lineNumber: 130,
                    columnNumber: 11
                }, this),
                selectedDonor && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-3xl shadow-2xl p-6 md:p-10 max-w-2xl w-full max-h-[90vh] overflow-y-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center mb-8 border-b pb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-2xl md:text-3xl font-bold text-indigo-900",
                                        children: [
                                            selectedDonor.name,
                                            " এর দানের বিবরণ"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/New folder/front-end/my-app/app/donor/page.jsx",
                                        lineNumber: 170,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setSelectedDonor(null),
                                        className: "text-gray-600 hover:text-gray-900 text-3xl font-bold",
                                        children: "×"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/New folder/front-end/my-app/app/donor/page.jsx",
                                        lineNumber: 173,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/New folder/front-end/my-app/app/donor/page.jsx",
                                lineNumber: 169,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-5",
                                children: [
                                    transactions.filter((t)=>t.type === 'donation' && t.donorName?.trim().toLowerCase() === selectedDonor.name.toLowerCase()).sort((a, b)=>new Date(b.date || b.createdAt || 0) - new Date(a.date || a.createdAt || 0)).map((d, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-indigo-50/70 p-5 rounded-2xl border border-indigo-100 shadow-sm hover:shadow transition",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between items-start",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "font-semibold text-lg text-indigo-800",
                                                                    children: [
                                                                        "→ ",
                                                                        d.receiverName || 'অজ্ঞাত গ্রহীতা'
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/donor/page.jsx",
                                                                    lineNumber: 196,
                                                                    columnNumber: 27
                                                                }, this),
                                                                d.note && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-gray-700 mt-1 italic text-sm",
                                                                    children: d.note
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/donor/page.jsx",
                                                                    lineNumber: 199,
                                                                    columnNumber: 38
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/New folder/front-end/my-app/app/donor/page.jsx",
                                                            lineNumber: 195,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-indigo-700 font-bold text-xl whitespace-nowrap",
                                                            children: [
                                                                "৳ ",
                                                                (d.amount || 0).toLocaleString('bn-BD')
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/New folder/front-end/my-app/app/donor/page.jsx",
                                                            lineNumber: 201,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/donor/page.jsx",
                                                    lineNumber: 194,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-gray-500 mt-2",
                                                    children: d.date || d.createdAt ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(d.date || d.createdAt), 'dd MMMM yyyy', {
                                                        locale: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$date$2d$fns$2f$locale$2f$bn$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["bn"]
                                                    }) : 'তারিখ অনুপলব্ধ'
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/donor/page.jsx",
                                                    lineNumber: 205,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, index, true, {
                                            fileName: "[project]/Desktop/New folder/front-end/my-app/app/donor/page.jsx",
                                            lineNumber: 190,
                                            columnNumber: 21
                                        }, this)),
                                    transactions.filter((t)=>t.type === 'donation' && t.donorName?.trim().toLowerCase() === selectedDonor.name.toLowerCase()).length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-center text-gray-500 py-8 text-lg",
                                        children: "কোনো দানের রেকর্ড পাওয়া যায়নি"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/New folder/front-end/my-app/app/donor/page.jsx",
                                        lineNumber: 218,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/New folder/front-end/my-app/app/donor/page.jsx",
                                lineNumber: 181,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-10 pt-6 border-t text-right",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xl font-bold text-indigo-900",
                                    children: [
                                        "মোট দান: ৳ ",
                                        (selectedDonor.totalDonated || 0).toLocaleString('bn-BD')
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/donor/page.jsx",
                                    lineNumber: 225,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/New folder/front-end/my-app/app/donor/page.jsx",
                                lineNumber: 224,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/New folder/front-end/my-app/app/donor/page.jsx",
                        lineNumber: 168,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/donor/page.jsx",
                    lineNumber: 167,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/New folder/front-end/my-app/app/donor/page.jsx",
            lineNumber: 80,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/New folder/front-end/my-app/app/donor/page.jsx",
        lineNumber: 79,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__54bcb3ac._.js.map