import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IUser } from "@/types/auth-context";
import { Avatar, AvatarFallback, } from "../ui/avatar";

const UserMenu = ({
  user = {
    name: "U",
    role: "User",
  },
}: {
  user: IUser;
}) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarFallback>{user.name?.[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => console.log("Profile")}>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => console.log("Settings")}>
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => console.log("Logout")}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserMenu;
