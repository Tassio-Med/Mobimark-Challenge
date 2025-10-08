# Mobimark Challenge

## 📑 Sumário

- [Mobimark Challenge](#mobimark-challenge)
  - [📑 Sumário](#-sumário)
  - [📱 Sobre o Projeto](#-sobre-o-projeto)
    - [🎯 Objetivos Atendidos](#-objetivos-atendidos)
  - [🎯 Funcionalidades](#-funcionalidades)
    - [🔐 Sistema de Autenticação](#-sistema-de-autenticação)
    - [🏫 Gestão de Escolas](#-gestão-de-escolas)
    - [📊 Formulários Inteligentes](#-formulários-inteligentes)
  - [🛠 Tecnologias Utilizadas](#-tecnologias-utilizadas)
    - [📱 Frontend Mobile](#-frontend-mobile)
    - [🧭 Navegação e UI](#-navegação-e-ui)
    - [🔐 Estado e Armazenamento](#-estado-e-armazenamento)
    - [🌐 Comunicação com API](#-comunicação-com-api)
  - [🚀 Como Executar](#-como-executar)
    - [📋 Pré-requisitos](#-pré-requisitos)
    - [⚙️ Instalação e Configuração](#️-instalação-e-configuração)
    - [📱 Execução no Dispositivo](#-execução-no-dispositivo)
  - [📁 Estrutura do Projeto](#-estrutura-do-projeto)
  - [🎨 Interface e Design](#-interface-e-design)
    - [Paleta de Cores](#paleta-de-cores)
  - [🔐 Autenticação e Segurança](#-autenticação-e-segurança)
    - [Sistema JWT](#sistema-jwt)
  - [📊 API e Integração](#-api-e-integração)
    - [Endpoints Consumidos](#endpoints-consumidos)
    - [Estrutura de Dados](#estrutura-de-dados)
      - [Escola](#escola)
      - [Autenticação](#autenticação)
  - [❌ Tratamento de Erros](#-tratamento-de-erros)
  - [📱 Telas do Sistema](#-telas-do-sistema)
    - [Tela de Login](#tela-de-login)
    - [Tela de Listagem de Escolas](#tela-de-listagem-de-escolas)
    - [Tela de Cadastro de Escola](#tela-de-cadastro-de-escola)
    - [Tela de Edição de Escola](#tela-de-edição-de-escola)
    - [Tela Sobre o Projeto](#tela-sobre-o-projeto)
  - [🔧 Desenvolvimento Local](#-desenvolvimento-local)
  - [👨‍💻 Desenvolvedor](#-desenvolvedor)

## 📱 Sobre o Projeto

O **Mobimark Challenge** é um sistema de gestão escolar desenvolvido em React Native como parte do processo seletivo para Desenvolvedor Front-end na empresa Mobimark. A aplicação permite o gerenciamento completo de escolas, incluindo cadastro, edição, listagem com filtros e autenticação segura.

### 🎯 Objetivos Atendidos

- ✅ Desenvolvimento de 4 telas conforme especificado
- ✅ Integração com API REST da Mobimark
- ✅ Autenticação JWT segura
- ✅ Interface responsiva e intuitiva

## 🎯 Funcionalidades

### 🔐 Sistema de Autenticação
- **Login seguro** com credenciais JWT
- **Validação de campos** em tempo real
- **Persistência de sessão** com AsyncStorage
- **Proteção de rotas** automática
- **Logout seguro** com confirmação

### 🏫 Gestão de Escolas
- **Listagem completa** de escolas
- **Busca em tempo real** por nome
- **Pull-to-refresh** para atualização
- **Cadastro de novas escolas** com validação
- **Edição de escolas** existentes
- **Visualização detalhada** de informações

### 📊 Formulários Inteligentes
- **Campos obrigatórios**: Nome, Cidade, Localização, Turnos
- **Campos opcionais**: Diretor
- **Validação em tempo real**
- **Seleção múltipla** de turnos


## 🛠 Tecnologias Utilizadas

### 📱 Frontend Mobile
| Tecnologia | Versão | Finalidade |
|------------|---------|-------------|
| **React Native** | 0.81.4 | Framework principal |
| **Expo** | ~54.0.12 | Desenvolvimento e build |
| **JavaScript** | ES6+ | Linguagem de programação |
| **React** | 19.1.0 | Biblioteca base |

### 🧭 Navegação e UI
| Tecnologia | Versão | Finalidade |
|------------|---------|-------------|
| **React Navigation** | ^7.1.18 | Navegação entre telas |
| **React Navigation Stack** | ^7.4.9 | Navegação em pilha |
| **React Navigation Tabs** | ^7.4.8 | Navegação por abas |
| **@expo/vector-icons** | ^15.0.2 | Ícones da interface |

### 🔐 Estado e Armazenamento
| Tecnologia | Versão | Finalidade |
|------------|---------|-------------|
| **Context API** | Nativo | Gerenciamento de estado global |
| **AsyncStorage** | ^2.2.0 | Persistência local |
| **React Hooks** | Nativo | Gerenciamento de estado |

### 🌐 Comunicação com API
| Tecnologia | Versão | Finalidade |
|------------|---------|-------------|
| **Axios** | ^1.12.2 | Cliente HTTP |
| **JWT** | Implementado | Autenticação |
| **REST API** | Mobimark | Integração backend |


## 🚀 Como Executar

### 📋 Pré-requisitos
- Node.js 14+
- npm ou yarn
- Expo CLI

### ⚙️ Instalação e Configuração

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/Mobimark-Challenge.git
cd Mobimark-Challenge

# 2. Instale as dependências
npm install

# 3. Instale as dependências do Expo
npx expo install react-native-screens react-native-safe-area-context react-native-gesture-handler

# 4. Execute o projeto
npm start
```

### 📱 Execução no Dispositivo

1. **Expo Go**: Escaneie o QR code com o app Expo Go
2. **Emulador**: Execute no Android Studio ou Xcode

## 📁 Estrutura do Projeto

```
mobimarkchallenge/
├── App.js     
├── index.js                       
├── package.json     
├── package-lock.json                
├── app.json 
├── README.md
├── .gitignore
├── expo/                      
├── assets/                                                            
└── src/                        
    ├── components/             
    │   └── common/                 
    │       ├── Button.js           
    │       └── Loading.js          
    ├── screens/                   
    │   ├── LoginScreen.js         
    │   ├── SchoolsScreen.js        
    │   ├── AddSchoolScreen.js       
    │   ├── EditSchoolScreen.js     
    │   └── AboutScreen.js          
    ├── services/                 
    │   ├── api.js                 
    │   ├── auth.js              
    │   └── schools.js            
    ├── navigation/                
    │   └── AppNavigator.js         
    ├── contexts/                   
    │   └── AuthContext.js          
    ├── utils/                      
    │   ├── constants.js            
    │   └── errorHandler.js         
    └── styles/                     
        └── theme.js                
```

## 🎨 Interface e Design


### Paleta de Cores
| Cor | Uso | Código |
|-----|-----|---------|
| Azul Primário | Botões, ícones ativos | `#007AFF` |
| Cinza Claro | Fundos, bordas | `#f5f5f5` |
| Branco | Cards, inputs | `#ffffff` |
| Cinza Escuro | Textos secundários | `#666666` |
| Vermelho | Erros, botão de sair | `#FF3B30` |
| Verde | Sucesso | `#4CD964` |


## 🔐 Autenticação e Segurança

### Sistema JWT
```javascript
// Fluxo de autenticação
1. Login com email/senha
2. API retorna token JWT
3. Token armazenado no AsyncStorage
4. Token enviado em todas as requisições
5. Interceptor adiciona header Authorization
```


## 📊 API e Integração

### Endpoints Consumidos

| Endpoint | Método | Função |
|----------|---------|---------|
| `/api/login/run` | POST | Autenticação do usuário |
| `/api/escolas` | GET | Listar escolas |
| `/api/escolas` | POST | Criar escola |
| `/api/escolas/{id}` | PATCH | Atualizar escola |
| `/api/cidades` | GET | Listar cidades |
| `/api/estados` | GET | Listar estados |

### Estrutura de Dados

#### Escola
```javascript
{
  id: number,
  nome: string,           // Obrigatório
  diretor?: string,       // Opcional
  cidade_id: number,      // Obrigatório
  localizacao: 1 | 2,     // 1-Urbana, 2-Rural
  turnos: string[],       // ['M', 'T', 'N', 'I']
  zona: string,           // Calculado
  cidade: object,         // Relacionamento
  usuario: object         // Relacionamento
}
```

#### Autenticação
```javascript
{
  email: string,          // Obrigatório
  senha: string,          // Obrigatório
  token: string,          // JWT retornado
  user: object            // Dados do usuário
}
```


## ❌ Tratamento de Erros
```javascript
// Exemplo de tratamento
try {
  await api.call();
} catch (error) {
  const message = handleApiError(error);
  Alert.alert('Erro', message);
}
```


## 📱 Telas do Sistema

### Tela de Login
**Funcionalidades:**
- Campos email e senha
- Toggle de visibilidade de senha
- Loading durante autenticação
- Tratamento de erros específicos

**Credenciais de Teste:**
- Email: `tassiohfmed@gmail.com`
- Senha: `tassio@159753`

### Tela de Listagem de Escolas
**Funcionalidades:**
- Busca em tempo real por nome
- Pull-to-refresh para atualização
- Botão para nova escola
- Botão de logout

### Tela de Cadastro de Escola
**Campos Obrigatórios:**
- Nome da escola
- Cidade (seleção horizontal)
- Localização (Urbana/Rural)
- Turnos (seleção múltipla)

**Campos Opcionais:**
- Nome do diretor

### Tela de Edição de Escola
**Funcionalidades:**
- Pré-carregamento dos dados atuais
- Validação de campos obrigatórios
- Loading durante atualização de cidades
- Navegação automática de volta

### Tela Sobre o Projeto
**Seções:**
1. **Sobre Mim**: Informações do desenvolvedor
2. **Tecnologias Utilizadas**: Stacks utilizadas no projeto
3. **Dificuldades Encontradas**: Desafios do projeto
4. **Sugestões**: Melhorias futuras



## 🔧 Desenvolvimento Local
```bash
# Instalação
npm install

# Desenvolvimento
npm start

# Build
expo build:android
expo build:ios
```



## 👨‍💻 Desenvolvedor

**Tássio Medeiros**  
*Desenvolvedor Mobile*  
📧 tassiohfmed@gmail.com  
🔗 [LinkedIn](https://linkedin.com/in/tassiomed98)  
🐙 [GitHub](https://github.com/Tassio-Med)

---

<div align="center">

[⬆️ Voltar ao Topo](#mobimark-challenge) 🔼

</div>