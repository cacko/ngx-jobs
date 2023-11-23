import { PositionEntity } from "../entity/icons.entity";
import { sha1 } from 'object-hash';



export class Position implements PositionEntity {

    x !: number;
    y !: number;
    id !: string;

    constructor(original: Object) {
        this.id = sha1(original);
        Object.assign(this, original);
    }


}