# Integração Firebase - Projeto Pedagogia

Este documento explica como configurar e usar a integração Firebase no projeto Pedagogia.

## Configuração Inicial

### 1. Variáveis de Ambiente

O arquivo `.env` na raiz do projeto contém as configurações do Firebase. **NUNCA** commite este arquivo no Git.

```env
VITE_FIREBASE_API_KEY=sua_api_key_aqui
VITE_FIREBASE_AUTH_DOMAIN=seu_auth_domain_aqui
VITE_FIREBASE_PROJECT_ID=seu_project_id_aqui
VITE_FIREBASE_STORAGE_BUCKET=seu_storage_bucket_aqui
VITE_FIREBASE_MESSAGING_SENDER_ID=seu_messaging_sender_id_aqui
VITE_FIREBASE_APP_ID=seu_app_id_aqui
VITE_FIREBASE_MEASUREMENT_ID=seu_measurement_id_aqui
```

### 2. Instalação de Dependências

```bash
pnpm install firebase
```

### 3. Configuração do Firebase Console

1. Acesse o [Console do Firebase](https://console.firebase.google.com/)
2. Configure as regras de segurança do Firestore
3. Ative a autenticação (se necessário)

## Estrutura dos Dados

### Coleção `athletes`

```javascript
{
  "name": "Nome do Atleta",
  "birthDate": "YYYY-MM-DD",
  "rg": "Número do RG",
  "cpf": "Número do CPF",
  "address": "Endereço completo",
  "phone": "Número de telefone",
  "email": "Email do atleta",
  "school": "Nome da Escola",
  "grade": "Série/Ano",
  "category": "Categoria/Turno da Escola",
  "healthInfo": "Informações de saúde relevantes",
  "emergencyContactName": "Nome do contato de emergência",
  "emergencyContactPhone": "Telefone do contato de emergência",
  "image": "URL da imagem do atleta (opcional)",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### Coleção `attendance`

```javascript
{
  "school": "Nome da Escola",
  "year": 2025,
  "month": 5,
  "records": {
    "athleteId_1": {
      "1": "P",
      "2": "F",
      "3": "P"
      // ... até o dia 31
    },
    "athleteId_2": {
      "1": "A",
      "2": "P"
      // ...
    }
  },
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

## Como Usar

### 1. Substituir o AthleteContext

Substitua a importação do AthleteContext no seu `main.jsx` ou `App.jsx`:

```javascript
// Antes
import { AthleteProvider } from './context/AthleteContext';

// Depois
import { AthleteProvider } from './context/AthleteContextFirebase';
```

### 2. Usar o Hook de Presença

```javascript
import { useAttendance } from '../hooks/useAttendance';

function SchoolAttendanceComponent() {
  const {
    loadAttendanceData,
    updateAthleteAttendance,
    getLocalAthleteAttendance,
    loading
  } = useAttendance();

  // Carregar dados de presença
  useEffect(() => {
    loadAttendanceData('Turno Manhã - Escola São Francisco', 2025, 6);
  }, []);

  // Atualizar presença
  const handleAttendanceUpdate = async (athleteId, day, status) => {
    await updateAthleteAttendance(
      'Turno Manhã - Escola São Francisco',
      2025,
      6,
      athleteId,
      day,
      status
    );
  };

  return (
    // Seu componente aqui
  );
}
```

### 3. Usar os Serviços Diretamente

```javascript
import { addAthlete, getAllAthletes } from '../services/athleteService';
import { updateAttendance } from '../services/attendanceService';

// Adicionar atleta
const newAthlete = await addAthlete({
  name: 'João Silva',
  category: 'Turno Manhã - Escola São Francisco',
  // ... outros campos
});

// Buscar todos os atletas
const athletes = await getAllAthletes();

// Atualizar presença
await updateAttendance(
  'Turno Manhã - Escola São Francisco',
  2025,
  6,
  'athleteId',
  15,
  'P'
);
```

## Migração Automática

O sistema detecta automaticamente dados existentes no localStorage e os migra para o Firebase na primeira execução. Após a migração bem-sucedida:

1. Os dados são removidos do localStorage
2. Um flag é definido para evitar migrações futuras
3. Todos os dados passam a ser gerenciados pelo Firebase

## Regras de Segurança (Firestore)

Configure as seguintes regras no Console do Firebase:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permite leitura e escrita para usuários autenticados
    match /athletes/{athleteId} {
      allow read, write: if request.auth != null;
    }
    
    match /attendance/{attendanceId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Segurança

1. **Nunca** commite o arquivo `.env` no Git
2. Configure as regras de segurança do Firestore adequadamente
3. Use autenticação Firebase para controlar acesso
4. Configure restrições de API no Console do Google Cloud

## Troubleshooting

### Erro de Permissão
- Verifique as regras de segurança do Firestore
- Certifique-se de que o usuário está autenticado (se necessário)

### Erro de Configuração
- Verifique se todas as variáveis de ambiente estão definidas
- Confirme se o projeto Firebase está ativo

### Erro de Migração
- Verifique o console do navegador para logs detalhados
- Os dados originais do localStorage são preservados até a migração ser bem-sucedida

