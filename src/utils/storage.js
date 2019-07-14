import { AsyncStorage } from 'react-native';
import mergeDeep from './deep-merge';

const objectBuilderNoValue = input => {
  const arr = input.split('.').reverse()
  return arr.reduce((acc, current, index) => {
    return {
      [current] : { ...acc }
    }
  } , {})
}

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

export const saveSpending = async ({ currentYear, currentMonth, typeOfCost, amount, id, day }) => {
  try {
    const key = currentYear;
    const index = currentMonth;
    const namespace = `${currentYear}.${currentMonth}.${day}.${typeOfCost}.${id}:${amount}`;
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

export const getSpending = async ({ currentYear, currentMonth }) => {
  try {
    const key = currentYear;
    const index = currentMonth;
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

export const saveTarget = async ({ amount, id, currentYear, currentMonth }) => {
  try {
    const key = 'target';
    const namespace = `${key}.${currentYear}.${currentMonth}.${id}:${amount}`;
    const query = objectBuilder(namespace);
    const data = await getByKey(key);
    const newData = mergeDeep(data, query);
    await saveByKey(key, newData);
    const target = getByIndex(key, newData);
    const year = getByIndex(currentYear, target);
    const month = getByIndex(currentMonth, year);
    return month;
  } catch (error) {
    console.error(error)
    return {
      target: [],
      error
    }
  }
}

export const getTarget = async ({ currentYear, currentMonth }) => {
  try {
    const key = 'target';
    const data = await getByKey(key);
    const target = getByIndex(key, data);
    const year = getByIndex(currentYear, target);
    const month = getByIndex(currentMonth, year);
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
    console.log('categories')
    return category;
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
