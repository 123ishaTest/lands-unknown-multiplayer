import {AddFacilityInjection} from "common/tools/injections/AddFacilityInjection";

/**
 * Permanently adds a facility to a location
 */
export class PermanentlyAddFacilityInjection extends AddFacilityInjection {
    /**
     * Override eject so it's never removed
     */
    eject(): void {
        // Empty
    }
}
