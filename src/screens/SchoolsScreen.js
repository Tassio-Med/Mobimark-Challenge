import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { schoolsService } from '../services/schools';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/common/Button';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function SchoolsScreen({ navigation, route }) {
  const [schools, setSchools] = useState([]);
  const [filteredSchools, setFilteredSchools] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { logout } = useAuth();

  useFocusEffect(
    React.useCallback(() => {
      loadSchools();
    }, [])
  );

  useEffect(() => {
    filterSchools();
  }, [searchText, schools]);

  const loadSchools = async () => {
    try {
      const response = await schoolsService.getSchools();
      setSchools(response.data);
      setFilteredSchools(response.data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar as escolas');
      console.error('Error loading schools:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const filterSchools = () => {
    if (!searchText) {
      setFilteredSchools(schools);
      return;
    }

    const filtered = schools.filter(school =>
      school.nome.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredSchools(filtered);
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadSchools();
  };

  const handleEditSchool = (school) => {
    navigation.navigate('EditSchool', { school });
  };

  const handleLogout = () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Sair', 
          style: 'destructive',
          onPress: performLogout
        }
      ]
    );
  };

  const performLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const renderSchoolItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.schoolItem}
      onPress={() => handleEditSchool(item)}
    >
      <View style={styles.schoolHeader}>
        <Text style={styles.schoolName}>{item.nome}</Text>
        <MaterialIcons name="chevron-right" size={20} color="#666" />
      </View>
      <Text style={styles.schoolInfo}>
        <Ionicons name="location" size={14} color="#666" /> Cidade: {item.cidade?.descricao || 'N/A'}
      </Text>
      <Text style={styles.schoolInfo}>
        <Ionicons name="map" size={14} color="#666" /> Localização: {item.zona}
      </Text>
      <Text style={styles.schoolInfo}>
        <MaterialIcons name="schedule" size={14} color="#666" /> Turnos: {item.turnos?.map(t => t.turno).join(', ') || 'Nenhum'}
      </Text>
      {item.diretor && (
        <Text style={styles.schoolInfo}>
          <Ionicons name="person" size={14} color="#666" /> Diretor: {item.diretor}
        </Text>
      )}
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.fullScreenLoading}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.fullScreenLoadingText}>Carregando escolas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.leftSection}>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Pesquisar por nome..."
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
        </View>
        
        <View style={styles.rightSection}>
          <Button
            title="+ Nova Escola"
            onPress={() => navigation.navigate('AddSchool')}
            style={styles.addButton}
          />
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out" size={24} color="#FF3B30" />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={filteredSchools}
        renderItem={renderSchoolItem}
        keyExtractor={item => item.id.toString()}
        style={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="school" size={48} color="#ccc" />
            <Text style={styles.emptyText}>
              {searchText ? 'Nenhuma escola encontrada' : 'Nenhuma escola cadastrada'}
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  leftSection: {
    flex: 1,
    marginRight: 12
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 12
  },
  searchIcon: {
    marginRight: 8
  },
  searchInput: {
    flex: 1,
    padding: 12,
    fontSize: 16
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  addButton: {
    minWidth: 120
  },
  logoutButton: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center'
  },
  schoolItem: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  },
  schoolHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  schoolName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1
  },
  schoolInfo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4
  },
  list: {
    flex: 1
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 16
  },
  fullScreenLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5'
  },
  fullScreenLoadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666'
  }
});