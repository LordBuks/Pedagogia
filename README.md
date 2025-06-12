# Baseinter - Sistema de Gerenciamento de Atletas

Sistema para gerenciamento de atletas das categorias de base do Sport Club Internacional.

## Funcionalidades

- Cadastro de atletas por escola/turno
- Visualização de atletas por categoria
- Edição e exclusão de atletas
- Chamada escolar

## Tecnologias

- React
- Vite
- TailwindCSS
- LocalStorage para persistência de dados

## Instalação

```bash
# Clone o repositório
git clone https://github.com/LordBuks/baseinter.git

# Entre na pasta do projeto
cd baseinter

# Instale as dependências
npm install

# Execute o projeto em modo de desenvolvimento
npm run dev
```

## Deploy

O projeto está configurado para deploy no Vercel. Para fazer o deploy:

1. Faça fork do repositório
2. Conecte o repositório ao Vercel
3. Configure as variáveis de ambiente (se necessário)
4. Deploy!

## Melhorias Recentes

### Correção de erros:
- Corrigido o erro "TypeError: [T] is not iterable" ao adicionar atleta, adicionando validação e tratamento de erro ao carregar dados do localStorage.

### Melhorias de layout:
1. **Botões de navegação (Atletas/Chamada Escolar)**:
   - Uniformizados com tamanho consistente
   - Adicionado padding adequado
   - Melhorada a aparência com bordas arredondadas
   - Adicionado efeito de hover e estado ativo

2. **Botões de escola**:
   - Removida a redundância do turno no nome da escola
   - Adicionado badge de turno separado
   - Uniformizados tamanhos e espaçamentos
   - Melhorada a legibilidade com fontes mais adequadas

3. **Cabeçalho**:
   - Melhorado o contraste e legibilidade
   - Ajustado o tamanho do logo e títulos
   - Adicionados efeitos sutis para melhorar a aparência

4. **Grade de atletas**:
   - Melhorado o layout do título da categoria
   - Adicionado badge de turno no título
   - Uniformizado o layout dos cards
   - Melhorada a aparência do botão "Adicionar Atleta"

5. **Geral**:
   - Adicionada tipografia mais profissional
   - Melhorada a consistência de cores
   - Adicionados efeitos sutis para melhorar a experiência do usuário
   - Melhorada a responsividade para dispositivos móveis

## Licença

MIT

