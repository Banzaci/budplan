import { currentDay, daysInMonth, getCurrentYearAndMonth } from '../../utils/dates'

export const SAVE = 'yesterday/SAVE';
export const GET = 'yesterday/GET';

const addZeroIfNeeded = day => {
    if (day > 0 && day < 10) return `0${day}`
    return day.toString();
}

const range = length => Array.from({ length }, (_, day) => addZeroIfNeeded(day + 1))

const dbMocked = 
{
    ['2019-06']: {
        ['01']: {
            amountSpent: 312,
            details: {
                food: 100,
                gas: 90,
                beer: 122,
            }
        },
        ['02']: {
            amountSpent: 800,
            details: {
                food: 100,
                beer: 700,
            }
        },
        ['04']: {
            amountSpent: 120,
        },
        ['14']: {
            amountSpent: 120,
        },
        ['22']: {
            amountSpent: 120,
        }
    }
}

const getData = month => dbMocked[month];

export function saveAmount({ day, amount }) {

    return {
        type: SAVE,
        amount
    }
}

export function getThisMonth() {
    const currentYearAndMonth = getCurrentYearAndMonth();
    const data = getData(currentYearAndMonth);
    const currentMonth = range(daysInMonth()).reduce((acc, current, index) => {
        const dayData = data[current];
        if (dayData) {
            return {...acc, ...{
                [current]: dayData
            }}
        }
        return {...acc, ...{
            [current]: {
                amountSpent: 0
            }
        }}
    }, []);

    return {
        currentDay: currentDay(),
        type: GET,
        currentMonth
    }
}
