import { AsyncStorage } from 'react-native';
import mergeDeep from './deep-merge';

const getByIndex = (index, data) => {
  const result = data[index]
  if (!result) return {}
  return result;
}

const getByKey = async key => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : { [key]: {} }
  } catch (error) {
    return error;
  }
};

const saveByKey = async ( key, data ) => {
  try {
    return await AsyncStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    console.log(error)
    return error;
  }
};

export const saveTarget = async ({ amount, id, currentMonth }) => {
  try {
    const key = 'target';
    const index = currentMonth;
    const data = await getByKey(key);
    const indexData = getByIndex(index, data);
    const newIndexData = {
      ...indexData,
      [id]: amount
    }
    const newData =  { ...data, ...{
        [index]: newIndexData
      }
    };
    await saveByKey(key, newData);

    return {
      data: newIndexData
    };

  } catch (error) {
    console.error(error)
    return {
      target: [],
      error
    }
  }
}

export const saveSpending = async ({ currentYear, currentMonth, typeOfCost, amount, id, day }) => {
  try {
    const key = currentYear;
    const index = currentMonth;
    const source = { [currentYear]: { [currentMonth]: { [day]:{ [typeOfCost]:{ [id]: amount } } }}};
    const year = await getByKey(key);
    const newData = mergeDeep(year, source);
    await saveByKey(key, newData);
    return {
      success: true,
      month: newData[key][index]
    };
  } catch (error) {
    console.error(error)
    return {
      success: false,
      error
    }
  }
}

export const getSpending = async ({ currentYear, currentMonth }) => {
  try {
    const key = currentYear;
    const index = currentMonth;
    const year = await getByKey(key);
    const months = getByIndex(key, year);
    const month = getByIndex(index, months);
    console.log('storage', month)
    return {
      success: true,
      month
    };

  } catch (error) {
    console.error(error)
    return {
      data: [],
      error
    }
  }
}

export const getTarget = async currentMonth => {
  try {
    const key = 'target';
    const index = currentMonth;
    const data = await getByKey(key);
    const indexData = getByIndex(index, data);

    return {
      data: indexData
    };
  } catch (error) {
    console.error(error)
    return {
      target: [],
      error
    }
  }
}

const removeItemValue = async (key) => { //removeItemValue(key)
  try {
    await AsyncStorage.removeItem(key);
    return true;
  }
  catch(exception) {
    return false;
  }
}
