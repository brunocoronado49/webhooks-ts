import { Request, Response } from 'express';
import { GithubService, DiscordService } from '../';

export class GithubController {
  constructor(
    private readonly githubService = new GithubService(),
    private readonly discordService = new DiscordService()
  ) {}

  public webhookHandler = (req: Request, res: Response) => {
    const githubEvent = req.header('x-github-event') ?? 'unknown';
    const payload = req.body;
    let message: string;

    switch (githubEvent) {
      case 'star':
        message = this.githubService.onStar(payload);
        break;
      case 'issues':
        message = this.githubService.onIssue(payload);
        break;
      default:
        message = `Unknown event ${githubEvent}`;
        break;
    }

    this.discordService
      .notify(message)
      .then(() => res.status(202).json('Accepted'))
      .catch(() => res.status(500).json({ error: 'Internal server error' }));
  };
}
