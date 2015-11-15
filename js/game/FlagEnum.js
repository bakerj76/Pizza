/**
 * Used to store flag information for an enum.
 */
export default class FlagEnum {
    /**
     * Creates a flag enum.
     * @param  {string} ...enums The values in this enum.
     */
    constructor(...enums) {
        this.value = 0;

        for (let i = 0; i < enums.length; i++) {
            this[enums[i]] = 1 << i;
        }
    }

    /**
     * Sets a flag to true.
     * @param {int} flag The flag to set.
     */
    setFlag(flag) {
        this.value |= flag;
    }

    /**
     * Unsets a flag, turning it false.
     * @param {int} flag The flag to unset.
     */
    unsetFlag(flag) {
        this.value &= ~flag;
    }

    /**
     * Gets a flag value.
     * @param  {int}  flag The flag to get.
     * @return {bool}      True if set, false if not set.
     */
    getFlag(flag) {
        return (this.value & flag) > 0;
    }

    /**
     * Gets the index in the enum of a flag.
     * @param  {int} flag The value of the flag.
     * @return {int}      The flag as an index (e.g. 4 = 1 << 2 -> 2).
     */
    static flagToIndex(flag) {
        return Math.floor(Math.log2(flag));
    }

    /**
     * Gets the flag of an enum index.
     * @param  {int} index The index for the flag.
     * @return {int}       The index as a flag (e.g. 2 -> 4 = 1 << 2).
     */
    static indexToFlag(index) {
        return 1 << index;
    }
}
