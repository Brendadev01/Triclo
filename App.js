import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CycleProvider } from './src/context/CycleContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <CycleProvider>
        <StatusBar style="dark" />
        <AppNavigator />
      </CycleProvider>
    </SafeAreaProvider>
  );
}
