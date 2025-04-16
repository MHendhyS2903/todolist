import { StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Text } from './ThemedText';

interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
}

export function ExternalLink({ href, children }: ExternalLinkProps) {
  return (
    <Link href={href as any} asChild>
      <TouchableOpacity style={styles.link}>
        <Text style={styles.text}>{children}</Text>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  text: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
