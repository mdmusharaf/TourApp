import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useOutletContext } from "react-router-dom";

function AddTour() {
  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [summary, setSummary] = useState("");
  const [imageCover, setSelectedImage] = useState(null);
  const [description, setDescription] = useState("");

  const navigate = useNavigate();
  const { isDark } = useOutletContext();
  // function handleSubmit(e) {
  //   e.preventDefault();
  //   fetch("http://localhost:4000/api/tours", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       name: name,
  //       difficulty: difficulty,
  //       price: price,
  //       duration: duration,
  //       summary: summary,
  //       imageCover: imageCover,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => console.log(data))
  //     .catch((error) => console.error("Error:", error));
  // }
  async function handleSubmit(e) {
    e.preventDefault();
    // console.log("FormData Before Append:", formData.getAll("imageCover"));
    if (
      !name ||
      !difficulty ||
      !price ||
      !duration ||
      !summary ||
      !imageCover ||
      !description
    ) {
      toast.error("Please fill in all the fields before submitting the form");
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("difficulty", difficulty);
    formData.append("price", price);
    formData.append("duration", duration);
    formData.append("summary", summary);
    formData.append("imageCover", imageCover); // Append the image file to the FormData object
    formData.append("description", description); // Append the image file to the FormData object

    // console.log("FormData After Append:", formData.getAll("imageCover"));

    try {
      await fetch("http://localhost:4000/api/tours", {
        method: "POST",
        body: formData,
      });
      setName("");
      setDifficulty("");
      setPrice("");
      setSummary("");
      setDuration("");
      toast.success("Tour Added Successfully!");
      navigate("/");
    } catch {
      alert("Failed to add tour");
    }
  }
  const handleImage = (e) => {
    const file = e.target.files[0];
    // console.log(file);
    // const imgUrl = URL.createObjectURL(file);
    // console.log(imgUrl);
    setSelectedImage(file);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={`${
          isDark ? "bg-customDark" : "bg-customLight"
        } md:px-20 px-12  py-14  pt-28`}>
        <h1
          className={`text-4xl ${
            isDark ? "text-customLight" : "text-customDark"
          }  pb-6 `}>
          Add New Tours Here
        </h1>
        <div className="grid md:grid-cols-2 gap-6 ">
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-4 text-gray-500 text-xl">
              Enter Adventure Name
            </label>
            <input
              type="text"
              className="mb-4  p-2 border-2 rounded "
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor="difficulty" className="mb-4 text-gray-500 text-xl">
              Enter Tour Difficulty
            </label>
            <input
              type="text"
              className="mb-4 p-2 border-2 rounded "
              id="difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            />
            <label htmlFor="price" className="mb-4 text-gray-500 text-xl">
              Enter Tour Price
            </label>
            <input
              type="text"
              className="mb-4 p-2 border-2 rounded "
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="duration" className="mb-4 text-gray-500 text-xl">
              Enter Tour Duration
            </label>
            <input
              type="text"
              className="mb-4 p-2 border-2 rounded "
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
            <label htmlFor="summary" className="mb-4 text-gray-500 text-xl">
              Enter Tour Summary
            </label>
            <input
              type="text"
              className="mb-4 p-2 border-2 rounded "
              id="summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
            {/* <label htmlFor="imageCover" className="mb-4 text-gray-500 text-xl">
              choose imageCover
            </label>
            <input
              type="file"
              accept="image/*"
              name="imageCover"
              className="mb-4 p-1 border-2 text-gray-400  rounded "
              onChange={handleImage}
            /> */}
            <label htmlFor="fileInput" className="mb-4 text-gray-500 text-xl">
              Choose Image
            </label>
            <label
              htmlFor="fileInput"
              className="cursor-pointer flex items-center justify-center py-2 border border-gray-300 rounded-md">
              <svg
                className="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Choose a file
            </label>
            <input
              id="fileInput"
              type="file"
              className="hidden"
              onChange={handleImage}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="description" className="mb-4 text-gray-500 text-xl">
            Enter Description
          </label>
          <textarea
            type="text"
            className="mb-4 p-2 border-2 rounded resize-none"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-orange-400 mt-6 rounded hover:bg-orange-500  text-white p-4">
          Submit
        </button>
      </form>
    </>
  );
}
export default AddTour;
