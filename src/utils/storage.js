import { AsyncStorage } from 'react-native';

const dbMocked = {}

const getDataByYr = async yr => await dbMocked[yr];
const saveDataByYr = ( currentYr, data, month ) => {
    dbMocked[currentYr] = { ...data, ...month }
    return dbMocked
};

export const save = async ({ currentYr, currentMonth, day, amount }) => {
  try {
    const data = await getDataByYr(currentYr) || {};
    const month = data[currentMonth] || {};
    const a = {
      
      [currentMonth]: {
        ...month,
        [day]: amount
      }
    };
    console.log(saveDataByYr(currentYr, data, a))
    return {};
  } catch (error) {
    console.log(error)
    return {
      data: [],
      error
    }
  }
}

export const get = async ({ currentYr, currentMonth, currentDay }) => {
  try {
    const data = await getDataByYr(currentYr);
    return {
      data: data ? data : [],
      ...{ currentYr, currentMonth, currentDay }
    };

  } catch (error) {
    return {
      data: [],
      error
    }
  }
}

//https://medium.com/@richardzhanguw/storing-and-retrieving-objects-using-asyncstorage-in-react-native-6bb1745fdcdd