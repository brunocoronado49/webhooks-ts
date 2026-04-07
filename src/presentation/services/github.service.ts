import { GithubIssuePayload, GithubStarPayload } from '../../interfaces';

export class GithubService {
  constructor() {}

  public onStar(payload: GithubStarPayload): string {
    const { action, sender, repository } = payload;

    return `User ${sender.login} ${action} star on ${repository.name}`;
  }

  public onIssue(payload: GithubIssuePayload): string {
    const { action, issue } = payload;

    if (action === 'opened') {
      return `An Issue was oppened with title ${issue.title}`;
    }

    if (action === 'closed') {
      return `An Issue was closed by ${issue.user.login}`;
    }

    if (action === 'reopened') {
      return `An Issue was reopened by ${issue.user.login}`;
    }

    return `Unhandled action fore the issue event ${action}`;
  }
}
