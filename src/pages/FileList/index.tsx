import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IFile } from "@/types/file-list";
import { MARKDOWN_IP } from "@/utils/ip";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { ArrowRight, FilePlus2, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as z from "zod";
import { formSchema } from "./constant";
import { format } from "date-fns";

const FileList = () => {
  const [isGetting, setIsGetting] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  const [fileDatas, setFileDatas] = useState<IFile[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  useEffect(() => {
    handleGetAllFiles();
  }, []);

  const handleGetAllFiles = async () => {
    setIsGetting(true);
    try {
      const response = await axios.get(MARKDOWN_IP);
      if (response.status === 200) {
        setFileDatas(response.data.content);
      } else {
        toast.error("Failed to fetch files");
      }
    } catch (error) {
      toast.error("Failed to fetch files");
      console.error(error);
    } finally {
      setIsGetting(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsCreating(true);
    try {
      const response = await axios.post(MARKDOWN_IP, {
        title: values.title.trim(),
        content: "",
        tagIds: [],
      });
      if (response.status === 200 || response.status === 201) {
        toast.success("File created successfully");
        setIsDialogOpen(false);
        form.reset();
        console.log("navigating")
        navigate(`/edit/${response.data.id}`);
        console.log("navigated")
      }
    } catch (error) {
      toast.error("Failed to create file");
      console.error(error);
    } finally {
      setIsCreating(false);
    }
  };

  if (isGetting) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-4 min-h-screen flex flex-col gap-4">
      <div className="flex justify-end items-center">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-fit rounded-full">
              Create new
              <FilePlus2 className="ml-2 size-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[95%] rounded-lg sm:w-[425px]">
            <DialogTitle>Create new markdown</DialogTitle>
            <DialogDescription></DialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Enter file name..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isCreating} className="w-full">
                  {isCreating ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      Creating
                    </>
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="ml-2 size-4" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {fileDatas.map((file) => (
          <Card
            key={file.id.toString()}
            className="hover:shadow-md select-none cursor-pointer hover:border-primary"
            onClick={() => navigate(`/edit/${file.id}`)}
          >
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                {file.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {file.content}
              </p>
            </CardContent>
            <CardFooter className="flex justify-end items-center text-xs text-muted-foreground">
                <span>{format(new Date(file.createdAt), "MMM dd, yyyy")}</span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FileList;
