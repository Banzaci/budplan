import { AsyncStorage } from 'react-native';
import mergeDeep from './deep-merge';

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
    const key = currentYearDate;
    const index = currentMonthDate;
    const namespace = `${currentYearDate}.${currentMonthDate}.${day}.${typeOfCost}.${id}:${amount}`;
    const query = objectBuilder(namespace);
    const year = await getByKey(key);
    const newData = mergeDeep(year, query);
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

export const getSpending = async ({ currentYearDate, currentMonthDate }) => {
  try {
    const key = currentYearDate;
    const index = currentMonthDate;
    const year = await getByKey(key);
    const months = getByIndex(key, year);
    const month = getByIndex(index, months);
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

export const saveCategory = async ({ name, type }) => {
  try {
    const key = 'category';    
    const namespace = `${type}:${name}`;
    const query = objectBuilder(namespace);
    const data = await getByKey(key);
    const newData = mergeDeep(data, query);

    await saveByKey(key, newData);

    return getByKey(key);
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
    const categories = getByIndex(type, data);
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
