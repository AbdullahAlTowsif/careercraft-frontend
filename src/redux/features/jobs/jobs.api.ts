import { baseApi } from "@/redux/baseApi";

export const jobsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createJob: builder.mutation({
            query: (payload) => ({
                url: "/jobs",
                method: "POST",
                data: payload,
            }),
            invalidatesTags: ["JOBS"],
        }),
        getAllJobs: builder.query({
            query: () => ({
                url: "/jobs",
                method: "GET",
            }),
            providesTags: ["JOBS"],
        }),
        getSingleJob: builder.query({
            query: (id) => ({
                url: `/jobs/${id}`,
                method: "GET"
            }),
            providesTags: ["JOBS"],
        }),
        // adminUpdateProfile: builder.mutation({
        //     query: ({ id, payload }) => ({
        //         url: `/user/${id}`,
        //         method: "PATCH",
        //         data: payload,
        //     }),
        //     invalidatesTags: ["USER"],
        // }),
    }),
});

export const {
    useCreateJobMutation,
    useGetAllJobsQuery,
    useGetSingleJobQuery
} = jobsApi;