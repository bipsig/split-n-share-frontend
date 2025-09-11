import { apiSlice } from "./apiSlice";

export const transactionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addExpense: builder.mutation({
      query: (expenseData) => ({
        url: 'transactions',
        method: 'POST',
        body: expenseData,
      }),
      transformResponse: (response) => {
        if (!response.success) {
          throw new Error(response.message);
        }
        return response;
      }
    })
  })
})

export const { useAddExpenseMutation } = transactionApi;