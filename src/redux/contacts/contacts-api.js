import axios from 'axios';
import { createApi } from '@reduxjs/toolkit/query/react';

const axiosBaseQuery =
  () =>
  async ({ url, method, body, params }) => {
    try {
      const result = await axios({ url, method, data: body, params });
      return { data: result.data };
    } catch (axiosError) {
      return {
        error: {
          status: axiosError.response?.status,
          data: axiosError.response?.statusText || axiosError.message,
        },
      };
    }
  };

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Contacts'],
  endpoints: builder => ({
    getContacts: builder.query({
      query: () => ({
        url: '/contacts',
        method: 'GET',
      }),
      providesTags: ['Contacts'],
    }),
    addContact: builder.mutation({
      query: body => ({
        url: '/contacts',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Contacts'],
    }),
    removeContact: builder.mutation({
      query: id => ({
        url: `/contacts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contacts'],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useAddContactMutation,
  useRemoveContactMutation,
} = contactsApi;
