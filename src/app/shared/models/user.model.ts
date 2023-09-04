export interface User {
  items: Users[];
  meta: Meta;
  links: Links;
}

export interface Users {
  id: number;
  name: string;
  username: string;
  email: string;
  role: string;
}

export interface Meta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface Links {
  first: string;
  previous: string;
  next: string;
  last: string;
}
