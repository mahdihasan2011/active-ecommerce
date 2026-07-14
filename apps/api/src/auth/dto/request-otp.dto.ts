import { IsNotEmpty, IsString, Matches } from 'class-validator';

  export class RequestOtpDto {
    @IsNotEmpty()
    @IsString()
    @Matches(/^\+?[1-9]\d{1,14}$/, { message: 'Phone number must be a valid E.164 number' })
    phoneNumber!: string;
  }
