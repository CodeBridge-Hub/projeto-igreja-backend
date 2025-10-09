# Usa a imagem oficial mais recente do Node.js
FROM node:22-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copia os arquivos de definição de dependência
COPY package*.json ./

# Instala as dependências do projeto (Express, Sequelize, etc.)
RUN npm install

# Copia todo o código-fonte restante do projeto (src/, public/, etc.)
COPY . .

# Expõe a porta que o Express está rodando
EXPOSE 3000

# Comando para iniciar o servidor Express
# O 'npm start' deve ser configurado no seu package.json como: "start": "node src/app.js"
CMD [ "npm", "start" ]