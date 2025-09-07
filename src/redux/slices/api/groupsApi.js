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
      },
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
      },
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
      },
    }),
    getIndividualGroupTransactions: builder.query({
      query: (groupId) => ({
        url: `groups/${groupId}/transactions`
      }),
      transformResponse: (response) => {
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.data;
      },
    }),
    createGroup: builder.mutation({
      query: (groupData) => ({
        url: 'groups',
        method: 'POST',
        body: groupData,
      }),
      transformResponse: (response) => {
        if (!response.success) {
          throw new Error(response.message);
        }
        return response;
      },
    }),
    toggleAdminStatus: builder.mutation({
      query: ({ groupId, username }) => ({
        url: `groups/${groupId}/members/${username}/admin`,
        method: 'PATCH',
      }),
      transformResponse: (response) => {
        if (!response.success) {
          throw new Error(response.message);
        }
        return response;
      },
    })
  }),
});

export const { 
  useGetUserGroupsQuery, 
  useGetCompleteGroupsSummaryQuery, 
  useGetIndividualGroupDetailsQuery, 
  useGetIndividualGroupTransactionsQuery, 
  useCreateGroupMutation,
  useToggleAdminStatusMutation 
} = groupsApi;