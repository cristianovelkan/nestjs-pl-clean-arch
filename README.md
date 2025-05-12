# How to Download and Execute the App

Follow these steps to download and run the application:

## Prerequisites

1. Ensure you have [Docker](https://www.docker.com/) installed or [Node.js](https://nodejs.org/) installed (version 16 or higher).
2. Install [Git](https://git-scm.com/) to clone the repository.
3. Optionally, install a package manager like [Yarn](https://yarnpkg.com/) (if not using pnpm).

## Steps to Download and Run

### 1. **Clone the Repository**

  ```bash
  git clone https://github.com/cristianovelkan/nestjs-pl-clean-arch
  ```  

### 2. **Navigate to the Project Directory**

  ```bash
  cd nestjs-pl-clean-arch
  ```

### 3. **Set Up Environment Variables**

- Create a `.env` file in the root directory and add the required environment variables as specified in `.env.example`. or copy the `.env.example` and rename it to `.env`

### 4. **Run docker environment**
  
  ```bash
  docker compose -f 'docker-compose.yml' up -d --build
  ```

4.1. *or Install Dependencies without docker*:
  
  Using pnpm:

  ```bash
  pnpm install
  ```

  Or using Yarn:

  ```bash
  yarn install
  ```

4.2. **Run the Application**:

  In development mode:

  ```bash
  npm run start:dev
  ```

  Or in production mode:

  ```bash
  npm run start:prod
  ```

## Access the Application

  Open your browser and navigate to:

  ```
  http://localhost:3000
  ```

## Access the Application Swagger Docs

  Open your browser and navigate to:

  ```
  http://localhost:3000/api
  ```

## Access Api HealthCheck

  Open your browser and navigate to:

  ```
  http://localhost:3000/health
  ```

## Additional Commands

- **Run Tests**:

  ```bash
  npm run test
  ```
