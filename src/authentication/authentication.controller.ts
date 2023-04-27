import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateUserInput } from 'src/user/dto/create-user.input';
import { AuthenticationService } from './authentication.service';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  create(@Body() createAuthenticationDto: CreateUserInput) {
    return this.authenticationService.create(createAuthenticationDto);
  }
}
