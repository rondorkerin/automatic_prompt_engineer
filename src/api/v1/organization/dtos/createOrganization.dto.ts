import { IsEmail, IsLowercase, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ObjectId } from 'mongoose';

export default class CreateOrganizationDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(40)
  organizationName: string;

  @MinLength(6)
  @IsLowercase()
  organizationSlug: string;

  @MinLength(6)
  @IsLowercase()
  ownerUserId: ObjectId;
}
