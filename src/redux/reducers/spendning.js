import { GET, SAVE } from '../actions/spendning';

const INITIAL_STATE = {
    currentMonth: {},
    amount: 0
}

export default function reducer(state = INITIAL_STATE, action) {
    switch ( action.type ) {
        case GET:
            return { ...state, currentMonth: action.currentMonth };
        case SAVE:
            return { ...state, amount: action.amount };
        default:
            return state;
    }
}