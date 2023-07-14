import { IsNotEmpty, IsString } from 'class-validator';

export default class CreatePromptDto {
  @IsString()
  parentPromptId: string;

  @IsString()
  @IsNotEmpty()
  key: string; // a unique ID for the prompt

  @IsString()
  @IsNotEmpty()
  prompt: string;
}
