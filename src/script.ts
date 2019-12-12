import {BaseClass} from "./base";

export class Script extends BaseClass {
    public device: Object;
    public uploadType: string;
    public infoType: string;
    public col: string;
    public row: string;
    public msg: string;
    constructor(info) {
        super();
        this.device = this.getDevice();
        this.uploadType = info.uploadType;
        this.infoType = info.infoType;
        this.col = info.col;
        this.row = info.row;
        this.msg = info.msg;
    }
}