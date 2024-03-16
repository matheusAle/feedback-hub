import { createContext, useContext } from "react";
import { User } from "@/api/types/graphql";

export type State = {
  user: User;
};

const context = createContext<State>(undefined as unknown as State);

export const useAuth = () => useContext(context);

type Props = State & {
  children: React.ReactNode;
};

export const AuthProvider = ({ children, user }: Props) => {
  return <context.Provider value={{ user: user }}>{children}</context.Provider>;
};
