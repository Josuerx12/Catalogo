export interface Product {
  name: string;
  category: string;
  stock: number;
  unit: string;
  photos: Photo[];
  value: number;
  description: string;
  _id: string;
}

export interface Photo {
  photo: string;
  _id: string;
}

export interface useFetchProducts {
  products?: Product[];
  loading: boolean;
  errors?: Errors;
}

export interface Errors {
  msg: string | string[];
}
