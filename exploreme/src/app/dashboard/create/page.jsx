"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DraggableCard from "@/components/DraggableCard";
import { Textarea } from "@/components/ui/textarea";
import { createCourse } from "@/app/services/api_services"; // Adjust the import path

const CreateCourse = () => {
  const [url, setURL] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "video/mp4") {
      setVideoFile(file);
      console.log("MP4 file selected:", file);
    } else {
      console.error("Please select a valid MP4 file.");
      setVideoFile(null);
    }
  };

  const importVideos = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await createCourse(url);
      setVideos(data.data.video_id); // Assuming the API returns a list of video IDs
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle the video file upload logic here if needed
  };

  return (
    <div className="flex flex-col space-y-5">
      <h1 className='text-lg font-semibold text-blue-600'>Course</h1>
      <div className="flex items-center space-x-2 bg-gray-100 p-2 rounded-lg w-full">
        <Input
          type="text"
          value={url}
          onChange={(e) => setURL(e.target.value)}
          placeholder="import from playlist ..."
          className="flex-1 border border-gray-500 outline-none bg-transparent text-gray-700 placeholder-gray-500 shadow-md focus-visible:ring-0"
        />
        <Button
          onClick={importVideos} // Call the import function on click
          className="bg-blue-500 p-5 text-base rounded-xl hover:scale-x-105 hover:text-gray-200 hover:bg-blue-700 transition-all duration-500"
          disabled={loading} // Disable button when loading
        >
          {loading ? "Importing..." : "Import"}
        </Button>
      </div>
      {error && <p className="text-red-500 text-center">{error}</p>}{" "}
      {/* Display error */}
      <p className="flex justify-center">or</p>
      <div className="flex justify-center">
        <Dialog>
          <DialogTrigger className="bg-blue-500 text-white rounded-xl hover:bg-blue-800 w-[200px] p-3">
            Create course
          </DialogTrigger>
          <DialogContent className="bg-slate-100 p-10">
            <DialogHeader>
              <DialogTitle className="text-center">Upload Video</DialogTitle>
              <DialogDescription>
                <div className="p-5">
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                      <div className="flex flex-col space-y-2">
                        <Label>Title</Label>
                        <Input
                          type="text"
                          onChange={(e) => setTitle(e.target.value)}
                          value={title}
                          placeholder="Enter your title"
                          required
                          className="rounded-xl h-12"
                        />
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Label>Description</Label>
                        <Textarea
                          onChange={(e) => setDesc(e.target.value)}
                          value={desc}
                          placeholder="Enter your description"
                          required
                          className="rounded-xl resize-none"
                        />
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Label>Video</Label>
                        <Input
                          type="file"
                          onChange={handleFileChange}
                          required
                          className="rounded-xl h-12"
                        />
                      </div>
                    </div>
                    <div className="mt-5">
                      <Button
                        className="bg-blue-500 p-5 text-base rounded-xl w-full hover:scale-x-105 hover:text-gray-200 hover:bg-blue-700 transition-all duration-500"
                        type="submit"
                      >
                        Upload
                      </Button>
                    </div>
                  </form>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div>
        {/* Pass the video IDs to DraggableCard */}
        <DraggableCard videoIds={videos} />
      </div>
    </div>
  );
};

export default CreateCourse;
