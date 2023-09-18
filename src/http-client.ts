import { IUser } from "./types/userdata.types";
import ky from "ky-universal";

export const fetchUserData = async (): Promise<IUser[]> => {
  // const response = await fetch("https://jsonplaceholder.typicode.com/posts"); // Replace with your API endpoint
  // if (!response.ok) {
  //   throw new Error("Network response was not ok");
  // }
  // return response.json();

  const response: IUser[] = await ky(
    "https://jsonplaceholder.typicode.com/posts"
  ).json();
  console.log("response", response);

  return response;
};

export const updateUserData = async (updateData: IUser) => {
  return updateData;
};
export const deleteUserData = async (id: number) => {
  return id;
};
