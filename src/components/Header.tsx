import { ReactNode } from "react";

interface HeaderProps {
  image: {
    src: string;
    alt: string;
  };
  children: ReactNode;
}
// type HeaderProps = PropsWithChildren<HeaderBaseProps>;

// const Header: FC<HeaderProps> = ({ children }) => {
//   return <header>{children}</header>;
// };
// export default Header;

const Header = ({ children, image }: HeaderProps) => {
  return (
    <header>
      <img {...image} />
      {children}
    </header>
  );
};
export default Header;
