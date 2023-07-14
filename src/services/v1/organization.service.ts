import bcrypt from 'bcrypt';
import { ObjectId } from 'mongoose';
import { BadRequestError } from 'routing-controllers';

import CRUD from '@common/interfaces/crud.interface';
import Organizations, { IOrganization, IOrganizationSchema } from '@models/organizations.model';
import CreateOrganizationDto from '@v1/organization/dtos/createOrganization.dto';

export class OrganizationService implements CRUD<IOrganization> {
  private readonly organizationModel = Organizations;

  async createOrganization(organizationData: CreateOrganizationDto) {
    const organization = await this.organizationModel.create({ ...organizationData });
    return organization;
  }

  async getById(id: ObjectId): Promise<IOrganizationSchema | null> {
    return await this.organizationModel.findById(id);
  }

  async updateById(id: ObjectId, updateBody: Partial<IOrganization>): Promise<IOrganizationSchema | null> {
    const organization = await this.getById(id);
    if (!organization) {
      throw new BadRequestError('Organization not found');
    }

    Object.assign(organization, updateBody);
    await organization.save();
    return organization;
  }

  async findAll(query = {}, limit = 10, page = 0) {
    const totalDocs = await this.organizationModel.countDocuments(query);
    const docs = await this.organizationModel
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
