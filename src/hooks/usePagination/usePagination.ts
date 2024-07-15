import { L_ELLIPISIS, R_ELLIPISIS } from "../../constants/ellipisis";

type Props = {
  totalPages: number;
  currentPage: number;
};

type FunctionReturn = {
  currentPage: number;
  avaiablePages: number[];
};

const generatePages = (page: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }).map((_, i) => i + 1);
  }
  if (page < 3) {
    return [1, 2, 3, L_ELLIPISIS, totalPages - 1, totalPages];
  }
  if (page === 3) {
    return [1, 2, 3, 4, L_ELLIPISIS, totalPages - 1, totalPages];
  }

  if (page > totalPages - 2) {
    return [1, 2, L_ELLIPISIS, totalPages - 2, totalPages - 1, totalPages];
  }

  if (page === totalPages - 2) {
    return [
      1,
      2,
      L_ELLIPISIS,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [1, L_ELLIPISIS, page - 1, page, page + 1, R_ELLIPISIS, totalPages];
};

export const usePagination = ({
  currentPage,
  totalPages,
}: Props): FunctionReturn => {
  const pages = generatePages(Number(currentPage), Number(totalPages));
  return {
    currentPage,
    avaiablePages: pages,
  };
};
