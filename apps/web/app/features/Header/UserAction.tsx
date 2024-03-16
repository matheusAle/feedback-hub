import { ButtonLink } from "@/components/Button";
import { useAuth } from "@/providers/AuthProvider";
import { Form } from "@remix-run/react";

export const UserAction = () => {
  const auth = useAuth();

  if (!auth || !auth?.user) {
    return (
      <div className="flex space-x-4">
        <ButtonLink to="/login" variant="text">
          Login
        </ButtonLink>
        <ButtonLink to="/register" variant="primary">
          Register
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="flex space-x-4">
      <ButtonLink to="/feedback/post">Post Feedback</ButtonLink>
      <details className="dropdown dropdown-end">
        <summary role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img
              alt="User Avatar"
              src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            />
          </div>
        </summary>
        <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52">
          <li>
            <Form action="/logout" method="post" className="flex">
              <button type="submit" className="menu-title !w-full block">
                Logout
              </button>
            </Form>
          </li>
        </ul>
      </details>
    </div>
  );
};
