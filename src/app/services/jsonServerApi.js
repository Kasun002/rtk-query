import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const jsonServerApi = createApi({
  reducerPath: 'jsonServerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/',
    prepareHeaders: (headers, { getState }) => {
      headers.set('Content-Type', 'application/json')
      // Other than this we can set the jwt token kind of errors in this position
      return headers;
    }
  }),

  tagTypes: ['Albums'],
  endpoints: (builder) => ({
    getAlbums: builder.query({
      query: (page = 1) => `albums?_page=${page}&_limit=10`,
      providesTags: ['Albums'], // Cashing the data inside the store
    }),

    createAlbum: builder.mutation({
      query: (title) => ({
        url: 'albums',
        method: 'POST',
        body: { title },
      }),
      invalidatesTags: ['Albums'], // Refetching data
    }),

    updateAlbum: builder.mutation({
      query: ({ id, title }) => ({
        url: `albums/${id}`,
        method: 'PUT',
        body: { title },
      }),
      invalidatesTags: ['Albums'],
    }),

    deleteAlbum: builder.mutation({
      query: (id) => ({
        url: `albums/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Albums'],
    }),
  }),
});

export const {
  useGetAlbumsQuery,
  useCreateAlbumMutation,
  useUpdateAlbumMutation,
  useDeleteAlbumMutation,
} = jsonServerApi;
