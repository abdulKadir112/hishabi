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
"[project]/Desktop/New folder/front-end/my-app/app/page.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/New folder/front-end/my-app/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$app$2f$lib$2f$store$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/New folder/front-end/my-app/app/lib/store.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/New folder/front-end/my-app/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/New folder/front-end/my-app/node_modules/date-fns/format.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$date$2d$fns$2f$locale$2f$bn$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/New folder/front-end/my-app/node_modules/date-fns/locale/bn.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUp$3e$__ = __turbopack_context__.i("[project]/Desktop/New folder/front-end/my-app/node_modules/lucide-react/dist/esm/icons/arrow-up.js [app-ssr] (ecmascript) <export default as ArrowUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown$3e$__ = __turbopack_context__.i("[project]/Desktop/New folder/front-end/my-app/node_modules/lucide-react/dist/esm/icons/arrow-down.js [app-ssr] (ecmascript) <export default as ArrowDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gift$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Gift$3e$__ = __turbopack_context__.i("[project]/Desktop/New folder/front-end/my-app/node_modules/lucide-react/dist/esm/icons/gift.js [app-ssr] (ecmascript) <export default as Gift>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/Desktop/New folder/front-end/my-app/node_modules/lucide-react/dist/esm/icons/users.js [app-ssr] (ecmascript) <export default as Users>");
'use client';
;
;
;
;
;
;
function Home() {
    const { netBalance, totalDonation, totalExpense, members, transactions, fetchData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$app$2f$lib$2f$store$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])();
    const [menuOpen, setMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const menuRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null); // ✅ NEW
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetchData();
    }, [
        fetchData
    ]);
    // ✅ click outside → menu close
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleClickOutside = (e)=>{
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return ()=>{
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const safeTransactions = Array.isArray(transactions) ? transactions : [];
    const recent = safeTransactions.slice().sort((a, b)=>new Date(b.date || b.createdAt || 0) - new Date(a.date || a.createdAt || 0)).slice(0, 5);
    const topDonors = (members || []).filter((m)=>(m.totalDonated || 0) > 0).sort((a, b)=>(b.totalDonated || 0) - (a.totalDonated || 0)).slice(0, 4);
    const getInitialAvatar = (name = '', bgColor = 'bg-gray-300', textColor = 'text-gray-700')=>{
        const initial = name?.trim()?.[0]?.toUpperCase() || '?';
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `w-12 h-12 rounded-full ${bgColor} flex items-center justify-center text-xl font-bold ${textColor} flex-shrink-0`,
            children: initial
        }, void 0, false, {
            fileName: "[project]/Desktop/New folder/front-end/my-app/app/page.js",
            lineNumber: 65,
            columnNumber: 7
        }, this);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                ref: menuRef,
                className: "bg-emerald-700 text-white p-5 sticky top-0 z-50 shadow-lg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-7xl mx-auto flex justify-between items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-3xl font-bold flex items-center gap-3",
                                children: [
                                    "গ্রুপ ফান্ড ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-4xl",
                                        children: "💰"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/New folder/front-end/my-app/app/page.js",
                                        lineNumber: 84,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/New folder/front-end/my-app/app/page.js",
                                lineNumber: 83,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "hidden md:flex gap-8 text-lg",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "/",
                                        className: "hover:underline",
                                        children: "হোম"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/New folder/front-end/my-app/app/page.js",
                                        lineNumber: 89,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "/donor",
                                        className: "hover:underline",
                                        children: "দানকারী"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/New folder/front-end/my-app/app/page.js",
                                        lineNumber: 90,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "/receiver",
                                        className: "hover:underline",
                                        children: "গ্রহী"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/New folder/front-end/my-app/app/page.js",
                                        lineNumber: 91,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "/members",
                                        className: "hover:underline",
                                        children: "সদস্য"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/New folder/front-end/my-app/app/page.js",
                                        lineNumber: 92,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "/dashboard",
                                        className: "hover:underline",
                                        children: "ড্যাশবোর্ড"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/New folder/front-end/my-app/app/page.js",
                                        lineNumber: 93,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/New folder/front-end/my-app/app/page.js",
                                lineNumber: 88,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setMenuOpen(!menuOpen),
                                className: "md:hidden text-3xl",
                                children: menuOpen ? '✕' : '☰'
                            }, void 0, false, {
                                fileName: "[project]/Desktop/New folder/front-end/my-app/app/page.js",
                                lineNumber: 97,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/New folder/front-end/my-app/app/page.js",
                        lineNumber: 81,
                        columnNumber: 9
                    }, this),
                    menuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "md:hidden mt-4 flex flex-col gap-4 text-lg px-4 pb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "/",
                                onClick: ()=>setMenuOpen(false),
                                children: "হোম"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/New folder/front-end/my-app/app/page.js",
                                lineNumber: 108,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "/donor",
                                onClick: ()=>setMenuOpen(false),
                                children: "দানকারী"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/New folder/front-end/my-app/app/page.js",
                                lineNumber: 109,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "/receiver",
                                onClick: ()=>setMenuOpen(false),
                                children: "গ্রহী"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/New folder/front-end/my-app/app/page.js",
                                lineNumber: 110,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "/members",
                                onClick: ()=>setMenuOpen(false),
                                children: "সদস্য"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/New folder/front-end/my-app/app/page.js",
                                lineNumber: 111,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "/dashboard",
                                onClick: ()=>setMenuOpen(false),
                                children: "ড্যাশবোর্ড"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/New folder/front-end/my-app/app/page.js",
                                lineNumber: 112,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/New folder/front-end/my-app/app/page.js",
                        lineNumber: 107,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/New folder/front-end/my-app/app/page.js",
                lineNumber: 77,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-7xl mx-auto p-6 md:p-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-3xl shadow-2xl p-12 text-center mb-12",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xl opacity-90",
                                children: "মোট নেট ব্যালেন্স"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/New folder/front-end/my-app/app/page.js",
                                lineNumber: 120,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-7xl md:text-8xl font-extrabold mt-4",
                                children: [
                                    "৳ ",
                                    (netBalance ?? 0).toLocaleString('bn-BD')
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/New folder/front-end/my-app/app/page.js",
                                lineNumber: 121,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/New folder/front-end/my-app/app/page.js",
                        lineNumber: 119,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUp$3e$__["ArrowUp"], {}, void 0, false, {
                                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/page.js",
                                    lineNumber: 127,
                                    columnNumber: 27
                                }, void 0),
                                title: "মোট দান",
                                value: totalDonation,
                                color: "emerald"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/New folder/front-end/my-app/app/page.js",
                                lineNumber: 127,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown$3e$__["ArrowDown"], {}, void 0, false, {
                                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/page.js",
                                    lineNumber: 128,
                                    columnNumber: 27
                                }, void 0),
                                title: "মোট খরচ",
                                value: totalExpense,
                                color: "red"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/New folder/front-end/my-app/app/page.js",
                                lineNumber: 128,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gift$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Gift$3e$__["Gift"], {}, void 0, false, {
                                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/page.js",
                                    lineNumber: 129,
                                    columnNumber: 27
                                }, void 0),
                                title: "মোট লেনদেন",
                                value: safeTransactions.length,
                                color: "purple"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/New folder/front-end/my-app/app/page.js",
                                lineNumber: 129,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {}, void 0, false, {
                                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/page.js",
                                    lineNumber: 130,
                                    columnNumber: 27
                                }, void 0),
                                title: "মোট সদস্য",
                                value: (members || []).length,
                                color: "blue"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/New folder/front-end/my-app/app/page.js",
                                lineNumber: 130,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/New folder/front-end/my-app/app/page.js",
                        lineNumber: 126,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-4xl font-bold mb-8 text-gray-800",
                        children: "সাম্প্রতিক লেনদেন"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/New folder/front-end/my-app/app/page.js",
                        lineNumber: 133,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-3xl shadow-xl overflow-hidden mb-12",
                        children: recent.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-center py-16 text-gray-500 text-xl",
                            children: "কোনো লেনদেন হয়নি এখনো"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/New folder/front-end/my-app/app/page.js",
                            lineNumber: 137,
                            columnNumber: 13
                        }, this) : recent.map((t)=>{
                            const isDonation = t.type === 'donation';
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 border-b last:border-0 hover:bg-gray-50 transition",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-4 w-full sm:w-auto",
                                        children: isDonation ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                getInitialAvatar(t.donorName, 'bg-indigo-200', 'text-indigo-800'),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-semibold text-lg",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-indigo-700",
                                                                    children: t.donorName || 'অজ্ঞাত'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/page.js",
                                                                    lineNumber: 155,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-gray-500 mx-2",
                                                                    children: "→"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/page.js",
                                                                    lineNumber: 156,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-blue-700",
                                                                    children: t.receiverName || 'অজ্ঞাত'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/page.js",
                                                                    lineNumber: 157,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/New folder/front-end/my-app/app/page.js",
                                                            lineNumber: 154,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-gray-500 mt-1",
                                                            children: t.date ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(t.date), 'dd MMMM yyyy', {
                                                                locale: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$date$2d$fns$2f$locale$2f$bn$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
                                                            }) : 'তারিখ নেই'
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/New folder/front-end/my-app/app/page.js",
                                                            lineNumber: 159,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/page.js",
                                                    lineNumber: 153,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                getInitialAvatar(t.receiverName, 'bg-red-200', 'text-red-800'),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-semibold text-lg text-red-700",
                                                            children: [
                                                                "খরচ: ",
                                                                t.receiverName || 'অজ্ঞাত'
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/New folder/front-end/my-app/app/page.js",
                                                            lineNumber: 170,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-gray-500 mt-1",
                                                            children: t.date ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(t.date), 'dd MMMM yyyy', {
                                                                locale: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$date$2d$fns$2f$locale$2f$bn$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
                                                            }) : 'তারিখ নেই'
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/New folder/front-end/my-app/app/page.js",
                                                            lineNumber: 173,
                                                            columnNumber: 27
                                                        }, this),
                                                        t.note && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-gray-600 mt-1 italic",
                                                            children: t.note
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/New folder/front-end/my-app/app/page.js",
                                                            lineNumber: 179,
                                                            columnNumber: 29
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/page.js",
                                                    lineNumber: 169,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/New folder/front-end/my-app/app/page.js",
                                        lineNumber: 149,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: `font-bold text-xl whitespace-nowrap ${isDonation ? 'text-indigo-600' : 'text-red-600'}`,
                                        children: [
                                            isDonation ? '+' : '-',
                                            " ৳ ",
                                            (t.amount ?? 0).toLocaleString('bn-BD')
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/New folder/front-end/my-app/app/page.js",
                                        lineNumber: 188,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, t._id || t.id, true, {
                                fileName: "[project]/Desktop/New folder/front-end/my-app/app/page.js",
                                lineNumber: 145,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/Desktop/New folder/front-end/my-app/app/page.js",
                        lineNumber: 135,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-4xl font-bold mb-8 text-gray-800",
                        children: "শীর্ষ দানকারী"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/New folder/front-end/my-app/app/page.js",
                        lineNumber: 197,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12",
                        children: topDonors.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "col-span-full text-center py-16 text-gray-600 text-xl",
                            children: "এখনো কোনো দানকারী নেই।"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/New folder/front-end/my-app/app/page.js",
                            lineNumber: 201,
                            columnNumber: 13
                        }, this) : topDonors.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white rounded-3xl shadow-lg p-6 text-center",
                                children: [
                                    getInitialAvatar(m.name, 'bg-emerald-200', 'text-emerald-800'),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-xl font-bold mt-4",
                                        children: m.name
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/New folder/front-end/my-app/app/page.js",
                                        lineNumber: 208,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-emerald-600 mt-2",
                                        children: [
                                            "৳ ",
                                            (m.totalDonated || 0).toLocaleString('bn-BD')
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/New folder/front-end/my-app/app/page.js",
                                        lineNumber: 209,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, m.id, true, {
                                fileName: "[project]/Desktop/New folder/front-end/my-app/app/page.js",
                                lineNumber: 206,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/Desktop/New folder/front-end/my-app/app/page.js",
                        lineNumber: 199,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/New folder/front-end/my-app/app/page.js",
                lineNumber: 117,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/New folder/front-end/my-app/app/page.js",
        lineNumber: 74,
        columnNumber: 5
    }, this);
}
function StatCard({ icon, title, value, color }) {
    const colorMap = {
        emerald: 'bg-emerald-100 text-emerald-600',
        red: 'bg-red-100 text-red-600',
        purple: 'bg-purple-100 text-purple-600',
        blue: 'bg-blue-100 text-blue-600'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white p-6 rounded-2xl shadow-lg text-center border-t-4 border-gray-200",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center ${colorMap[color]}`,
                children: icon
            }, void 0, false, {
                fileName: "[project]/Desktop/New folder/front-end/my-app/app/page.js",
                lineNumber: 231,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-4xl font-bold text-gray-800",
                children: (value ?? 0).toLocaleString('bn-BD')
            }, void 0, false, {
                fileName: "[project]/Desktop/New folder/front-end/my-app/app/page.js",
                lineNumber: 235,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-gray-600 mt-2",
                children: title
            }, void 0, false, {
                fileName: "[project]/Desktop/New folder/front-end/my-app/app/page.js",
                lineNumber: 239,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/New folder/front-end/my-app/app/page.js",
        lineNumber: 230,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__2a58242c._.js.map