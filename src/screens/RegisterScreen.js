import { StyleSheet, Text } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import { colors } from '../constants/colors';

export default function RegisterScreen() {
  return (
    <ScreenContainer>
      <Text style={styles.title}>Registrar fim do ciclo</Text>
      <Text style={styles.description}>Em construção.</Text>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
  },
  description: {
    fontSize: 15,
    color: colors.textMuted,
  },
});