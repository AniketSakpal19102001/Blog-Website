import { useState } from "react";
import { GoUpload } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useCreateBlogMutation } from "../redux/api/blogSlice";
import { useForm } from "react-hook-form";
import JoditEditor from "jodit-react";
import { toast } from "react-toastify";

function Create() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [createBlog, { isLoading, error }] = useCreateBlogMutation();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setCoverImage(file);
    setValue("coverImage", file); // Set the file in React Hook Form
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category.value);
    setSelectedCategoryName(category.label);
    setDropdownOpen(false); // Close the dropdown after selection
    setValue("tags", category); // Set the selected category in React Hook Form
  };

  const onSubmit = async (data) => {
    // Prepare formData to submit
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("tags", data.tags.value);
    formData.append("content", content);
    formData.append("image", coverImage);
    try {
      const response = await createBlog(formData).unwrap();
      toast.success(response.message, { autoClose: 500 });
      navigate("/home");
    } catch (error) {
      toast.error(error.data.message, { autoClose: 500 });
      console.error("Error creating blog:", error);
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    navigate("/");
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
    return <div className="py-6 text-center min-h-screen">Uploading...</div>;
  return (
    <div className="mx-4 md:mx-20 mt-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-end gap-4">
          {/* <button
            type="submit"
            className="border border-gray-500 px-4 rounded-md py-2"
            disabled={isLoading}
          >
            Save as Draft
          </button> */}
          <button
            type="submit"
            className="bg-green-600 px-4 text-white rounded-md py-2"
            disabled={isLoading}
          >
            Publish
          </button>
        </div>

        <div className="flex-col gap-6">
          <div className="py-2">
            <label htmlFor="title" className="py-2 mr-2">
              Title:
            </label>
            <input
              className="py-2 px-2 rounded border  w-52"
              id="title"
              type="text"
              placeholder="Title"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="text-red-500">{errors.title.message}</p>
            )}
          </div>

          {/* Custom Dropdown */}
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

            {errors.tags && (
              <p className="text-red-500">{errors.tags.message}</p>
            )}
          </div>

          <div className="flex gap-4 items-center py-2">
            <label
              htmlFor="coverIMG"
              className="flex justify-center items-center gap-2 rounded-lg border-black border px-4 py-2 whitespace-nowrap"
            >
              Cover Image <GoUpload />
            </label>
            <input
              id="coverIMG"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <div className="overflow-hidden break-after-avoid">
              {coverImage && coverImage.name ? (
                <span>{coverImage.name}</span>
              ) : null}
            </div>
          </div>
        </div>

        <div className="my-2">
          <JoditEditor
            value={content}
            onChange={(newContent) => setContent(newContent)}
            className="my-2"
          />
        </div>

        {/* Optional: Show error message if there is any */}
        {/* <div className="text-center">
          {error && <p className="text-red-500">Error: {error.message}</p>}
        </div> */}
      </form>
    </div>
  );
}

export default Create;
