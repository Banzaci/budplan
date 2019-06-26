import { AsyncStorage } from 'react-native';

export const save = async ({ yr, month, day, amount }) => {
  try {
    const key = {
      [yr]: {
        [month]: {
          [day]: {
            amount
          }
        }
      }
    }
    return await AsyncStorage.setItem(key, JSON.stringify(item));
  } catch (error) {
    console.log('Error')
  }
}

export const get = async (key) => {
  try {
    const retrievedItem =  await AsyncStorage.getItem(key);
      const item = JSON.parse(retrievedItem);
    return item;
  } catch (error) {
    console.log('Error')
  }
}

//https://medium.com/@richardzhanguw/storing-and-retrieving-objects-using-asyncstorage-in-react-native-6bb1745fdcdd