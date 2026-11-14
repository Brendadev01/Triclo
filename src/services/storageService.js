import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@triclo:data';

export const INITIAL_DATA = {
  activeCycle: null,
  records: [],
};

export async function loadData() {
  try {
    const rawData = await AsyncStorage.getItem(STORAGE_KEY);
    return rawData ? { ...INITIAL_DATA, ...JSON.parse(rawData) } : INITIAL_DATA;
  } catch (error) {
    console.warn('Erro ao carregar dados:', error);
    return INITIAL_DATA;
  }
}

export async function saveData(data) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.warn('Erro ao salvar dados:', error);
  }
}