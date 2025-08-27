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
    }),
    getCompleteGroupsSummary: builder.query({
      query: () => ({
        url: 'groups/summary',
      }),
      transformResponse: (response) => {
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.data;
      }
    }),
    getIndividualGroupDetails: builder.query({
      query: (groupId) => ({
        url: `groups/${groupId}`
      }),
      transformResponse: (response) => {
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.data;
      }
    })
  }),
});

export const { useGetUserGroupsQuery, useGetCompleteGroupsSummaryQuery, useGetIndividualGroupDetailsQuery } = groupsApi;
