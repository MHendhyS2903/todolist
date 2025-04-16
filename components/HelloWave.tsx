import { StyleSheet, View } from 'react-native';
import { Text } from './ThemedText';

interface HelloWaveProps {
  name: string;
}

export function HelloWave({ name }: HelloWaveProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, {name} 👋</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
