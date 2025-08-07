import { apiSlice } from "./apiSlice";

export const groupsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserGroups: builder.query({
      query: () => ({
        url: 'groups/my-groups',
      }),
      transformResponse: (response) => {
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.data;
      }
    })
  })
})

export const { useGetUserGroupsQuery } = groupsApi