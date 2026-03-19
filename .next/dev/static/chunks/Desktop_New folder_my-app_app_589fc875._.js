(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/New folder/my-app/app/lib/store.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useStore",
    ()=>useStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/New folder/my-app/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/New folder/my-app/node_modules/zustand/esm/middleware.mjs [app-client] (ecmascript)");
'use client';
;
;
const useStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["persist"])((set, get)=>({
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/New folder/my-app/app/dashboard/page.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Dashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/New folder/my-app/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/New folder/my-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/New folder/my-app/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$app$2f$lib$2f$store$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/New folder/my-app/app/lib/store.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gift$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gift$3e$__ = __turbopack_context__.i("[project]/Desktop/New folder/my-app/node_modules/lucide-react/dist/esm/icons/gift.js [app-client] (ecmascript) <export default as Gift>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown$3e$__ = __turbopack_context__.i("[project]/Desktop/New folder/my-app/node_modules/lucide-react/dist/esm/icons/arrow-down.js [app-client] (ecmascript) <export default as ArrowDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/Desktop/New folder/my-app/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/New folder/my-app/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function Dashboard() {
    _s();
    const [isLogged, setIsLogged] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [pass, setPass] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [donation, setDonation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        donorName: '',
        donorPhone: '',
        donorAddress: '',
        donorAvatar: '',
        donorPreview: null,
        receiverName: '',
        receiverPhone: '',
        receiverAddress: '',
        receiverAvatar: '',
        receiverPreview: null,
        amount: '',
        reason: ''
    });
    const [expense, setExpense] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        receiverName: '',
        receiverPhone: '',
        receiverAddress: '',
        receiverAvatar: '',
        receiverPreview: null,
        amount: '',
        reason: ''
    });
    const { members, transactions, addTransaction } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$app$2f$lib$2f$store$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])();
    const handleLogin = ()=>{
        if (pass === 'admin123') {
            setIsLogged(true);
            setPass('');
        } else {
            alert('ভুল পাসওয়ার্ড!');
        }
    };
    const handleImageUpload = (e, type, formType = 'donation')=>{
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = ()=>{
            if (formType === 'donation') {
                if (type === 'donor') {
                    setDonation({
                        ...donation,
                        donorAvatar: reader.result,
                        donorPreview: reader.result
                    });
                } else {
                    setDonation({
                        ...donation,
                        receiverAvatar: reader.result,
                        receiverPreview: reader.result
                    });
                }
            } else {
                setExpense({
                    ...expense,
                    receiverAvatar: reader.result,
                    receiverPreview: reader.result
                });
            }
        };
        reader.readAsDataURL(file);
    };
    const handleAddDonation = ()=>{
        if (!donation.amount || Number(donation.amount) <= 0) return alert('টাকার পরিমাণ দিন');
        if (!donation.donorName.trim()) return alert('দাতার নাম দিন');
        if (!donation.receiverName.trim()) return alert('গ্রহীতার নাম দিন');
        addTransaction({
            type: 'donation',
            amount: Number(donation.amount),
            description: donation.reason.trim(),
            donorName: donation.donorName.trim(),
            donorPhone: donation.donorPhone.trim(),
            donorAddress: donation.donorAddress.trim(),
            donorAvatar: donation.donorAvatar || '',
            receiverName: donation.receiverName.trim(),
            receiverPhone: donation.receiverPhone.trim(),
            receiverAddress: donation.receiverAddress.trim(),
            receiverAvatar: donation.receiverAvatar || ''
        });
        setDonation({
            donorName: '',
            donorPhone: '',
            donorAddress: '',
            donorAvatar: '',
            donorPreview: null,
            receiverName: '',
            receiverPhone: '',
            receiverAddress: '',
            receiverAvatar: '',
            receiverPreview: null,
            amount: '',
            reason: ''
        });
        alert('দান সফলভাবে যোগ হয়েছে!');
    };
    const handleAddExpense = ()=>{
        if (!expense.amount || Number(expense.amount) <= 0) return alert('টাকার পরিমাণ দিন');
        if (!expense.receiverName.trim()) return alert('গ্রহীতার নাম দিন');
        addTransaction({
            type: 'expense',
            amount: Number(expense.amount),
            description: expense.reason.trim(),
            receiverName: expense.receiverName.trim(),
            receiverPhone: expense.receiverPhone.trim(),
            receiverAddress: expense.receiverAddress.trim(),
            receiverAvatar: expense.receiverAvatar || ''
        });
        setExpense({
            receiverName: '',
            receiverPhone: '',
            receiverAddress: '',
            receiverAvatar: '',
            receiverPreview: null,
            amount: '',
            reason: ''
        });
        alert('খরচ সফলভাবে রেকর্ড হয়েছে!');
    };
    if (!isLogged) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white/10 backdrop-blur-lg p-10 rounded-3xl shadow-2xl text-center max-w-md w-full border border-white/20",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-4xl font-bold mb-6 text-white",
                        children: "অ্যাডমিন লগইন"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/New folder/my-app/app/dashboard/page.jsx",
                        lineNumber: 107,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "password",
                        placeholder: "পাসওয়ার্ড",
                        value: pass,
                        onChange: (e)=>setPass(e.target.value),
                        className: "bg-white/20 border border-white/30 p-4 rounded-xl w-full text-xl mb-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/New folder/my-app/app/dashboard/page.jsx",
                        lineNumber: 108,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleLogin,
                        className: "bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-4 rounded-xl text-xl w-full transition shadow-lg",
                        children: "লগইন"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/New folder/my-app/app/dashboard/page.jsx",
                        lineNumber: 115,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-gray-300 mt-4",
                        children: "demo password: admin123"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/New folder/my-app/app/dashboard/page.jsx",
                        lineNumber: 121,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/New folder/my-app/app/dashboard/page.jsx",
                lineNumber: 106,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Desktop/New folder/my-app/app/dashboard/page.jsx",
            lineNumber: 105,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-10",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-10",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-medium transition shadow-md",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                    size: 24
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/New folder/my-app/app/dashboard/page.jsx",
                                    lineNumber: 133,
                                    columnNumber: 15
                                }, this),
                                "হোমে ফিরে যান"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/New folder/my-app/app/dashboard/page.jsx",
                            lineNumber: 132,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/New folder/my-app/app/dashboard/page.jsx",
                        lineNumber: 131,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/New folder/my-app/app/dashboard/page.jsx",
                    lineNumber: 130,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-5xl md:text-6xl font-extrabold mb-12 text-emerald-800 text-center",
                    children: "অ্যাডমিন ড্যাশবোর্ড"
                }, void 0, false, {
                    fileName: "[project]/Desktop/New folder/my-app/app/dashboard/page.jsx",
                    lineNumber: 139,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white p-8 rounded-3xl shadow-2xl border border-purple-100",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-3xl font-bold mb-8 text-purple-800 flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gift$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gift$3e$__["Gift"], {
                                            size: 32,
                                            className: "text-purple-600"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/New folder/my-app/app/dashboard/page.jsx",
                                            lineNumber: 145,
                                            columnNumber: 15
                                        }, this),
                                        " নতুন দান রেকর্ড"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/New folder/my-app/app/dashboard/page.jsx",
                                    lineNumber: 144,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 md:grid-cols-2 gap-8",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-5 bg-purple-50/70 p-6 rounded-2xl border border-purple-200",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-2xl font-semibold text-purple-900",
                                                    children: "দাতা"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/New folder/my-app/app/dashboard/page.jsx",
                                                    lineNumber: 151,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    placeholder: "দাতার পুরো নাম",
                                                    value: donation.donorName,
                                                    onChange: (e)=>setDonation({
                                                            ...donation,
                                                            donorName: e.target.value
                                                        }),
                                                    className: "w-full p-4 rounded-xl border border-purple-300 bg-white text-gray-900 placeholder-purple-400/60 focus:border-purple-500 focus:ring-2 focus:ring-purple-400/50 outline-none transition-all duration-200"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/New folder/my-app/app/dashboard/page.jsx",
                                                    lineNumber: 152,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    placeholder: "ফোন নম্বর",
                                                    value: donation.donorPhone,
                                                    onChange: (e)=>setDonation({
                                                            ...donation,
                                                            donorPhone: e.target.value
                                                        }),
                                                    className: "w-full p-4 rounded-xl border border-purple-300 bg-white text-gray-900 placeholder-purple-400/60 focus:border-purple-500 focus:ring-2 focus:ring-purple-400/50 outline-none transition-all duration-200"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/New folder/my-app/app/dashboard/page.jsx",
                                                    lineNumber: 158,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    placeholder: "ঠিকানা",
                                                    value: donation.donorAddress,
                                                    onChange: (e)=>setDonation({
                                                            ...donation,
                                                            donorAddress: e.target.value
                                                        }),
                                                    className: "w-full p-4 rounded-xl border border-purple-300 bg-white text-gray-900 placeholder-purple-400/60 focus:border-purple-500 focus:ring-2 focus:ring-purple-400/50 outline-none transition-all duration-200"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/New folder/my-app/app/dashboard/page.jsx",
                                                    lineNumber: 164,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "block text-sm font-medium text-purple-700 mb-2",
                                                            children: "দাতার ছবি"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/New folder/my-app/app/dashboard/page.jsx",
                                                            lineNumber: 171,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "file",
                                                            accept: "image/*",
                                                            onChange: (e)=>handleImageUpload(e, 'donor', 'donation'),
                                                            className: "w-full p-3 rounded-xl border border-purple-300 bg-white text-gray-800 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200 cursor-pointer transition"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/New folder/my-app/app/dashboard/page.jsx",
                                                            lineNumber: 172,
                                                            columnNumber: 19
                                                        }, this),
                                                        donation.donorPreview && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mt-4 flex justify-center",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                src: donation.donorPreview,
                                                                alt: "দাতা",
                                                                width: 100,
                                                                height: 100,
                                                                className: "rounded-full border-4 border-purple-400 shadow-md object-cover"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/New folder/my-app/app/dashboard/page.jsx",
                                                                lineNumber: 180,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/New folder/my-app/app/dashboard/page.jsx",
                                                            lineNumber: 179,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/New folder/my-app/app/dashboard/page.jsx",
                                                    lineNumber: 170,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/New folder/my-app/app/dashboard/page.jsx",
                                            lineNumber: 150,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-5 bg-blue-50/70 p-6 rounded-2xl border border-blue-200",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-2xl font-semibold text-blue-900",
                                                    children: "গ্রহীতা"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/New folder/my-app/app/dashboard/page.jsx",
                                                    lineNumber: 194,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    placeholder: "গ্রহীতার পুরো নাম",
                                                    value: donation.receiverName,
                                                    onChange: (e)=>setDonation({
                                                            ...donation,
                                                            receiverName: e.target.value
                                                        }),
                                                    className: "w-full p-4 rounded-xl border border-blue-300 bg-white text-gray-900 placeholder-blue-400/60 focus:border-blue-500 focus:ring-2 focus:ring-blue-400/50 outline-none transition-all duration-200"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/New folder/my-app/app/dashboard/page.jsx",
                                                    lineNumber: 195,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    placeholder: "ফোন নম্বর",
                                                    value: donation.receiverPhone,
                                                    onChange: (e)=>setDonation({
                                                            ...donation,
                                                            receiverPhone: e.target.value
                                                        }),
                                                    className: "w-full p-4 rounded-xl border border-blue-300 bg-white text-gray-900 placeholder-blue-400/60 focus:border-blue-500 focus:ring-2 focus:ring-blue-400/50 outline-none transition-all duration-200"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/New folder/my-app/app/dashboard/page.jsx",
                                                    lineNumber: 201,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    placeholder: "ঠিকানা",
                                                    value: donation.receiverAddress,
                                                    onChange: (e)=>setDonation({
                                                            ...donation,
                                                            receiverAddress: e.target.value
                                                        }),
                                                    className: "w-full p-4 rounded-xl border border-blue-300 bg-white text-gray-900 placeholder-blue-400/60 focus:border-blue-500 focus:ring-2 focus:ring-blue-400/50 outline-none transition-all duration-200"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/New folder/my-app/app/dashboard/page.jsx",
                                                    lineNumber: 207,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "block text-sm font-medium text-blue-700 mb-2",
                                                            children: "গ্রহীতার ছবি"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/New folder/my-app/app/dashboard/page.jsx",
                                                            lineNumber: 214,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "file",
                                                            accept: "image/*",
                                                            onChange: (e)=>handleImageUpload(e, 'receiver', 'donation'),
                                                            className: "w-full p-3 rounded-xl border border-blue-300 bg-white text-gray-800 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 cursor-pointer transition"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/New folder/my-app/app/dashboard/page.jsx",
                                                            lineNumber: 215,
                                                            columnNumber: 19
                                                        }, this),
                                                        donation.receiverPreview && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mt-4 flex justify-center",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                src: donation.receiverPreview,
                                                                alt: "গ্রহীতা",
                                                                width: 100,
                                                                height: 100,
                                                                className: "rounded-full border-4 border-blue-400 shadow-md object-cover"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/New folder/my-app/app/dashboard/page.jsx",
                                                                lineNumber: 223,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/New folder/my-app/app/dashboard/page.jsx",
                                                            lineNumber: 222,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/New folder/my-app/app/dashboard/page.jsx",
                                                    lineNumber: 213,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/New folder/my-app/app/dashboard/page.jsx",
                                            lineNumber: 193,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/New folder/my-app/app/dashboard/page.jsx",
                                    lineNumber: 148,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-10 space-y-5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            placeholder: "দানের পরিমাণ (টাকা)",
                                            value: donation.amount,
                                            onChange: (e)=>setDonation({
                                                    ...donation,
                                                    amount: e.target.value
                                                }),
                                            className: "w-full p-5 rounded-xl border border-indigo-300 bg-white text-gray-900 placeholder-indigo-400/60 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400/50 outline-none transition-all duration-200 text-lg font-medium",
                                            min: "1"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/New folder/my-app/app/dashboard/page.jsx",
                                            lineNumber: 237,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            placeholder: "কেন / কার জন্য দান করা হলো",
                                            value: donation.reason,
                                            onChange: (e)=>setDonation({
                                                    ...donation,
                                                    reason: e.target.value
                                                }),
                                            className: "w-full p-5 rounded-xl border border-indigo-300 bg-white text-gray-900 placeholder-indigo-400/60 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400/50 outline-none transition-all duration-200"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/New folder/my-app/app/dashboard/page.jsx",
                                            lineNumber: 245,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleAddDonation,
                                            className: "w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-5 rounded-xl font-bold text-xl transition shadow-lg flex items-center justify-center gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gift$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gift$3e$__["Gift"], {
                                                    size: 28
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/New folder/my-app/app/dashboard/page.jsx",
                                                    lineNumber: 255,
                                                    columnNumber: 17
                                                }, this),
                                                " দান রেকর্ড করুন"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/New folder/my-app/app/dashboard/page.jsx",
                                            lineNumber: 251,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/New folder/my-app/app/dashboard/page.jsx",
                                    lineNumber: 236,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/New folder/my-app/app/dashboard/page.jsx",
                            lineNumber: 143,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white p-8 rounded-3xl shadow-2xl border border-red-100",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-3xl font-bold mb-8 text-red-800 flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown$3e$__["ArrowDown"], {
                                            size: 32,
                                            className: "text-red-600"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/New folder/my-app/app/dashboard/page.jsx",
                                            lineNumber: 263,
                                            columnNumber: 15
                                        }, this),
                                        " নতুন খরচ রেকর্ড"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/New folder/my-app/app/dashboard/page.jsx",
                                    lineNumber: 262,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-red-50/70 p-6 rounded-2xl border border-red-200",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-2xl font-semibold text-red-900 mb-5",
                                                    children: "গ্রহীতা (যাকে টাকা দেওয়া হলো)"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/New folder/my-app/app/dashboard/page.jsx",
                                                    lineNumber: 268,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            placeholder: "নাম",
                                                            value: expense.receiverName,
                                                            onChange: (e)=>setExpense({
                                                                    ...expense,
                                                                    receiverName: e.target.value
                                                                }),
                                                            className: "w-full p-4 rounded-xl border border-red-300 bg-white text-gray-900 placeholder-red-400/60 focus:border-red-500 focus:ring-2 focus:ring-red-400/50 outline-none transition-all duration-200"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/New folder/my-app/app/dashboard/page.jsx",
                                                            lineNumber: 270,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            placeholder: "ফোন নম্বর",
                                                            value: expense.receiverPhone,
                                                            onChange: (e)=>setExpense({
                                                                    ...expense,
                                                                    receiverPhone: e.target.value
                                                                }),
                                                            className: "w-full p-4 rounded-xl border border-red-300 bg-white text-gray-900 placeholder-red-400/60 focus:border-red-500 focus:ring-2 focus:ring-red-400/50 outline-none transition-all duration-200"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/New folder/my-app/app/dashboard/page.jsx",
                                                            lineNumber: 276,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            placeholder: "ঠিকানা",
                                                            value: expense.receiverAddress,
                                                            onChange: (e)=>setExpense({
                                                                    ...expense,
                                                                    receiverAddress: e.target.value
                                                                }),
                                                            className: "w-full p-4 rounded-xl border border-red-300 bg-white text-gray-900 placeholder-red-400/60 focus:border-red-500 focus:ring-2 focus:ring-red-400/50 outline-none transition-all duration-200"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/New folder/my-app/app/dashboard/page.jsx",
                                                            lineNumber: 282,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/New folder/my-app/app/dashboard/page.jsx",
                                                    lineNumber: 269,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "block text-sm font-medium text-red-700 mb-2",
                                                            children: "ছবি (ঐচ্ছিক)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/New folder/my-app/app/dashboard/page.jsx",
                                                            lineNumber: 290,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "file",
                                                            accept: "image/*",
                                                            onChange: (e)=>handleImageUpload(e, 'receiver', 'expense'),
                                                            className: "w-full p-3 rounded-xl border border-red-300 bg-white text-gray-800 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-100 file:text-red-700 hover:file:bg-red-200 cursor-pointer transition"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/New folder/my-app/app/dashboard/page.jsx",
                                                            lineNumber: 291,
                                                            columnNumber: 19
                                                        }, this),
                                                        expense.receiverPreview && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mt-4 flex justify-center",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                src: expense.receiverPreview,
                                                                alt: "গ্রহীতা",
                                                                width: 100,
                                                                height: 100,
                                                                className: "rounded-full border-4 border-red-400 shadow-md object-cover"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/New folder/my-app/app/dashboard/page.jsx",
                                                                lineNumber: 299,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/New folder/my-app/app/dashboard/page.jsx",
                                                            lineNumber: 298,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/New folder/my-app/app/dashboard/page.jsx",
                                                    lineNumber: 289,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/New folder/my-app/app/dashboard/page.jsx",
                                            lineNumber: 267,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            placeholder: "খরচের পরিমাণ (টাকা)",
                                            value: expense.amount,
                                            onChange: (e)=>setExpense({
                                                    ...expense,
                                                    amount: e.target.value
                                                }),
                                            className: "w-full p-5 rounded-xl border border-rose-300 bg-white text-gray-900 placeholder-rose-400/60 focus:border-rose-500 focus:ring-2 focus:ring-rose-400/50 outline-none transition-all duration-200 text-lg font-medium",
                                            min: "1"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/New folder/my-app/app/dashboard/page.jsx",
                                            lineNumber: 311,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            placeholder: "কারণ / বিবরণ (যেমন: চিকিৎসা, শিক্ষা ইত্যাদি)",
                                            value: expense.reason,
                                            onChange: (e)=>setExpense({
                                                    ...expense,
                                                    reason: e.target.value
                                                }),
                                            className: "w-full p-5 rounded-xl border border-rose-300 bg-white text-gray-900 placeholder-rose-400/60 focus:border-rose-500 focus:ring-2 focus:ring-rose-400/50 outline-none transition-all duration-200"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/New folder/my-app/app/dashboard/page.jsx",
                                            lineNumber: 319,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleAddExpense,
                                            className: "w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white py-5 rounded-xl font-bold text-xl transition shadow-lg flex items-center justify-center gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown$3e$__["ArrowDown"], {
                                                    size: 28
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/New folder/my-app/app/dashboard/page.jsx",
                                                    lineNumber: 330,
                                                    columnNumber: 17
                                                }, this),
                                                " খরচ রেকর্ড করুন"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/New folder/my-app/app/dashboard/page.jsx",
                                            lineNumber: 326,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/New folder/my-app/app/dashboard/page.jsx",
                                    lineNumber: 266,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/New folder/my-app/app/dashboard/page.jsx",
                            lineNumber: 261,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/New folder/my-app/app/dashboard/page.jsx",
                    lineNumber: 141,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/New folder/my-app/app/dashboard/page.jsx",
            lineNumber: 129,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/New folder/my-app/app/dashboard/page.jsx",
        lineNumber: 128,
        columnNumber: 5
    }, this);
}
_s(Dashboard, "PFM+yn+qeAA1vDQxYwjPITjkvOw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$my$2d$app$2f$app$2f$lib$2f$store$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"]
    ];
});
_c = Dashboard;
var _c;
__turbopack_context__.k.register(_c, "Dashboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Desktop_New%20folder_my-app_app_589fc875._.js.map