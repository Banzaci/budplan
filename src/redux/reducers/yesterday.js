export const GET = 'yesterday/GET';
export const SAVE = 'yesterday/SAVE';

export default function reducer(state = { amount: 0 }, { type, amount }) {
    switch ( type ) {
        case GET:
            return { ...state };
        case SAVE:
            return { ...state, amount };
        default:
            return state;
    }
}