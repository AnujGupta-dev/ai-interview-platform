import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useAuth } from "@clerk/clerk-react";

import { LoaderPage } from "@/views/loader-page";
import { CustomBreadCrumb } from "@/components/custom-bread-crumb";
import { Headings } from "@/components/headings";
import { InterviewPin } from "@/components/interview-pin";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { db } from "@/config/firebase-config";
import type { Interview, UserAnswer } from "@/types";
import { cn } from "@/lib/utils";
import { CircleCheck, Star } from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

export const Feedback = () => {
  const { interviewId } = useParams<{ interviewId: string }>();
  const [interview, setInterview] = useState<Interview | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [feedbacks, setFeedbacks] = useState<UserAnswer[]>([]);
  const [activeFeed, setActiveFeed] = useState("");
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
          if (interviewDoc.exists()) {
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

      const fetchFeedbacks = async () => {
        setIsLoading(true);
        try {
          const querSanpRef = query(
            collection(db, "userAnswers"),
            where("userId", "==", userId),
            where("mockIdRef", "==", interviewId)
          );

          const querySnap = await getDocs(querSanpRef);

          const interviewData: UserAnswer[] = querySnap.docs.map((doc) => {
            return doc.data() as UserAnswer;
          });

          setFeedbacks(interviewData);
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
      fetchFeedbacks();
    }
  }, [interviewId, navigate, userId]);

  //   calculate the ratings out of 10

  const overAllRating = useMemo(() => {
    if (feedbacks.length === 0) return "0.0";

    const totalRatings = feedbacks.reduce(
      (acc, feedback) => acc + feedback.rating,
      0
    );

    return (totalRatings / feedbacks.length).toFixed(1);
  }, [feedbacks]);

  if (isLoading) {
    return <LoaderPage className="w-full h-[70vh]" />;
  }

  return (
    <div className="flex flex-col w-full gap-8 py-5 animate-fade-in">
      <div className="flex items-center justify-between w-full gap-2 animate-slide-up">
        <CustomBreadCrumb
          breadCrumbPage={"Feedback"}
          breadCrumpItems={[
            { label: "Mock Interviews", link: "/generate" },
            {
              label: `${interview?.position}`,
              link: `/generate/interview/${interview?.id}`,
            },
          ]}
        />
      </div>

      <div className="animate-slide-up">
        <Headings
          title="Congratulations! 🎉"
          description="Your personalized feedback is now available. Dive in to see your strengths, areas for improvement, and tips to help you ace your next interview."
        />
      </div>

      <div className="gradient-card p-6 rounded-2xl animate-scale-in hover-lift">
        <p className="text-lg text-muted-foreground">
          Your overall interview rating:{" "}
          <span className="gradient-primary bg-clip-text text-transparent font-bold text-2xl">
            {overAllRating} / 10
          </span>
        </p>
      </div>

      {interview && (
        <div className="animate-slide-up">
          <InterviewPin data={interview} onMockPage />
        </div>
      )}

      <div className="animate-slide-up">
        <Headings title="Interview Feedback" isSubHeading />
      </div>

      {feedbacks && (
        <Accordion type="single" collapsible className="space-y-4 animate-fade-in">
          {feedbacks.map((feed, index) => (
            <AccordionItem
              key={feed.id}
              value={feed.id}
              className="gradient-card border border-border/50 rounded-xl shadow-sm hover-lift transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <AccordionTrigger
                onClick={() => setActiveFeed(feed.id)}
                className={cn(
                  "px-6 py-4 flex items-center justify-between text-base rounded-t-xl transition-all duration-200 hover:no-underline",
                  activeFeed === feed.id
                    ? "bg-gradient-to-r from-primary/10 to-secondary/10"
                    : "hover:bg-accent/50"
                )}
              >
                <span className="font-medium text-foreground">{feed.question}</span>
              </AccordionTrigger>

              <AccordionContent className="px-6 py-6 space-y-6 rounded-b-xl">
                <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
                  <Star className="text-yellow-500 w-5 h-5" />
                  Rating: {feed.rating}/10
                </div>

                <Card className="border-none space-y-3 p-5 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl shadow-sm">
                  <CardTitle className="flex items-center text-emerald-700 dark:text-emerald-300">
                    <CircleCheck className="mr-2 text-emerald-600 dark:text-emerald-400 w-5 h-5" />
                    Expected Answer
                  </CardTitle>

                  <CardDescription className="font-medium text-emerald-800 dark:text-emerald-200 leading-relaxed">
                    {feed.correct_ans}
                  </CardDescription>
                </Card>

                <Card className="border-none space-y-3 p-5 bg-blue-50 dark:bg-blue-950/20 rounded-xl shadow-sm">
                  <CardTitle className="flex items-center text-blue-700 dark:text-blue-300">
                    <CircleCheck className="mr-2 text-blue-600 dark:text-blue-400 w-5 h-5" />
                    Your Answer
                  </CardTitle>

                  <CardDescription className="font-medium text-blue-800 dark:text-blue-200 leading-relaxed">
                    {feed.user_ans}
                  </CardDescription>
                </Card>

                <Card className="border-none space-y-3 p-5 bg-amber-50 dark:bg-amber-950/20 rounded-xl shadow-sm">
                  <CardTitle className="flex items-center text-amber-700 dark:text-amber-300">
                    <CircleCheck className="mr-2 text-amber-600 dark:text-amber-400 w-5 h-5" />
                    Feedback
                  </CardTitle>

                  <CardDescription className="font-medium text-amber-800 dark:text-amber-200 leading-relaxed">
                    {feed.feedback}
                  </CardDescription>
                </Card>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
};