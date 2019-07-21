import { AsyncStorage } from 'react-native';
import mergeDeep from './deep-merge';

const generateKey = value => value.replace(/\s/g, '')

const objectBuilder = input => {
  const [namespace, value] = input.split(':');
  const arr = namespace.split('.').reverse()
  return arr.reduce((acc, current, index) => (index === 0) ? { [current]: value } : { [current]:{...acc } }, {})
}

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

//---------------- Spending

export const saveSpending = async ({ currentYearDate, currentMonthDate, typeOfCost, amount, id, day }) => {
  try {
    const key = 'spending';
    const namespace = `${key}.${currentYearDate}.${currentMonthDate}.${day}.${typeOfCost}.${id}:${amount}`;
    const query = objectBuilder(namespace);
    const keyData = await getByKey(key);
    const newData = mergeDeep(keyData, query);
    await saveByKey(key, newData);
    return await getSpending({ currentYearDate, currentMonthDate })
  } catch (error) {
    console.error(error)
    return {
      success: false,
      error
    }
  }
}

export const getSpending = async ({ currentYearDate, currentMonthDate }) => {
  try {
    const key = 'spending';
    const keyData = await getByKey(key);
    const year = getByIndex(key, keyData);
    const months = getByIndex(currentYearDate, year);
    const month = getByIndex(currentMonthDate, months);
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

// Spending ----------------
//---------------- Target

export const saveTarget = async ({ amount, id, currentYearDate, currentMonthDate }) => {
  try {
    const key = 'target';
    const namespace = `${key}.${currentYearDate}.${currentMonthDate}.${id}:${amount}`;
    const query = objectBuilder(namespace);
    const data = await getByKey(key);
    const newData = mergeDeep(data, query);
    await saveByKey(key, newData);
    const target = getByIndex(key, newData);
    const year = getByIndex(currentYearDate, target);
    const month = getByIndex(currentMonthDate, year);
    return month;
  } catch (error) {
    console.error(error)
    return {
      target: [],
      error
    }
  }
}

export const getTarget = async ({ currentYearDate, currentMonthDate }) => {
  try {
    const key = 'target';
    const data = await getByKey(key);
    const target = getByIndex(key, data);
    const year = getByIndex(currentYearDate, target);
    const month = getByIndex(currentMonthDate, year);
    return month;
  } catch (error) {
    console.error(error)
    return {
      target: [],
      error
    }
  }
}

// Target ---------------- 
//---------------- Category

export const saveCategory = async ({ value, id }) => {
  try {
    const key = 'category';
    const idKey = generateKey(value);
    const namespace = `${key}.${id}.${idKey}:${value}`;
    const query = objectBuilder(namespace);
    const data = await getByKey(key);
    const newData = mergeDeep(data, query);
    await saveByKey(key, newData);
    return await getCategories(key);
  } catch (error) {
    console.error(error)
    return {
      target: [],
      error
    }
  }
}

export const getCategories = async type => {
  try {
    const key = 'category';
    const data = await getByKey(key);
    const categories = getByIndex(key, data);
    return categories;
  } catch (error) {
    console.error(error)
    return {
      target: [],
      error
    }
  }
}
// Category ----------------

const removeItemValue = async (key) => { //removeItemValue(key)
  try {
    await AsyncStorage.removeItem(key);
    return true;
  }
  catch(exception) {
    return false;
  }
}
