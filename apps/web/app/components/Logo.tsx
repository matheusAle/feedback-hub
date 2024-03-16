import { ButtonLink } from "./Button";

export const Logo = () => {
  return (
    <ButtonLink variant="text" to="/">
      <span className="sr-only">Feedback Hub</span>
      <img
        className="h-8 w-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        alt=""
      />
    </ButtonLink>
  );
};
