export interface Range {
  start: number;
  end: number;
}

export interface IPage {
  page: number;
  perPage: number;
}

export interface IPageable<T> extends IPage {
  items: T[];
  total: number;
}

export const EmptyPage = {
  items: [],
  page: 0,
  perPage: 0,
  total: 0,
};

export function PageToRange(page: IPage) {
  return {
    start: page.page * page.perPage,
    end: page.page * page.perPage + (page.perPage - 1),
  };
}
