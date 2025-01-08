import { apiSlice } from "./apiSlice";
import { BLOG_URL } from "../constant";

const blogSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBlog: builder.mutation({
      query: (data) => ({
        url: `${BLOG_URL}/create`,
        method: "POST",
        body: data,
      }),
    }),
    editBlog: builder.mutation({
      query: ({ blogId, data }) => ({
        url: `${BLOG_URL}/edit/${blogId}`,
        method: "PATCH",
        body: data,
      }),
    }),
    toggleLike: builder.mutation({
      query: (blogId) => ({
        url: `${BLOG_URL}/like/${blogId}`,
        method: "POST",
      }),
    }),
    addComment: builder.mutation({
      query: ({ blogId, comment }) => ({
        url: `${BLOG_URL}/comment/${blogId}`,
        method: "POST",
        body: { comment },
      }),
    }),
    getAllBlogs: builder.query({
      query: () => ({
        url: `${BLOG_URL}/all`,
        method: "GET",
      }),
    }),
    getBlogsByTag: builder.query({
      query: (tag) => ({
        url: `${BLOG_URL}/tag/${tag}`,
        method: "GET",
      }),
    }),
    getBlogsByOwner: builder.query({
      query: (ownerId) => ({
        url: `${BLOG_URL}/owner/${ownerId}`,
        method: "GET",
      }),
    }),
    getBlogById: builder.query({
      query: (blogId) => ({
        url: `${BLOG_URL}/${blogId}`,
      }),
    }),
    deleteBlog: builder.mutation({
      query: (blogId) => ({
        url: `${BLOG_URL}/delete/${blogId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateBlogMutation,
  useEditBlogMutation,
  useToggleLikeMutation,
  useAddCommentMutation,
  useGetAllBlogsQuery,
  useGetBlogsByTagQuery,
  useGetBlogsByOwnerQuery,
  useGetBlogByIdQuery,
  useDeleteBlogMutation,
} = blogSlice;
