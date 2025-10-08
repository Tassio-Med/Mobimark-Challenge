import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { API_CONFIG } from '../utils/constants';
import Button from '../components/common/Button';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const [email, setEmail] = useState(API_CONFIG.CREDENTIALS.EMAIL);
  const [password, setPassword] = useState(API_CONFIG.CREDENTIALS.PASSWORD);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      let errorMessage = 'Credenciais inválidas';
      
      if (error.error) {
        errorMessage = error.error;
      } else if (error.message && error.message.includes('Network Error')) {
        errorMessage = 'Erro de conexão. Verifique sua internet.';
      }
      
      Alert.alert('Erro de Login', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Ionicons name="school" size={60} color="#007AFF" />
        <Text style={styles.title}>Mobimark Challenge</Text>
        <Text style={styles.subtitle}>Sistema de Gestão de Escolas</Text>
      </View>
      
      <View style={styles.form}>
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="mail" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="seu@email.com"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            autoComplete="email"
          />
        </View>

        <Text style={styles.label}>Senha</Text>
        <View style={[
          styles.inputContainer,
          isPasswordFocused && styles.inputContainerFocused
        ]}>
          <Ionicons name="lock-closed" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.passwordInput}
            placeholder="Sua senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoComplete="password"
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => setIsPasswordFocused(false)}
          />
          <TouchableOpacity 
            style={styles.eyeButton}
            onPress={toggleShowPassword}
          >
            <Ionicons 
              name={showPassword ? "eye-off" : "eye"} 
              size={24} 
              color={showPassword ? "#007AFF" : "#666"} 
            />
          </TouchableOpacity>
        </View>

        <Button
          title="Entrar"
          onPress={handleLogin}
          loading={loading}
          disabled={loading}
          style={styles.loginButton}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
    color: '#007AFF'
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666'
  },
  form: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#f8f8f8',
    marginBottom: 20,
    overflow: 'hidden'
  },
  inputContainerFocused: {
    borderColor: '#007AFF',
    backgroundColor: 'white'
  },
  inputIcon: {
    marginLeft: 15
  },
  input: {
    flex: 1,
    padding: 15,
    fontSize: 16,
    marginLeft: 10
  },
  passwordInput: {
    flex: 1,
    padding: 15,
    fontSize: 16,
    marginLeft: 10
  },
  eyeButton: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginButton: {
    marginTop: 10
  },
});