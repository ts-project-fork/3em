(function(window) {

    const url = window.__bootstrap.url;
    const urlPattern = window.__bootstrap.urlPattern;
    const headers = window.__bootstrap.headers;
    const streams = window.__bootstrap.streams;
    const structuredClone = window.__bootstrap.structuredClone;

    window.ReadableStream = streams.ReadableStream;
    window.Headers = headers.Headers;
    window.URL = url.URL;
    window.URLPattern = urlPattern.URLPattern;
    window.URLSearchParams = url.URLSearchParams;
    window.structuredClone = structuredClone;

    const { subtle } = crypto;
    const fetchOp = window.__bootstrap.fetch;

    const props = {
        Request: fetchOp.Request,
        Response: fetchOp.Response,
        fetch: fetchOp.fetch
    }

    window.Request = props.Request;
    window.Response = props.Response;
    window.fetch = props.fetch;

    class BaseReqResponse {

        #encoder = new TextEncoder();
        #decoder = new TextDecoder();

        buffer = undefined;

        constructor(rep) {
            if(rep) {
                const { type, url, statusText, status, redirected, ok, headers } = rep;
                this.type = type;
                this.url = url;
                this.statusText = statusText;
                this.status = status;
                this.redirected = redirected;
                this.ok = ok;
                this.headers = headers;
            }
        }

        static from(obj) {
            const newBaseReq = new BaseReqResponse(undefined);

            const { type, url, statusText, status, redirected, ok, headers, vector } = obj;

            newBaseReq.type = type || '';
            newBaseReq.url = url || '';
            newBaseReq.statusText = statusText || '';
            newBaseReq.status = status || 404;
            newBaseReq.redirected = redirected || false;
            newBaseReq.ok = ok || false;
            newBaseReq.headers = headers || {};
            newBaseReq.buffer = vector || [];

            return newBaseReq;
        }

        setBuffer(buff) {
            if(!this.buffer) {
                this.buffer = Object.values(new Uint8Array(buff || []));
            } else {
                throw new Error("Buffer already set in Base Request Response");
            }
            return this;
        }

        asText() {
            return this.#decoder.decode(this.raw);
        }

        asJSON() {
            const text = this.asText();
            return JSON.parse(text);
        }

        toStructuredJson() {
            const { type, url, statusText, status, redirected, ok, headers } = this;

            let newHeaders = {};

            if(headers instanceof window.Headers) {
                newHeaders = Object.fromEntries(headers.entries())
            }

            return {
                type: type || "",
                url: url || "",
                statusText: statusText || "",
                status: status || 404,
                redirected: redirected || false,
                ok: ok || false,
                headers: newHeaders || {},
                vector: this.buffer || []
            }
        }

        get raw() {
            return new Uint8Array(this.buffer);
        }
    }

    window.BaseReqResponse = BaseReqResponse;

    class Base {

        requests = {};

        constructor() {
        }

        getDate() {
            return new Date(Number(Deno.core.opSync("op_get_executor_settings", "TX_DATE") || "1317830400000"));
        }

        async deterministicFetch(...args) {
            const jsonArgs = JSON.stringify(args);
            const reqHash = await this.sha256(new TextEncoder().encode(jsonArgs));
            const isLazyEvaluated = Deno.core.opSync("op_get_executor_settings", "LAZY_EVALUATION");

            if(isLazyEvaluated) {
                return BaseReqResponse.from(globalThis.exmContext.requests[reqHash]);
            } else {
                try {
                    if (this.requests[reqHash]) {
                        return Object.freeze(this.requests[reqHash])
                    } else {
                        const fetchData = await props.fetch(...args);
                        const buff = await fetchData.arrayBuffer();

                        let rep = new BaseReqResponse(fetchData);
                        rep = rep.setBuffer(buff);

                        this.requests[reqHash] = rep.toStructuredJson();

                        return rep;
                    }
                } catch (e) {
                    return e.toString()
                }
            }
        }

        async sha256(buffer) {
            return subtle.digest('SHA-256', buffer).then((hashBuffer) => {
                const hashArray = Array.from(new Uint8Array(hashBuffer));
                const hashHex = hashArray
                    .map((bytes) => bytes.toString(16).padStart(2, '0'))
                    .join('');
                return hashHex;
            });
        }

    }

    const ExmSymbol = Symbol('exm');
    const baseIns = Object.freeze(new Base());

    Object.defineProperty(window, "EXM", {
        get: () => {
            const isEXM = Deno.core.opSync("op_get_executor_settings", "EXM");
            if (!window[ExmSymbol]) {
                Object.defineProperty(window, ExmSymbol, {
                    value: isEXM ? baseIns : {
                        requests: {}
                    },
                    configurable: false,
                    writable: false,
                    enumerable: false
                });
            }
            return window[ExmSymbol];
        },
        enumerable: false,
        configurable: false
    });

    delete window.__bootstrap;
})(this);