import { AsyncStorage } from 'react-native';

const getDataByYr = async yr => {
  try {
    const data = await AsyncStorage.getItem(yr);
    return data ? JSON.parse(data) : []
  } catch (error) {
    return error;
  }
};

const getDataByMonth = (month, data) => {
  const currentMonth = data[month]
  if (!currentMonth) return {}
  return currentMonth;
}

const saveDataByYr = async ( currentYr, data, month ) => {
  try {
    return await AsyncStorage.setItem(currentYr, JSON.stringify({ ...data, ...month }))
  } catch (error) {
    console.log(error)
    return error;
  }
};

export const save = async ({ currentYr, currentMonth, day, amount }) => {
  try {
    const dataYr = await getDataByYr(currentYr);
    const month = getDataByMonth(currentMonth, dataYr);
    const data = { ...dataYr, ...{
      [currentMonth]: {
        ...month,
        [day]: amount
      }
    } };
    await saveDataByYr(currentYr, data);
    return {
      success: true,
      data: (data && data[currentMonth]) ? data[currentMonth] : [],
      ...{ currentYr, currentMonth }
    };
  } catch (error) {
    console.log('error', error)
    return {
      success: false,
      error
    }
  }
}

export const get = async ({ currentYr, currentMonth, currentDay }) => {
  try {
    // AsyncStorage.clear();
    const data = await getDataByYr(currentYr);
    return {
      data: (data && data[currentMonth]) ? data[currentMonth] : [],
      ...{ currentYr, currentMonth, currentDay }
    };

  } catch (error) {
    console.log('error', error)
    return {
      data: [],
      error
    }
  }
}

//https://medium.com/@richardzhanguw/storing-and-retrieving-objects-using-asyncstorage-in-react-native-6bb1745fdcdd