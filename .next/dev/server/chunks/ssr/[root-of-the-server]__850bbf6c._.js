module.exports = [
"[project]/app/components/Countdown.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Countdown
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
;
;
function Countdown({ targetDateISO }) {
    const target = new Date(targetDateISO).getTime();
    const [now, setNow] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(Date.now());
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const t = setInterval(()=>setNow(Date.now()), 1000);
        return ()=>clearInterval(t);
    }, []);
    const diff = Math.max(0, target - now);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60) % 24);
    const minutes = Math.floor(diff / (1000 * 60) % 60);
    const seconds = Math.floor(diff / 1000 % 60);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-4 gap-3 text-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(TimeCard, {
                label: "Dias",
                value: days
            }, void 0, false, {
                fileName: "[project]/app/components/Countdown.js",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(TimeCard, {
                label: "Horas",
                value: hours
            }, void 0, false, {
                fileName: "[project]/app/components/Countdown.js",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(TimeCard, {
                label: "Min",
                value: minutes
            }, void 0, false, {
                fileName: "[project]/app/components/Countdown.js",
                lineNumber: 22,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(TimeCard, {
                label: "Seg",
                value: seconds
            }, void 0, false, {
                fileName: "[project]/app/components/Countdown.js",
                lineNumber: 23,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/Countdown.js",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
function TimeCard({ label, value }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "text-2xl font-semibold text-blue-900",
                children: String(value).padStart(2, '0')
            }, void 0, false, {
                fileName: "[project]/app/components/Countdown.js",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "text-xs text-blue-700",
                children: label
            }, void 0, false, {
                fileName: "[project]/app/components/Countdown.js",
                lineNumber: 32,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/Countdown.js",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/components/Map.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Map
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
;
function Map() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "rounded-3xl overflow-hidden shadow-lg border border-blue-100",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("iframe", {
            src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3308.516138988216!2d-35.75177920895556!3d-9.55114878934813!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7014804aee62703%3A0x9ba917b23592fdbb!2sIgreja%20Matriz%20de%20S%C3%A3o%20Vicente%20de%20Paulo!5e0!3m2!1spt-BR!2sbr!4v1762705070334!5m2!1spt-BR!2sbr",
            width: "100%",
            height: "450",
            style: {
                border: 0
            },
            allowFullScreen: "",
            loading: "lazy",
            referrerPolicy: "no-referrer-when-downgrade"
        }, void 0, false, {
            fileName: "[project]/app/components/Map.js",
            lineNumber: 4,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/Map.js",
        lineNumber: 3,
        columnNumber: 5
    }, this);
}
}),
"[externals]/framer-motion [external] (framer-motion, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("framer-motion");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/app/components/RsvpModal.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>RsvpModal
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/framer-motion [external] (framer-motion, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
function RsvpModal() {
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                onClick: ()=>setOpen(true),
                className: "bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-blue-700 transition",
                children: "Confirmar Presença 💙"
            }, void 0, false, {
                fileName: "[project]/app/components/RsvpModal.js",
                lineNumber: 10,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["AnimatePresence"], {
                children: open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].div, {
                    className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4",
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    exit: {
                        opacity: 0
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].div, {
                        className: "bg-white rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden",
                        initial: {
                            scale: 0.8,
                            opacity: 0
                        },
                        animate: {
                            scale: 1,
                            opacity: 1
                        },
                        exit: {
                            scale: 0.9,
                            opacity: 0
                        },
                        transition: {
                            duration: 0.3
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center bg-blue-600 text-white px-6 py-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                        className: "text-lg font-semibold",
                                        children: "Confirmação de Presença — Simone & Marcos"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/RsvpModal.js",
                                        lineNumber: 35,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setOpen(false),
                                        className: "text-white hover:text-blue-100 text-2xl leading-none",
                                        children: "✕"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/RsvpModal.js",
                                        lineNumber: 38,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/RsvpModal.js",
                                lineNumber: 34,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "p-4 md:p-6 bg-blue-50",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("iframe", {
                                    src: "https://docs.google.com/forms/d/e/1FAIpQLSf30AgFfRllEldH6xevlOpKXtNbL7PRwz7JtNSbWtA4j4EINA/viewform?embedded=true",
                                    width: "100%",
                                    height: "800",
                                    frameBorder: "0",
                                    marginHeight: "0",
                                    marginWidth: "0",
                                    className: "rounded-xl shadow-inner",
                                    children: "Carregando…"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/RsvpModal.js",
                                    lineNumber: 48,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/RsvpModal.js",
                                lineNumber: 47,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/RsvpModal.js",
                        lineNumber: 26,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/components/RsvpModal.js",
                    lineNumber: 20,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/RsvpModal.js",
                lineNumber: 18,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/pages/index.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/head.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Countdown$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/Countdown.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Map$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/Map.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$RsvpModal$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/RsvpModal.js [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$RsvpModal$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$RsvpModal$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
function Home() {
    const weddingISO = '2025-12-20T17:00:00-03:00';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "p-5 min-h-screen bg-gradient-to-b from-blue-50 to-white text-blue-900 flex flex-col font-[var(--font-poppins)]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("title", {
                        children: "Simone & Marcos — Nosso Casamento"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 12,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "description",
                        content: "Simone e Marcos - Casamento 20 de dezembro, Igreja Matriz São Vicente de Paulo, Maceió"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 13,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/index.js",
                lineNumber: 11,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("header", {
                className: "py-14 text-center bg-gradient-to-b from-blue-100 to-transparent",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                        className: "text-5xl md:text-6xl font-bold text-blue-800 font-[var(--font-great-vibes)] drop-shadow-sm",
                        children: "Simone & Marcos"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 21,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: "mt-4 text-blue-700 italic text-lg max-w-xl mx-auto",
                        children: "Nossa maior alegria é ter você celebrando esse momento tão especial conosco"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 24,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/index.js",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
                className: "flex-1 container mx-auto px-6 md:px-0 max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 mb-16",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                        className: "bg-white rounded-3xl shadow-md p-8 hover:shadow-xl transition duration-300",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                className: "text-2xl font-semibold text-blue-800 mb-4 flex items-center gap-2",
                                children: "💒 Cerimônia"
                            }, void 0, false, {
                                fileName: "[project]/pages/index.js",
                                lineNumber: 34,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                className: "text-blue-700 font-medium",
                                children: "Igreja Matriz São Vicente de Paulo"
                            }, void 0, false, {
                                fileName: "[project]/pages/index.js",
                                lineNumber: 37,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                className: "text-blue-700 mb-6",
                                children: "R. Quarenta e Nove, s/n - Cidade Universitária, Maceió - AL, 57073-000"
                            }, void 0, false, {
                                fileName: "[project]/pages/index.js",
                                lineNumber: 38,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "overflow-hidden rounded-2xl border border-blue-100 shadow-inner",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Map$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                    fileName: "[project]/pages/index.js",
                                    lineNumber: 42,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/pages/index.js",
                                lineNumber: 41,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 33,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                        className: "bg-gradient-to-br from-blue-100 via-white to-blue-50 rounded-3xl shadow-md p-8 flex flex-col justify-center items-center text-center hover:shadow-xl transition duration-300",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                className: "text-2xl font-semibold text-blue-900 mb-4",
                                children: "⏳ Contagem Regressiva"
                            }, void 0, false, {
                                fileName: "[project]/pages/index.js",
                                lineNumber: 48,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Countdown$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                targetDateISO: weddingISO
                            }, void 0, false, {
                                fileName: "[project]/pages/index.js",
                                lineNumber: 49,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                className: "mt-4 text-sm text-blue-700 italic",
                                children: [
                                    "Cerimônia: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                        children: "20 de dezembro de 2025 às 17:00"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.js",
                                        lineNumber: 51,
                                        columnNumber: 24
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/index.js",
                                lineNumber: 50,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 47,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                        className: "bg-white rounded-3xl shadow-md p-10 md:col-span-2 hover:shadow-xl transition duration-300 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                className: "text-2xl font-semibold text-blue-800 mb-6",
                                children: "🎁 Lista de Presentes"
                            }, void 0, false, {
                                fileName: "[project]/pages/index.js",
                                lineNumber: 57,
                                columnNumber: 3
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                className: "text-blue-700 mb-4",
                                children: "Caso queira nos presentear, criamos uma lista com itens úteis para nosso lar."
                            }, void 0, false, {
                                fileName: "[project]/pages/index.js",
                                lineNumber: 58,
                                columnNumber: 3
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "max-h-[420px] overflow-y-auto pr-3 mx-auto    scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-100 rounded-xl",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("ul", {
                                    className: "grid md:grid-cols-2 gap-5 text-left",
                                    children: [
                                        {
                                            name: "Abajur branco",
                                            img: "https://cdn-assets-legacy.casar.com/thumb/208x208x1/img/presentes/abajur-branco.jpg",
                                            desc: "Iluminação aconchegante para o quarto."
                                        },
                                        {
                                            name: "Aparelho de Jantar 42 peças",
                                            img: "https://cdn-assets-legacy.casar.com/thumb/208x208x1/img/presentes/aparelho-de-jantar-42-pecas.jpg",
                                            desc: "Para recebermos os amigos com estilo."
                                        },
                                        {
                                            name: "Aparelho de jantar em porcelana 30 peças",
                                            img: "https://cdn-assets-legacy.casar.com/thumb/208x208x1/img/presentes/aparelho-de-jantar-em-porcelana-30-pecas-2.jpg",
                                            desc: "Elegância nas refeições do dia a dia."
                                        },
                                        {
                                            name: "Ar Condicionado Split Inverter 12000 BTUs",
                                            img: "https://cdn-assets-legacy.casar.com/thumb/208x208x1/img/presentes/casamento/ar_condicionado_split.jpg",
                                            desc: "Conforto térmico o ano todo."
                                        },
                                        {
                                            name: "Aspirador de Pó Vertical Mondial",
                                            img: "https://cdn-assets-legacy.casar.com/thumb/208x208x1/img/presentes/shopping-extra/Aspirador_de_Po_Vertical_Mondial.jpeg",
                                            desc: "Praticidade na limpeza da casa."
                                        },
                                        {
                                            name: "Assadeira de bolo",
                                            img: "https://cdn-assets-legacy.casar.com/thumb/208x208x1/img/presentes/casa-completa-lua-de-mel/assadeiraseformasparaforno.jpg",
                                            desc: "Para nossos bolos caseiros."
                                        },
                                        {
                                            name: "Assadeira Retangular Alumínio Ecolon",
                                            img: "https://cdn-assets-legacy.casar.com/thumb/208x208x1/img/presentes/shopping-camicado/Assadeira_Retangular_Aluminio_Ecolon.jpg",
                                            desc: "Perfeita para assados deliciosos."
                                        },
                                        {
                                            name: "Batedeira preta",
                                            img: "https://cdn-assets-legacy.casar.com/thumb/208x208x1/img/presentes/batedeira-preta-inox-220v.jpg",
                                            desc: "Para receitas com muito carinho."
                                        },
                                        {
                                            name: "Cadeira de jantar",
                                            img: "https://cdn-assets-legacy.casar.com/thumb/208x208x1/img/presentes/casa-completa-lua-de-mel/cadeirajantar.jpg",
                                            desc: "Mais lugares para quem amamos."
                                        },
                                        {
                                            name: "Caixa de ferramentas",
                                            img: "https://cdn-assets-legacy.casar.com/thumb/208x208x1/img/presentes/casa-completa-lua-de-mel/caixadeferramentas.jpg",
                                            desc: "Para os consertos do lar."
                                        },
                                        {
                                            name: "Chaleira Elétrica",
                                            img: "https://cdn-assets-legacy.casar.com/thumb/208x208x1/img/presentes/cozinha_sofisticada/chaleiraelétrica.png",
                                            desc: "Chá e café rapidinho."
                                        },
                                        {
                                            name: "Churrasqueira elétrica",
                                            img: "https://cdn-assets-legacy.casar.com/thumb/208x208x1/img/presentes/churrasqueira-eletrica-inox.jpg",
                                            desc: "Churrasco em casa a qualquer hora."
                                        },
                                        {
                                            name: "Conjunto de 3 Facas em Cerâmica Kenya",
                                            img: "https://cdn-assets-legacy.casar.com/thumb/208x208x1/img/presentes/itens-para-casa-estilo-elegante/Conjuntode3Facas.png?v=3",
                                            desc: "Cortes precisos na cozinha."
                                        },
                                        {
                                            name: "Conjunto de Baixelas Tramontina",
                                            img: "https://cdn-assets-legacy.casar.com/thumb/208x208x1/img/presentes/shopping-extra/Conjunto_de_Baixelas_Tramontina.jpeg",
                                            desc: "Para servir com elegância."
                                        },
                                        {
                                            name: "Conjunto de Copos Long Drink Nadir",
                                            img: "https://cdn-assets-legacy.casar.com/thumb/208x208x1/img/presentes/shopping-extra/Conjunto_de_Copos_Long_Drink_Nadir.jpeg",
                                            desc: "Brindes com os amigos."
                                        },
                                        {
                                            name: "Conjunto de panelas",
                                            img: "https://cdn-assets-legacy.casar.com/thumb/208x208x1/img/presentes/conjunto-de-panela-ferro-fundido-2-pecas.jpg",
                                            desc: "Nosso dia a dia na cozinha."
                                        },
                                        {
                                            name: "Conjunto de potes para alimentos",
                                            img: "https://cdn-assets-legacy.casar.com/thumb/208x208x1/img/presentes/conjunto-de-potes-para-alimentos-6-pecas.jpg",
                                            desc: "Organização na despensa."
                                        },
                                        {
                                            name: "Conjunto de taças de vinho Mozart",
                                            img: "https://cdn-assets-legacy.casar.com/thumb/208x208x1/img/presentes/itens-para-casa-estilo-elegante/Conjuntodetacadevinho.png?v=3",
                                            desc: "Para brindar o amor."
                                        },
                                        {
                                            name: "Conjunto de Xícaras Germer Cottage",
                                            img: "https://cdn-assets-legacy.casar.com/thumb/208x208x1/img/presentes/shopping-extra/ConjuntodexicarasparaChaGermerCottage.jpeg",
                                            desc: "Café da manhã juntinhos."
                                        },
                                        {
                                            name: "Conjunto para Churrasco Tramontina",
                                            img: "https://cdn-assets-legacy.casar.com/thumb/208x208x1/img/presentes/shopping-extra/Conjunto_para_Churrasco_Tramontina.jpeg",
                                            desc: "Fins de semana deliciosos."
                                        },
                                        {
                                            name: "Cortador de pizza",
                                            img: "https://cdn-assets-legacy.casar.com/thumb/208x208x1/img/presentes/cortador-de-pizza.jpg",
                                            desc: "Noites de pizza em casa."
                                        },
                                        {
                                            name: "Ducha Lorenzetti Duo Shower Quadra",
                                            img: "https://cdn-assets-legacy.casar.com/thumb/208x208x1/img/presentes/shopping-extra/Ducha_Lorenzetti_Duo _hower_Quadra.jpeg",
                                            desc: "Banho quentinho e relaxante."
                                        },
                                        {
                                            name: "Faqueiro",
                                            img: "https://cdn-assets-legacy.casar.com/thumb/208x208x1/img/presentes/faqueiro-em-aco-inoxidavel-75-pecas.jpg",
                                            desc: "Mesa posta com carinho."
                                        },
                                        {
                                            name: "Ferro de passar",
                                            img: "https://cdn-assets-legacy.casar.com/thumb/208x208x1/img/presentes/ferro-de-passar-branco-a-vapor-127v.jpg",
                                            desc: "Roupas sempre impecáveis."
                                        },
                                        {
                                            name: "Forno de Micro-ondas Panasonic",
                                            img: "https://cdn-assets-legacy.casar.com/thumb/208x208x1/img/presentes/shopping-extra/Forno_de_Micro-ondas_Panasonic.jpeg",
                                            desc: "Praticidade no dia a dia."
                                        },
                                        {
                                            name: "Forno Elétrico Philco",
                                            img: "https://cdn-assets-legacy.casar.com/thumb/208x208x1/img/presentes/casa-indispensaveis/45.jpg",
                                            desc: "Assados perfeitos."
                                        },
                                        {
                                            name: "Geladeira Frost Free",
                                            img: "https://cdn-assets-legacy.casar.com/thumb/208x208x1/img/presentes/geladeira-frost-free-inox-352-litros.jpg",
                                            desc: "Nosso cantinho fresco."
                                        },
                                        {
                                            name: "Jogo de panelas",
                                            img: "https://cdn-assets-legacy.casar.com/thumb/208x208x1/img/presentes/cozinha_sofisticada/jogodepanelas.png",
                                            desc: "Cozinhar com amor."
                                        },
                                        {
                                            name: "Jogo Edredom Casal Cinza",
                                            img: "https://cdn-assets-legacy.casar.com/thumb/208x208x1/img/presentes/casamento/jogo_edredom_cinza.jpg",
                                            desc: "Noites quentinhas e abraçadas."
                                        },
                                        {
                                            name: "Jogo Toalha de Banho Azul",
                                            img: "https://cdn-assets-legacy.casar.com/thumb/208x208x1/img/presentes/casamento/jogo_toalha_banho_azul_4_pecas.jpg",
                                            desc: "Conforto após o banho."
                                        },
                                        {
                                            name: "Lavadora de roupas",
                                            img: "https://cdn-assets-legacy.casar.com/thumb/208x208x1/img/presentes/lavadora-de-roupas-branca-9kg.jpg",
                                            desc: "Facilidade nas tarefas do lar."
                                        },
                                        {
                                            name: "Mixer 3 em 1 Vermelho",
                                            img: "https://cdn-assets-legacy.casar.com/thumb/208x208x1/img/presentes/casamento/mixer-vermelho-com-utensilios.jpg",
                                            desc: "Receitas rápidas e práticas."
                                        },
                                        {
                                            name: "Mop",
                                            img: "https://cdn-assets-legacy.casar.com/thumb/208x208x1/img/presentes/casa-completa-lua-de-mel/mop.jpg",
                                            desc: "Casa sempre limpinha."
                                        },
                                        {
                                            name: "Panela de Pressão Rochedo Turbo",
                                            img: "https://cdn-assets-legacy.casar.com/thumb/208x208x1/img/presentes/casa-indispensaveis/18.jpg",
                                            desc: "Cozinha mais rápida."
                                        },
                                        {
                                            name: "Pipoqueira Elétrica sem Óleo",
                                            img: "https://cdn-assets-legacy.casar.com/thumb/208x208x1/img/presentes/casamento/pipoqueira_eletrica_sem_oleo.jpg",
                                            desc: "Noites de filme perfeitas."
                                        },
                                        {
                                            name: "Poltrona Boutique Conforto",
                                            img: "https://cdn-assets-legacy.casar.com/thumb/208x208x1/img/presentes/shopping-extra/Poltrona_Boutique_Conforto_Islandia.jpeg",
                                            desc: "Cantinho de leitura e descanso."
                                        },
                                        {
                                            name: "Porta retrato",
                                            img: "https://cdn-assets-legacy.casar.com/thumb/208x208x1/img/presentes/campo_porta_retrato.jpg",
                                            desc: "Para guardar nossas memórias."
                                        },
                                        {
                                            name: "Purificador de água",
                                            img: "https://cdn-assets-legacy.casar.com/thumb/208x208x1/img/presentes/casa-completa-lua-de-mel/purificador.jpg",
                                            desc: "Água pura todos os dias."
                                        },
                                        {
                                            name: "Rack EDN Vintage",
                                            img: "https://cdn-assets-legacy.casar.com/thumb/208x208x1/img/presentes/shopping-extra/Rack_EDN_Vintage.jpeg",
                                            desc: "Organização com estilo."
                                        },
                                        {
                                            name: "Robô Aspirador de Pó",
                                            img: "https://cdn-assets-legacy.casar.com/thumb/208x208x1/img/presentes/cozinha_sofisticada/robôaspiradordepó.png",
                                            desc: "Limpeza automática!"
                                        },
                                        {
                                            name: "Roupão para o casal",
                                            img: "https://cdn-assets-legacy.casar.com/thumb/208x208x1/img/presentes/roupao-para-o-casal-2-pecas.jpg",
                                            desc: "Conforto e carinho após o banho."
                                        },
                                        {
                                            name: "Sofá branco",
                                            img: "https://cdn-assets-legacy.casar.com/thumb/208x208x1/img/presentes/sofa-branco-2-lugares.jpg",
                                            desc: "Nosso cantinho de aconchego."
                                        },
                                        {
                                            name: "Suporte para Bolo",
                                            img: "https://cdn-assets-legacy.casar.com/thumb/208x208x1/img/presentes/casamento/suporte_para_bolo.jpg",
                                            desc: "Para bolos com muito amor."
                                        },
                                        {
                                            name: "Tábua para carnes",
                                            img: "https://cdn-assets-legacy.casar.com/thumb/208x208x1/img/presentes/tabua-para-carnes-madeira-macica.jpg",
                                            desc: "Churrasco perfeito."
                                        },
                                        {
                                            name: "Tapete palace retangular",
                                            img: "https://cdn-assets-legacy.casar.com/thumb/208x208x1/img/presentes/tapete-palace-retangular-200x250.jpg",
                                            desc: "Aconchego nos pés."
                                        },
                                        {
                                            name: "TV Ultra HD 42\"",
                                            img: "https://cdn-assets-legacy.casar.com/thumb/208x208x1/img/presentes/tv-ultra-hd-42-entrada-usb-conversor-digital.jpg",
                                            desc: "Séries e filmes juntinhos."
                                        },
                                        {
                                            name: "Tábua de Passar Utimil",
                                            img: "https://cdn-assets-legacy.casar.com/thumb/208x208x1/img/presentes/casa-indispensaveis/21.jpg",
                                            desc: "Tudo sempre bem passado."
                                        }
                                    ].map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                            className: "flex gap-4 bg-blue-50 p-3 rounded-xl shadow-sm hover:shadow-md transition",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                                    src: item.img,
                                                    alt: item.name,
                                                    className: "w-20 h-20 object-cover rounded-lg"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/index.js",
                                                    lineNumber: 119,
                                                    columnNumber: 11
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                            className: "font-semibold text-blue-900",
                                                            children: item.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/index.js",
                                                            lineNumber: 121,
                                                            columnNumber: 13
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                            className: "text-blue-700 text-sm",
                                                            children: item.desc
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/index.js",
                                                            lineNumber: 122,
                                                            columnNumber: 13
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/pages/index.js",
                                                    lineNumber: 120,
                                                    columnNumber: 11
                                                }, this)
                                            ]
                                        }, idx, true, {
                                            fileName: "[project]/pages/index.js",
                                            lineNumber: 118,
                                            columnNumber: 9
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/pages/index.js",
                                    lineNumber: 66,
                                    columnNumber: 5
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/pages/index.js",
                                lineNumber: 63,
                                columnNumber: 3
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                className: "text-blue-600 italic mt-6",
                                children: "Sua presença já é o maior presente, mas se quiser contribuir com algum item da lista, nosso cantinho vai agradecer (e nós também)! 💙"
                            }, void 0, false, {
                                fileName: "[project]/pages/index.js",
                                lineNumber: 130,
                                columnNumber: 3
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 56,
                        columnNumber: 1
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                        className: "md:col-span-2 flex flex-col items-center justify-center mt-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$RsvpModal$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                fileName: "[project]/pages/index.js",
                                lineNumber: 138,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                className: "mt-3 text-sm text-blue-700 text-center",
                                children: "Clique para confirmar presença — o formulário abrirá aqui mesmo 💙"
                            }, void 0, false, {
                                fileName: "[project]/pages/index.js",
                                lineNumber: 139,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 137,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/index.js",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("footer", {
                className: "text-center py-6 text-blue-600 text-sm bg-gradient-to-t from-blue-50 to-transparent",
                children: "Feito com ❤️ por Simone & Marcos"
            }, void 0, false, {
                fileName: "[project]/pages/index.js",
                lineNumber: 146,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/index.js",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__850bbf6c._.js.map