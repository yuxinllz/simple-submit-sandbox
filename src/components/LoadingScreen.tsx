import { Loader2 } from "lucide-react";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-lg font-medium text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;