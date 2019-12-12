import {BaseClass} from "./base";

export class Behavior extends BaseClass {
    public uploadType: string;
    public behaviorType: string;
    public tagName: string;
    public className: string;
    public placeholder: string;
    public inputValue: string;
    public innerText: string;

    constructor(option) {
        super();
        this.uploadType = option.uploadType;
        this.behaviorType = option.behaviorType;
        this.tagName = option.tagName;
        this.className = this.b64EncodeUnicode(option.className);
        this.placeholder = this.b64EncodeUnicode(option.placeholder);
        this.inputValue = this.b64EncodeUnicode(option.inputValue);
        this.innerText = this.b64EncodeUnicode(option.innerText);
    }
}