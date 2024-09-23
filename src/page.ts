export interface Range {
  start: number;
  end: number;
}

export interface Page {
  page: number;
  perPage: number;
}

export function PageToRange(page: Page) {
  return {
    start: page.page * page.perPage,
    end: page.page * page.perPage + (page.perPage - 1),
  };
}
