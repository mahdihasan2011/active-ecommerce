import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-facebook';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get<string>('FACEBOOK_CLIENT_ID') || 'facebook-dummy-client-id',
      clientSecret: configService.get<string>('FACEBOOK_CLIENT_SECRET') || 'facebook-dummy-client-secret',
      callbackURL: configService.get<string>('FACEBOOK_CALLBACK_URL') || 'http://localhost:5000/api/auth/facebook/callback',
      profileFields: ['id', 'emails', 'name', 'photos'],
      scope: ['email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: (err: any, user: any, info?: any) => void,
  ): Promise<any> {
    const { name, emails, photos } = profile;
    const user = {
      email: emails?.[0]?.value || `${profile.id}@facebook.com`,
      firstName: name?.givenName || '',
      lastName: name?.familyName || '',
      picture: photos?.[0]?.value || '',
      accessToken,
    };
    done(null, user);
  }
}
