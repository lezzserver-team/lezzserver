import type { QueryKey } from "@tanstack/react-query";
import { stringify } from "qs";

import type { BaseFindOneRecordDto, BaseFindRecordsDto } from "./types";

export class QueryKeyFactory<T> {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  all(): QueryKey {
    return [this.endpoint];
  }

  paginations(): QueryKey {
    return [...this.all(), "pagination"];
  }

  pagination(filters?: BaseFindRecordsDto<T>): QueryKey {
    return [
      ...this.paginations(),
      { filters: stringify(filters, { encode: false }) },
    ];
  }

  lists(): QueryKey {
    return [...this.all(), "list"];
  }

  list(filters?: BaseFindRecordsDto<T>): QueryKey {
    return [
      ...this.lists(),
      { filters: stringify(filters, { encode: false }) },
    ];
  }

  details(): QueryKey {
    return [...this.all(), "detail"];
  }

  detail(id: string, filters?: BaseFindOneRecordDto<T>): QueryKey {
    if (filters)
      return [
        ...this.details(),
        id,
        { filters: stringify(filters, { encode: false }) },
      ];

    return [...this.details(), id];
  }

  create(): QueryKey {
    return [...this.all(), "create"];
  }

  update(): QueryKey {
    return [...this.all(), "update"];
  }

  delete(): QueryKey {
    return [...this.all(), "delete"];
  }
}
