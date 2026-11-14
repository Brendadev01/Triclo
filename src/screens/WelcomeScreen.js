import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import PrimaryButton from '../components/PrimaryButton';
import { colors } from '../constants/colors';
import { useCycle } from '../context/CycleContext';

export default function WelcomeScreen({ navigation }) {
  const { isLoading, activeCycle, records } = useCycle();
  const hasData = Boolean(activeCycle) || records.length > 0;

  const handleStart = () => {
    navigation.replace(hasData ? 'Main' : 'Setup');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <View style={styles.brand}>
        <View style={styles.logo}>
          <Ionicons name="water" size={56} color={colors.primary} />
        </View>
        <Text style={styles.title}>Triclo</Text>
        <Text style={styles.tagline}>Entenda como seu corpo reage a cada anticoncepcional.</Text>
      </View>
      <PrimaryButton
        title="Começar"
        variant="light"
        disabled={isLoading}
        onPress={handleStart}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: 24,
  },
  brand: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  logo: {
    width: 104,
    height: 104,
    borderRadius: 52,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 44,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  tagline: {
    maxWidth: 260,
    textAlign: 'center',
    fontSize: 16,
    color: colors.selected,
  },
});