import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Header } from "@/features/Header";
import { AuthProvider } from "@/providers/AuthProvider";
import { AuthService } from "@/services/auth.server";
import { User } from "@/api/types/graphql";

export const meta: MetaFunction = () => {
  return [
    { title: "Feedback Hub" },
    { name: "description", content: "Welcome to Feedback Hub" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await AuthService.isAuthenticatedFromRequest(request);

  return {
    user,
  };
};

export default function Index() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <AuthProvider user={user as User}>
      <div>
        <Header />
        <h1>Feedback Hub</h1>
      </div>
    </AuthProvider>
  );
}
