/**
 * Implementation of AbstractExpLevel that takes a function to calculate exp needed for each level.
 */
import {AbstractExpLevel} from "common/tools/exp-level/AbstractExpLevel";

export class FunctionExpLevel extends AbstractExpLevel {
    levelFunc: (arg1: number) => number;

    constructor(maxLevel: number, levelFunc: (arg1: number) => number, baseExp: number = 0) {
        super(maxLevel, baseExp);
        this.levelFunc = levelFunc;
    }

    getExpNeededForLevel(level: number): number {
        if (level > this.maxLevel) {
            return Infinity
        }
        return this.levelFunc(level);
    }

}
