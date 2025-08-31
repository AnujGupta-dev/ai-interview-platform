import type { Interview } from "@/types";
import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { TooltipButton } from "./tooltip-button";
import { Newspaper, Pencil, Sparkles, Trash2 } from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
  collection,
  doc,
  getDocs,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import { db } from "@/config/firebase-config";
import { useAuth } from "@clerk/clerk-react";

interface InterviewPinProps {
  data: Interview;
  onMockPage?: boolean;
}

export const InterviewPin = ({
  data,
  onMockPage = false,
}: InterviewPinProps) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const { userId } = useAuth();
  const onDelete = async () => {
    setLoading(true);

    try {
      const interviewRef = doc(db, "interviews", data.id);
      const userAnswerQuery = query(
        collection(db, "userAnswers"),
        where("userId", "==", userId),
        where("mockIdRef", "==", data.id)
      );

      // get all matching user answer
      const querySnap = await getDocs(userAnswerQuery);

      // initialize the firebase batch

      const batch = writeBatch(db);

      // add delete -> interview batch

      batch.delete(interviewRef);

      querySnap.forEach((docRef) => batch.delete(docRef.ref));

      // commit

      await batch.commit();

      toast("Success", { description: "Your interview has been removed" });
    } catch (error) {
      console.log(error);
      toast("Error", {
        description: "Something went wrong!. Please try again later",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 rounded-xl gradient-card hover-lift cursor-pointer transition-all duration-300 space-y-4 border border-border/50">
      <div className="space-y-3">
        <CardTitle className="text-lg font-bold text-foreground">
          {data?.position}
        </CardTitle>
        <CardDescription className="text-muted-foreground leading-relaxed">
          {data?.description}
        </CardDescription>
      </div>
      
      <div className="w-full flex items-center gap-2 flex-wrap">
        {Array.from(data.techStack).map((word, index) => (
          <Badge
            key={index}
            variant={"outline"}
            className="text-xs font-medium transition-all duration-200 hover:scale-105 hover:border-primary hover:bg-primary/10 hover:text-primary"
          >
            {word}
          </Badge>
        ))}
      </div>

      <CardFooter
        className={cn(
          "w-full flex items-center p-0 pt-4 border-t border-border/30",
          onMockPage ? "justify-end" : "justify-between"
        )}
      >
        <p className="text-xs text-muted-foreground truncate whitespace-nowrap font-medium">
          {`${new Date(data.createdAt.toDate()).toLocaleDateString("en-US", {
            dateStyle: "long",
          })} - ${new Date(data.createdAt.toMillis()).toLocaleTimeString(
            "en-US",
            {
              timeStyle: "short",
            }
          )}`}
        </p>

        {!onMockPage && (
          <div className="flex items-center justify-center gap-1">
            <TooltipButton
              content="Edit"
              buttonVariant={"ghost"}
              onClick={() => {
                navigate(`/generate/${data.id}`);
              }}
              disabled={false}
              buttonClassName="hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-all duration-200"
              icon={<Pencil className="w-4 h-4" />}
              loading={false}
            />

            <TooltipButton
              content="Delete"
              buttonVariant={"ghost"}
              onClick={onDelete}
              disabled={false}
              buttonClassName="hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all duration-200"
              icon={<Trash2 className="w-4 h-4" />}
              loading={loading}
            />

            <TooltipButton
              content="Feedback"
              buttonVariant={"ghost"}
              onClick={() => {
                navigate(`/generate/feedback/${data.id}`);
              }}
              disabled={false}
              buttonClassName="hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 transition-all duration-200"
              icon={<Newspaper className="w-4 h-4" />}
              loading={false}
            />

            <TooltipButton
              content="Start"
              buttonVariant={"ghost"}
              onClick={() => {
                navigate(`/generate/interview/${data.id}`);
              }}
              disabled={false}
              buttonClassName="hover:text-sky-500 hover:bg-sky-50 dark:hover:bg-sky-950/20 transition-all duration-200"
              icon={<Sparkles className="w-4 h-4" />}
              loading={false}
            />
          </div>
        )}
      </CardFooter>
    </Card>
  );
};