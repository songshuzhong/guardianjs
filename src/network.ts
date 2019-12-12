import {BaseClass} from './base';

export class Network extends BaseClass {
    public uploadType: string;
    public httpUrl: string;
    public status: string;
    public statusText: string;
    public statusResult: string;
    public requestText: string;
    public responseText: string;
    public loadTime: string;

    constructor(info) {
        super();
        this.uploadType = info.uploadType;
        this.httpUrl = this.b64EncodeUnicode(info.url);
        this.status = info.status;
        this.statusText = info.statusText;
        this.statusResult = info.statusResult;
        this.requestText = '';
        this.responseText = this.b64EncodeUnicode(info.responseText);
        this.happenTime = info.currentTime;
        this.loadTime = info.loadTime;
    }
}