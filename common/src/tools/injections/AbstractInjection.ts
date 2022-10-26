import {IgtFeatures} from "common/features/IgtFeatures";

export abstract class AbstractInjection {
    abstract inject(features: IgtFeatures): void;

    abstract eject(features: IgtFeatures): void;
}
