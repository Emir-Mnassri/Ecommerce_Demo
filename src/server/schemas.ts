import * as z from "zod";

export const HealthCheckResponse = z.object({ status: z.string() });

export const ListCategoriesResponseItem = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullish(),
  productCount: z.number(),
});
export const ListCategoriesResponse = z.array(ListCategoriesResponseItem);

export const ListProductsQueryParams = z.object({
  categoryId: z.coerce.number().nullish(),
  search: z.coerce.string().nullish(),
  featured: z.coerce.string().nullish(),
  page: z.coerce.number().nullish(),
  limit: z.coerce.number().nullish(),
});

const ProductShape = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullish(),
  price: z.number(),
  discountPrice: z.number().nullish(),
  isOnSale: z.boolean(),
  imageUrl: z.string().nullish(),
  categoryId: z.number().nullish(),
  categoryName: z.string().nullish(),
  stock: z.number(),
  sku: z.string().nullish(),
  featured: z.boolean(),
  createdAt: z.string(),
});

export const ListProductsResponse = z.object({
  products: z.array(ProductShape),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
});

export const GetFeaturedProductsResponse = z.array(ProductShape);

export const GetProductStatsResponse = z.object({
  totalProducts: z.number(),
  totalCategories: z.number(),
  featuredCount: z.number(),
  byCategory: z.array(
    z.object({
      categoryId: z.number(),
      categoryName: z.string(),
      count: z.number(),
    }),
  ),
});

export const GetProductParams = z.object({ id: z.coerce.number() });
export const GetProductResponse = ProductShape;

export const CreateOrderBody = z.object({
  customerName: z.string(),
  email: z.string(),
  phone: z.string(),
  address: z.string(),
  governorate: z.string(),
  city: z.string(),
  paymentMethod: z.enum(["cash_on_delivery", "flouci"]),
  items: z.array(
    z.object({
      productId: z.number(),
      productName: z.string(),
      quantity: z.number(),
      unitPrice: z.number(),
      totalPrice: z.number(),
    }),
  ),
  notes: z.string().nullish(),
});

export const GetOrderParams = z.object({ id: z.coerce.number() });

export const GetOrderResponse = z.object({
  id: z.number(),
  customerName: z.string(),
  email: z.string(),
  phone: z.string(),
  address: z.string(),
  governorate: z.string(),
  city: z.string(),
  paymentMethod: z.string(),
  status: z.string(),
  subtotal: z.number(),
  shippingFee: z.number(),
  total: z.number(),
  items: z.array(
    z.object({
      productId: z.number(),
      productName: z.string(),
      quantity: z.number(),
      unitPrice: z.number(),
      totalPrice: z.number(),
    }),
  ),
  notes: z.string().nullish(),
  flouciPaymentId: z.string().nullish(),
  createdAt: z.string(),
});

export const InitiateFlouciBody = z.object({
  orderId: z.number(),
  amount: z.number(),
  successUrl: z.string(),
  failUrl: z.string(),
});

export const VerifyFlouciParams = z.object({ paymentId: z.coerce.string() });
