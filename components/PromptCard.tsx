"use client";
import React, { FC, useState } from "react";
import { IPrompt } from "../interfaces/prompt.interface";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

interface IPromptCard {
   prompt: IPrompt;
   handleTagClick?: (tag: string) => void;
   handleEdit: () => void;
   handleDelete: () => void;
}

const PromptCard: FC<IPromptCard> = ({
   prompt,
   handleDelete,
   handleEdit,
   handleTagClick,
}) => {
   const { data: session } = useSession();
   const [copied, setCopied] = useState("");
   const handleCopy = () => {
      setCopied(prompt.prompt);
      navigator.clipboard.writeText(prompt.prompt);
      setTimeout(() => {
         setCopied("");
      }, 3000);
   };
   const pathName = usePathname();
   return (
      <div className="prompt_card">
         <div className="flex justify-between items-start gap-5">
            <div className="flex-1 flex justify-start gap-3 cursor-pointer">
               <Image
                  src={prompt.creator.image}
                  alt="user_image"
                  width={40}
                  height={40}
                  className="rounded-full object-contain"
               />
               <div className="flex flex-col">
                  <div className="font-satoshi font-semibold text-gray-900">
                     {prompt.creator.username}
                  </div>
                  <p className="font-inter text-sm text-gray-500">
                     {prompt.creator.email}
                  </p>
               </div>
            </div>
            <div className="copy_btn" onClick={handleCopy}>
               <Image
                  src={
                     copied === prompt.prompt
                        ? "/assets/icons/tick.svg"
                        : "/assets/icons/copy.svg"
                  }
                  alt="copy-icon"
                  width={12}
                  height={12}
               />
            </div>
         </div>
         <p className="my-4 font-satoshi text-sm text-gray-700">
            {prompt.prompt}
         </p>
         <p
            className="font-inter text-sm blue_gradient cursor-pointer"
            onClick={() => handleTagClick && handleTagClick(prompt.tag)}
         >
            {prompt.tag}
         </p>
         {session?.user.id === prompt.creator._id &&
            pathName === "/profile" && (
               <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
                  <p
                     className="font-inter text-sm green_gradient cursor-pointer"
                     onClick={handleEdit}
                  >
                     Edit
                  </p>
                  <p
                     className="font-inter text-sm orange_gradient cursor-pointer"
                     onClick={handleDelete}
                  >
                     Delete
                  </p>
               </div>
            )}
      </div>
   );
};

export default PromptCard;
