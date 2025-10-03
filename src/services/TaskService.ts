import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { Todo } from "../types/Todo";
import { vibrateOnAction } from "./vibration";

const tasksRef = collection(db, "tasks");


export const TaskService = {
  // отримати всі завдання тільки для поточного користувача
  async add(task: Omit<Todo, "id">): Promise<string> {
    const docRef = await addDoc(tasksRef, task);

    vibrateOnAction();

    return docRef.id; // повертаємо правильний id
  },

  // отримати всі
  async getAll(userId: string): Promise<Todo[]> {
    const q = query(tasksRef, where("userId", "==", userId));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((d) => ({
      id: d.id, // беремо id документа з Firestore
      ...(d.data() as Omit<Todo, "id">),
    }));
  },

  async update(task: Todo) {
    const docRef = doc(db, "tasks", task.id);

    const updateData: Omit<Todo, "id"> = {
      title: task.title,
      completed: task.completed,
      userId: task.userId,
    };

    if (task.photoUrl !== undefined) {
      updateData.photoUrl = task.photoUrl;
    }

    if (task.dueDate !== undefined) {
      updateData.dueDate = task.dueDate;
    }

    if (task.description !== undefined) {
      updateData.description = task.description;
    }

    await updateDoc(docRef, updateData);
  },

  async remove(id: string) {
    const docRef = doc(db, "tasks", id);
    await deleteDoc(docRef);
  },
};
