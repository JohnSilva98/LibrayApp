# Biblioteca ICPI

📚 Aplicação mobile e backend para gerenciamento da biblioteca da Igreja de Cristo Pentecostal Internacional (ICPI).  
O sistema permite consulta de livros, aluguel, gestão de usuários, controle de carrinho e funções administrativas.

## 🎯 Objetivo do Projeto

Criar um aplicativo capaz de modernizar a gestão da biblioteca da ICPI, oferecendo:  
- Catálogo atualizado de livros  
- Pesquisa rápida por nome ou autor  
- Sistema de aluguel simples e intuitivo  
- Controle de histórico do usuário  
- Área administrativa para adicionar ou remover livros  
- Backend robusto com validações e regras de negócio  

## 🚀 Tecnologias Utilizadas

### Frontend  
- React Native 0.68.2  
- JavaScript  
- CSS-in-JS (Stylesheets)  
- React Navigation  
- Axios  

### Backend  
- Java 17  
- Spring Boot (Web, JPA, Validation)  
- Banco de dados H2 Console (para desenvolvimento)  
- Hibernate / JPA  
- Spring Security (planejado)  
- Gradle  

## 🔥 Recursos do Sistema

### 👤 Usuários  
- Login e cadastro com validação  
- Diferentes perfis:  
  - Admin → pode cadastrar, editar e remover livros  
  - Usuário final → apenas consulta e aluga livros  
- Histórico de livros alugados  

### 📚 Livros  
- Listagem dos livros mais recentes  
- Pesquisa por nome ou autor  
- Página de detalhes com capa, autor, descrição e disponibilidade  
- Função de adicionar ao carrinho e realizar aluguel  

### 🛒 Carrinho  
- Adicionar livros  
- Remover livros  
- Finalizar aluguel  

## 🗂️ Arquitetura do Backend

O backend segue uma arquitetura clássica e escalável, baseada em camadas:

controller → service → repository → database
↓
dto
↓
exceptions
↓
security


### 🧩 Controller  
- Responsável por receber as requisições HTTP  
- Não contém regra de negócio  
- Chama os serviços e retorna respostas JSON  

### ⚙️ Service  
- Contém TODA a lógica de negócio  
- Processa dados, faz validações e aplica regras como:  
  - “Email duplicado”  
  - “Usuário só pode alugar X livros”  
  - “Admin pode cadastrar livros, usuário final não”  

### 🗃️ Repository  
- Interface que acessa o banco de dados via JPA  
- Exemplos: findByEmail, findByNomeContainingIgnoreCase  

### 📦 Model  
- Representa as entidades do banco (Usuario, Livro, Aluguel)  

### 📤 DTO (Data Transfer Objects)  
- Evitam expor entidades diretamente na API  
- Usados em Login, Cadastro, Respostas de livros, Atualizações  

### 🔐 Security  
- Responsável por autenticação e autorização  
- Define rotas protegidas e permissões de ADMIN e USER  
- Futuro: JWT Token  

### ⚠️ Exceptions  
- Classes de erros personalizados  
- Tratamento global com @ControllerAdvice  

## 🔄 Fluxo de Requisição (Request Flow)

Exemplo: Cadastro de Usuário  
1. Usuário envia POST /usuario/cadastrar  
2. Controller recebe os dados → transforma em DTO  
3. Controller chama usuarioService.cadastrar(dto)  
4. Service valida: email duplicado, campos obrigatórios, formato de dados  
5. Service chama o Repository para salvar  
6. Repository insere no banco  
7. Service retorna sucesso  
8. Controller devolve JSON para o app  

## 🧪 Casos de Uso

1. 🔐 Usuário Admin cadastrar livros  
- Admin acessa botão “+”  
- Preenche: nome, autor, gênero, descrição, imagem  
- Sistema valida dados  
- Livro é salvo no banco  
- App exibe o novo livro na lista de “Novidades”  

2. 👤 Usuário final consultar livros  
- Visualiza lista  
- Pesquisa por nome/autor  
- Seleciona um livro para ver detalhes  

3. 📧 Sistema valida e-mail duplicado  
- No cadastro, se email já existir, retorna:  

## 🛠️ Como rodar o backend

./gradlew bootRun

### H2 Console  
Acesse: http://localhost:8080/h2-console  
JDBC URL: jdbc:h2:mem:testdb  

## 📱 Como rodar o app

npm install
npx react-native run-android
