import { Body, Get, HttpCode, JsonController, Post, UseBefore } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

import auth from '@middlewares/auth.middleware';
import { validationMiddleware } from '@middlewares/validation.middleware';
import { IPromptExecutionResponse, IPrompt } from '@models/prompts.model';
import { PromptService } from '@services/v1';

import CreatePromptDto from './dtos/createPrompt.dto';
import ExecutePromptDto from './dtos/executePrompt.dto';

@JsonController('/v1/prompts', { transformResponse: false })
export class PromptController {
  private readonly promptService = new PromptService();

  @Post('/create')
  @HttpCode(201)
  @OpenAPI({ summary: 'create a new prompt' })
  @ResponseSchema(IPrompt)
  @UseBefore(validationMiddleware(CreatePromptDto, 'body'))
  async create(@Body() promptData: CreatePromptDto) {
    const prompt = await this.promptService.createPrompt(promptData);

    return { prompt };
  }

  @Post('/execute')
  @HttpCode(200)
  @OpenAPI({ summary: 'execute a prompt with a given input' })
  @ResponseSchema(IPromptExecutionResponse)
  @UseBefore(validationMiddleware(ExecutePromptDto, 'body'))
  async execute(@Body() executeCommand: ExecutePromptDto) {
    // const prompt = await this.promptService.createPrompt(promptData);
    console.log('executeCommand', executeCommand);
    const promptExecuteResult = 'congrats, you used the prompt!';

    return { rawResponse: promptExecuteResult };
  }

  @Get('/')
  @OpenAPI({ summary: 'get prompts' })
  @ResponseSchema(IPrompt, { isArray: true })
  @UseBefore(auth())
  async register() {
    const prompts = await this.promptService.findAll();

    return { prompts };
  }
}
