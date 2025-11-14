import { baseApi } from "@/redux/baseApi";

export const resourceApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // createJob: builder.mutation({
        //     query: (payload) => ({
        //         url: "/jobs",
        //         method: "POST",
        //         data: payload,
        //     }),
        //     invalidatesTags: ["JOBS"],
        // }),
        getAllResource: builder.query({
            query: () => ({
                url: "/learn",
                method: "GET",
            }),
            providesTags: ["RESOURCE"],
        }),
        // getSingleJob: builder.query({
        //     query: (id) => ({
        //         url: `/jobs/${id}`,
        //         method: "GET"
        //     }),
        //     providesTags: ["JOBS"],
        // }),
    }),
});

export const {
    useGetAllResourceQuery
} = resourceApi;