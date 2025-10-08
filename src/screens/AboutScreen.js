import {
  View,
  Text,
  ScrollView,
  StyleSheet
} from 'react-native';

export default function AboutScreen() {
  const sections = [
    {
      title: 'Sobre Mim',
      content: `Sou um desenvolvedor de software apaixonado por criar soluções inovadoras. Tenho experiência em React.js, React Native, Typescript, JavaScript, Node.js e Testes Autoamtizados. Estou sempre buscando aprender novas tecnologias e melhorar minhas habilidades.`
    },
    {
      title: 'Tecnologias Utilizadas no Projeto',
      content: `• React Native com Expo
• React Navigation para navegação
• Axios para consumo de API
• Context API para gerenciamento de estado
• AsyncStorage para persistência de dados
• JWT para autenticação
• API REST da Mobimark`
    },
    {
      title: 'Dificuldades Encontradas',
      content: `• Integração com a API
• Gerenciamento de estado para autenticação JWT
• Implementação de filtros complexos`
    },
    {
      title: 'Sugestões',
      content: `• Melhorar a documentação da API com exemplos mais claros
• Adicionar paginação na listagem de escolas
• Adicionar mais filtros na busca de escolas
• Adicionar a função de deletar escolas`
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Sobre o Projeto</Text>
      
      {sections.map((section, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <Text style={styles.sectionContent}>{section.content}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5'
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 10,
    color: '#007AFF'
  },
  section: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#007AFF'
  },
  sectionContent: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333'
  }
});