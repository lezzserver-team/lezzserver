import type { AxiosInstance } from "axios";
import { stringify } from "qs";

import { api } from "@/lib/api";

import type {
  BaseFindConnectionResponse,
  BaseFindOneRecordDto,
  BaseFindRecordsDto,
  InfiniteRecord,
} from "./types";

export class BaseApi<Entity> {
  api: AxiosInstance = api;
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async findAll(dto?: BaseFindRecordsDto<Entity>): Promise<Entity[]> {
    const filter = this.queryToString(dto);
    const { data } = await this.api.get<Entity[]>(
      `/${this.endpoint}?${filter}`,
    );

    return data;
  }

  async getOneSpesific(dto?: BaseFindRecordsDto<Entity>): Promise<Entity> {
    const filter = this.queryToString(dto);
    const { data } = await this.api.get<Entity>(`/${this.endpoint}?${filter}`);

    return data;
  }

  async findAllConnection(
    dto: BaseFindRecordsDto<Entity>,
  ): Promise<BaseFindConnectionResponse<Entity[]>> {
    const filter = this.queryToString(dto);
    const { data } = await this.api.get<BaseFindConnectionResponse<Entity[]>>(
      `/${this.endpoint}/connection?${filter}`,
    );

    return data;
  }

  async findAllConnectionInfinite(
    dto: BaseFindRecordsDto<Entity>,
    pageParam: number,
  ): Promise<InfiniteRecord<Entity>> {
    const data = await this.findAllConnection({
      ...dto,
      skip: pageParam || 0,
    });

    const take = data.take;
    const skip = data.skip;
    const count = data.count;
    const nextSkip = skip + take;

    const hasMore = Boolean(count < nextSkip ? false : nextSkip);

    return {
      data: data.data,
      hasMore,
      count,
    } as unknown as InfiniteRecord<Entity>;
  }

  async findOne(
    id: string,
    dto?: BaseFindOneRecordDto<Entity>,
  ): Promise<Entity> {
    const filter = this.queryToString(dto);
    const { data } = await this.api.get<Entity>(
      `/${this.endpoint}/${id}?${filter}`,
    );

    return data;
  }

  async create<Dto>(dto: Dto): Promise<Entity> {
    const { data } = await this.api.post<Entity>(`/${this.endpoint}`, dto);

    return data;
  }

  async update<Dto>(id: string, dto: Dto): Promise<Entity> {
    const { data } = await this.api.patch<Entity>(
      `/${this.endpoint}/${id}`,
      dto,
    );

    return data;
  }

  queryToString(dto?: BaseFindRecordsDto<Entity>): string {
    return stringify(dto, { encode: false });
  }
}
