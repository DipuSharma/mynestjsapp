import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Query,
  Delete,
  NotFoundException,
  Session,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private authService: AuthService,
  ) {}
  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    // session.userId = user.id;
    if (!user){
      return "User not successfully created"
    }
    else {
      return {'message':"User successfully created", 'data': user}
    }
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }
  @Get('/user')
  currentUser(@Session() session: any) {
    return this.userService.findOne(session.userId);
  }

  @Post('/signout')
  signOut(@Session() session: any) {
    if (!session){
      return {'message':'User session not found.'}
    }
    console.log(session.userId)
    session.userId = null;
    return "User logout successfully"
  }
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.userService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    return user;
  }

  @Get('/')
  async findAllUsers() {
    const users = await this.userService.findAll;
    return users
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.userService.remove(parseInt(id));
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(parseInt(id), body);
  }
}
