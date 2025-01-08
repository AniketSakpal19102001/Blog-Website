import { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import { GoUpload } from "react-icons/go";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteBlogMutation,
  useEditBlogMutation,
  useGetBlogByIdQuery,
} from "../redux/api/blogSlice";
import { toast } from "react-toastify";
function EditBlog() {
  const [heading, setHeading] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [selectedCategory, setSelectedCategory] = useState({});
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const editor = useRef(null);
  const params = useParams();
  const navigate = useNavigate();
  const [editBlog, { isLoading }] = useEditBlogMutation();
  const {
    data: blogData,
    isError,
    isFetching,
  } = useGetBlogByIdQuery(params.id);
  const [deleteBlog, { isLoading: deleteLoad }] = useDeleteBlogMutation();
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setCoverImage(URL.createObjectURL(file)); // Create a link to the uploaded image
  };

  useEffect(() => {
    if (blogData) {
      setHeading(blogData.data.title);
      setCoverImage(blogData.data.imgSrc);
      setTags(blogData.data.tags[0]);
      setContent(blogData.data.content);
    }
  }, [blogData]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", heading);
      formData.append("coverImage", coverImage);
      formData.append("content", content);
      formData.append("tags", tags);

      const response = await editBlog({
        blogId: blogData.data._id,
        data: formData,
      }).unwrap();

      toast.success(response.message, { autoClose: 500 });
      navigate("/home");
    } catch (err) {
      console.log(err);
      toast.error(err.data.message);
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await deleteBlog(id).unwrap();
      console.log(response);
      toast.success(response.message, { autoClose: 500 });
      navigate("/home");
    } catch (err) {
      console.log(err);
      toast.error(err.data.message);
    }
  };
  const handleCategorySelect = (category) => {
    setSelectedCategory(category.value);
    setTags(category.value);
    setSelectedCategoryName(category.label);
    setDropdownOpen(false); // Close the dropdown after selection
    // setValue("tags", category); // Set the selected category in React Hook Form
  };
  const categories = [
    // { label: "Select-Categories", value: "" },
    { label: "Tech & Innovation", value: "Tech-Innovation" },
    { label: "Education & Learning", value: "Education-Learning" },
    { label: "Health, Fitness & Sports", value: "Health-Fitness-Sports" },
    { label: "Entertainment & Lifestyle", value: "Entertainment-Lifestyle" },
    { label: "Personal & Parenting", value: "Personal-Parenting" },
    { label: "Business & Finance", value: "Business-Finance" },
    { label: "Beauty, Fashion & DIY", value: "Beauty-Fashion-DIY" },
    { label: "Travel & Adventure", value: "Travel-Adventure" },
    { label: "Environment", value: "Environment" },
    {
      label: "Politics & Current Affairs",
      value: "Politics-Current-Affairs",
    },
    { label: "Books & Literature", value: "Books-Literature" },
    { label: "Photography & Art", value: "Photography-Art" },
    { label: "Social Media", value: "Social-Media" },
    { label: "Relationship & Dating", value: "Relationship-Dating" },
  ];

  if (isLoading)
    return <div className="py-6 text-center min-h-screen">Saving...</div>;
  if (deleteLoad)
    return <div className="py-6 text-center min-h-screen">Deleting...</div>;

  return (
    <>
      <div className="mx-4 md:mx-20 mt-4 min-h-screen">
        <form onSubmit={handleSubmit} className="">
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => handleDelete(params.id)}
              className="border  border-gray-500 px-4 rounded-md py-2"
            >
              Delete
            </button>
            <button
              type="submit"
              className=" bg-yellow-600 px-4 text-white rounded-md py-2"
            >
              Update
            </button>
          </div>
          <div className="flex-col gap-6">
            <div className=" py-2">
              <label htmlFor="title" className="py-2 mr-2">
                Title:{" "}
              </label>
              <input
                className="py-2 px-2 rounded border"
                id="title"
                type="text"
                placeholder="Title"
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
                required
              />
            </div>
            <div className="py-2 flex relative">
              <label htmlFor="tags" className="py-2 mr-2">
                Tags:
              </label>

              <div
                className="border rounded w-52 p-2 cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {selectedCategoryName || "Select a category"}
              </div>

              {dropdownOpen && (
                <div className="absolute left-11 top-0 mt-2 w-52 max-h-52 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg z-10">
                  <ul>
                    {categories.map((category) => (
                      <li
                        key={category.value}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleCategorySelect(category)}
                      >
                        {category.label}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className=" flex gap-4 items-center py-2">
              <label
                htmlFor="coverIMG"
                className=" flex justify-center items-center gap-2 rounded-lg border-black border px-4 py-2"
              >
                Cover Image <GoUpload />
              </label>
              <input
                id="coverIMG"
                type="file"
                onChange={handleImageChange}
                className="hidden"
              />
              <div>
                {coverImage && (
                  <a
                    href={coverImage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-600"
                  >
                    View Image
                  </a>
                )}
              </div>
            </div>
          </div>
          <JoditEditor
            ref={editor}
            value={content}
            onChange={(newContent) => setContent(newContent)}
            className="my-2"
          />
        </form>
      </div>
    </>
  );
}

export default EditBlog;
// import { useState, useRef, useEffect } from "react";
// import JoditEditor from "jodit-react";
// import { GoUpload } from "react-icons/go";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   useDeleteBlogMutation,
//   useEditBlogMutation,
//   useGetBlogByIdQuery,
// } from "../redux/api/blogSlice";
// import { toast } from "react-toastify";
// function EditBlog() {
//   const [heading, setHeading] = useState("");
//   const [coverImage, setCoverImage] = useState(null);
//   const [content, setContent] = useState("");
//   const [tags, setTags] = useState("");
//   const editor = useRef(null);
//   const params = useParams();
//   const navigate = useNavigate();
//   const [editBlog] = useEditBlogMutation();
//   const {
//     data: blogData,
//     isError,
//     isFetching,
//     refetch,
//   } = useGetBlogByIdQuery(params.id);
//   const [deleteBlog] = useDeleteBlogMutation();
//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     setCoverImage(URL.createObjectURL(file)); // Create a link to the uploaded image
//   };

//   useEffect(() => {
//     if (blogData) {
//       setHeading(blogData.data.title);
//       setCoverImage(blogData.data.imgSrc);
//       setTags(blogData.data.tags[0]);
//       setContent(blogData.data.content);
//     }
//   }, [blogData]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const formData = new FormData();
//       formData.append("title", heading);
//       formData.append("coverImage", coverImage);
//       formData.append("content", content);
//       formData.append("tags", tags);

//       const response = await editBlog({
//         blogId: blogData.data._id,
//         data: formData,
//       }).unwrap();

//       toast.success(response.message, { autoClose: 500 });
//       navigate("/home");
//     } catch (err) {
//       console.log(err);
//       toast.error(err.data.message);
//     }
//   };
//   const handleDelete = async (id) => {
//     try {
//       const response = await deleteBlog(id).unwrap();
//       console.log(response);
//       toast.success(response.message, { autoClose: 500 });
//       navigate("/home");
//     } catch (err) {
//       console.log(err);
//       toast.error(err.data.message);
//     }
//   };
//   return (
//     <>
//       <div className="mx-4 md:mx-20 mt-4 min-h-screen">
//         <form onSubmit={handleSubmit} className="">
//           <div className="flex justify-end gap-4">
//             <button
//               type="button"
//               onClick={() => handleDelete(params.id)}
//               className="border  border-gray-500 px-4 rounded-md py-2"
//             >
//               Delete
//             </button>
//             <button
//               type="submit"
//               className=" bg-yellow-600 px-4 text-white rounded-md py-2"
//             >
//               Update
//             </button>
//           </div>
//           <div className="flex-col gap-6">
//             <div className=" py-2">
//               <label htmlFor="title" className="py-2 mr-2">
//                 Title:{" "}
//               </label>
//               <input
//                 className="py-2 px-2 rounded border"
//                 id="title"
//                 type="text"
//                 placeholder="Title"
//                 value={heading}
//                 onChange={(e) => setHeading(e.target.value)}
//                 required
//               />
//             </div>
//             <div className=" py-2">
//               <label htmlFor="tags" className="py-2 mr-2">
//                 Tags:
//               </label>
//               <input
//                 className="py-2 px-2 rounded border"
//                 id="tags"
//                 type="text"
//                 placeholder="Tags"
//                 value={tags}
//                 onChange={(e) => setTags(e.target.value)}
//                 required
//               />
//             </div>
//             <div className=" flex gap-4 items-center py-2">
//               <label
//                 htmlFor="coverIMG"
//                 className=" flex justify-center items-center gap-2 rounded-lg border-black border px-4 py-2"
//               >
//                 Cover Image <GoUpload />
//               </label>
//               <input
//                 id="coverIMG"
//                 type="file"
//                 onChange={handleImageChange}
//                 className="hidden"
//               />
//               <div>
//                 {coverImage && (
//                   <a
//                     href={coverImage}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="underline text-blue-600"
//                   >
//                     View Image
//                   </a>
//                 )}
//               </div>
//             </div>
//           </div>
//           <JoditEditor
//             ref={editor}
//             value={content}
//             onChange={(newContent) => setContent(newContent)}
//             className="my-2"
//           />
//         </form>
//       </div>
//     </>
//   );
// }

// export default EditBlog;
