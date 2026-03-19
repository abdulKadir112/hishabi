module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/Desktop/New folder/my-app/app/lib/store.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useStore",
    ()=>useStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/New folder/my-app/node_modules/zustand/esm/react.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/New folder/my-app/node_modules/zustand/esm/middleware.mjs [app-ssr] (ecmascript)");
'use client';
;
;
const useStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["persist"])((set, get)=>({
        members: [],
        transactions: [],
        totalDonation: 0,
        totalExpense: 0,
        netBalance: 0,
        // ------------------------------------------------------
        // নতুন লেনদেন যোগ করা
        // ------------------------------------------------------
        addTransaction: (tx)=>set((state)=>{
                const newTx = {
                    ...tx,
                    id: Date.now().toString(),
                    date: tx.date || new Date().toISOString().split('T')[0],
                    amount: Number(tx.amount) || 0
                };
                const updatedTransactions = [
                    ...state.transactions,
                    newTx
                ];
                // দানকারীকে অটো মেম্বার করা (avatar অটো জেনারেট করব না)
                let updatedMembers = [
                    ...state.members
                ];
                if (newTx.type === 'donation' && newTx.donorName) {
                    const donorNameLower = newTx.donorName.trim().toLowerCase();
                    const existing = updatedMembers.find((m)=>m.name.trim().toLowerCase() === donorNameLower);
                    if (!existing) {
                        const newMember = {
                            id: Date.now().toString() + '-auto',
                            name: newTx.donorName.trim(),
                            phone: '',
                            address: '',
                            avatar: '',
                            totalDonated: 0,
                            totalReceived: 0,
                            isAutoAdded: true
                        };
                        updatedMembers = [
                            ...updatedMembers,
                            newMember
                        ];
                    }
                }
                // হিসাব আপডেট
                let donationSum = 0;
                let expenseSum = 0;
                updatedTransactions.forEach((t)=>{
                    const amt = Number(t.amount) || 0;
                    if (t.type === 'donation') donationSum += amt;
                    else if (t.type === 'expense') expenseSum += amt;
                });
                const net = donationSum - expenseSum;
                // মেম্বার totals রিসেট + নতুন হিসাব
                updatedMembers = updatedMembers.map((m)=>({
                        ...m,
                        totalDonated: 0,
                        totalReceived: 0
                    }));
                updatedTransactions.forEach((t)=>{
                    if (t.type === 'donation') {
                        const amt = Number(t.amount) || 0;
                        if (t.donorName) {
                            const donorLower = t.donorName.trim().toLowerCase();
                            updatedMembers = updatedMembers.map((m)=>m.name.trim().toLowerCase() === donorLower ? {
                                    ...m,
                                    totalDonated: (m.totalDonated || 0) + amt
                                } : m);
                        }
                        if (t.receiverName) {
                            const receiverLower = t.receiverName.trim().toLowerCase();
                            updatedMembers = updatedMembers.map((m)=>m.name.trim().toLowerCase() === receiverLower ? {
                                    ...m,
                                    totalReceived: (m.totalReceived || 0) + amt
                                } : m);
                        }
                    }
                });
                return {
                    transactions: updatedTransactions,
                    members: updatedMembers,
                    totalDonation: donationSum,
                    totalExpense: expenseSum,
                    netBalance: net < 0 ? 0 : net
                };
            }),
        // ------------------------------------------------------
        // লেনদেন এডিট করা (updateTransaction)
        // ------------------------------------------------------
        updateTransaction: (id, updatedData)=>set((state)=>{
                const updatedTransactions = state.transactions.map((t)=>t.id === id ? {
                        ...t,
                        ...updatedData,
                        amount: Number(updatedData.amount) || t.amount
                    } : t);
                let donationSum = 0;
                let expenseSum = 0;
                updatedTransactions.forEach((t)=>{
                    const amt = Number(t.amount) || 0;
                    if (t.type === 'donation') donationSum += amt;
                    else if (t.type === 'expense') expenseSum += amt;
                });
                const net = donationSum - expenseSum;
                // মেম্বার totals রিসেট + পুরোপুরি রিক্যালকুলেট
                let updatedMembers = state.members.map((m)=>({
                        ...m,
                        totalDonated: 0,
                        totalReceived: 0
                    }));
                updatedTransactions.forEach((t)=>{
                    if (t.type === 'donation') {
                        const amt = Number(t.amount) || 0;
                        if (t.donorName) {
                            const donorLower = t.donorName.trim().toLowerCase();
                            updatedMembers = updatedMembers.map((m)=>m.name.trim().toLowerCase() === donorLower ? {
                                    ...m,
                                    totalDonated: (m.totalDonated || 0) + amt
                                } : m);
                        }
                        if (t.receiverName) {
                            const receiverLower = t.receiverName.trim().toLowerCase();
                            updatedMembers = updatedMembers.map((m)=>m.name.trim().toLowerCase() === receiverLower ? {
                                    ...m,
                                    totalReceived: (m.totalReceived || 0) + amt
                                } : m);
                        }
                    }
                });
                return {
                    transactions: updatedTransactions,
                    members: updatedMembers,
                    totalDonation: donationSum,
                    totalExpense: expenseSum,
                    netBalance: net < 0 ? 0 : net
                };
            }),
        // ------------------------------------------------------
        // লেনদেন ডিলিট (আগের মতো, কিন্তু হিসাব ঠিক রাখা)
        // ------------------------------------------------------
        deleteTransaction: (id)=>set((state)=>{
                const updatedTransactions = state.transactions.filter((t)=>t.id !== id);
                let donationSum = 0;
                let expenseSum = 0;
                updatedTransactions.forEach((t)=>{
                    const amt = Number(t.amount) || 0;
                    if (t.type === 'donation') donationSum += amt;
                    else if (t.type === 'expense') expenseSum += amt;
                });
                const net = donationSum - expenseSum;
                let updatedMembers = state.members.map((m)=>({
                        ...m,
                        totalDonated: 0,
                        totalReceived: 0
                    }));
                updatedTransactions.forEach((t)=>{
                    if (t.type === 'donation') {
                        const amt = Number(t.amount) || 0;
                        if (t.donorName) {
                            const donorLower = t.donorName.trim().toLowerCase();
                            updatedMembers = updatedMembers.map((m)=>m.name.trim().toLowerCase() === donorLower ? {
                                    ...m,
                                    totalDonated: (m.totalDonated || 0) + amt
                                } : m);
                        }
                        if (t.receiverName) {
                            const receiverLower = t.receiverName.trim().toLowerCase();
                            updatedMembers = updatedMembers.map((m)=>m.name.trim().toLowerCase() === receiverLower ? {
                                    ...m,
                                    totalReceived: (m.totalReceived || 0) + amt
                                } : m);
                        }
                    }
                });
                return {
                    transactions: updatedTransactions,
                    members: updatedMembers,
                    totalDonation: donationSum,
                    totalExpense: expenseSum,
                    netBalance: net < 0 ? 0 : net
                };
            }),
        addMember: (data)=>set((state)=>({
                    members: [
                        ...state.members,
                        {
                            id: Date.now().toString(),
                            name: data.name.trim(),
                            phone: data.phone?.trim() || '',
                            address: data.address?.trim() || '',
                            avatar: data.avatar || '',
                            totalDonated: 0,
                            totalReceived: 0
                        }
                    ]
                })),
        // ------------------------------------------------------
        // মেম্বার এডিট করা (avatar আপডেট করতে পারবে)
        // ------------------------------------------------------
        updateMember: (id, updates)=>set((state)=>({
                    members: state.members.map((m)=>m.id === id ? {
                            ...m,
                            ...updates
                        } : m)
                }))
    }), {
    name: 'group-fund-v6'
}));
}),
"[project]/Desktop/New folder/my-app/app/receiver/page.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ReceiversList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/New folder/my-app/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/New folder/my-app/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$app$2f$lib$2f$store$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/New folder/my-app/app/lib/store.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/New folder/my-app/node_modules/date-fns/format.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$date$2d$fns$2f$locale$2f$bn$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/New folder/my-app/node_modules/date-fns/locale/bn.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
function ReceiversList() {
    const { members, transactions } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$app$2f$lib$2f$store$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])();
    const receiversWithDonations = members.map((m)=>{
        const received = transactions.filter((t)=>t.type === 'donation' && t.receiverName === m.name);
        return {
            ...m,
            received,
            totalReceived: received.reduce((sum, d)=>sum + d.amount, 0)
        };
    }).filter((m)=>m.received.length > 0);
    if (receiversWithDonations.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-3xl p-12 text-center shadow-xl",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-2xl text-gray-600",
                children: "এখনো কোনো গ্রহীতা নেই"
            }, void 0, false, {
                fileName: "[project]/Desktop/New folder/my-app/app/receiver/page.jsx",
                lineNumber: 20,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Desktop/New folder/my-app/app/receiver/page.jsx",
            lineNumber: 19,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
        children: receiversWithDonations.map((receiver)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-6 mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative w-24 h-24 flex-shrink-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    src: receiver.avatar,
                                    alt: receiver.name,
                                    fill: true,
                                    className: "rounded-full object-cover border-4 border-blue-300"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/New folder/my-app/app/receiver/page.jsx",
                                    lineNumber: 31,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/New folder/my-app/app/receiver/page.jsx",
                                lineNumber: 30,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-2xl font-bold text-blue-900",
                                        children: receiver.name
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/New folder/my-app/app/receiver/page.jsx",
                                        lineNumber: 34,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-700",
                                        children: [
                                            "মোট পেয়েছে: ",
                                            receiver.received.length,
                                            " বার"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/New folder/my-app/app/receiver/page.jsx",
                                        lineNumber: 35,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/New folder/my-app/app/receiver/page.jsx",
                                lineNumber: 33,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/New folder/my-app/app/receiver/page.jsx",
                        lineNumber: 29,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: receiver.received.map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-blue-50 p-5 rounded-2xl",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-semibold text-lg",
                                        children: [
                                            "← ",
                                            d.donorName
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/New folder/my-app/app/receiver/page.jsx",
                                        lineNumber: 42,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-blue-700 font-bold text-xl mt-1",
                                        children: [
                                            "৳ ",
                                            d.amount.toLocaleString('bn-BD')
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/New folder/my-app/app/receiver/page.jsx",
                                        lineNumber: 43,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-700 mt-1",
                                        children: d.reason || 'কারণ উল্লেখ নেই'
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/New folder/my-app/app/receiver/page.jsx",
                                        lineNumber: 44,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-500 mt-2",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(d.date), 'dd MMM yyyy', {
                                            locale: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$date$2d$fns$2f$locale$2f$bn$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["bn"]
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/New folder/my-app/app/receiver/page.jsx",
                                        lineNumber: 45,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, d.id, true, {
                                fileName: "[project]/Desktop/New folder/my-app/app/receiver/page.jsx",
                                lineNumber: 41,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/Desktop/New folder/my-app/app/receiver/page.jsx",
                        lineNumber: 39,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-right mt-6 font-bold text-blue-800 text-xl",
                        children: [
                            "মোট গ্রহণের পরিমাণ: ৳ ",
                            receiver.totalReceived.toLocaleString('bn-BD')
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/New folder/my-app/app/receiver/page.jsx",
                        lineNumber: 52,
                        columnNumber: 11
                    }, this)
                ]
            }, receiver.id, true, {
                fileName: "[project]/Desktop/New folder/my-app/app/receiver/page.jsx",
                lineNumber: 28,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/Desktop/New folder/my-app/app/receiver/page.jsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__2491f1fb._.js.map