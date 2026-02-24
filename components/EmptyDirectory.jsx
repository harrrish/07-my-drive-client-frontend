import { BiFolderOpen } from "react-icons/bi";

export default function EmptyDirectory() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] text-textSecondary">
      <BiFolderOpen className="text-4xl mb-2" />
      <span className="text-md">Empty folder</span>
    </div>
  );
}
