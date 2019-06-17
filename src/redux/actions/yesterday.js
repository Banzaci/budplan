export const SAVE = 'yesterday/SAVE';

export function saveAmount(amount) {
    return {
        type: SAVE,
        amount
    }
}

export function getAmount() {
    return {
        type: GET
    }
}