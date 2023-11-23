import { PositionEntity } from "../entity/icons.entity";
import { SHA1 } from 'crypto-js';



export class Position implements PositionEntity {

    x !: number;
    y !: number;
    id !: string;

    constructor(original: PositionEntity) {
        this.id = SHA1(`${original.x}_${original.y}`).toString();
        Object.assign(this, original);
    }


}