import { AsyncStorage } from 'react-native';

const getSpendingByYear = async year => {
  try {
    const spendingByYear = await AsyncStorage.getItem(year);
    return spendingByYear ? JSON.parse(spendingByYear) : []
  } catch (error) {
    return error;
  }
};

const getSpendingByMonth = (monthByIndex, spendingByYear) => {
  const spendingMonth = spendingByYear[monthByIndex]
  if (!spendingMonth) return {}
  return spendingMonth;
}

const saveSpendingByYear = async ( spendingYear, spendingData, month ) => {// Kolla in month
  try {
    return await AsyncStorage.setItem(spendingYear, JSON.stringify({ ...spendingData, ...month }))
  } catch (error) {
    console.log(error)
    return error;
  }
};

export const saveSpending = async ({ currentYear, currentMonth, day, amount }) => {
  try {
    const spendingByYear = await getSpendingByYear(currentYear);
    const spendingMonth = getSpendingByMonth(currentMonth, spendingByYear);
    const spending = { ...spendingByYear, ...{
      [currentMonth]: {
        ...spendingMonth,
        [day]: amount
      }
    } };
    await saveSpendingByYear(currentYear, spending);
    return {
      success: true,
      data: (spending && spending[currentMonth]) ? spending[currentMonth] : [],
      ...{ currentYear, currentMonth }
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
    // AsyncStorage.clear();
    const data = await getSpendingByYear(currentYear);
    return {
      data: (data && data[currentMonth]) ? data[currentMonth] : [],
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

export const getTarget = async () => {
  try {
    const data = await AsyncStorage.getItem('target');
    return {
      data
    };

  } catch (error) {
    console.error(error)
    return {
      target: [],
      error
    }
  }
}

//https://medium.com/@richardzhanguw/storing-and-retrieving-objects-using-asyncstorage-in-react-native-6bb1745fdcdd