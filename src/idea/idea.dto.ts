import { IsString } from 'class-validator';

export class IdeaDTO {
  //Make sure incoming data is of this type
  @IsString()
  idea: string;

  @IsString()
  description: string;
}
