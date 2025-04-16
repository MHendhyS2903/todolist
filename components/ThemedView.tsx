import { View as DefaultView, useColorScheme, ViewStyle } from 'react-native';
import { Colors } from '../constants/Colors';

export type ViewProps = DefaultView['props'] & {
  lightColor?: string;
  darkColor?: string;
  style?: ViewStyle;
};

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const theme = useColorScheme() ?? 'light';
  const backgroundColor = theme === 'light' ? lightColor : darkColor;

  return <DefaultView style={[{ backgroundColor: backgroundColor ?? Colors[theme].background }, style]} {...otherProps} />;
}
