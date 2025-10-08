import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { schoolsService } from '../services/schools';
import { handleApiError } from '../utils/errorHandler';
import { MaterialIcons } from '@expo/vector-icons';
import Button from '../components/common/Button';

export default function EditSchoolScreen({ route, navigation }) {
  const { school } = route.params;
  const [formData, setFormData] = useState({
    nome: school.nome || '',
    diretor: school.diretor || '',
    cidade_id: school.cidade_id || '',
    localizacao: school.localizacao || '',
    turnos: school.turnos?.map(t => t.turno_sigla) || []
  });
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [citiesLoading, setCitiesLoading] = useState(true);

  const locationOptions = [
    { label: 'Urbana', value: 1 },
    { label: 'Rural', value: 2 }
  ];

  const shiftOptions = [
    { label: 'Manhã', value: 'M' },
    { label: 'Tarde', value: 'T' },
    { label: 'Noite', value: 'N' },
    { label: 'Integral', value: 'I' }
  ];

  useEffect(() => {
    loadCities();
  }, []);

  const loadCities = async () => {
    try {
      setCitiesLoading(true);
      const citiesData = await schoolsService.getCities();
      setCities(citiesData);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar as cidades');
    } finally {
      setCitiesLoading(false);
    }
  };

  const handleShiftToggle = (shiftValue) => {
    setFormData(prev => ({
      ...prev,
      turnos: prev.turnos.includes(shiftValue)
        ? prev.turnos.filter(s => s !== shiftValue)
        : [...prev.turnos, shiftValue]
    }));
  };

  const handleUpdate = async () => {
    if (!formData.nome.trim()) {
      Alert.alert('Erro', 'O nome da escola é obrigatório');
      return;
    }

    if (!formData.cidade_id) {
      Alert.alert('Erro', 'Selecione uma cidade');
      return;
    }

    if (!formData.localizacao) {
      Alert.alert('Erro', 'Selecione a localização');
      return;
    }

    if (formData.turnos.length === 0) {
      Alert.alert('Erro', 'Selecione pelo menos um turno');
      return;
    }

    setLoading(true);
    try {
      await schoolsService.updateSchool(school.id, formData);
      
      Alert.alert('Sucesso', 'Escola atualizada com sucesso!', [
        { 
          text: 'OK', 
          onPress: () => {
            navigation.goBack();
          }
        }
      ]);
    } catch (error) {
      const errorMessage = handleApiError(error);
      Alert.alert('Erro na Atualização', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        <MaterialIcons name="edit" size={24} color="#007AFF" /> Editar Escola
      </Text>

      <Text style={styles.label}>Nome da Escola *</Text>
      <TextInput
        style={styles.input}
        value={formData.nome}
        onChangeText={text => setFormData(prev => ({ ...prev, nome: text }))}
        placeholder="Digite o nome da escola"
      />

      <Text style={styles.label}>Diretor (Opcional)</Text>
      <TextInput
        style={styles.input}
        value={formData.diretor}
        onChangeText={text => setFormData(prev => ({ ...prev, diretor: text }))}
        placeholder="Digite o nome do diretor"
      />

      <Text style={styles.label}>Cidade *</Text>
      
      {citiesLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#007AFF" />
          <Text style={styles.loadingText}>Carregando cidades...</Text>
        </View>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.citiesScroll}>
          <View style={styles.citiesContainer}>
            {cities.map(city => (
              <TouchableOpacity
                key={city.id}
                style={[
                  styles.cityOption,
                  formData.cidade_id === city.id && styles.selectedCity
                ]}
                onPress={() => setFormData(prev => ({ ...prev, cidade_id: city.id }))}
              >
                <Text style={[
                  styles.cityText,
                  formData.cidade_id === city.id && styles.selectedCityText
                ]}>
                  {city.descricao} - {city.estado?.sigla}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}

      <Text style={styles.label}>Localização *</Text>
      <View style={styles.optionsRow}>
        {locationOptions.map(option => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.optionButton,
              formData.localizacao === option.value && styles.selectedOption
            ]}
            onPress={() => setFormData(prev => ({ ...prev, localizacao: option.value }))}
          >
            <Text style={[
              styles.optionText,
              formData.localizacao === option.value && styles.selectedOptionText
            ]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Turnos *</Text>
      <View style={styles.optionsRow}>
        {shiftOptions.map(option => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.optionButton,
              formData.turnos.includes(option.value) && styles.selectedOption
            ]}
            onPress={() => handleShiftToggle(option.value)}
          >
            <Text style={[
              styles.optionText,
              formData.turnos.includes(option.value) && styles.selectedOptionText
            ]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Button
        title={loading ? 'Atualizando...' : 'Atualizar Escola'}
        onPress={handleUpdate}
        loading={loading}
        disabled={loading}
        style={styles.submitButton}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333'
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 16,
    color: '#333'
  },
  input: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  loadingText: {
    marginLeft: 10,
    color: '#666',
    fontSize: 14
  },
  citiesScroll: {
    maxHeight: 100
  },
  citiesContainer: {
    flexDirection: 'row',
    paddingVertical: 8
  },
  cityOption: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 8,
    marginBottom: 8
  },
  selectedCity: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF'
  },
  cityText: {
    color: '#333',
    fontSize: 14
  },
  selectedCityText: {
    color: 'white',
    fontWeight: 'bold'
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 40
  },
  optionButton: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    minWidth: 80,
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  optionText: {
    textAlign: 'center',
    color: '#333',
    fontWeight: '500'
  },
  selectedOptionText: {
    color: 'white',
    fontWeight: 'bold'
  },
  submitButton: {
    marginTop: 40,
    marginBottom: 30
  }
});