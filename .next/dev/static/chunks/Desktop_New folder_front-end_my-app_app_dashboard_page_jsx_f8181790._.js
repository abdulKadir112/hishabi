(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Dashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/New folder/front-end/my-app/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/New folder/front-end/my-app/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/New folder/front-end/my-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/New folder/front-end/my-app/node_modules/next/image.js [app-client] (ecmascript)");
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
const API_BASE = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_URL || (("TURBOPACK compile-time value", "object") !== 'undefined' && window.location.hostname === 'localhost' ? 'http://localhost:5000' : 'https://hishabi-api.vercel.app');
function Dashboard() {
    _s();
    const [isLogged, setIsLogged] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [pass, setPass] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [donation, setDonation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        donorName: '',
        donorPhone: '',
        donorAddress: '',
        donorImageFile: null,
        receiverName: '',
        receiverPhone: '',
        receiverAddress: '',
        receiverImageFile: null,
        amount: '',
        reason: ''
    });
    const [expense, setExpense] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        receiverName: '',
        receiverPhone: '',
        receiverAddress: '',
        receiverImageFile: null,
        amount: '',
        reason: ''
    });
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleLogin = ()=>{
        if (pass === 'admin123') {
            setIsLogged(true);
            setPass('');
        } else {
            alert('ভুল পাসওয়ার্ড!');
        }
    };
    const handleImageChange = (e, field, formType = 'donation')=>{
        const file = e.target.files?.[0];
        if (!file) return;
        if (formType === 'donation') {
            if (field === 'donor') {
                setDonation((prev)=>({
                        ...prev,
                        donorImageFile: file
                    }));
            } else {
                setDonation((prev)=>({
                        ...prev,
                        receiverImageFile: file
                    }));
            }
        } else {
            setExpense((prev)=>({
                    ...prev,
                    receiverImageFile: file
                }));
        }
    };
    const handleAddDonation = async ()=>{
        if (!donation.amount || Number(donation.amount) <= 0) {
            return alert('টাকার পরিমাণ দিন');
        }
        if (!donation.donorName.trim()) {
            return alert('দাতার নাম দিন');
        }
        if (!donation.receiverName.trim()) {
            return alert('গ্রহীতার নাম দিন');
        }
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('type', 'donation');
            formData.append('amount', donation.amount);
            formData.append('note', donation.reason.trim() || '');
            formData.append('donorName', donation.donorName.trim());
            formData.append('donorPhone', donation.donorPhone.trim() || '');
            formData.append('donorAddress', donation.donorAddress.trim() || '');
            if (donation.donorImageFile) {
                formData.append('donorImage', donation.donorImageFile);
            }
            formData.append('receiverName', donation.receiverName.trim());
            formData.append('receiverPhone', donation.receiverPhone.trim() || '');
            formData.append('receiverAddress', donation.receiverAddress.trim() || '');
            if (donation.receiverImageFile) {
                formData.append('receiverImage', donation.receiverImageFile);
            }
            console.log('Sending donation to:', `${API_BASE}/hishab`);
            const res = await fetch(`${API_BASE}/hishab`, {
                method: 'POST',
                body: formData
            });
            const result = await res.json();
            console.log('Response status:', res.status);
            console.log('Response data:', result);
            if (!res.ok) {
                throw new Error(result.error || result.message || `সার্ভার এরর: ${res.status}`);
            }
            if (!result.success) {
                throw new Error(result.message || 'ডাটা সেভ হয়নি');
            }
            alert('দান সফলভাবে যোগ হয়েছে!');
            setDonation({
                donorName: '',
                donorPhone: '',
                donorAddress: '',
                donorImageFile: null,
                receiverName: '',
                receiverPhone: '',
                receiverAddress: '',
                receiverImageFile: null,
                amount: '',
                reason: ''
            });
        } catch (err) {
            console.error('Donation error:', err);
            alert('দান যোগ করতে ব্যর্থ: ' + (err.message || 'অজানা সমস্যা'));
        } finally{
            setLoading(false);
        }
    };
    const handleAddExpense = async ()=>{
        if (!expense.amount || Number(expense.amount) <= 0) {
            return alert('টাকার পরিমাণ দিন');
        }
        if (!expense.receiverName.trim()) {
            return alert('গ্রহীতার নাম দিন');
        }
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('type', 'expense');
            formData.append('amount', expense.amount);
            formData.append('note', expense.reason.trim() || '');
            formData.append('receiverName', expense.receiverName.trim());
            formData.append('receiverPhone', expense.receiverPhone.trim() || '');
            formData.append('receiverAddress', expense.receiverAddress.trim() || '');
            if (expense.receiverImageFile) {
                formData.append('receiverImage', expense.receiverImageFile);
            }
            console.log('Sending expense to:', `${API_BASE}/hishab`);
            const res = await fetch(`${API_BASE}/hishab`, {
                method: 'POST',
                body: formData
            });
            const result = await res.json();
            console.log('Response status:', res.status);
            console.log('Response data:', result);
            if (!res.ok) {
                throw new Error(result.error || result.message || `সার্ভার এরর: ${res.status}`);
            }
            if (!result.success) {
                throw new Error(result.message || 'ডাটা সেভ হয়নি');
            }
            alert('খরচ সফলভাবে রেকর্ড হয়েছে!');
            setExpense({
                receiverName: '',
                receiverPhone: '',
                receiverAddress: '',
                receiverImageFile: null,
                amount: '',
                reason: ''
            });
        } catch (err) {
            console.error('Expense error:', err);
            alert('খরচ যোগ করতে ব্যর্থ: ' + (err.message || 'অজানা সমস্যা'));
        } finally{
            setLoading(false);
        }
    };
    // লগইন ফর্ম (অপরিবর্তিত)
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
                        lineNumber: 191,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "password",
                        placeholder: "পাসওয়ার্ড",
                        value: pass,
                        onChange: (e)=>setPass(e.target.value),
                        className: "bg-white/20 border border-white/30 p-4 rounded-xl w-full text-xl mb-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                        lineNumber: 192,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleLogin,
                        className: "bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-4 rounded-xl text-xl w-full transition shadow-lg",
                        children: "লগইন"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                        lineNumber: 199,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-gray-300 mt-4",
                        children: "demo password: admin123"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                        lineNumber: 205,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                lineNumber: 190,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
            lineNumber: 189,
            columnNumber: 7
        }, this);
    }
    // ড্যাশবোর্ড (অপরিবর্তিত লেআউট + উন্নত ফাংশন)
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
                            className: "flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-medium transition shadow-md",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                    size: 24
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                                    lineNumber: 218,
                                    columnNumber: 15
                                }, this),
                                "হোমে ফিরে যান"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                            lineNumber: 217,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                        lineNumber: 216,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                    lineNumber: 215,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-5xl md:text-6xl font-extrabold mb-12 text-emerald-800 text-center",
                    children: "অ্যাডমিন ড্যাশবোর্ড"
                }, void 0, false, {
                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                    lineNumber: 224,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white p-8 rounded-3xl shadow-2xl border border-purple-100",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-3xl font-bold mb-8 text-purple-800 flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gift$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gift$3e$__["Gift"], {
                                            size: 32,
                                            className: "text-purple-600"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                                            lineNumber: 232,
                                            columnNumber: 15
                                        }, this),
                                        " নতুন দান রেকর্ড"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                                    lineNumber: 231,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 md:grid-cols-2 gap-8",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-5 bg-purple-50/70 p-6 rounded-2xl border border-purple-200",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-2xl font-semibold text-purple-900",
                                                    children: "দাতা"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                                                    lineNumber: 238,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    placeholder: "দাতার পুরো নাম",
                                                    value: donation.donorName,
                                                    onChange: (e)=>setDonation({
                                                            ...donation,
                                                            donorName: e.target.value
                                                        }),
                                                    className: "w-full p-4 rounded-xl border border-purple-300 bg-white text-gray-900 placeholder-purple-400/60 focus:border-purple-500 focus:ring-2 focus:ring-purple-400/50 outline-none transition-all duration-200"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                                                    lineNumber: 239,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    placeholder: "ফোন নম্বর",
                                                    value: donation.donorPhone,
                                                    onChange: (e)=>setDonation({
                                                            ...donation,
                                                            donorPhone: e.target.value
                                                        }),
                                                    className: "w-full p-4 rounded-xl border border-purple-300 bg-white text-gray-900 placeholder-purple-400/60 focus:border-purple-500 focus:ring-2 focus:ring-purple-400/50 outline-none transition-all duration-200"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                                                    lineNumber: 245,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    placeholder: "ঠিকানা",
                                                    value: donation.donorAddress,
                                                    onChange: (e)=>setDonation({
                                                            ...donation,
                                                            donorAddress: e.target.value
                                                        }),
                                                    className: "w-full p-4 rounded-xl border border-purple-300 bg-white text-gray-900 placeholder-purple-400/60 focus:border-purple-500 focus:ring-2 focus:ring-purple-400/50 outline-none transition-all duration-200"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                                                    lineNumber: 251,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "block text-sm font-medium text-purple-700 mb-2",
                                                            children: "দাতার ছবি"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                                                            lineNumber: 258,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "file",
                                                            accept: "image/*",
                                                            onChange: (e)=>handleImageChange(e, 'donor', 'donation'),
                                                            className: "w-full p-3 rounded-xl border border-purple-300 bg-white text-gray-800 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200 cursor-pointer transition"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                                                            lineNumber: 259,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                                                    lineNumber: 257,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                                            lineNumber: 237,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-5 bg-blue-50/70 p-6 rounded-2xl border border-blue-200",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-2xl font-semibold text-blue-900",
                                                    children: "গ্রহীতা"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                                                    lineNumber: 270,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    placeholder: "গ্রহীতার পুরো নাম",
                                                    value: donation.receiverName,
                                                    onChange: (e)=>setDonation({
                                                            ...donation,
                                                            receiverName: e.target.value
                                                        }),
                                                    className: "w-full p-4 rounded-xl border border-blue-300 bg-white text-gray-900 placeholder-blue-400/60 focus:border-blue-500 focus:ring-2 focus:ring-blue-400/50 outline-none transition-all duration-200"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                                                    lineNumber: 271,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    placeholder: "ফোন নম্বর",
                                                    value: donation.receiverPhone,
                                                    onChange: (e)=>setDonation({
                                                            ...donation,
                                                            receiverPhone: e.target.value
                                                        }),
                                                    className: "w-full p-4 rounded-xl border border-blue-300 bg-white text-gray-900 placeholder-blue-400/60 focus:border-blue-500 focus:ring-2 focus:ring-blue-400/50 outline-none transition-all duration-200"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                                                    lineNumber: 277,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    placeholder: "ঠিকানা",
                                                    value: donation.receiverAddress,
                                                    onChange: (e)=>setDonation({
                                                            ...donation,
                                                            receiverAddress: e.target.value
                                                        }),
                                                    className: "w-full p-4 rounded-xl border border-blue-300 bg-white text-gray-900 placeholder-blue-400/60 focus:border-blue-500 focus:ring-2 focus:ring-blue-400/50 outline-none transition-all duration-200"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                                                    lineNumber: 283,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "block text-sm font-medium text-blue-700 mb-2",
                                                            children: "গ্রহীতার ছবি"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                                                            lineNumber: 290,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "file",
                                                            accept: "image/*",
                                                            onChange: (e)=>handleImageChange(e, 'receiver', 'donation'),
                                                            className: "w-full p-3 rounded-xl border border-blue-300 bg-white text-gray-800 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 cursor-pointer transition"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                                                            lineNumber: 291,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                                                    lineNumber: 289,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                                            lineNumber: 269,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                                    lineNumber: 235,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-10 space-y-5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                                            fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                                            lineNumber: 302,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            placeholder: "কেন / কার জন্য দান করা হলো",
                                            value: donation.reason,
                                            onChange: (e)=>setDonation({
                                                    ...donation,
                                                    reason: e.target.value
                                                }),
                                            className: "w-full p-5 rounded-xl border border-indigo-300 bg-white text-gray-900 placeholder-indigo-400/60 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400/50 outline-none transition-all duration-200"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                                            lineNumber: 310,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleAddDonation,
                                            disabled: loading,
                                            className: "w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-5 rounded-xl font-bold text-xl transition shadow-lg flex items-center justify-center gap-3 disabled:opacity-60",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gift$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gift$3e$__["Gift"], {
                                                    size: 28
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                                                    lineNumber: 322,
                                                    columnNumber: 17
                                                }, this),
                                                loading ? 'যোগ হচ্ছে...' : 'দান রেকর্ড করুন'
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                                            lineNumber: 317,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                                    lineNumber: 301,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                            lineNumber: 230,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white p-8 rounded-3xl shadow-2xl border border-red-100",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-3xl font-bold mb-8 text-red-800 flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown$3e$__["ArrowDown"], {
                                            size: 32,
                                            className: "text-red-600"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                                            lineNumber: 331,
                                            columnNumber: 15
                                        }, this),
                                        " নতুন খরচ রেকর্ড"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                                    lineNumber: 330,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-red-50/70 p-6 rounded-2xl border border-red-200",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-2xl font-semibold text-red-900 mb-5",
                                                    children: "গ্রহীতা (যাকে টাকা দেওয়া হলো)"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                                                    lineNumber: 336,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            placeholder: "নাম",
                                                            value: expense.receiverName,
                                                            onChange: (e)=>setExpense({
                                                                    ...expense,
                                                                    receiverName: e.target.value
                                                                }),
                                                            className: "w-full p-4 rounded-xl border border-red-300 bg-white text-gray-900 placeholder-red-400/60 focus:border-red-500 focus:ring-2 focus:ring-red-400/50 outline-none transition-all duration-200"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                                                            lineNumber: 340,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            placeholder: "ফোন নম্বর",
                                                            value: expense.receiverPhone,
                                                            onChange: (e)=>setExpense({
                                                                    ...expense,
                                                                    receiverPhone: e.target.value
                                                                }),
                                                            className: "w-full p-4 rounded-xl border border-red-300 bg-white text-gray-900 placeholder-red-400/60 focus:border-red-500 focus:ring-2 focus:ring-red-400/50 outline-none transition-all duration-200"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                                                            lineNumber: 346,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            placeholder: "ঠিকানা",
                                                            value: expense.receiverAddress,
                                                            onChange: (e)=>setExpense({
                                                                    ...expense,
                                                                    receiverAddress: e.target.value
                                                                }),
                                                            className: "w-full p-4 rounded-xl border border-red-300 bg-white text-gray-900 placeholder-red-400/60 focus:border-red-500 focus:ring-2 focus:ring-red-400/50 outline-none transition-all duration-200"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                                                            lineNumber: 352,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                                                    lineNumber: 339,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "block text-sm font-medium text-red-700 mb-2",
                                                            children: "ছবি (ঐচ্ছিক)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                                                            lineNumber: 361,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "file",
                                                            accept: "image/*",
                                                            onChange: (e)=>handleImageChange(e, 'receiver', 'expense'),
                                                            className: "w-full p-3 rounded-xl border border-red-300 bg-white text-gray-800 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-100 file:text-red-700 hover:file:bg-red-200 cursor-pointer transition"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                                                            lineNumber: 362,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                                                    lineNumber: 360,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                                            lineNumber: 335,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                                            fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                                            lineNumber: 371,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            placeholder: "কারণ / বিবরণ (যেমন: চিকিৎসা, শিক্ষা ইত্যাদি)",
                                            value: expense.reason,
                                            onChange: (e)=>setExpense({
                                                    ...expense,
                                                    reason: e.target.value
                                                }),
                                            className: "w-full p-5 rounded-xl border border-rose-300 bg-white text-gray-900 placeholder-rose-400/60 focus:border-rose-500 focus:ring-2 focus:ring-rose-400/50 outline-none transition-all duration-200"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                                            lineNumber: 379,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleAddExpense,
                                            disabled: loading,
                                            className: "w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white py-5 rounded-xl font-bold text-xl transition shadow-lg flex items-center justify-center gap-3 disabled:opacity-60",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$New__folder$2f$front$2d$end$2f$my$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown$3e$__["ArrowDown"], {
                                                    size: 28
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                                                    lineNumber: 391,
                                                    columnNumber: 17
                                                }, this),
                                                loading ? 'যোগ হচ্ছে...' : 'খরচ রেকর্ড করুন'
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                                            lineNumber: 386,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                                    lineNumber: 334,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                            lineNumber: 329,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
                    lineNumber: 228,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
            lineNumber: 214,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/New folder/front-end/my-app/app/dashboard/page.jsx",
        lineNumber: 213,
        columnNumber: 5
    }, this);
}
_s(Dashboard, "z2FnBjmi85taZJvXpx4cc+3G6Bg=");
_c = Dashboard;
var _c;
__turbopack_context__.k.register(_c, "Dashboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Desktop_New%20folder_front-end_my-app_app_dashboard_page_jsx_f8181790._.js.map