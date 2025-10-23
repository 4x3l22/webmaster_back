export interface CreateProductDTO {
  name: string;
  categoryId: number;
  price: number;
  stock: number;
  imageUrl?: string;
  size?: string;
  color?: string;
}

export interface UpdateProductDTO {
  name?: string;
  categoryId?: number;
  price?: number;
  stock?: number;
  imageUrl?: string;
  size?: string;
  color?: string;
}

export interface ProductResponseDTO {
  id: number;
  name: string;
  categoryId: number;
  price: number;
  stock: number;
  imageUrl?: string;
  size?: string;
  color?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductWithCategoryDTO {
  id: number;
  name: string;
  categoryId: number;
  price: number;
  stock: number;
  imageUrl?: string;
  size?: string;
  color?: string;
  createdAt: Date;
  updatedAt: Date;
  category: {
    id: number;
    name: string;
    description?: string;
  };
}
