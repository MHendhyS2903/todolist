import { StyleSheet, useWindowDimensions, ViewStyle } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { View } from './ThemedView';

interface ParallaxScrollViewProps {
  children: React.ReactNode;
}

export function ParallaxScrollView({ children }: ParallaxScrollViewProps) {
  const { width, height } = useWindowDimensions();

  const backgroundStyle: ViewStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width,
    height: height * 0.4,
    backgroundColor: '#4f80c6',
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={backgroundStyle} />
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
});
