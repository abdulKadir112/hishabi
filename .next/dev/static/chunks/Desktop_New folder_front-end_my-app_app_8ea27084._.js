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
        // ================= FETCH FROM BACKEND =================
        fetchData: async ()=>{
            try {
                set({
                    isLoading: true
                });
                const res = await fetch(`${API_BASE}/hishab`);
                const data = await res.json();
                set({
                    transactions: data.transactions || [],
                    members: data.members || [],
                    totalDonation: data.totalDonation || 0,
                    totalExpense: data.totalExpense || 0,
                    netBalance: data.netBalance || 0,
                    isLoading: false
                });
            } catch (err) {
                console.error('Fetch error:', err);
                set({
                    isLoading: false
                });
            }
        },
        // ================= ADD TRANSACTION =================
        addTransaction: async (tx)=>{
            try {
                const res = await fetch(`${API_BASE}/hishab`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(tx)
                });
                if (!res.ok) throw new Error('Failed');
                await get().fetchData(); // refresh data
                return true;
            } catch (err) {
                console.error(err);
                return false;
            }
        },
        // ================= DELETE =================
        deleteTransaction: async (id)=>{
            try {
                await fetch(`${API_BASE}/hishab/${id}`, {
                    method: 'DELETE'
                });
                await get().fetchData();
            } catch (err) {
                console.error(err);
            }
        },
        // ================= LOCAL MEMBER ADD =================
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
    name: 'group-fund-final-v1'
}));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Dashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/New folder/front-end/my-app/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/New folder/front-end/my-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/New folder/front-end/my-app/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$app$2f$lib$2f$store$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/New folder/front-end/my-app/app/lib/store.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gift$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gift$3e$__ = __turbopack_context__.i("[project]/Desktop/New folder/front-end/my-app/node_modules/lucide-react/dist/esm/icons/gift.js [app-client] (ecmascript) <export default as Gift>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown$3e$__ = __turbopack_context__.i("[project]/Desktop/New folder/front-end/my-app/node_modules/lucide-react/dist/esm/icons/arrow-down.js [app-client] (ecmascript) <export default as ArrowDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/Desktop/New folder/front-end/my-app/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/New folder/front-end/my-app/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
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
    const [isLogged, setIsLogged] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [pass, setPass] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [donation, setDonation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
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
    const [expense, setExpense] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        receiverName: '',
        receiverPhone: '',
        receiverAddress: '',
        receiverAvatar: '',
        receiverPreview: null,
        amount: '',
        reason: ''
    });
    const { members, addTransaction } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$app$2f$lib$2f$store$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])();
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
    const base64ToFile = async (base64, filename)=>{
        const res = await fetch(base64);
        const blob = await res.blob();
        return new File([
            blob
        ], filename, {
            type: blob.type
        });
    };
    // DONATION SAVE
    const handleAddDonation = async ()=>{
        if (!donation.amount || Number(donation.amount) <= 0) return alert('দানের পরিমাণ লিখুন');
        if (!donation.donorName.trim()) return alert('দাতার নাম লিখুন');
        if (!donation.receiverName.trim()) return alert('গ্রহীতার নাম লিখুন');
        try {
            const formData = new FormData();
            formData.append("name", donation.donorName + " → " + donation.receiverName);
            formData.append("amount", donation.amount);
            formData.append("type", "donation");
            formData.append("note", donation.reason || "");
            if (donation.donorAvatar) {
                const file = await base64ToFile(donation.donorAvatar, "donor.png");
                formData.append("image", file);
            }
            const res = await fetch("http://localhost:5000/hishab", {
                method: "POST",
                body: formData
            });
            const data = await res.json();
            if (data.success) {
                alert("দান সফলভাবে সেভ হয়েছে!");
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
            } else {
                alert("সেভ হয়নি!");
            }
        } catch (err) {
            alert("Server error!");
        }
    };
    // EXPENSE SAVE
    const handleAddExpense = async ()=>{
        if (!expense.amount || Number(expense.amount) <= 0) return alert('খরচের পরিমাণ লিখুন');
        if (!expense.receiverName.trim()) return alert('যাকে টাকা দেওয়া হলো তার নাম লিখুন');
        try {
            const formData = new FormData();
            formData.append("name", expense.receiverName);
            formData.append("amount", expense.amount);
            formData.append("type", "expense");
            formData.append("note", expense.reason || "");
            if (expense.receiverAvatar) {
                const file = await base64ToFile(expense.receiverAvatar, "expense.png");
                formData.append("image", file);
            }
            const res = await fetch("http://localhost:5000/hishab", {
                method: "POST",
                body: formData
            });
            const data = await res.json();
            if (data.success) {
                alert("খরচ সফলভাবে সেভ হয়েছে!");
                setExpense({
                    receiverName: '',
                    receiverPhone: '',
                    receiverAddress: '',
                    receiverAvatar: '',
                    receiverPreview: null,
                    amount: '',
                    reason: ''
                });
            } else {
                alert("সেভ হয়নি!");
            }
        } catch (err) {
            alert("Server error!");
        }
    };
    if (!isLogged) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white/10 backdrop-blur-lg p-10 rounded-3xl shadow-2xl text-center max-w-md w-full border border-white/20",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-4xl font-bold mb-6 text-white",
                        children: "অ্যাডমিন লগইন"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                        lineNumber: 155,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "password",
                        placeholder: "অ্যাডমিন পাসওয়ার্ড দিন",
                        value: pass,
                        onChange: (e)=>setPass(e.target.value),
                        className: "bg-white/20 border border-white/30 p-4 rounded-xl w-full text-xl mb-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                        lineNumber: 156,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleLogin,
                        className: "bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-4 rounded-xl w-full",
                        children: "লগইন"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                        lineNumber: 163,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                lineNumber: 154,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
            lineNumber: 153,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-10",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-10",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {}, void 0, false, {
                                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                                    lineNumber: 181,
                                    columnNumber: 15
                                }, this),
                                "হোমে ফিরে যান"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                            lineNumber: 180,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                        lineNumber: 179,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                    lineNumber: 178,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-5xl font-extrabold mb-12 text-emerald-800 text-center",
                    children: "অ্যাডমিন ড্যাশবোর্ড"
                }, void 0, false, {
                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                    lineNumber: 187,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white p-8 rounded-3xl shadow-2xl",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-3xl font-bold mb-8 text-purple-800 flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gift$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gift$3e$__["Gift"], {}, void 0, false, {
                                            fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                                            lineNumber: 196,
                                            columnNumber: 15
                                        }, this),
                                        " নতুন দান রেকর্ড"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                                    lineNumber: 195,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    placeholder: "দাতার পূর্ণ নাম লিখুন",
                                    value: donation.donorName,
                                    onChange: (e)=>setDonation({
                                            ...donation,
                                            donorName: e.target.value
                                        }),
                                    className: "w-full p-4 border mb-2"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                                    lineNumber: 199,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    placeholder: "দাতার মোবাইল নাম্বার",
                                    value: donation.donorPhone,
                                    onChange: (e)=>setDonation({
                                            ...donation,
                                            donorPhone: e.target.value
                                        }),
                                    className: "w-full p-4 border mb-2"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                                    lineNumber: 206,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    placeholder: "দাতার ঠিকানা",
                                    value: donation.donorAddress,
                                    onChange: (e)=>setDonation({
                                            ...donation,
                                            donorAddress: e.target.value
                                        }),
                                    className: "w-full p-4 border mb-2"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                                    lineNumber: 213,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    placeholder: "গ্রহীতার পূর্ণ নাম লিখুন",
                                    value: donation.receiverName,
                                    onChange: (e)=>setDonation({
                                            ...donation,
                                            receiverName: e.target.value
                                        }),
                                    className: "w-full p-4 border mb-2"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                                    lineNumber: 220,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    placeholder: "গ্রহীতার মোবাইল নাম্বার",
                                    value: donation.receiverPhone,
                                    onChange: (e)=>setDonation({
                                            ...donation,
                                            receiverPhone: e.target.value
                                        }),
                                    className: "w-full p-4 border mb-2"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                                    lineNumber: 227,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    placeholder: "গ্রহীতার ঠিকানা",
                                    value: donation.receiverAddress,
                                    onChange: (e)=>setDonation({
                                            ...donation,
                                            receiverAddress: e.target.value
                                        }),
                                    className: "w-full p-4 border mb-2"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                                    lineNumber: 234,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "number",
                                    placeholder: "দানের পরিমাণ (টাকা)",
                                    value: donation.amount,
                                    onChange: (e)=>setDonation({
                                            ...donation,
                                            amount: e.target.value
                                        }),
                                    className: "w-full p-4 border mb-2"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                                    lineNumber: 241,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    placeholder: "দানের কারণ লিখুন",
                                    value: donation.reason,
                                    onChange: (e)=>setDonation({
                                            ...donation,
                                            reason: e.target.value
                                        }),
                                    className: "w-full p-4 border mb-2"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                                    lineNumber: 249,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleAddDonation,
                                    className: "w-full bg-purple-600 text-white p-4 mt-3 rounded-xl",
                                    children: "দান রেকর্ড করুন"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                                    lineNumber: 256,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                            lineNumber: 194,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white p-8 rounded-3xl shadow-2xl",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-3xl font-bold mb-8 text-red-800 flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown$3e$__["ArrowDown"], {}, void 0, false, {
                                            fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                                            lineNumber: 264,
                                            columnNumber: 15
                                        }, this),
                                        " খরচ রেকর্ড"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                                    lineNumber: 263,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    placeholder: "যাকে টাকা দেওয়া হয়েছে তার নাম",
                                    value: expense.receiverName,
                                    onChange: (e)=>setExpense({
                                            ...expense,
                                            receiverName: e.target.value
                                        }),
                                    className: "w-full p-4 border mb-2"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                                    lineNumber: 267,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "number",
                                    placeholder: "খরচের পরিমাণ (টাকা)",
                                    value: expense.amount,
                                    onChange: (e)=>setExpense({
                                            ...expense,
                                            amount: e.target.value
                                        }),
                                    className: "w-full p-4 border mb-2"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                                    lineNumber: 274,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    placeholder: "খরচের কারণ লিখুন",
                                    value: expense.reason,
                                    onChange: (e)=>setExpense({
                                            ...expense,
                                            reason: e.target.value
                                        }),
                                    className: "w-full p-4 border mb-2"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                                    lineNumber: 282,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleAddExpense,
                                    className: "w-full bg-red-600 text-white p-4 mt-3 rounded-xl",
                                    children: "খরচ রেকর্ড করুন"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                                    lineNumber: 289,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                            lineNumber: 262,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                    lineNumber: 191,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
            lineNumber: 176,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
        lineNumber: 175,
        columnNumber: 5
    }, this);
}
_s(Dashboard, "UNpPc0Aq6V78vf+lSNnzyyLuzE4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$app$2f$lib$2f$store$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"]
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

//# sourceMappingURL=Desktop_New%20folder_front-end_my-app_app_8ea27084._.js.map