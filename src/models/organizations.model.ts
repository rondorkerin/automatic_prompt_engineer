import { IsBoolean, IsDate, IsString } from 'class-validator';
import mongoose, { Document, ObjectId, Schema } from 'mongoose';

import { MODELS } from '@common/constants';
import ITimesStamp from '@common/interfaces/timestamp.interface';
import toJSON from '@utils/toJSON.plugin';

export class IOrganization extends ITimesStamp {
  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsString()
  ownerUserId: ObjectId;
}

export interface IOrganizationSchema extends Document, IOrganization {}

const organizationSchema: Schema = new Schema(
  {
    slug: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    ownerUserId: {
      type: Schema.Types.ObjectId,
      ref: MODELS.USERS,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

organizationSchema.plugin(toJSON);

export default mongoose.model<IOrganizationSchema>(MODELS.ORGANIZATIONS, organizationSchema);
