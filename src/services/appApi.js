import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// create api
 
export const appApi = createApi ({
    reducerPath: "appApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://mernshop-ecommerce.herokuapp.com"}),
    endpoints: (builder) => ({

        // signup
        signup: builder.mutation({
            query: (user) => ({
                url: "/users/signup",
                method: "POST",
                body: user,
            }),
        }),

        // login
        login: builder.mutation ({
            query: (user) => ({
                url: "/users/login",
                method: "POST",
                body: user,
            }),
        }),

        //create product
        createProduct: builder.mutation ({
            query: (product) => ({
                url: "/products",
                method: "POST",
                body: product,
            }),
        }),

        // delete product
        deleteProduct: builder.mutation({
            query: ({ product_id, user_id }) => ({
                url: `/products/${product_id}`,
                body: {
                    user_id,
                },
                method: "DELETE",
            }),
        }),

 
        // update product
        updateProduct: builder.mutation({
            query: (product) => ({
                url: `/products/${product.id}`,
                body: product,
                method: 'PATCH',
            }),
        }),

        // add to cart
         addToCart: builder.mutation({
            query: (cartInfo) => ({
                url: '/products/add-to-cart',
                body: cartInfo,
                method: 'POST',
            }),
         }),

         // remove from cart
         removeFromCart: builder.mutation({
            query: (body) => ({
                url: '/products/remove-from-cart',
                body,
                method: "POST",
            }),
         }),

         // increment cart product
         increaseCartProduct: builder.mutation({
            query: (body) => ({
                url: '/products/increase-cart',
                body,
                method: 'POST',
            }),
         }),

         // decrease cart
         decreaseCartProduct: builder.mutation({
            query: (body)=> ({
                url: '/products/decrease-cart',
                body,
                method: 'POST',
            }),
         }),

        // create order
        createOrder: builder.mutation ({
            query: (body) => ({
                url: '/orders',
                method: 'POST',
                body,
            }),
        }),
        
        
    }),
});

export const { 
    useSignupMutation, 
    useLoginMutation, 
    useCreateProductMutation,
    useAddToCartMutation,
    useRemoveFromCartMutation,
    useIncreaseCartProductMutation,
    useDecreaseCartProductMutation,
    useCreateOrderMutation,
    useDeleteProductMutation,
    useUpdateProductMutation
} = appApi;

export default appApi;
