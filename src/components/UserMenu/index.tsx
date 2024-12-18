import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IUser } from "@/types/auth-context";
import { Avatar, AvatarFallback } from "../ui/avatar";

const UserMenu = ({
  user = {
    username: "Username",
    password: "",
    avatar: "",
  },
  logout = () => console.log("Logout"),
}: {
  user: IUser;
  logout: () => void;
}) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarFallback>{user.username?.[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => console.log("Profile")}>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => console.log("Settings")}>
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={logout}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserMenu;
