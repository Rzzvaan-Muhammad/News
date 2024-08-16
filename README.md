This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
# News

# Dockerizing the Next.js 13 Application

## Prerequisites
- Docker must be installed on your machine.

## Building the Docker Image

1. Clone the repository:
    ```bash
    git clone git@github.com:Rzzvaan-Muhammad/News.git
    cd News
    ```

2. Build the Docker image:
    ```bash
    docker build -t News .
    ```

## Running the Application in a Docker Container

1. Start the container:
    ```bash
    docker run -p 3000:3000 News
    ```

2. Open your browser and go to `http://localhost:3000` to view the application.

## Managing the Container

- **Stop the container:**
    ```bash
    docker ps
    docker stop <container_id>
    ```

- **Remove the container:**
    ```bash
    docker rm <container_id>
    ```

- **Remove the Docker image:**
    ```bash
    docker rmi nextjs-frontend-app
    ```

## Environment Variables

Ensure that any environment variables required by your Next.js application are specified in the `.env` file.

## Additional Notes

- Make sure to update the `.dockerignore` file to exclude unnecessary files.
- Use multi-stage builds for optimized images if your application grows in complexity.
