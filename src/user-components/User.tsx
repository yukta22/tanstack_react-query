import {
  useDeleteUserData,
  useUpdateUserData,
  useUserdata,
} from "../api/use-user-data";
import { IUser } from "../types/userdata.types";
// import { QueryClient } from "@tanstack/react-query";

const User = () => {
  // const queryClient = new QueryClient();
  const { data: userData, isLoading, isError, error } = useUserdata();
  const { mutate: deleteMutation } = useDeleteUserData();
  const { mutate: updateMutation } = useUpdateUserData();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    const errorMessage = error as Error;

    return <div>Error: {errorMessage.message}</div>;
  }

  const handleDelete = async (id: number) => {
    try {
      console.log(id);
      const resp = deleteMutation(id);
      console.log(resp);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleUpdate = async (id: any) => {
    try {
      const updateData: IUser = {
        id: id,
        title: "abc",
        body: "xyz",
      };
      const resp = updateMutation(updateData);
      console.log(resp);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <div>
      <div style={{ margin: "50px" }}>
        <h2 style={{ textAlign: "center" }}>User Data</h2>
        {userData.map((ele: IUser) => (
          <div
            key={ele.id}
            style={{
              border: "1px solid black",
              margin: "18px",
              padding: "5px 15px ",
            }}
          >
            <p>User Id: {ele.id}</p>
            <p>Title: {ele.title}</p>
            <p>Description: {ele.body}</p>
            <div style={{ display: "flex" }}>
              <button
                style={{ margin: "6px" }}
                onClick={() => handleUpdate(ele.id)}
              >
                update
              </button>
              <button
                style={{ margin: "6px" }}
                onClick={() => handleDelete(ele.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default User;
