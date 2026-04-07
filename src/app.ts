import express from 'express';
import { envs } from './config';
import { GithubController } from './presentation';
import { GithubSha256Middleware } from './presentation/middlewares/github-sha256.middleware';

(async () => {
  main();
})();

async function main() {
  const app = express();
  const controller = new GithubController();

  app.use(express.json());

  app.use(GithubSha256Middleware.verifyGithubSignature);

  app.post('/api/github', controller.webhookHandler);

  app.listen(envs.PORT, () => {
    console.log(`Server running on port ${envs.PORT}`);
  });
}
