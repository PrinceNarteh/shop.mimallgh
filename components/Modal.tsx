import { RiErrorWarningLine } from "react-icons/ri";
import { Button } from "./Button";

interface IModal {
  message: string;
  onDialog: (choose: boolean) => void;
}

export const Modal = ({ message, onDialog }: IModal) => {
  return (
    <div className="absolute top-0 overflow-hidden z-50 inset-0 grid h-full place-content-center bg-gray-800/80">
      <div className="w-full max-w-sm rounded-md bg-gray-900 py-5 px-10">
        <div className="flex flex-col items-center space-y-5 pb-2 text-center text-lg">
          <RiErrorWarningLine className="my-3 text-6xl" />
          <div>
            <p>Are you sure you wan&apos;t to delete</p>
            <p className="mt-0 text-xl font-bold">{message}?</p>
          </div>
          <p>You won&apos;t be able to revert this!</p>
        </div>
        <div className="flex items-center justify-center gap-3">
          <Button onClick={() => onDialog(false)}>No, Cancel</Button>
          <Button onClick={() => onDialog(true)} variant="danger">
            Yes, Delete
          </Button>
        </div>
      </div>
    </div>
  );
};
