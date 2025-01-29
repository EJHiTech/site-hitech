# Como Rodar a Aplicação

---

## Passo 1: Clonar o Repositório
Para obter o código fonte da aplicação:
1. Abra o terminal.
2. Execute o comando para clonar o repositório:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   ```
3. Navegue para o diretório do repositório clonado:
   ```bash
   cd <NOME_DO_REPOSITORIO>
   ```

---

## Passo 2: Instalar o Node.js
1. Acesse o site oficial do Node.js: [Node.js Downloads](https://nodejs.org/).
2. Baixe o instalador adequado ao seu sistema operacional (Windows, macOS ou Linux).
3. Execute o instalador e siga as instruções fornecidas.
4. Após a instalação, verifique a versão instalada executando no terminal:
   ```bash
   node -v
   ```

### Usando NVM (Node Version Manager)
Use o NVM para gerenciar múltiplas versões do Node.js:
1. Instale o NVM seguindo as instruções no repositório oficial: [NVM GitHub](https://github.com/nvm-sh/nvm).
2. Instale a versão necessária do Node.js:
   ```bash
   nvm install <VERSAO_DO_NODE>
   ```
3. Defina a versão instalada como padrão:
   ```bash
   nvm use <VERSAO_DO_NODE>
   ```

---

## Passo 3: Instalar o Angular CLI
1. Certifique-se de que o Node.js está corretamente instalado.
2. No terminal, execute o comando para instalar o Angular CLI globalmente:
   ```bash
   npm install -g @angular/cli
   ```
3. Confirme a instalação verificando a versão:
   ```bash
   ng version
   ```

---

## Passo 4: Rodar o Projeto Angular
1. No diretório do projeto clonado, instale as dependências necessárias:
   ```bash
   npm install
   ```
2. Inicie o servidor de desenvolvimento Angular:
   ```bash
   ng serve
   ```
3. Abra o navegador e acesse a aplicação em [http://localhost:4200](http://localhost:4200).

---

## Passo 5: Instalar o Docker
### 1. Ativar o WSL no Windows
O Docker utiliza o WSL 2 (Windows Subsystem for Linux) como backend no Windows. Para ativá-lo:
1. Abra o PowerShell como administrador.
2. Execute o comando:
   ```bash
   dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
   ```

### 2. Ativar o recurso de Virtual Machine Platform
1. No PowerShell, execute:
   ```bash
   dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
   ```

### 3. Instalar o kernel do WSL 2
1. Baixe e instale o kernel Linux mais recente a partir de: [WSL Kernel Update](https://learn.microsoft.com/pt-br/windows/wsl/install-manual#step-4---download-the-linux-kernel-update-package).

### 4. Definir o WSL 2 como padrão
1. No PowerShell, execute:
   ```bash
   wsl --set-default-version 2
   ```

### 5. Baixar e instalar o Docker Desktop
1. Faça o download do Docker Desktop em: [Docker Downloads](https://www.docker.com/products/docker-desktop).
2. Siga as instruções do instalador, ativando a opção “Use the WSL 2 based engine”.

### 6. Verificar a instalação
1. Após a instalação, confirme que o Docker foi instalado corretamente:
   ```bash
   docker --version
   ```

### 7. Testar o Docker
1. Execute o comando de teste para verificar se o Docker está funcionando corretamente:
   ```bash
   docker run hello-world
   ```

---

## Passo 6: Arquivos Necessários para o Docker
Para garantir que o Docker funcione corretamente, verifique se os seguintes arquivos estão no diretório raiz do projeto:
- `angular.json`
- `nginx.conf`
- `docker-compose.yml`
- `Dockerfile`
- `.dockerignore`

---

## Passo 7: Como Rodar a Aplicação no Docker Desktop
1. Inicie o Docker Desktop.
2. No terminal, navegue até o diretório raiz do projeto.
3. Execute o comando para construir a imagem Docker:
   ```bash
   docker-compose build
   ```
4. Execute o comando para iniciar os containers:
   ```bash
   docker-compose up
   ```
5. Abra o navegador e acesse a aplicação na porta definida (geralmente [http://localhost:4200](http://localhost:4200)).
