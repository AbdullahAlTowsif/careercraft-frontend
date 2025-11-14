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
        getSingleResource: builder.query({
            query: (id) => ({
                url: `/learn/${id}`,
                method: "GET"
            }),
            providesTags: ["RESOURCE"],
        }),
    }),
});

export const {
    useGetAllResourceQuery
} = resourceApi;