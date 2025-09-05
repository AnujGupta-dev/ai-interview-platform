import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { doc, getDoc } from "firebase/firestore";
import { Lightbulb, Sparkles, WebcamIcon } from "lucide-react";
import WebCam from "react-webcam";

import { db } from "@/config/firebase-config";

import { LoaderPage } from "@/views/loader-page";
import { CustomBreadCrumb } from "@/components/custom-bread-crumb";
import { Button } from "@/components/ui/button";
import { InterviewPin } from "@/components/interview-pin";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import type { Interview } from "@/types";
import { useAuth } from "@clerk/clerk-react";

export const MockLoadPage = () => {
  const { interviewId } = useParams<{ interviewId: string }>();
  const [interview, setInterview] = useState<Interview | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isWebCamEnabled, setIsWebCamEnabled] = useState(false);
  const { userId } = useAuth();

  const navigate = useNavigate();

  if (!interviewId) {
    navigate("/generate", { replace: true });
  }

  useEffect(() => {
    if (interviewId) {
      const fetchInterview = async () => {
        setIsLoading(true);
        try {
          const interviewDoc = await getDoc(doc(db, "interviews", interviewId));
          if (interviewDoc.exists() && interviewDoc.data()?.userId === userId) {
            setInterview({ ...interviewDoc.data() } as Interview);
          } else {
            navigate("/generate", { replace: true });
          }
        } catch (error) {
          console.log(error);
          toast("Error", {
            description: "Something went wrong. Please try again later..",
          });
        } finally {
          setIsLoading(false);
        }
      };

      fetchInterview();
    }
  }, [interviewId, navigate]);

  if (isLoading) {
    return <LoaderPage className="w-full h-[70vh]" />;
  }

  return (
    <div className="flex flex-col w-full gap-8 py-5 animate-fade-in">
      <div className="flex items-center justify-between w-full gap-2 animate-slide-up">
        <CustomBreadCrumb
          breadCrumbPage={interview?.position || ""}
          breadCrumpItems={[{ label: "Mock Interviews", link: "/generate" }]}
        />

        <Link to={`/generate/interview/${interviewId}/start`}>
          <Button size={"sm"} className="gradient-primary hover:shadow-lg transition-all duration-300 hover-glow">
            Start <Sparkles className="ml-2" />
          </Button>
        </Link>
      </div>

      {interview && (
        <div className="animate-slide-up">
          <InterviewPin data={interview} onMockPage />
        </div>
      )}

      <Alert className="gradient-card border-amber-200/50 p-6 rounded-xl flex items-start gap-4 animate-scale-in hover-lift">
        <div className="flex items-start gap-4">
          <Lightbulb className="h-6 w-6 text-amber-600 mt-1 flex-shrink-0" />
          <div className="space-y-3">
            <AlertTitle className="text-amber-800 dark:text-amber-200 font-bold text-lg">
              Important Information
            </AlertTitle>
            <AlertDescription className="text-amber-700 dark:text-amber-300 leading-relaxed">
              Please enable your webcam and microphone to start the AI-generated
              mock interview. The interview consists of five questions. You'll
              receive a personalized report based on your responses at the end.
              <br />
              <br />
              <span className="font-semibold">Note:</span> Your video is{" "}
              <strong>never recorded</strong> - you can disable your webcam at any
              time.
            </AlertDescription>
          </div>
        </div>
      </Alert>

      <div className="flex items-center justify-center w-full h-full animate-fade-in">
        <div className="w-full h-[400px] md:w-96 flex flex-col items-center justify-center gradient-card p-6 rounded-xl border border-border/50 hover-lift">
          {isWebCamEnabled ? (
            <WebCam
              audio={true}
              width={320}
              height={240}
              className="rounded-lg shadow-lg"
            />
          ) : (
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto">
                <WebcamIcon className="w-10 h-10 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-foreground">
                  Enable Webcam
                </h3>
                <p className="text-sm text-muted-foreground">
                  Click the button below to enable your webcam for the interview
                </p>
              </div>
              <Button 
                onClick={() => setIsWebCamEnabled(!isWebCamEnabled)}
                className="gradient-primary hover:shadow-lg transition-all duration-300 hover-glow"
              >
                Enable Webcam <WebcamIcon className="ml-2 w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};