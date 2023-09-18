import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteUserData, fetchUserData, updateUserData } from "../http-client";
import { IUser } from "../types/userdata.types";

export const useUserdata = () => {
  return useQuery({
    queryKey: ["userdata"],
    queryFn: () => fetchUserData(),
  });
};

export const useDeleteUserData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteUserData"],
    mutationFn: (id: any) => deleteUserData(id),
    onSuccess: (deletedId) => {
      console.log("Deleted ID:", deletedId);
      queryClient.setQueryData<IUser[]>(["userdata"], (oldData) => {
        if (!oldData) return [];

        return oldData.filter((item: any) => item.id !== deletedId);
      });
    },
  });
};

export const useUpdateUserData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateUserData"],
    mutationFn: (updateData: IUser) => updateUserData(updateData), // Replace with your update function
    onMutate: (updatedData: IUser) => {
      console.log(updatedData);

      queryClient.setQueryData<IUser[]>(["userdata"], (oldData) => {
        if (!oldData) return [];

        const updatedIndex = oldData.findIndex(
          (item) => item.id === updatedData.id
        );
        if (updatedIndex !== -1) {
          oldData[updatedIndex] = updatedData;
        }

        return [...oldData];
      });
    },
    onSuccess: () => {
      console.log("Data updated successfully");
    },
    onError: (error) => {
      console.error("Error updating data:", error);
    },
  });
};
