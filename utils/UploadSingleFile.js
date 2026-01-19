import axios from "axios";
import { axiosError, axiosWithCreds } from "./AxiosInstance";

export async function uploadSingleFile(listItem, dirID, navigate, setError) {
  const { name, size, type } = listItem;
  try {
    const { data, status } = await axiosWithCreds.post(
      "/file/upload/initiate",
      { name, size, contentType: type, folderID: dirID },
    );
    if (status === 200) {
      const { uploadSignedUrl, fileID } = data;
      return { status, uploadSignedUrl, fileID };
    }
  } catch (error) {
    const message = "Failed to initiate file upload";
    axiosError(error, navigate, setError, message);
  }
}

export async function startSingleUpload(
  dirID,
  listItem,
  uploadSignedUrl,
  fileID,
  handleDirectoryDetails,
  navigate,
  setError,
  setUpdate,
  setUploadFilesList,
) {
  const { file, type, size, name, id } = listItem;
  // console.log(listItem);
  // console.log(type);
  let contentType = type || "application/octet-stream";
  if (name.endsWith(".md")) contentType = "text/markdown";

  try {
    const res = await axios.put(uploadSignedUrl, file, {
      headers: { "Content-Type": contentType },
      onUploadProgress: (evt) => {
        if (evt.total) {
          const progress = Math.round((evt.loaded / evt.total) * 100);
          // console.log({ progress });
          updateFileProgress(id, progress, setUploadFilesList);
        }
      },
    });

    if (res.status === 200 || res.status === 201) {
      await axiosWithCreds.post("/file/upload/complete", { fileID, size });
      handleDirectoryDetails(dirID);
      setUpdate((prev) => [...prev, `File "${name}" uploaded`]);
      setTimeout(() => setUpdate((prev) => prev.slice(1)), 3000);
      setUploadFilesList((prev) => prev.slice(1));
      handleDirectoryDetails(dirID);
    }
  } catch (error) {
    const message = "Failed to upload file";
    axiosError(error, navigate, setError, message);
    handleDirectoryDetails(dirID);
  }
}

function updateFileProgress(id, progress, setUploadFilesList) {
  // console.log(id, progress);
  setUploadFilesList((prev) =>
    prev.map((file) => (file.id === id ? { ...file, progress } : file)),
  );
}
