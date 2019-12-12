import {Performance} from "./performance";
import {Resource} from "./Resource";
import {Network} from "./network";
import {Script} from "./script";

export class Guardian {
    public url: string;
    public basename: string;
    public cache: Array<string>;
    constructor(option) {
        this.url = option.url;
        this.basename = option.basename;
        this.cache = [];
        sessionStorage.setItem('monitor', JSON.stringify({
            performance: {},
            resource: [],
            network: [],
            script: []
        }));
        this.onInit();
    }
    setFetch() {
        if (!window.fetch) return;
        const _fetch = fetch;
        window.fetch = function () {
            return _fetch.apply(this, arguments)
                .then(res => {
                    if (!res.ok) {
                        const info = {
                            infoType: 'fetch',
                            uploadType: 'fetch',
                            simpleUrl: res.url,
                            status: res.status,
                            statusText: res.statusText,
                            happenTime: new Date().getTime()
                        };
                        const network = new Network(info);
                        network.setLocalStorage('network', network);
                    }
                    return res;
                })
                .catch(err => {
                    throw err;
                });
        }
    }
    getFetch(method = 'post', successCallback?, failCallback?) {
        // @ts-ignore
        const xmlHttp = (window as any).XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        xmlHttp.open(method, this.url, true);
        xmlHttp.setRequestHeader('Content-Type', 'application/json');
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                const res = JSON.parse(xmlHttp.responseText);
                typeof successCallback === 'function' && successCallback(res);
            } else {
                typeof failCallback === 'function' && failCallback();
            }
        };
        const monitor = sessionStorage.getItem('monitor');
        xmlHttp.send(monitor);
    }
    getPerformance() {
        if (!window.performance) return;
        const t = window.performance.timing;
        const resource = this.getResources();
        return {
            ...resource,
            redirect: t.redirectEnd - t.redirectStart,            // 重定向耗时
            whiteScreen: t.responseStart - t.navigationStart,            // 白屏时间
            dom: t.domComplete - t.domLoading,            // DOM 渲染耗时
            load: t.loadEventEnd - t.navigationStart,            // 页面加载耗时
            unload: t.unloadEventEnd - t.unloadEventStart,            // 页面卸载耗时
            request: t.responseEnd - t.requestStart,            // 请求耗时
            loadPage: t.loadEventEnd - t.navigationStart, // 获取性能信息时当前时间
            domReady: t.domComplete - t.responseEnd,//【重要】解析 DOM 树结构的时间 【原因】反省下你的 DOM 树嵌套是不是太多了！
            lookupDomain: t.domainLookupEnd - t.domainLookupStart,//【重要】DNS 查询时间 【原因】DNS 预加载做了么？页面内是不是使用了太多不同的域名导致域名查询的时间太长
            ttfb: t.responseStart - t.navigationStart,//【重要】读取页面第一个字节的时间 【原因】这可以理解为用户拿到你的资源占用的时间，加异地机房了么，加CDN 处理了么？加带宽了么？加 CPU 运算速度了么？
            loadEvent: t.loadEventEnd - t.loadEventStart,//【重要】执行 onload 回调函数的时间 【原因】是否太多不必要的操作都放到 onload 回调函数里执行了，考虑过延迟加载、按需加载的策略么？
            appcache: t.domainLookupStart - t.fetchStart,            // DNS 缓存时间
            unloadEvent: t.unloadEventEnd - t.unloadEventStart,            // 卸载页面的时间
            connect: t.connectEnd - t.connectStart            // TCP 建立连接完成握手的时间
        }
    }
    getResources() {
        if (!window.performance) return;
        let type = '';
        const data = window.performance.getEntriesByType('resource');
        const resource = {
            xmlhttprequest: [],
            css: [],
            other: [],
            script: [],
            img: [],
            link: [],
            fetch: []
        };

        data.forEach((item: any) => {
            if (item.name.endsWith('.js')) {
                type = 'script';
            } else if (item.name.endsWith('.css')) {
                type = 'css';
            } else {
                type = item.initiatorType;
            }
            const arry = resource[type];
            arry && arry.push({
                name: item.name,
                duration: item.duration.toFixed(2),
                size: item.transferSize,
                protocol: item.nextHopProtocol,
            })
        });

        return resource;
    }
    onInit() {
        window.onload = () => this.onLoad();
    }
    onLoad() {
        this.setFetch();
        this.onResourceReport();
        this.onScriptReport();
        this.onAjaxReport();
        if ((window as any).requestIdleCallback) {
            (window as any).requestIdleCallback(() => {
                setTimeout(() => {
                    this.onPerformanceReport();
                    this.getFetch();
                }, 100)
            })
        } else {
            setTimeout(() => {
                this.onPerformanceReport();
                this.getFetch();
            }, 1000)
        }
    }
    onError(msg, url, row, col, error) {
        const info = {
            row,
            col,
            url,
            infoType: 'javascript',
            uploadType: 'javascript',
            msg: error && error.stack ? error.stack : msg
        };
        const script = new Script(info);
        script.setLocalStorage('script', script);
    }
    onPerformanceReport() {
        const performance = new Performance(this.getPerformance());
        performance.setLocalStorage('performance', performance);
    }
    onResourceReport() {
        window.addEventListener('error', e => {
            const target: any = e.target;
            if (target !== window && !this.cache.includes(target.src)) {
                const {localName, src, href} = target;
                const info = {
                    uploadType: 'resource',
                    tag: localName,
                    url: src || href,
                    msg: (src || href) + '  is load error'
                };
                const resource = new Resource(info);
                resource.setLocalStorage('resource', resource);
                this.cache.push(src);
            }
        }, true);
    }
    onScriptReport() {
        window.onerror = (msg, url, row, col, error) => this.onError(msg, url, row, col, error);
        window.addEventListener('unhandledrejection', (e: any) => {
            const info = {
                infoType: 'promise',
                uploadType: 'javascript',
                msg: (e.reason && e.reason.msg) || e.reason || ''
            };
            const script = new Script(info);
            script.setLocalStorage('script', script);
        });
    }
    onAjaxReport() {
        const timeRecordArray = [];
        const oldXHR = (window as any).XMLHttpRequest;
        function ajaxEventTrigger(e) {
            const ajaxEvent = new CustomEvent(e, {detail: this});
            window.dispatchEvent(ajaxEvent);
        }
        function newXHR() {
            const realXHR = new oldXHR();
            realXHR.addEventListener('abort', function() {
                ajaxEventTrigger.call(this, 'ajaxAbort');
            }, false);
            realXHR.addEventListener('error', function() {
                ajaxEventTrigger.call(this, 'ajaxError');
            }, false);
            realXHR.addEventListener('load', function() {
                ajaxEventTrigger.call(this, 'ajaxLoad');
            }, false);
            realXHR.addEventListener('loadstart', function() {
                ajaxEventTrigger.call(this, 'ajaxLoadStart');
            }, false);
            realXHR.addEventListener('progress', function() {
                ajaxEventTrigger.call(this, 'ajaxProgress');
            }, false);
            realXHR.addEventListener('timeout', function() {
                ajaxEventTrigger.call(this, 'ajaxTimeout');
            }, false);
            realXHR.addEventListener('loadend', function() {
                ajaxEventTrigger.call(this, 'ajaxLoadEnd');
            }, false);
            realXHR.addEventListener('readystatechange', function() {
                ajaxEventTrigger.call(this, 'ajaxReadyStateChange');
            }, false);
            return realXHR;
        }
        function handleHttpResult(i, tempResponseText) {
            if (!timeRecordArray[i] || timeRecordArray[i].uploadFlag) return;
            let responseText = '';
            if (tempResponseText && responseText.length < 300) {
                try {
                    responseText = tempResponseText? JSON.stringify(JSON.parse(tempResponseText)): '';
                } catch (e) {
                    responseText = '';
                }
            } else {
                responseText = 'data is too long.';
            }
            const simpleUrl = timeRecordArray[i].simpleUrl;
            const currentTime = new Date().getTime();
            const url = timeRecordArray[i].event.detail.responseURL;
            const status = timeRecordArray[i].event.detail.status;
            const statusText = timeRecordArray[i].event.detail.statusText;
            const loadTime = timeRecordArray[i].timeStamp;
            if (!url || url.indexOf(this.url) !== -1) return;
            const httpStart = new Network({uploadType: 'network', simpleUrl, url, status, statusText, statusResult: '发起请求', responseText: '', currentTime: loadTime, loadTime: 0});
            const httpEnd = new Network({uploadType: 'network', simpleUrl, url, status, statusText, statusResult: '请求返回', responseText, currentTime, loadTime});
            httpStart.setLocalStorage('network', httpStart);
            httpEnd.setLocalStorage('network', httpEnd);
            timeRecordArray[i].uploadFlag = true;
        }
        (window as any).XMLHttpRequest = newXHR;
        window.addEventListener('ajaxLoadStart', function(e) {
            const tempObj = {
                timeStamp: new Date().getTime(),
                event: e,
                simpleUrl: window.location.href.split('?')[0].replace('#', ''),
                uploadFlag: false
            };
            timeRecordArray.push(tempObj);
        });
        window.addEventListener('ajaxLoadEnd', function () {
            for (let i = 0; i < timeRecordArray.length; i++) {
                if (timeRecordArray[i].uploadFlag) continue;
                if (timeRecordArray[i].event.detail.status > 0) {
                    const rType = (timeRecordArray[i].event.detail.responseType + '').toLowerCase();
                    if (rType === 'blob') {
                        (function(i){
                            const reader = new FileReader();
                            reader.onload = function() {
                                const responseText = reader.result;
                                handleHttpResult(i, responseText);
                            };
                            try {
                                reader.readAsText(timeRecordArray[i].event.detail.response, 'utf-8');
                            } catch (e) {
                                handleHttpResult(i, timeRecordArray[i].event.detail.response);
                            }
                        })(i);
                    } else {
                        const responseText = timeRecordArray[i].event.detail.responseText;
                        handleHttpResult(i, responseText);
                    }
                }
            }
        })
    }
}