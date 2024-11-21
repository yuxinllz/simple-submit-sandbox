import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { QuestionCircle } from "lucide-react";

const InstructionsPanel = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className="fixed bottom-8 right-8 h-12 w-12 rounded-full shadow-lg"
        >
          <QuestionCircle className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[440px] sm:w-[540px] overflow-y-auto">
        <div className="space-y-6 text-sm text-gray-600 pr-6">
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
      </SheetContent>
    </Sheet>
  );
};

export default InstructionsPanel;