import { db } from "@/config/firebase-config";
import { FormMockInterview } from "@/forms/form-mock-interview";
import type { Interview } from "@/types";
import { useAuth } from "@clerk/clerk-react";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export const CreateEditPage = () => {
  const { interviewId } = useParams<{ interviewId: string }>();
  const [interview, setInterview] = useState<Interview | null>(null);
  const { userId } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInterview = async () => {
      if (!interviewId || !userId) {
        return;
      }
      try {
        const interviewRef = doc(db, "interviews", interviewId);
        const interviewSnap = await getDoc(interviewRef);

        if (interviewSnap.exists()) {
          const data = interviewSnap.data() as Interview & { userId?: string };
          if (data.userId && data.userId === userId) {
            setInterview({ ...data } as Interview);
          } else {
            setInterview(null);
            navigate("/generate/create", { replace: true });
          }
        } else {
          setInterview(null);
          navigate("/generate/create", { replace: true });
        }
      } catch (error) {
        console.log(error);
      }
    };


    fetchInterview();
  }, [interviewId, userId, navigate]);


  return (
    <div className="my-4 flex-col w-full">
      <FormMockInterview initialData={interview} />
    </div>
  );
};