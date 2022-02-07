export type StrapiResponse<T, M> = {
  data: {
    id: number;
    attributes: T;
  };
  meta: M;
};

export type StrapiResponseWithPaging<T> = StrapiResponse<
  T,
  {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  }
>;

export type StrapiResponseArray<T, M> = {
  data: {
    id: number;
    attributes: T;
  }[];
  meta: M;
};

export type StrapiResponseArrayWithPaging<T> = StrapiResponseArray<
  T,
  {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  }
>;
