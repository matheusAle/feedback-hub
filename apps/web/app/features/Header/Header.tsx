import { Link } from "@remix-run/react";
import { UserAction } from "./UserAction";

export const Header = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" to="/">
          <span className="sr-only">Feedback Hub</span>
          <img
            className="h-8 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt=""
          />
        </Link>
      </div>
      <div className="flex-none">
        <UserAction />
      </div>
    </div>
  );
};
