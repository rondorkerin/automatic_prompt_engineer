import bcrypt from 'bcrypt';
import { ObjectId } from 'mongoose';
import { BadRequestError } from 'routing-controllers';

import CRUD from '@common/interfaces/crud.interface';
import Prompts, { IPrompt, IPromptSchema } from '@models/prompts.model';
import CreatePromptDto from '@v1/prompt/dtos/createPrompt.dto';

export class PromptService implements CRUD<IPrompt> {
  private readonly promptModel = Prompts;

  async createPrompt(promptData: CreatePromptDto) {
    const prompt = await this.promptModel.create({ ...promptData });
    return prompt;
  }

  async getById(id: ObjectId): Promise<IPromptSchema | null> {
    return await this.promptModel.findById(id);
  }

  async updateById(id: ObjectId, updateBody: Partial<IPrompt>): Promise<IPromptSchema | null> {
    const prompt = await this.getById(id);
    if (!prompt) {
      throw new BadRequestError('Prompt not found');
    }

    Object.assign(prompt, updateBody);
    await prompt.save();
    return prompt;
  }

  async findAll(query = {}, limit = 10, page = 0) {
    const totalDocs = await this.promptModel.countDocuments(query);
    const docs = await this.promptModel
      .find(query)
      .limit(limit)
      .skip(limit * page)
      .sort({ createdAt: -1 })
      .lean();

    return {
      docs: JSON.parse(JSON.stringify(docs)),
      meta: {
        totalDocs,
        totalPages: Math.ceil(totalDocs / limit) || 0,
        page,
      },
    };
  }
}
