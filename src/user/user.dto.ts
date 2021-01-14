import { IsNotEmpty } from 'class-validator';

export class UserDTO {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}

//Response Object
export class UserRO {
  id: string;
  username: string;
  created: Date;
  token?: string;
}
