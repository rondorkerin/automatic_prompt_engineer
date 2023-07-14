import { IsJSON, IsNotEmpty, IsString } from 'class-validator';

export default class ExecutePromptDto {
  @IsString()
  @IsNotEmpty()
  key: string; // a unique ID for the prompt

  @IsJSON()
  @IsNotEmpty()
  inputVariables: { [key: string]: any };
}
