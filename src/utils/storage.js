import { AsyncStorage } from 'react-native';

const getDataByIndex = (index, data) => {
  const result = data[index]
  if (!result) return {}
  return result;
}

const getDataByKey = async key => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : {}
  } catch (error) {
    return error;
  }
};

const saveDataByKey = async ( key, data ) => {
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
    const data = await getDataByKey(key);
    const indexData = getDataByIndex(index, data);
    const newIndexData = {
      ...indexData,
      [id]: amount
    }
    const newData =  { ...data, ...{
        [index]: newIndexData
      }
    };
    await saveDataByKey(key, newData);

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

export const saveSpending = async ({ currentYear, currentMonth, day, amount, typeOfCost, category }) => {
  try {
    const key = currentYear;
    const index = currentMonth;
    const year = await getDataByKey(key);
    const month = getDataByIndex(index, year);
    console.log(month)
    // const day = getDataByIndex(category, month)
    // const d = getDataByIndex(month, day)
    // const c = [ ...get(d, category), amount ]
    // const v = {
    //   ...m,
    //   [day]: {
    //     ...d,
    //     [category]: c
    //   }
    // }
    // const dayData = getDataByIndex(day, monthData);
    // const newData = { ...data, ...{
    //   [index]: {
    //     ...monthData,
    //     [day]: {
    //       [typeOfCost]: {
    //         [category]: amount
    //       }
    //     }
    //   }
    // } };
    // const rm = Object.keys(newData[index]).reduce((acc, a) => {
    //   if (a !== 'undefined') {
    //     acc = { ...acc, [a]: newData[index][a]}
    //   }
    //   return acc;
    // }, {})
    // const result = await saveDataByKey(key, newData);
    return {
      success: true,
      data: newData[index], // Kolla om 'monthData'
      ...{ currentYear: key, currentMonth: index }
    };
  } catch (error) {
    console.error(error)
    return {
      success: false,
      error
    }
  }
}

export const getSpending = async ({ currentYear, currentMonth, currentDay }) => {
  try {
    const key = currentYear;
    const index = currentMonth;
    const data = await getDataByKey(key);
    const indexData = getDataByIndex(index, data);
    console.log(data)
    return {
      data: indexData,
      ...{ currentYear, currentMonth, currentDay }
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
    const data = await getDataByKey(key);
    const indexData = getDataByIndex(index, data);
    // removeItemValue(key)
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

//https://medium.com/@richardzhanguw/storing-and-retrieving-objects-using-asyncstorage-in-react-native-6bb1745fdcdd