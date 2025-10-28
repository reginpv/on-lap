### NEXT CRUD BOILERPLATE

This project is a boilerplate for building CRUD applications using Next.js 15.

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js v22.14.x**  
  Ensure you are using Node.js version `22.14.x` (LTS or latest stable version). You can manage Node versions using tools like `nvm`.

  ```bash
  nvm install 22.14
  nvm use 22.14
  ```

- **Vercel CLI**
  ```bash
  npm install -g vercel
  ```

- **Vercel account**
  Register a hobby account

## Installation

Follow these steps to set up the project:

1. **Clone the repository**:
  ```bash
  git clone https://github.com/reginpv/next-crud-boilerplate.git .
  ```

2. **Install dependencies**:
  ```bash
  npm install
  ```

3. **Set up environment variables**:  
  Run the following command to pull the environment variables managed by Vercel:  
  ```bash
  vercel env pull .env.local
  ```  
  This will create a `.env.local` file in the root directory with the required environment variables.

4. **Run the development server**:
  ```bash
  npm run dev
  ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Important Note on Prisma and Vercel

When using Prisma with Vercel, ensure that you configure the **Framework Settings** correctly. Specifically, override the build command to:

```bash
prisma generate && next build
```

This step is crucial to ensure that Prisma generates the necessary client files before building your Next.js application.


![Screenshot_5](https://github.com/user-attachments/assets/060032fb-05a8-4be4-a44e-b8d549ee78c5)

