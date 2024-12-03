import { useEffect, useState } from "react";
import { deleted, get } from "../services/ApiEndPoints";
import toast from "react-hot-toast";

export default function Admin() {
  const [users, setUsers] = useState("");

  useEffect(() => {
    const GetUsers = async () => {
      try {
        const request = await get("/api/admin/getuser");
        const respnse = request.data;
        if (request.status === 200) {
          setUsers(respnse.users);
        }
      } catch (error) {
        console.log(error);
      }
    };
    GetUsers();
  }, [users]);

  const handleDelet = async (id) => {
    try {
      const request = await deleted(`/api/admin/delete/${id}`);
      const response = request.data;
      if (request.status === 200) {
        toast.success(response.message);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  };
  return (
    <>
      <div className="admin-container">
        <h2>Mange Users</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((elem, index) => (
                  <tr key={index}>
                    <td>{elem.name}</td>
                    <td>{elem.email}</td>
                    <td>
                      <button onClick={() => handleDelet(elem._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
