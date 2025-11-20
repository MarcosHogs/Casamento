(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[turbopack]/browser/dev/hmr-client/hmr-client.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference path="../../../shared/runtime-types.d.ts" />
/// <reference path="../../runtime/base/dev-globals.d.ts" />
/// <reference path="../../runtime/base/dev-protocol.d.ts" />
/// <reference path="../../runtime/base/dev-extensions.ts" />
__turbopack_context__.s([
    "connect",
    ()=>connect,
    "setHooks",
    ()=>setHooks,
    "subscribeToUpdate",
    ()=>subscribeToUpdate
]);
function connect({ addMessageListener, sendMessage, onUpdateError = console.error }) {
    addMessageListener((msg)=>{
        switch(msg.type){
            case 'turbopack-connected':
                handleSocketConnected(sendMessage);
                break;
            default:
                try {
                    if (Array.isArray(msg.data)) {
                        for(let i = 0; i < msg.data.length; i++){
                            handleSocketMessage(msg.data[i]);
                        }
                    } else {
                        handleSocketMessage(msg.data);
                    }
                    applyAggregatedUpdates();
                } catch (e) {
                    console.warn('[Fast Refresh] performing full reload\n\n' + "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" + 'You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n' + 'Consider migrating the non-React component export to a separate file and importing it into both files.\n\n' + 'It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n' + 'Fast Refresh requires at least one parent function component in your React tree.');
                    onUpdateError(e);
                    location.reload();
                }
                break;
        }
    });
    const queued = globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS;
    if (queued != null && !Array.isArray(queued)) {
        throw new Error('A separate HMR handler was already registered');
    }
    globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS = {
        push: ([chunkPath, callback])=>{
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    };
    if (Array.isArray(queued)) {
        for (const [chunkPath, callback] of queued){
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    }
}
const updateCallbackSets = new Map();
function sendJSON(sendMessage, message) {
    sendMessage(JSON.stringify(message));
}
function resourceKey(resource) {
    return JSON.stringify({
        path: resource.path,
        headers: resource.headers || null
    });
}
function subscribeToUpdates(sendMessage, resource) {
    sendJSON(sendMessage, {
        type: 'turbopack-subscribe',
        ...resource
    });
    return ()=>{
        sendJSON(sendMessage, {
            type: 'turbopack-unsubscribe',
            ...resource
        });
    };
}
function handleSocketConnected(sendMessage) {
    for (const key of updateCallbackSets.keys()){
        subscribeToUpdates(sendMessage, JSON.parse(key));
    }
}
// we aggregate all pending updates until the issues are resolved
const chunkListsWithPendingUpdates = new Map();
function aggregateUpdates(msg) {
    const key = resourceKey(msg.resource);
    let aggregated = chunkListsWithPendingUpdates.get(key);
    if (aggregated) {
        aggregated.instruction = mergeChunkListUpdates(aggregated.instruction, msg.instruction);
    } else {
        chunkListsWithPendingUpdates.set(key, msg);
    }
}
function applyAggregatedUpdates() {
    if (chunkListsWithPendingUpdates.size === 0) return;
    hooks.beforeRefresh();
    for (const msg of chunkListsWithPendingUpdates.values()){
        triggerUpdate(msg);
    }
    chunkListsWithPendingUpdates.clear();
    finalizeUpdate();
}
function mergeChunkListUpdates(updateA, updateB) {
    let chunks;
    if (updateA.chunks != null) {
        if (updateB.chunks == null) {
            chunks = updateA.chunks;
        } else {
            chunks = mergeChunkListChunks(updateA.chunks, updateB.chunks);
        }
    } else if (updateB.chunks != null) {
        chunks = updateB.chunks;
    }
    let merged;
    if (updateA.merged != null) {
        if (updateB.merged == null) {
            merged = updateA.merged;
        } else {
            // Since `merged` is an array of updates, we need to merge them all into
            // one, consistent update.
            // Since there can only be `EcmascriptMergeUpdates` in the array, there is
            // no need to key on the `type` field.
            let update = updateA.merged[0];
            for(let i = 1; i < updateA.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateA.merged[i]);
            }
            for(let i = 0; i < updateB.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateB.merged[i]);
            }
            merged = [
                update
            ];
        }
    } else if (updateB.merged != null) {
        merged = updateB.merged;
    }
    return {
        type: 'ChunkListUpdate',
        chunks,
        merged
    };
}
function mergeChunkListChunks(chunksA, chunksB) {
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    return chunks;
}
function mergeChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted' || updateA.type === 'deleted' && updateB.type === 'added') {
        return undefined;
    }
    if (updateA.type === 'partial') {
        invariant(updateA.instruction, 'Partial updates are unsupported');
    }
    if (updateB.type === 'partial') {
        invariant(updateB.instruction, 'Partial updates are unsupported');
    }
    return undefined;
}
function mergeChunkListEcmascriptMergedUpdates(mergedA, mergedB) {
    const entries = mergeEcmascriptChunkEntries(mergedA.entries, mergedB.entries);
    const chunks = mergeEcmascriptChunksUpdates(mergedA.chunks, mergedB.chunks);
    return {
        type: 'EcmascriptMergedUpdate',
        entries,
        chunks
    };
}
function mergeEcmascriptChunkEntries(entriesA, entriesB) {
    return {
        ...entriesA,
        ...entriesB
    };
}
function mergeEcmascriptChunksUpdates(chunksA, chunksB) {
    if (chunksA == null) {
        return chunksB;
    }
    if (chunksB == null) {
        return chunksA;
    }
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeEcmascriptChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    if (Object.keys(chunks).length === 0) {
        return undefined;
    }
    return chunks;
}
function mergeEcmascriptChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted') {
        // These two completely cancel each other out.
        return undefined;
    }
    if (updateA.type === 'deleted' && updateB.type === 'added') {
        const added = [];
        const deleted = [];
        const deletedModules = new Set(updateA.modules ?? []);
        const addedModules = new Set(updateB.modules ?? []);
        for (const moduleId of addedModules){
            if (!deletedModules.has(moduleId)) {
                added.push(moduleId);
            }
        }
        for (const moduleId of deletedModules){
            if (!addedModules.has(moduleId)) {
                deleted.push(moduleId);
            }
        }
        if (added.length === 0 && deleted.length === 0) {
            return undefined;
        }
        return {
            type: 'partial',
            added,
            deleted
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'partial') {
        const added = new Set([
            ...updateA.added ?? [],
            ...updateB.added ?? []
        ]);
        const deleted = new Set([
            ...updateA.deleted ?? [],
            ...updateB.deleted ?? []
        ]);
        if (updateB.added != null) {
            for (const moduleId of updateB.added){
                deleted.delete(moduleId);
            }
        }
        if (updateB.deleted != null) {
            for (const moduleId of updateB.deleted){
                added.delete(moduleId);
            }
        }
        return {
            type: 'partial',
            added: [
                ...added
            ],
            deleted: [
                ...deleted
            ]
        };
    }
    if (updateA.type === 'added' && updateB.type === 'partial') {
        const modules = new Set([
            ...updateA.modules ?? [],
            ...updateB.added ?? []
        ]);
        for (const moduleId of updateB.deleted ?? []){
            modules.delete(moduleId);
        }
        return {
            type: 'added',
            modules: [
                ...modules
            ]
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'deleted') {
        // We could eagerly return `updateB` here, but this would potentially be
        // incorrect if `updateA` has added modules.
        const modules = new Set(updateB.modules ?? []);
        if (updateA.added != null) {
            for (const moduleId of updateA.added){
                modules.delete(moduleId);
            }
        }
        return {
            type: 'deleted',
            modules: [
                ...modules
            ]
        };
    }
    // Any other update combination is invalid.
    return undefined;
}
function invariant(_, message) {
    throw new Error(`Invariant: ${message}`);
}
const CRITICAL = [
    'bug',
    'error',
    'fatal'
];
function compareByList(list, a, b) {
    const aI = list.indexOf(a) + 1 || list.length;
    const bI = list.indexOf(b) + 1 || list.length;
    return aI - bI;
}
const chunksWithIssues = new Map();
function emitIssues() {
    const issues = [];
    const deduplicationSet = new Set();
    for (const [_, chunkIssues] of chunksWithIssues){
        for (const chunkIssue of chunkIssues){
            if (deduplicationSet.has(chunkIssue.formatted)) continue;
            issues.push(chunkIssue);
            deduplicationSet.add(chunkIssue.formatted);
        }
    }
    sortIssues(issues);
    hooks.issues(issues);
}
function handleIssues(msg) {
    const key = resourceKey(msg.resource);
    let hasCriticalIssues = false;
    for (const issue of msg.issues){
        if (CRITICAL.includes(issue.severity)) {
            hasCriticalIssues = true;
        }
    }
    if (msg.issues.length > 0) {
        chunksWithIssues.set(key, msg.issues);
    } else if (chunksWithIssues.has(key)) {
        chunksWithIssues.delete(key);
    }
    emitIssues();
    return hasCriticalIssues;
}
const SEVERITY_ORDER = [
    'bug',
    'fatal',
    'error',
    'warning',
    'info',
    'log'
];
const CATEGORY_ORDER = [
    'parse',
    'resolve',
    'code generation',
    'rendering',
    'typescript',
    'other'
];
function sortIssues(issues) {
    issues.sort((a, b)=>{
        const first = compareByList(SEVERITY_ORDER, a.severity, b.severity);
        if (first !== 0) return first;
        return compareByList(CATEGORY_ORDER, a.category, b.category);
    });
}
const hooks = {
    beforeRefresh: ()=>{},
    refresh: ()=>{},
    buildOk: ()=>{},
    issues: (_issues)=>{}
};
function setHooks(newHooks) {
    Object.assign(hooks, newHooks);
}
function handleSocketMessage(msg) {
    sortIssues(msg.issues);
    handleIssues(msg);
    switch(msg.type){
        case 'issues':
            break;
        case 'partial':
            // aggregate updates
            aggregateUpdates(msg);
            break;
        default:
            // run single update
            const runHooks = chunkListsWithPendingUpdates.size === 0;
            if (runHooks) hooks.beforeRefresh();
            triggerUpdate(msg);
            if (runHooks) finalizeUpdate();
            break;
    }
}
function finalizeUpdate() {
    hooks.refresh();
    hooks.buildOk();
    // This is used by the Next.js integration test suite to notify it when HMR
    // updates have been completed.
    // TODO: Only run this in test environments (gate by `process.env.__NEXT_TEST_MODE`)
    if (globalThis.__NEXT_HMR_CB) {
        globalThis.__NEXT_HMR_CB();
        globalThis.__NEXT_HMR_CB = null;
    }
}
function subscribeToChunkUpdate(chunkListPath, sendMessage, callback) {
    return subscribeToUpdate({
        path: chunkListPath
    }, sendMessage, callback);
}
function subscribeToUpdate(resource, sendMessage, callback) {
    const key = resourceKey(resource);
    let callbackSet;
    const existingCallbackSet = updateCallbackSets.get(key);
    if (!existingCallbackSet) {
        callbackSet = {
            callbacks: new Set([
                callback
            ]),
            unsubscribe: subscribeToUpdates(sendMessage, resource)
        };
        updateCallbackSets.set(key, callbackSet);
    } else {
        existingCallbackSet.callbacks.add(callback);
        callbackSet = existingCallbackSet;
    }
    return ()=>{
        callbackSet.callbacks.delete(callback);
        if (callbackSet.callbacks.size === 0) {
            callbackSet.unsubscribe();
            updateCallbackSets.delete(key);
        }
    };
}
function triggerUpdate(msg) {
    const key = resourceKey(msg.resource);
    const callbackSet = updateCallbackSets.get(key);
    if (!callbackSet) {
        return;
    }
    for (const callback of callbackSet.callbacks){
        callback(msg);
    }
    if (msg.type === 'notFound') {
        // This indicates that the resource which we subscribed to either does not exist or
        // has been deleted. In either case, we should clear all update callbacks, so if a
        // new subscription is created for the same resource, it will send a new "subscribe"
        // message to the server.
        // No need to send an "unsubscribe" message to the server, it will have already
        // dropped the update stream before sending the "notFound" message.
        updateCallbackSets.delete(key);
    }
}
}),
"[project]/app/components/Countdown.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Countdown
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
function Countdown({ targetDateISO }) {
    _s();
    const target = new Date(targetDateISO).getTime();
    const [now, setNow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(Date.now());
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Countdown.useEffect": ()=>{
            const t = setInterval({
                "Countdown.useEffect.t": ()=>setNow(Date.now())
            }["Countdown.useEffect.t"], 1000);
            return ({
                "Countdown.useEffect": ()=>clearInterval(t)
            })["Countdown.useEffect"];
        }
    }["Countdown.useEffect"], []);
    const diff = Math.max(0, target - now);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60) % 24);
    const minutes = Math.floor(diff / (1000 * 60) % 60);
    const seconds = Math.floor(diff / 1000 % 60);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-4 gap-3 text-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TimeCard, {
                label: "Dias",
                value: days
            }, void 0, false, {
                fileName: "[project]/app/components/Countdown.js",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TimeCard, {
                label: "Horas",
                value: hours
            }, void 0, false, {
                fileName: "[project]/app/components/Countdown.js",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TimeCard, {
                label: "Min",
                value: minutes
            }, void 0, false, {
                fileName: "[project]/app/components/Countdown.js",
                lineNumber: 22,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TimeCard, {
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
_s(Countdown, "qIstTaHXAspKZoclBFL0Q8ycoIo=");
_c = Countdown;
function TimeCard({ label, value }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-2xl font-semibold text-blue-900",
                children: String(value).padStart(2, '0')
            }, void 0, false, {
                fileName: "[project]/app/components/Countdown.js",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
_c1 = TimeCard;
var _c, _c1;
__turbopack_context__.k.register(_c, "Countdown");
__turbopack_context__.k.register(_c1, "TimeCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/Map.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Map
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
;
function Map() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-3xl overflow-hidden shadow-lg border border-blue-100",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
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
_c = Map;
var _c;
__turbopack_context__.k.register(_c, "Map");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/RsvpModal.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RsvpModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
function RsvpModal() {
    _s();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setOpen(true),
                className: "bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-blue-700 transition",
                children: "Confirmar Presença 💙"
            }, void 0, false, {
                fileName: "[project]/app/components/RsvpModal.js",
                lineNumber: 10,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["motion"].div, {
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
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["motion"].div, {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center bg-blue-600 text-white px-6 py-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-lg font-semibold",
                                        children: "Confirmação de Presença — Simone & Marcos"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/RsvpModal.js",
                                        lineNumber: 35,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 md:p-6 bg-blue-50",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
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
_s(RsvpModal, "xG1TONbKtDWtdOTrXaTAsNhPg/Q=");
_c = RsvpModal;
var _c;
__turbopack_context__.k.register(_c, "RsvpModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/pages/index.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/head.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Countdown$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/Countdown.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Map$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/Map.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$RsvpModal$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/RsvpModal.js [client] (ecmascript)");
;
;
;
;
;
function Home() {
    const weddingISO = '2025-12-20T17:00:00-03:00';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-5 min-h-screen bg-gradient-to-b from-blue-50 to-white text-blue-900 flex flex-col font-[var(--font-poppins)]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("title", {
                        children: "Simone & Marcos — Nosso Casamento"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 12,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "py-14 text-center bg-gradient-to-b from-blue-100 to-transparent",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-5xl md:text-6xl font-bold text-blue-800 font-[var(--font-great-vibes)] drop-shadow-sm",
                        children: "Simone & Marcos"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 21,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "flex-1 container mx-auto px-6 md:px-0 max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 mb-16",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "bg-white rounded-3xl shadow-md p-8 hover:shadow-xl transition duration-300",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-2xl font-semibold text-blue-800 mb-4 flex items-center gap-2",
                                children: "💒 Cerimônia"
                            }, void 0, false, {
                                fileName: "[project]/pages/index.js",
                                lineNumber: 34,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-blue-700 font-medium",
                                children: "Igreja Matriz São Vicente de Paulo"
                            }, void 0, false, {
                                fileName: "[project]/pages/index.js",
                                lineNumber: 37,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-blue-700 mb-6",
                                children: "R. Quarenta e Nove, s/n - Cidade Universitária, Maceió - AL, 57073-000"
                            }, void 0, false, {
                                fileName: "[project]/pages/index.js",
                                lineNumber: 38,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "overflow-hidden rounded-2xl border border-blue-100 shadow-inner",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Map$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "bg-gradient-to-br from-blue-100 via-white to-blue-50 rounded-3xl shadow-md p-8 flex flex-col justify-center items-center text-center hover:shadow-xl transition duration-300",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-2xl font-semibold text-blue-900 mb-4",
                                children: "⏳ Contagem Regressiva"
                            }, void 0, false, {
                                fileName: "[project]/pages/index.js",
                                lineNumber: 48,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Countdown$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                targetDateISO: weddingISO
                            }, void 0, false, {
                                fileName: "[project]/pages/index.js",
                                lineNumber: 49,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-4 text-sm text-blue-700 italic",
                                children: [
                                    "Cerimônia: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "bg-white rounded-3xl shadow-md p-10 md:col-span-2 hover:shadow-xl transition duration-300 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-2xl font-semibold text-blue-800 mb-6",
                                children: "🎁 Lista de Presentes"
                            }, void 0, false, {
                                fileName: "[project]/pages/index.js",
                                lineNumber: 57,
                                columnNumber: 3
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-blue-700 mb-4",
                                children: "Caso queira nos presentear, criamos uma lista com itens úteis para nosso lar."
                            }, void 0, false, {
                                fileName: "[project]/pages/index.js",
                                lineNumber: 58,
                                columnNumber: 3
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "max-h-[420px] overflow-y-auto pr-3 mx-auto    scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-100 rounded-xl",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
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
                                    ].map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "flex gap-4 bg-blue-50 p-3 rounded-xl shadow-sm hover:shadow-md transition",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: item.img,
                                                    alt: item.name,
                                                    className: "w-20 h-20 object-cover rounded-lg"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/index.js",
                                                    lineNumber: 119,
                                                    columnNumber: 11
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-semibold text-blue-900",
                                                            children: item.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/index.js",
                                                            lineNumber: 121,
                                                            columnNumber: 13
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "md:col-span-2 flex flex-col items-center justify-center mt-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$RsvpModal$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                fileName: "[project]/pages/index.js",
                                lineNumber: 138,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
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
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/pages/index.js [client] (ecmascript)\" } [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const PAGE_PATH = "/";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/pages/index.js [client] (ecmascript)");
    }
]);
// @ts-expect-error module.hot exists
if (module.hot) {
    // @ts-expect-error module.hot exists
    module.hot.dispose(function() {
        window.__NEXT_P.push([
            PAGE_PATH
        ]);
    });
}
}),
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/pages/index\" }", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/pages/index.js [client] (ecmascript)\" } [client] (ecmascript)");
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__8e52ab21._.js.map