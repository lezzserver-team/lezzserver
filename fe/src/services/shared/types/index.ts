export * from "./dto";

export interface BaseFindConnectionResponse<T = unknown> {
  data: T[];
  take: number;
  skip: number;
  count: number;
}

export interface InfiniteRecord<T = unknown> {
  hasMore: number | boolean;
  data: T[];
  count: number;
}

export interface BaseErrorResponse {
  error: string;
  message?: string;
  statusCode: number;
}
