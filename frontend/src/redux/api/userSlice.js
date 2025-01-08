import { apiSlice } from "./apiSlice";
import { USER_URL } from "../constant";

const userSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USER_URL}/logout`,
        method: "POST",
      }),
    }),
    getNotification: builder.query({
      query: () => ({
        url: `${USER_URL}/notification`,
      }),
    }),
    deleteNotification: builder.mutation({
      query: (notification_id) => ({
        url: `${USER_URL}/notification`,
        method: "PATCH",
        body: { notification_id },
      }),
    }),
    getProfile: builder.query({
      query: () => ({
        url: `${USER_URL}/profile`,
      }),
    }),
    follow: builder.mutation({
      query: (userId) => ({
        url: `${USER_URL}/follow/${userId}`,
        method: "POST",
      }),
    }),
    unfollow: builder.mutation({
      query: (userId) => ({
        url: `${USER_URL}/unfollow/${userId}`,
        method: "PATCH",
      }),
    }),
    save: builder.mutation({
      query: (blogId) => ({
        url: `${USER_URL}/addSaved`,
        method: "POST",
        body: { blogId },
      }),
    }),
    unSave: builder.mutation({
      query: (blogId) => ({
        url: `${USER_URL}/removeSaved`,
        method: "PATCH",
        body: { blogId },
      }),
    }),
    getUserDataById: builder.query({
      query: (userId) => ({
        url: `${USER_URL}/${userId}`,
      }),
    }),
    editAbout: builder.mutation({
      query: (about) => ({
        url: `${USER_URL}/about`,
        method: "PATCH",
        body: { about },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useGetNotificationQuery,
  useDeleteNotificationMutation,
  useGetProfileQuery,
  useFollowMutation,
  useUnfollowMutation,
  useSaveMutation,
  useUnSaveMutation,
  useGetUserDataByIdQuery,
  useEditAboutMutation,
} = userSlice;
