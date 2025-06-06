import { isEqual } from 'lodash-es';
import { FilterItem } from './consts';

export type FilterResult = {
    isValid: boolean;
    missmatchedFilters: string[];
};

export function validateObjectAgainstFilters<T extends object>(obj: T, filters: FilterItem<T>[]): FilterResult {
    const missmatchedFilters: string[] = [];
    let isValid = true;
    for (const filter of filters) {
        const [key, value] = filter;

        // Check if the key exists in the object
        if (!Object.prototype.hasOwnProperty.call(obj, key)) {
            isValid = false;
            missmatchedFilters.push(`"${String(key)}" does not exist in the object`);
            continue;
        }

        // Check if the value matches
        const objValue = obj[key];
        if (Array.isArray(value)) {
            // If value is an array, check if any of the values match
            if (!value.some((v) => isEqual(objValue, v))) {
                isValid = false;
                missmatchedFilters.push(
                    `"${String(key)}" does not match any of the provided values: expected one of (${value.map((v) => `"${v}"`).join(', ')}), got "${objValue}"`,
                );
            }
        } else {
            // If value is a single value, check for equality
            if (!isEqual(objValue, value)) {
                isValid = false;
                missmatchedFilters.push(
                    `"${String(key)}" does not match the expected value: expected "${value}", got "${objValue}"`,
                );
            }
        }
    }
    return {
        isValid,
        missmatchedFilters,
    };
}
