import { ISkill, UpdateSkill } from '~/types/skill.type';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const skillApi = createApi({
  reducerPath: 'skillApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
  tagTypes: ['Skill'],
  endpoints: (builder) => ({
    getAllSkills: builder.query<ISkill[], void>({
      query: () => '/skills',
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ id }) => ({ type: 'Skill', id }) as const),
              { type: 'Skill', id: 'LIST' },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: 'Skill', id: 'LIST' }],
    }),
    deleteSkill: builder.mutation<void, string>({
      query: (id: string) => ({
        url: `/skills/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Skill', id }],
    }),
    updateSkill: builder.mutation<ISkill, UpdateSkill>({
      query: ({ id, ...updateData }) => ({
        url: `/skills/${id}`,
        method: 'PUT',
        body: updateData,
      }),
      invalidatesTags: ['Skill'],
    }),
    getOneSkill: builder.query<ISkill, number>({
			query: (id: number) => `/skills/${id}`,
		}),
  }),
});

export const {
  useGetAllSkillsQuery,
  useDeleteSkillMutation,
  useUpdateSkillMutation,
  useGetOneSkillQuery,
} = skillApi;
