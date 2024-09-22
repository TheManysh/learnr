"use client";
import React, { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem"; // Adjust this import based on your project structure
import { getVideoById } from "@/app/services/api_services"; // Import your API service for fetching video details

const DraggableCard = ({ videoIds }) => {
  const [items, setItems] = useState([]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const videoDetails = await Promise.all(
          videoIds.map((id) => getVideoById(id)) // Fetch details for each video ID
        );
        setItems(videoDetails);
      } catch (error) {
        console.error("Error fetching video details:", error);
      }
    };

    if (videoIds.length > 0) {
      fetchVideos();
    }
  }, [videoIds]);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        const updatedItems = arrayMove(items, oldIndex, newIndex);

        // Log the updated order to the console
        console.log(
          "New item order:",
          updatedItems.map((item) => item.header)
        );

        return updatedItems;
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-4">
          {items.map((item) => (
            <SortableItem
              key={item._id}
              id={item._id}
              header={item.title} // Assuming video object has a title
              length={item.length} // Assuming video object has a length
              author={item.original_author} // Assuming video object has an author
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default DraggableCard;
