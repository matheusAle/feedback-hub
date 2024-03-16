import { User } from "@/api/types/graphql";
import { AuthGuard } from "@/features/AuthGuard";
import { AuthProvider } from "@/providers/AuthProvider";
import { AuthService } from "@/services/auth.server";
import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await AuthService.isAuthenticatedFromRequest(request);

  if (!user) {
    return redirect("/");
  }

  return {
    user,
  };
};

export default function Screen() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <AuthProvider user={user as User}>
      <AuthGuard>
        <Outlet />
      </AuthGuard>
    </AuthProvider>
  );
}
