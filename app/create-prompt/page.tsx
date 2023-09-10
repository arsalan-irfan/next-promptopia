"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Post } from "../../types/post.type";
import { FormType } from "@enums/form.enum";
import Form from "@components/Form";
const CreatePrompt = () => {
   const [submitting, setSubmitting] = useState<boolean>(false);
   const [post, setPost] = useState<Post>({
      prompt: "",
      tag: "",
   });
   const session = useSession();
   const router = useRouter();
   const createPrompt = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSubmitting(true);
      try {
         const response = await fetch("/api/prompt/new", {
            method: "POST",
            body: JSON.stringify({
               prompt: post.prompt,
               userId: session.data?.user?.id,
               tag: post.tag,
            }),
         });
         if (response.ok) {
            router.push("/");
         }
      } catch (error) {
      } finally {
         setSubmitting(false);
      }
   };
   return (
      <Form
         type={FormType.CREATE}
         post={post}
         setPost={setPost}
         submitting={submitting}
         handleSubmit={createPrompt}
      />
   );
};

export default CreatePrompt;
