import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { IsArray, IsEmail, IsInt, IsOptional, IsString, Min, MinLength } from 'class-validator';

class CreateUserDto {
  @IsEmail() email: string;
  @IsString() @MinLength(2) name: string;
  @IsArray() roles: string[];
  @IsArray() skills: string[];
  @IsInt() @Min(0) availability: number;
}

class UpdateUserDto {
  @IsOptional() @IsEmail() email?: string;
  @IsOptional() @IsString() @MinLength(2) name?: string;
  @IsOptional() @IsArray() roles?: string[];
  @IsOptional() @IsArray() skills?: string[];
  @IsOptional() @IsInt() @Min(0) availability?: number;
}

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> { return this.usersService.findAll(); }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> { return this.usersService.findOne(id); }

  @Post()
  create(@Body() dto: CreateUserDto): Promise<User> { return this.usersService.create(dto as any); }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto): Promise<User> { return this.usersService.update(id, dto as any); }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> { return this.usersService.remove(id); }
}

