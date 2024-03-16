import { useNavigation } from "@remix-run/react";

export const useIsActionRunning = (action: string) => {
  const navigation = useNavigation();

  return navigation.formAction === action;
};
