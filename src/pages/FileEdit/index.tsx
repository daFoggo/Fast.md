import { useParams } from "react-router-dom";
import MarkdownEditor from "@/components/MarkdownEditor";
import { MARKDOWN_IP } from "@/utils/ip";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { IFile } from "@/types/file-list";

const FileEdit = () => {
  const { fileId } = useParams();
  const [fileData, setFileContent] = useState<IFile>();

  useEffect(() => {
    const fetchFileContent = async () => {
      try {
        const response = await axios.get(`${MARKDOWN_IP}/${fileId}`);
        if (response.status === 200) {
          setFileContent(response.data);
        } else {
          toast.error("Failed to fetch file content");
        }
      } catch (error) {
        toast.error("Failed to fetch file content");
        console.error(error);
      }
    };

    if (fileId) {
      fetchFileContent();
    }
  }, [fileId]);

  return <div>{fileData && <MarkdownEditor fileData={fileData} />}</div>;
};

export default FileEdit;
