import {BaseClass} from './base';

export class Resource extends BaseClass {
    public uploadType: string;
    public tag: string;
    public url: string;
    public msg: string;

    constructor(info) {
        super();
        this.uploadType = info.uploadType;
        this.tag = info.tag;
        this.url = this.b64EncodeUnicode(info.url);
        this.msg = this.b64EncodeUnicode(info.url) + 'is load error.'
    }
}