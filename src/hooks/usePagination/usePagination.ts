import { Product } from "../../interfaces/product/productInterface";
import { User } from "../../interfaces/user/userInterface";

type Props = {
  items?: Product | Product[] | User | User[];
  perPage: number;
  page: number;
};

type FunctionReturn = {
  actualPage: number;
  total: number;
  totalPages: number;
  items?: (Product | User)[];
};

export const usePagination = ({
  items,
  perPage,
  page,
}: Props): FunctionReturn => {
  const offset = perPage * (page - 1);
  const totalPages = Array.isArray(items)
    ? Math.ceil(items.length / perPage)
    : 0;
  const paginatedItems = Array.isArray(items)
    ? items.slice(offset, perPage * page)
    : undefined;

  return {
    actualPage: offset,
    total: Array.isArray(items) ? items.length : 0,
    totalPages: totalPages,
    items: paginatedItems,
  };
};
