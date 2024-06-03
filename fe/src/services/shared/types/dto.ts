export interface BaseFindRecordsDto<T = Record<string, unknown>> {
  select?: Partial<Record<keyof T, unknown>>;
  include?: Partial<Record<keyof T, unknown>>;
  orderBy?: Partial<Record<keyof T, unknown>>;
  where?: Partial<Record<keyof T, unknown>>;
  cursor?: Partial<Record<keyof T, unknown>>;
  take?: number;
  skip?: number;
}

export type BaseFindOneRecordDto<T = Record<string, unknown>> = Omit<
  BaseFindRecordsDto<T>,
  "orderBy" | "where" | "cursor" | "take" | "skip"
>;

export interface BaseUpdateDto<T = Record<string, unknown>> {
  id: string;
  data: T;
}
