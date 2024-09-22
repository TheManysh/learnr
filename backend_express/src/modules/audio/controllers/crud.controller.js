import { Audio } from "../models/audio.model.js"; // Adjust path as necessary

// Function to create an audio entry
export async function createAudio(req, res) {
  try {
    const audio = new Audio(req.body);
    await audio.save();
    return res.status(201).json({
      message: "Success",
      data: audio,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      errors: error.errors,
      message: "Validation Error",
    });
  }
}

// Function to edit an audio entry by ID
export async function editAudio(req, res) {
  const { id } = req.params;
  try {
    const audio = await Audio.findById(id);
    if (!audio) {
      return res.status(404).json({ message: "Audio not found." });
    }

    // Update the audio with the provided data
    Object.assign(audio, req.body);
    await audio.save();
    return res.status(200).json({ message: "Audio updated successfully!" });
  } catch (error) {
    return res.status(400).json({ message: "Update failed.", error });
  }
}

// Function to delete an audio entry by ID
export async function deleteAudio(req, res) {
  const { id } = req.params;
  try {
    const audio = await Audio.findById(id);
    if (!audio) {
      return res.status(404).json({ message: "Audio not found." });
    }

    await Audio.findByIdAndDelete(id);
    return res.status(200).json({ message: "Audio deleted successfully!" });
  } catch (error) {
    return res.status(400).json({ message: "Delete failed.", error });
  }
}
