import WebCam from "react-webcam";
import {
  CircleStop,
  Loader,
  Mic,
  RefreshCw,
  Save,
  Video,
  VideoOff,
  WebcamIcon,
} from "lucide-react";
import { TooltipButton } from "@/components/tooltip-button";
import { useEffect, useState, useRef, useMemo } from "react";
import { toast } from "sonner";
import { chatSession } from "@/scripts/ai-studio";
import { SaveModal } from "@/components/save-modal";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/config/firebase-config";
import { useAuth } from "@clerk/clerk-react";
import { useParams } from "react-router";

interface RecordAnswerProps {
  question: { question: string; answer: string };
  isWebCam: boolean;
  setIsWebCam: (value: boolean) => void;
}

interface AIResponse {
  ratings: number;
  feedback: string;
}

export const RecordAnswer = ({ question, isWebCam, setIsWebCam }: RecordAnswerProps) => {
  const [transcript, setTranscript] = useState("");
  const [listening, setListening] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiResult, setAiResult] = useState<AIResponse | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const { userId } = useAuth();
  const { interviewId } = useParams();

  // Initialize SpeechRecognition
  useEffect(() => {
    if (!("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) return;

    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => setListening(true);
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) finalTranscript += event.results[i][0].transcript;
      }
      setTranscript(finalTranscript);
    };
    recognition.onerror = () => setListening(false);
    // recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;
  }, []);

  // Only update userAnswer while listening
  useMemo(() => {
    if (listening) setUserAnswer(userAnswer + transcript);
  }, [transcript, listening]);

  const startListening = async () => {
    if (!recognitionRef.current) return toast.error("Speech recognition not supported");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      setTranscript("");
      recognitionRef.current.start();
    } catch {
      toast.error("Microphone access denied");
    }
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
  };

  const recordUserAnswer = async () => {
    if (listening) {
      stopListening();
      if (userAnswer.length < 30) return toast.error("Answer must be at least 30 characters");
      const aiRes = await generateResult(question.question, question.answer, userAnswer);
      setAiResult(aiRes);
    } else {
      startListening();
    }
  };

  const cleanJsonResponse = (responseText: string) => {
    let cleanText = responseText.trim();

    cleanText = cleanText.replace(/```json|```/gi, "");

    try {
      return JSON.parse(cleanText);
    } catch (error) {
      console.error("Cleaned text that failed JSON.parse:", cleanText);
      throw new Error("Invalid JSON format: " + (error as Error)?.message);
    }
  };


  const generateResult = async (
    qst: string,
    qstAns: string,
    userAns: string
  ): Promise<AIResponse> => {
    setIsAiGenerating(true);

    const prompt = `
                    Question: "${qst}"
                    User Answer: "${userAns}"
                    Correct Answer: "${qstAns}"

                    Compare the user's answer to the correct answer and give:
                    1. A "ratings" field (number from 1-10).
                    2. A "feedback" field (string with improvement advice).

                    Return ONLY a valid JSON object. Do not include explanations, markdown, or code fences. 
                    Format must be exactly:

                    {
                      "ratings": <number>,
                      "feedback": "<string>"
                    }`;


    try {
      const aiResult = await chatSession.sendMessage(prompt);
      const parsedResult: AIResponse = cleanJsonResponse(aiResult.response.text());
      return parsedResult;
    } catch (error) {
      console.log(error);
      toast("Error", {
        description: "An error occurred while generating feedback.",
      });
      return { ratings: 0, feedback: "Unable to generate feedback" };
    } finally {
      setIsAiGenerating(false);
    }
  };


  const recordNewAnswer = () => {
    setTranscript("");
    setUserAnswer("");
    stopListening();
  };

  const saveUserAnswer = async () => {
    if (!aiResult) return;
    setLoading(true);
    try {
      const q = query(
        collection(db, "userAnswers"),
        where("userId", "==", userId),
        where("question", "==", question.question)
      );
      const snap = await getDocs(q);
      if (!snap.empty) return toast.info("Already answered");
      const ref = await addDoc(collection(db, "userAnswers"), {
        mockIdRef: interviewId,
        question: question.question,
        correct_ans: question.answer,
        user_ans: userAnswer,
        feedback: aiResult.feedback,
        rating: aiResult.ratings,
        userId,
        createdAt: serverTimestamp(),
      });
      await updateDoc(doc(db, "userAnswers", ref.id), { id: ref.id, updatedAt: serverTimestamp() });
      toast.success("Saved");
      setOpen(false);
    } catch {
      toast.error("Failed to save answer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-8 mt-4">
      {/* save modal */}
      <SaveModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={saveUserAnswer}
        loading={loading}
      />

      <div className="w-full h-[400px] md:w-96 flex flex-col items-center justify-center border p-4 bg-gray-50 rounded-md">
        {isWebCam ? (
          <WebCam
            onUserMedia={() => setIsWebCam(true)}
            onUserMediaError={() => setIsWebCam(false)}
            className="w-full h-full object-cover rounded-md"
          />
        ) : (
          <WebcamIcon className="min-w-24 min-h-24 text-muted-foreground" />
        )}
      </div>

      {/* action buttons group */}
      <div className="flex items-center justify-center gap-3">
        <TooltipButton
          content={isWebCam ? "Turn Off" : "Turn On"}
          icon={
            isWebCam ? (
              <VideoOff className="min-w-5 min-h-5" />
            ) : (
              <Video className="min-w-5 min-h-5" />
            )
          }
          onClick={() => setIsWebCam(!isWebCam)}
        />

        <TooltipButton
          content={listening ? "Stop Recording" : "Start Recording"}
          icon={
            listening ? (
              <CircleStop className="min-w-5 min-h-5" />
            ) : (
              <Mic className="min-w-5 min-h-5" />
            )
          }
          onClick={recordUserAnswer}
        />

        <TooltipButton
          content="Record Again"
          icon={<RefreshCw className="min-w-5 min-h-5" />}
          onClick={recordNewAnswer}
        />

        <TooltipButton
          content="Save Result"
          icon={
            isAiGenerating ? (
              <Loader className="min-w-5 min-h-5 animate-spin" />
            ) : (
              <Save className="min-w-5 min-h-5" />
            )
          }
          onClick={() => setOpen(!open)}
          disabled={!aiResult}
        />
      </div>

      <div className="w-full mt-4 p-4 border rounded-md bg-gray-50">
        <h2 className="text-lg font-semibold">Your Answer:</h2>
        <textarea
          value={userAnswer}
          onChange={(e) => {
            setUserAnswer(e.target.value);
            e.target.style.height = "auto";
            e.target.style.height = e.target.scrollHeight + "px";
          }}
          className="text-md mt-2 text-gray-700 w-full resize-none overflow-hidden border-none focus:outline-none focus:ring-0 min-h-32"
          placeholder="Start recording to see your answer here"
        />

      </div>
    </div>
  );
};
