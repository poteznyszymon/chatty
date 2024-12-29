import { ArrowLeft, Check, ImagePlus, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { UseLayoutContext } from "@/context/LayoutContext";
import UserAvatar from "../shared/UserAvatar";
import { useForm } from "react-hook-form";
import {
  editProfileSchema,
  editProfileValues,
} from "../../../../src/validation/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { User } from "@/types/user";
import { ChangeEvent, useEffect, useState } from "react";
import CustomTooltip from "../shared/CustomTooltip";
import useEditUserData from "@/hooks/users/useEditUserData";
import { useQuery } from "@tanstack/react-query";

interface EditProfileDrawerProps {
  className?: string;
}

const EditProfileDrawer = ({ className }: EditProfileDrawerProps) => {
  const { isEditProfileOpen, setIsEditProfileOpen } = UseLayoutContext();
  const { data: user } = useQuery<User | null>({ queryKey: ["auth-user"] });
  const [showButton, setShowButton] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const { editUser, isLoading } = useEditUserData();

  const form = useForm<editProfileValues>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      firstName: user?.firstName,
      secondName: user?.secondName,
      username: user?.username,
      image: null,
    },
  });

  const values = form.getValues();

  useEffect(() => {
    setShowButton(
      values.firstName !== user?.firstName ||
        values.secondName !== user?.secondName ||
        values.username !== user?.username ||
        image !== null
    );
  }, [user?.firstName, user?.secondName, user?.username, values, image]);

  const onSubmit = (values: editProfileValues) => {
    editUser(values);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setImage(reader.result as string);
          form.setValue("image", reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className={cn(
        className,
        `duration-500  xl:duration-300 transition-all z-30 h-full absolute ${
          isEditProfileOpen ? "left-0" : "-left-[65rem] lg:-left-[26rem]"
        }`
      )}
    >
      <div className="flex-1 flex flex-col gap-5">
        <div className="px-3 w-full h-[3.5rem] flex gap-3 items-center">
          <CustomTooltip text="Back">
            <div
              onClick={() => {
                setShowButton(false);
                setIsEditProfileOpen(false);
                setImage(null);
              }}
              className="p-2 rounded-full text-muted-foreground flex items-center justify-center hover:bg-secondary cursor-pointer"
            >
              <ArrowLeft />
            </div>
          </CustomTooltip>
          <h1 className="text-center font-medium mr-auto">Edit Profile</h1>
        </div>
        <label
          htmlFor="image-input"
          className="flex flex-col items-center gap-3 mt-5"
        >
          <div className="overflow-hidden rounded-full relative group cursor-pointer">
            <UserAvatar
              url={image ? image : user?.imageUrl ? user.imageUrl : ""}
              className="size-[9rem] "
            />
            <input
              onChange={(e) => handleImageChange(e)}
              type="file"
              hidden
              id="image-input"
            />
            <div className="absolute bg-card/50 size-full flex items-center justify-center rounded-full p-2  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <ImagePlus className="size-10 group-hover:size-14 duration-300" />
            </div>
          </div>
        </label>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 px-3"
          >
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground">
                    First Name
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="secondName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground">
                    Second Name
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            {isEditProfileOpen && (
              <button
                className={`bg-primary p-3 rounded-full fixed right-20 lg:left-[22rem] lg:right-auto flex items-center justify-center duration-300 ${
                  showButton ? "bottom-5 " : "-bottom-20 "
                }`}
              >
                {!isLoading ? (
                  <Check className="size-6" />
                ) : (
                  <Loader2 className="size-6 animate-spin" />
                )}
              </button>
            )}
          </form>
        </Form>
        <div className="bg-accent px-3 py-3 text-sm text-muted-foreground flex flex-col gap-1">
          <p>
            You can choose a username on{" "}
            <span className="font-bold">Chatty</span>, so people will be able to
            find you by this username
          </p>
          <p>
            You can use <span className="font-bold">a-Z, 0-9</span>. Minum
            lenght is 6 characters.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EditProfileDrawer;
