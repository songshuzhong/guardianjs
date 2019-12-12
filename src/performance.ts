import {BaseClass} from './base';

export class Performance extends BaseClass {
    public  redirect: string;
    public whiteScreen: number;
    public dom: string;
    public load: number;
    public unload: number;
    public request: number;
    public loadPage: number;
    public domReady: boolean;
    public lookupDomain: string;
    public ttfb: string;
    public loadEvent: string;
    public appcache: string;
    public unloadEvent: string;
    public connect: string;
    public xmlhttprequest: Array<Object>;
    public css: Array<Object>;
    public other: Array<Object>;
    public script: Array<Object>;
    public img: Array<Object>;
    public link: Array<Object>;
    public fetch: Array<Object>;
    constructor(page) {
        super();
        this.redirect = page.redirect;
        this.whiteScreen = page.whiteScreen;
        this.dom = page.dom;
        this.load = page.load;
        this.unload = page.unload;
        this.request = page.request;
        this.loadPage = page.loadPage;
        this.domReady = page.domReady;
        this.lookupDomain = page.lookupDomain;
        this.ttfb = page.ttfb;
        this.loadEvent = page.loadEvent;
        this.appcache = page.appcache;
        this.unloadEvent = page.unloadEvent;
        this.connect = page.connect;
        this.xmlhttprequest = page.xmlhttprequest;
        this.css = page.css;
        this.other = page.other;
        this.script = page.script;
        this.img = page.img;
        this.link = page.link;
        this.fetch = page.fetch;
    }
}
