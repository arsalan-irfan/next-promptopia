"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Post } from "../../types/post.type";
import { FormType } from "@enums/form.enum";
import Form from "@components/Form";
const UpdatePrompt = () => {
   const [submitting, setSubmitting] = useState<boolean>(false);
   const [post, setPost] = useState<Post>({
      prompt: "",
      tag: "",
   });
   const searchParams = useSearchParams();
   const promptId = searchParams.get("id");

   const router = useRouter();

   useEffect(() => {
      const getPromptDetails = async () => {
         const response = await fetch(`/api/prompt/${promptId}`);
         const data = await response.json();
         setPost({
            prompt: data.prompt,
            tag: data.tag,
         });
      };
      if (promptId) getPromptDetails();
   }, [promptId]);

   const updatePrompt = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSubmitting(true);
      if (!promptId) alert("Prompt ID not found");
      try {
         const response = await fetch(`/api/prompt/${promptId}`, {
            method: "PATCH",
            body: JSON.stringify({
               prompt: post.prompt,
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
         type={FormType.Edit}
         post={post}
         setPost={setPost}
         submitting={submitting}
         handleSubmit={updatePrompt}
      />
   );
};

export default UpdatePrompt;
