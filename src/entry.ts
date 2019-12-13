import {BaseClass} from './base';

export class Entry extends BaseClass {
    public name;
    public duration: string;
    public size: string;
    public uploadType: string;

    constructor(info) {
        super();
        this.uploadType = info.uploadType;
        this.name = info.name;
        this.duration = info.duration;
        this.size = info.size;
    }
}