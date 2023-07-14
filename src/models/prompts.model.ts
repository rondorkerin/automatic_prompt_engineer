import bcrypt from 'bcrypt';
import { IsBoolean, IsString } from 'class-validator';
import mongoose, { ObjectId, Document, Schema } from 'mongoose';

import { MODELS } from '@common/constants';
import ITimesStamp from '@common/interfaces/timestamp.interface';
import toJSON from '@utils/toJSON.plugin';

export class IPrompt extends ITimesStamp {
  @IsString()
  organizationId: ObjectId;

  @IsString()
  parentPromptId: ObjectId;

  @IsString()
  key: string; // a unique ID for the prompt

  @IsString()
  prompt: string;
}

export class IPromptExecutionResponse extends ITimesStamp {
  @IsString()
  rawResponse: string;
}

export interface IPromptSchema extends Document, IPrompt {}

const promptSchema: Schema = new Schema(
  {
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: MODELS.ORGANIZATIONS,
      required: true,
      trim: true,
    },
    parentPromptId: {
      type: Schema.Types.ObjectId,
      ref: MODELS.PROMPTS,
      required: false,
      trim: true,
      default: null,
    },
    key: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
      private: true,
    },
    prompt: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

promptSchema.plugin(toJSON);

export default mongoose.model<IPromptSchema>(MODELS.PROMPTS, promptSchema);
