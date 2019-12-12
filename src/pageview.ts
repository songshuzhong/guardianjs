import {BaseClass} from "./base";

export class Pageview extends BaseClass {
    public device: Object;
    public uploadType: string;
    public monitorIp: string;
    public country: string;
    public province: string;
    public city: string;
    public loadType: string;
    public loadTime: string;
    public newStatus: string;

    constructor(option) {
        super();
        this.device = this.getDevice();
        this.uploadType = option.uploadType;
        this.monitorIp = option.ip;
        this.country = option.country || 'china';
        this.province = option.province;
        this.city = option.city;
        this.loadType = option.loadType;
        this.loadTime = option.loadTime;
        this.newStatus = option.newStatus;
    }
}