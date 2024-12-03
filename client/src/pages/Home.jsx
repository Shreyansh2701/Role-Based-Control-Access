import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { post } from "../services/ApiEndPoints";
import { logout } from "../redux/authSlice";

export default function Home() {
  const user = useSelector((state) => state.auth.user);

  const navigate = useNavigate();
  const disptach = useDispatch();
  const gotoAdmin = () => {
    navigate("/admin");
  };
  const handleLogout = async () => {
    try {
      const request = await post("/api/auth/logout");
      const respone = request.data;
      if (request.status == 200) {
        disptach(logout());
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="home-container">
        <div className="user-card">
          <h2> Welcome,{user && user.name}</h2>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
          {user && user.role == "admin" ? (
            <button className="admin-btn" onClick={gotoAdmin}>
              Go To admin
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
