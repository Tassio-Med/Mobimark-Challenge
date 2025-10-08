import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../contexts/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import SchoolsScreen from '../screens/SchoolsScreen';
import AddSchoolScreen from '../screens/AddSchoolScreen';
import EditSchoolScreen from '../screens/EditSchoolScreen';
import AboutScreen from '../screens/AboutScreen';
import Loading from '../components/common/Loading';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen 
        name="Escolas" 
        component={SchoolsScreen}
        options={{ 
          title: 'Lista de Escolas',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="school" size={size} color={color} />
          ),
          headerRight: () => (
            <Ionicons
              name="school" 
              size={24} 
              color="#007AFF" 
              style={{ marginRight: 15 }}
            />
          )
        }}
      />
       <Tab.Screen 
        name="Sobre" 
        component={AboutScreen}
        options={{ 
          title: 'Sobre o Projeto',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="information-circle" size={size} color={color} />
          ),
          headerRight: () => (
            <Ionicons 
              name="information-circle" 
              size={24} 
              color="#007AFF" 
              style={{ marginRight: 15 }}
            />
          )
        }}
      />
    </Tab.Navigator>
  );
}

function ProtectedStack() {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return null;
  }
  
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="MainTabs" 
        component={MainTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="AddSchool" 
        component={AddSchoolScreen}
        options={{ 
          title: 'Nova Escola',
          headerBackTitle: 'Voltar'
        }}
      />
       <Stack.Screen 
        name="EditSchool" 
        component={EditSchoolScreen}
        options={{ 
          title: 'Editar Escola',
          headerBackTitle: 'Voltar'
        }}
      />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <Stack.Screen name="Protected" component={ProtectedStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}