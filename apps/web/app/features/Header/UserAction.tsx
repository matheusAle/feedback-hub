import { ButtonLink } from "@/components/Button";
import { useAuth } from "@/providers/AuthProvider";
import { Form } from "@remix-run/react";

export const UserAction = () => {
  const { user } = useAuth();

  if (!user) {
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
    <details className="dropdown dropdown-end">
      <summary className="flex row items-center space-x-4">
        <p className="text-sm font-semibold">hello, {user?.name}</p>
        <div role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img
              alt="User Avatar"
              src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            />
          </div>
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
  );
};
