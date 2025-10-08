import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

const Loading = ({ message = 'Carregando...' }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg
  },
  text: {
    marginTop: theme.spacing.md,
    fontSize: 16,
    color: theme.colors.gray
  }
});

export default Loading;