import { Alert, AlertDescription } from "./ui/alert";
import { AlertCircle, X } from "lucide-react";
import { Button } from "./ui/button";

interface ErrorToastProps {
  error: string | null;
  onDismiss: () => void;
}

export function ErrorToast({ error, onDismiss }: ErrorToastProps) {
  if (!error) return null;

  return (
    <Alert className="mb-6 border-red-200 bg-red-50">
      <AlertCircle className="h-4 w-4 text-red-600" />
      <AlertDescription className="text-red-800 pr-8">
        {error}
      </AlertDescription>
      <Button
        variant="ghost"
        size="sm"
        onClick={onDismiss}
        className="absolute right-2 top-2 h-6 w-6 p-0 text-red-600 hover:text-red-800"
      >
        <X className="h-4 w-4" />
      </Button>
    </Alert>
  );
}