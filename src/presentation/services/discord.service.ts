import { envs } from '../../config';

const gifurl: string =
  'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2xmc3d1YjlzYTZ2dXR3Y3BoNTd1cmpvODBjano0dnF3M3BwdHRhdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26FL0ydLDEcARWY0g/giphy.gif';

export class DiscordService {
  private readonly discordWebhookUrl: string = envs.DISCORD_WEBHOOK_URL;

  constructor() {}

  public async notify(message: string): Promise<boolean> {
    const body = {
      content: message,
      embeds: [
        {
          image: {
            url: gifurl,
          },
        },
      ],
    };

    const response = await fetch(this.discordWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.log('Error sending message to discord');
      return false;
    }

    return true;
  }
}
