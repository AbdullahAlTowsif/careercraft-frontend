import { baseApi } from "@/redux/baseApi";

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        userUpdateProfile: builder.mutation({
            query: ({ id, payload }) => ({
                url: `/user/${id}`,
                method: "PATCH",
                data: payload,
            }),
            invalidatesTags: ["USER"],
        }),
    }),
});

export const {
    useUserUpdateProfileMutation
} = userApi;
