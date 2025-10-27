import React, { useState, useRef, useCallback } from "react";
import { getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { createPost } from "../lib/api.js";
import { fetchPosts } from "../store/slices/postsSlice.js";
import Navbar from "../components/Navbar.jsx";
import { useNavigate, NavLink } from "react-router-dom";
import PostList from "../components/PostList.jsx";

// Simple SVG Icons
const ImageIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-8 w-8 text-gray-500 group-hover:text-orange-600 transition-colors"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <circle cx="8.5" cy="8.5" r="1.5"></circle>
    <polyline points="21 15 16 10 5 21"></polyline>
  </svg>
);
const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
  >
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);
const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4 ml-1 cursor-pointer"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

function CreatePostPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  const [activeView, setActiveView] = useState("sendPost");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [currentTagInput, setCurrentTagInput] = useState("");
  const [explanation, setExplanation] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  // --- Tag Management Logic ---
  const addTag = useCallback(
    (tagText) => {
      const cleanTag = tagText.trim().toLowerCase();
      if (cleanTag && tags.indexOf(cleanTag) === -1) {
        setTags((prev) => [...prev, cleanTag]);
      }
      setCurrentTagInput("");
    },
    [tags]
  );

  const removeTag = useCallback(
    (tagToRemove) => {
      setTags(tags.filter((tag) => tag !== tagToRemove));
    },
    [tags]
  );

  const handleTagInputKeyDown = (e) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      if (currentTagInput.trim()) {
        addTag(currentTagInput);
      }
    } else if (e.key === "Backspace" && !currentTagInput && tags.length > 0) {
      removeTag(tags[tags.length - 1]);
    }
  };
  // --- End Tag Management Logic ---

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    if (!user) {
      setError("You must be logged in to create a post.");
      setIsSubmitting(false);
      return;
    }

    if (currentTagInput.trim()) {
      addTag(currentTagInput);
    }

    try {
      const token = await user.getIdToken();
      const postData = {
        title: title.trim(),
        explanation: explanation.trim(),
        tags: tags,
        imageUrl: `https://source.unsplash.com/random/1200x800?sig=${Math.random()}`,
      };

      await createPost(postData, token);
      dispatch(fetchPosts());

      // ✅ Reset form fields after successful submission
      setTitle("");
      setTags([]);
      setCurrentTagInput("");
      setExplanation("");
      setImageFile(null);
      setImagePreview("");
      fileInputRef.current.value = ""; // clear input field

      // ✅ Switch to posts view after publish
      setActiveView("posts");
    } catch (apiError) {
      setError("Failed to create post. Please try again.");
      console.error("API Error:", apiError);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Dynamic Content Renderer ---
  const renderContent = () => {
    switch (activeView) {
      case "posts":
        return (
          <div className="mt-8">
            <PostList />
          </div>
        );
      case "marked":
        return (
          <div className="bg-white rounded-lg shadow-md p-8 mt-8 text-center py-10 text-gray-500">
            <h3 className="text-xl font-semibold">Saved Posts</h3>
            <p>This section is for marked or saved posts.</p>
          </div>
        );
      case "sendPost":
      default:
        return (
          <div className="bg-white rounded-lg shadow-md p-8 mt-8">
            <div className="flex items-center text-lg text-gray-700 mb-6 space-x-6 border-b pb-4">
              <span className="font-semibold text-gray-800 cursor-pointer">
                - Send Post
              </span>
              <span className="text-gray-400 cursor-pointer hover:text-gray-800 transition-colors">
                Send Video
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        placeholder="Enter post title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-3 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="tags"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Add Tags
                      </label>
                      <div className="w-full p-1 bg-gray-100 border border-gray-200 rounded-md focus-within:ring-2 focus-within:ring-orange-500 transition-shadow flex flex-wrap items-center">
                        {tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center bg-orange-200 text-orange-800 text-xs font-medium mr-2 my-1 px-2.5 py-0.5 rounded-full"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="ml-1 text-orange-600 hover:text-orange-900"
                            >
                              <XIcon />
                            </button>
                          </span>
                        ))}

                        <input
                          type="text"
                          id="tags-input"
                          placeholder={
                            tags.length === 0 ? "e.g., react, node" : ""
                          }
                          value={currentTagInput}
                          onChange={(e) => setCurrentTagInput(e.target.value)}
                          onKeyDown={handleTagInputKeyDown}
                          className="flex-grow p-2 bg-transparent focus:outline-none placeholder-gray-400"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="explanation"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Explanation
                    </label>
                    <div className="bg-gray-100 p-2 rounded-t-md border border-b-0 border-gray-200 flex items-center space-x-2">
                      <button
                        type="button"
                        className="p-2 rounded hover:bg-gray-200 transition-colors group"
                      >
                        <ImageIcon />
                      </button>
                      <button
                        type="button"
                        className="p-2 rounded hover:bg-gray-200 transition-colors font-bold"
                      >
                        Color
                      </button>
                      <button
                        type="button"
                        className="p-2 rounded hover:bg-gray-200 transition-colors"
                      >
                        &lt;/&gt; Text
                      </button>
                      <button
                        type="button"
                        className="p-2 rounded hover:bg-gray-200 transition-colors"
                      >
                        Align
                      </button>
                      <button
                        type="button"
                        className="p-2 rounded hover:bg-gray-200 transition-colors"
                      >
                        Link
                      </button>
                    </div>
                    <textarea
                      id="explanation"
                      placeholder="Type..."
                      rows="12"
                      value={explanation}
                      onChange={(e) => setExplanation(e.target.value)}
                      className="w-full p-3 border bg-gray-50 border-gray-200 rounded-b-md focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none transition-shadow"
                      required
                    ></textarea>
                  </div>
                </div>

                <div className="lg:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Add Image
                  </label>
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-lg p-8 h-full flex flex-col items-center justify-center text-center transition-colors group ${
                      isDragging
                        ? "border-orange-400 bg-orange-50"
                        : "border-gray-300 hover:border-orange-400 hover:bg-orange-50"
                    }`}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      accept="image/*"
                      className="hidden"
                    />
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Post preview"
                        className="max-h-48 rounded-md"
                      />
                    ) : (
                      <>
                        <ImageIcon />
                        <p className="mt-2 text-sm text-gray-500">
                          Drag image here, Paste or{" "}
                          <button
                            type="button"
                            onClick={() => fileInputRef.current.click()}
                            className="font-semibold text-orange-600 hover:underline"
                          >
                            + Select
                          </button>
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-600 bg-red-100 p-3 rounded-md text-center">
                  {error}
                </p>
              )}

              <div className="flex justify-end items-center space-x-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  className="bg-gray-100 text-gray-800 px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transform hover:scale-105 transition-all"
                >
                  Draft
                </button>
                <button
                  type="button"
                  className="bg-gray-100 text-gray-800 px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transform hover:scale-105 transition-all"
                >
                  Preview
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-700 disabled:bg-gray-400 transform hover:scale-105 transition-all"
                >
                  {isSubmitting ? "Publishing..." : "Public"}
                </button>
              </div>
            </form>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="bg-gray-50 border-b border-t border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500 py-2">
            <NavLink
              to="/"
              className="hover:underline hover:text-orange-600 transition-colors"
            >
              Home
            </NavLink>
            <span className="mx-2">&gt;</span>
            <span>Profile Dashboard</span>
          </p>
        </div>
      </div>

      <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div
            className="h-48 bg-cover bg-center rounded-t-lg"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&w=1200&q=80')",
            }}
          ></div>
          <div className="p-6 relative">
            <img
              src={
                user?.photoURL ||
                `https://ui-avatars.com/api/?name=${user?.displayName}&background=random`
              }
              alt="Profile"
              className="absolute -top-12 left-8 w-24 h-24 rounded-full border-4 border-white shadow-lg"
            />
            <div className="pt-12 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {user?.displayName || "User Name"}
                </h2>
                <div className="flex items-center space-x-6 text-gray-500 mt-2">
                  <button
                    onClick={() => setActiveView("marked")}
                    className={`cursor-pointer hover:text-orange-600 transition-colors ${
                      activeView === "marked"
                        ? "font-semibold text-orange-600 border-b-2 border-orange-600 pb-1"
                        : ""
                    }`}
                  >
                    Marked
                  </button>
                  <button
                    onClick={() => setActiveView("sendPost")}
                    className={`cursor-pointer hover:text-orange-600 transition-colors ${
                      activeView === "sendPost"
                        ? "font-semibold text-orange-600 border-b-2 border-orange-600 pb-1"
                        : ""
                    }`}
                  >
                    Send Post
                  </button>
                  <button
                    onClick={() => setActiveView("posts")}
                    className={`cursor-pointer hover:text-orange-600 transition-colors ${
                      activeView === "posts"
                        ? "font-semibold text-orange-600 border-b-2 border-orange-600 pb-1"
                        : ""
                    }`}
                  >
                    Posts
                  </button>
                </div>
              </div>
              <button className="bg-white text-orange-600 px-4 py-2 rounded-lg text-sm font-semibold border border-orange-600 hover:bg-orange-50 transition-colors">
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {renderContent()}
      </div>
    </div>
  );
}

export default CreatePostPage;
