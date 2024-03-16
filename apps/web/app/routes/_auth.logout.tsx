import { AuthService } from "@/services/auth.server";
import { ActionFunctionArgs } from "@remix-run/node";

export function action({ request }: ActionFunctionArgs) {
  return AuthService.logoutFromRequest(request);
}

export default function Screen() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="loading loading-lg"></div>
    </div>
  );
}
