import { Text as DefaultText, useColorScheme, TextStyle } from 'react-native';
import { Colors } from '../constants/Colors';

export type TextProps = DefaultText['props'] & {
  lightColor?: string;
  darkColor?: string;
  style?: TextStyle;
};

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const theme = useColorScheme() ?? 'light';
  const color = theme === 'light' ? lightColor : darkColor;

  return <DefaultText style={[{ color: color ?? Colors[theme].text }, style]} {...otherProps} />;
}
