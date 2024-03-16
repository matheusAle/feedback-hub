import { Button } from "@/components/Button";
import { Logo } from "@/components/Logo";
import { FormField } from "@/components/TextField";
import { ActionError } from "@/features/ActionError";
import { useIsActionRunning } from "@/hooks/useIsActionRunning";
import { AuthService } from "@/services/auth.server";
import { ActionFunctionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";

export function action({ request }: ActionFunctionArgs) {
  return AuthService.authenticateFromRequest(request);
}

export function ErrorBoundary() {
  return <Screen />;
}

export default function Screen() {
  const isLoading = useIsActionRunning("/register");

  return (
    <div className="relative flex flex-col items-center justify-center h-screen overflow-hidden">
      <div className="card shadow-xl border-top w-full  md:w-96 lg:max-w-lg bg-base-200">
        <div className="card-body">
          <div className="flex flex-col space-y-2 items-center mb-3">
            <Logo />
            <h1 className="card-title">Feedback HUb</h1>
          </div>
          <Form method="post">
            <FormField
              className="mb-4"
              label="Username"
              name="username"
              required
              pattern="^\S+$"
              defaultValue="matheus_1"
            />
            <FormField
              className="mb-6"
              label="Password"
              name="password"
              type="password"
              defaultValue="123456"
              required
            />

            <div className="card-actions">
              <Button type="submit" className="w-full" loading={isLoading}>
                Login
              </Button>
            </div>

            <ActionError />
          </Form>
        </div>
      </div>
    </div>
  );
}
