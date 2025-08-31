import { Headings } from "@/components/headings";
import { InterviewPin } from "@/components/interview-pin";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/config/firebase-config";
import type { Interview } from "@/types";
import { useAuth } from "@clerk/clerk-react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

export const Dashboard = () => {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);

  const { userId } = useAuth();

  useEffect(() => {
    // set upa realtime listener even for the interviews collection where the userId matches

    const interviewQuery = query(
      collection(db, "interviews"),
      where("userId", "==", userId)
    );

    const unsubscribe = onSnapshot(
      interviewQuery,
      (snapshot) => {
        const interviewList: Interview[] = snapshot.docs.map((doc) =>
          doc.data()
        ) as Interview[];
        setInterviews(interviewList);
        setLoading(false);
      },
      (error) => {
        console.log("Error on fetching : ", error);
        toast.error("Error..", {
          description: "Something went wrong.. Try again later..",
        });
        setLoading(false);
      }
    );

    //  clean up the listener when the component unmount

    return () => unsubscribe();
  }, [userId]);

  return (
    <div className="animate-fade-in">
      <div className="flex w-full items-center justify-between mb-8">
        {/* heading */}
        <div className="animate-slide-up">
          <Headings
            title="Dashboard"
            description="Create and start your AI Mock interview"
          />
        </div>
        {/* action button */}

        <Link to={"/generate/create"}>
          <Button size={"sm"} className="gradient-primary hover:shadow-lg transition-all duration-300 hover-glow animate-scale-in">
            <Plus className="min-w-5 min-h-5 mr-2" />
            Add new
          </Button>
        </Link>
      </div>

      <Separator className="my-8 opacity-50" />

      <div className="md:grid md:grid-cols-3 gap-6 py-6">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <Skeleton className="h-32 rounded-xl gradient-card" />
            </div>
          ))
        ) : interviews.length > 0 ? (
          interviews.map((interview, index) => (
            <div key={interview.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <InterviewPin data={interview} />
            </div>
          ))
        ) : (
          <div className="md:col-span-3 w-full flex flex-grow items-center justify-center h-96 flex-col animate-fade-in">
            <div className="gradient-card p-8 rounded-2xl text-center max-w-md hover-lift">
              <img
                src="/svg/not-found.svg"
                className="w-32 h-32 object-contain mx-auto mb-6 opacity-60"
                alt="No data found"
              />

              <h2 className="text-xl font-bold text-foreground mb-3">
                No Interviews Found
              </h2>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                There are no available interviews to show. Create your first mock interview to get started with AI-powered practice.
              </p>

              <Link to={"/generate/create"}>
                <Button size={"sm"} className="gradient-primary hover:shadow-lg transition-all duration-300 hover-glow">
                  <Plus className="min-w-5 min-h-5 mr-2" />
                  Create First Interview
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};