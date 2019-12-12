export class BaseClass {
    public happenTime;
    public webMonitorId: string;
    public simpleUrl;
    public completeUrl;
    constructor() {
        this.happenTime = new Date().getTime();
        this.webMonitorId = 'haokan-next';
        this.simpleUrl = window.location.href.split('?')[0].replace('#', '');
        this.completeUrl = this.b64EncodeUnicode(window.location.href);
    }
    getDevice() {
        let device: any = {};
        let ua = navigator.userAgent;
        let android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
        let ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
        let ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
        let iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
        let mobileInfo = ua.match(/Android\s[\S\s]+Build\//);
        device.ios = device.android = device.iphone = device.ipad = device.androidChrome = false;
        device.isWeixin = /MicroMessenger/i.test(ua);
        device.os = "web";
        device.deviceName = "PC";
        // Android
        if (android) {
            device.os = 'android';
            device.osVersion = android[2];
            device.android = true;
            device.androidChrome = ua.toLowerCase().indexOf('chrome') >= 0;
        }
        if (ipad || iphone || ipod) {
            device.os = 'ios';
            device.ios = true;
        }
        // iOS
        if (iphone && !ipod) {
            device.osVersion = iphone[2].replace(/_/g, '.');
            device.iphone = true;
        }
        if (ipad) {
            device.osVersion = ipad[2].replace(/_/g, '.');
            device.ipad = true;
        }
        if (ipod) {
            device.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
            device.iphone = true;
        }
        // iOS 8+ changed UA
        if (device.ios && device.osVersion && ua.indexOf('Version/') >= 0) {
            if (device.osVersion.split('.')[0] === '10') {
                device.osVersion = ua.toLowerCase().split('version/')[1].split(' ')[0];
            }
        }

        // 如果是ios, deviceName 就设置为iphone，根据分辨率区别型号
        if (device.iphone) {
            device.deviceName = "iphone";
            let screenWidth = window.screen.width;
            let screenHeight = window.screen.height;
            if (screenWidth === 320 && screenHeight === 480) {
                device.deviceName = "iphone 4";
            } else if (screenWidth === 320 && screenHeight === 568) {
                device.deviceName = "iphone 5/SE";
            } else if (screenWidth === 375 && screenHeight === 667) {
                device.deviceName = "iphone 6/7/8";
            } else if (screenWidth === 414 && screenHeight === 736) {
                device.deviceName = "iphone 6/7/8 Plus";
            } else if (screenWidth === 375 && screenHeight === 812) {
                device.deviceName = "iphone X/S/Max";
            }
        } else if (device.ipad) {
            device.deviceName = "ipad";
        } else if (mobileInfo) {
            let info = mobileInfo[0];
            let deviceName = info.split(';')[1].replace(/Build\//g, "");
            device.deviceName = deviceName.replace(/(^\s*)|(\s*$)/g, "");
        }
        // 浏览器模式, 获取浏览器信息
        // TODO 需要补充更多的浏览器类型进来
        if (ua.indexOf("Mobile") == -1) {
            let agent = navigator.userAgent.toLowerCase() ;
            let regStr_ie = /msie [\d.]+;/gi ;
            let regStr_ff = /firefox\/[\d.]+/gi
            let regStr_chrome = /chrome\/[\d.]+/gi ;
            let regStr_saf = /safari\/[\d.]+/gi ;

            device.browserName = '未知';
            //IE
            if(agent.indexOf("msie") > 0) {
                let browserInfo = agent.match(regStr_ie)[0];
                device.browserName = browserInfo.split('/')[0];
                device.browserVersion = browserInfo.split('/')[1];
            }
            //firefox
            if(agent.indexOf("firefox") > 0) {
                let browserInfo = agent.match(regStr_ff)[0];
                device.browserName = browserInfo.split('/')[0];
                device.browserVersion = browserInfo.split('/')[1];
            }
            //Safari
            if(agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0) {
                let browserInfo = agent.match(regStr_saf)[0];
                device.browserName = browserInfo.split('/')[0];
                device.browserVersion = browserInfo.split('/')[1];
            }
            //Chrome
            if(agent.indexOf("chrome") > 0) {
                let browserInfo = agent.match(regStr_chrome)[0];
                device.browserName = browserInfo.split('/')[0];
                device.browserVersion = browserInfo.split('/')[1];
            }
        }
        // Webview
        device.webView = (iphone || ipad || ipod) && ua.match(/.*AppleWebKit(?!.*Safari)/i);

        return device;
    }
    setLocalStorage(type, storage) {
        let monitor = sessionStorage.getItem('monitor');
        monitor = JSON.parse(monitor);
        switch (type) {
            case 'ele-behavior':
                monitor['ele_behavior'] = storage;
                break;
            case 'network':
                monitor['network'].push(storage);
                break;
            case 'script':
                monitor['script'].push(storage);
                break;
            case 'customer-pv':
                monitor['customer_pv'] = storage;
                break;
            case 'performance':
                monitor['performance'] = storage;
                break;
            case 'resource':
                monitor['resource'].push(storage);
                break;
            case 'customer-behavior':
                monitor['customer_behavior'] = storage;
                break;
            default: break;
        }
        monitor = JSON.stringify(monitor);
        sessionStorage.setItem('monitor', monitor);
    }
    b64EncodeUnicode(url) {
        try {
            return btoa(
                encodeURIComponent(url)
                    .replace(/%([0-9A-f]{2})/g, ({}, p1) =>
                        String.fromCharCode(+'0x' + p1)
                    ));
        } catch (e) {
            return url;
        }
    }
}