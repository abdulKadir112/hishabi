(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/New folder/front-end/my-app/app/lib/store.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useStore",
    ()=>useStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/New folder/front-end/my-app/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/New folder/front-end/my-app/node_modules/zustand/esm/middleware.mjs [app-client] (ecmascript)");
'use client';
;
;
const API_BASE = 'http://localhost:5000';
const useStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["persist"])((set, get)=>({
        members: [],
        transactions: [],
        totalDonation: 0,
        totalExpense: 0,
        netBalance: 0,
        isLoading: false,
        fetchData: async ()=>{
            try {
                set({
                    isLoading: true
                });
                const res = await fetch(`${API_BASE}/hishab`);
                if (!res.ok) {
                    const errText = await res.text();
                    throw new Error(`HTTP ${res.status} - ${errText}`);
                }
                const data = await res.json();
                console.log('API Response:', data);
                const transactions = Array.isArray(data.transactions) ? data.transactions : [];
                // totals নেওয়া – backend থেকে না আসলে নিজে হিসাব করা
                let totalDonation = Number(data.totalDonation) || 0;
                let totalExpense = Number(data.totalExpense) || 0;
                let netBalance = Number(data.netBalance) || 0;
                if (totalDonation === 0 && totalExpense === 0 && transactions.length > 0) {
                    totalDonation = transactions.filter((t)=>t.type === 'donation').reduce((sum, t)=>sum + (Number(t.amount) || 0), 0);
                    totalExpense = transactions.filter((t)=>t.type === 'expense').reduce((sum, t)=>sum + (Number(t.amount) || 0), 0);
                    netBalance = totalDonation - totalExpense;
                    console.log('Fallback totals calculated:', {
                        totalDonation,
                        totalExpense,
                        netBalance
                    });
                }
                // শীর্ষ দানকারীদের জন্য members তৈরি করা
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
                                avatar: tx.donorImage || tx.donorAvatar || '',
                                totalDonated: 0,
                                totalReceived: 0
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
                    isLoading: false
                });
            } catch (err) {
                console.error('Fetch error:', err.message || err);
                set({
                    isLoading: false
                });
            }
        },
        addTransaction: async (tx)=>{
            try {
                const res = await fetch(`${API_BASE}/hishab`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(tx)
                });
                if (!res.ok) throw new Error('Failed to add');
                await get().fetchData();
                return true;
            } catch (err) {
                console.error('Add error:', err);
                return false;
            }
        },
        deleteTransaction: async (id)=>{
            try {
                await fetch(`${API_BASE}/hishab/${id}`, {
                    method: 'DELETE'
                });
                await get().fetchData();
            } catch (err) {
                console.error('Delete error:', err);
            }
        },
        addMember: (data)=>set((state)=>({
                    members: [
                        ...state.members,
                        {
                            id: Date.now().toString(),
                            name: data.name.trim(),
                            phone: data.phone || '',
                            address: data.address || '',
                            avatar: data.avatar || '',
                            totalDonated: 0,
                            totalReceived: 0
                        }
                    ]
                })),
        updateMember: (id, updates)=>set((state)=>({
                    members: state.members.map((m)=>m.id === id ? {
                            ...m,
                            ...updates
                        } : m)
                }))
    }), {
    name: 'group-fund-final-v5'
}));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/New folder/front-end/my-app/app/receiver/page.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ReceiversList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/New folder/front-end/my-app/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/New folder/front-end/my-app/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$app$2f$lib$2f$store$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/New folder/front-end/my-app/app/lib/store.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/New folder/front-end/my-app/node_modules/date-fns/format.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$date$2d$fns$2f$locale$2f$bn$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/New folder/front-end/my-app/node_modules/date-fns/locale/bn.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function ReceiversList() {
    _s();
    const { members, transactions, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$app$2f$lib$2f$store$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])();
    const receiverMap = new Map();
    transactions.forEach((t)=>{
        if (t.receiverName?.trim()) {
            const name = t.receiverName.trim();
            if (!receiverMap.has(name)) {
                const member = members.find((m)=>m.name === name) || {
                    name,
                    avatar: t.receiverImage || `https://i.pravatar.cc/200?u=${encodeURIComponent(name)}`
                };
                receiverMap.set(name, {
                    ...member,
                    received: [],
                    totalReceived: 0
                });
            }
            const receiver = receiverMap.get(name);
            if (t.type === 'donation') {
                receiver.received.push(t);
                receiver.totalReceived += Number(t.amount) || 0;
            }
        }
    });
    const receiversWithDonations = Array.from(receiverMap.values()).sort((a, b)=>b.totalReceived - a.totalReceived);
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center py-12 text-gray-600",
            children: "লোড হচ্ছে..."
        }, void 0, false, {
            fileName: "[project]/Desktop/New folder/front-end/my-app/app/receiver/page.jsx",
            lineNumber: 40,
            columnNumber: 12
        }, this);
    }
    if (receiversWithDonations.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-3xl p-12 text-center shadow-xl",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-2xl text-gray-600",
                children: "এখনো কোনো গ্রহীতা নেই"
            }, void 0, false, {
                fileName: "[project]/Desktop/New folder/front-end/my-app/app/receiver/page.jsx",
                lineNumber: 46,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Desktop/New folder/front-end/my-app/app/receiver/page.jsx",
            lineNumber: 45,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
        children: receiversWithDonations.map((receiver)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-6 mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative w-24 h-24 flex-shrink-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: receiver.avatar,
                                    alt: receiver.name,
                                    fill: true,
                                    className: "rounded-full object-cover border-4 border-blue-300",
                                    onError: (e)=>{
                                        e.target.src = `https://i.pravatar.cc/200?u=${encodeURIComponent(receiver.name)}`;
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/receiver/page.jsx",
                                    lineNumber: 60,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/New folder/front-end/my-app/app/receiver/page.jsx",
                                lineNumber: 59,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-2xl font-bold text-blue-900",
                                        children: receiver.name
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/New folder/front-end/my-app/app/receiver/page.jsx",
                                        lineNumber: 71,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-700",
                                        children: [
                                            "মোট পেয়েছে: ",
                                            receiver.received.length,
                                            " বার"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/New folder/front-end/my-app/app/receiver/page.jsx",
                                        lineNumber: 72,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/New folder/front-end/my-app/app/receiver/page.jsx",
                                lineNumber: 70,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/New folder/front-end/my-app/app/receiver/page.jsx",
                        lineNumber: 58,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4 max-h-80 overflow-y-auto pr-2",
                        children: receiver.received.map((d, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-blue-50 p-5 rounded-2xl",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-semibold text-lg",
                                        children: [
                                            "← ",
                                            d.donorName || 'অজ্ঞাত'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/New folder/front-end/my-app/app/receiver/page.jsx",
                                        lineNumber: 79,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-blue-700 font-bold text-xl mt-1",
                                        children: [
                                            "৳ ",
                                            (d.amount || 0).toLocaleString('bn-BD')
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/New folder/front-end/my-app/app/receiver/page.jsx",
                                        lineNumber: 80,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-700 mt-1",
                                        children: d.note || d.reason || 'কারণ উল্লেখ নেই'
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/New folder/front-end/my-app/app/receiver/page.jsx",
                                        lineNumber: 83,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-500 mt-2",
                                        children: d.date ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(d.date), 'dd MMM yyyy', {
                                            locale: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$date$2d$fns$2f$locale$2f$bn$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bn"]
                                        }) : 'তারিখ নেই'
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/New folder/front-end/my-app/app/receiver/page.jsx",
                                        lineNumber: 84,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, `${d._id || d.id || index}-${d.date}`, true, {
                                fileName: "[project]/Desktop/New folder/front-end/my-app/app/receiver/page.jsx",
                                lineNumber: 78,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/Desktop/New folder/front-end/my-app/app/receiver/page.jsx",
                        lineNumber: 76,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-right mt-6 font-bold text-blue-800 text-xl",
                        children: [
                            "মোট গ্রহণের পরিমাণ: ৳ ",
                            receiver.totalReceived.toLocaleString('bn-BD')
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/New folder/front-end/my-app/app/receiver/page.jsx",
                        lineNumber: 91,
                        columnNumber: 11
                    }, this)
                ]
            }, receiver.name || receiver.id || `receiver-${Math.random()}`, true, {
                fileName: "[project]/Desktop/New folder/front-end/my-app/app/receiver/page.jsx",
                lineNumber: 54,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/Desktop/New folder/front-end/my-app/app/receiver/page.jsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
_s(ReceiversList, "J7bqpXjnHgzotBuM4fQdPpcNC+o=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$app$2f$lib$2f$store$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"]
    ];
});
_c = ReceiversList;
var _c;
__turbopack_context__.k.register(_c, "ReceiversList");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Desktop_New%20folder_front-end_my-app_app_aa224146._.js.map