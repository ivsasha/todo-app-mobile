import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { Todo } from "../types/Todo";
import { TaskService } from "../services/TaskService";

export const useTodoPhotos = (
  currentTodo: Todo | null,
  setCurrentTodo: (todo: Todo) => void
) => {
  const takePhoto = async () => {
    if (!currentTodo) {
      console.error("No current todo found");
      return;
    }

    const photo = await Camera.getPhoto({
      quality: 80,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      allowEditing: false,
    });

    const updatedTodo = { ...currentTodo, photoUrl: photo.dataUrl };
    setCurrentTodo(updatedTodo);

    try {
      await TaskService.update(updatedTodo);
    } catch (error) {
      console.error("Failed to update todo with photo:", error);
      setCurrentTodo(currentTodo);
    }
  };

  const pickFromGallery = async () => {
    try {
      if (!currentTodo) {
        console.error("No current todo found");
        return;
      }

      const photo = await Camera.getPhoto({
        quality: 80,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos,
        allowEditing: false,
      });

      const updatedTodo = { ...currentTodo, photoUrl: photo.dataUrl };
      setCurrentTodo(updatedTodo);

      try {
        await TaskService.update(updatedTodo);
      } catch (error) {
        console.error("Failed to update todo with gallery photo:", error);
        setCurrentTodo(currentTodo);
      }
    } catch (error) {
      console.error("Error picking from gallery:", error);
    }
  };

  return {
    takePhoto,
    pickFromGallery,
  };
};
