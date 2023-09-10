import React, { FC } from "react";
import PromtCard from "./PromptCard";
import PromptCard from "./PromptCard";
import { Post } from "../types/post.type";

interface IProfile {
   name: string;
   desc: string;
   data: any[];
   handleEdit: (prompt: Post) => void;
   handleDelete: (prompt: Post) => void;
}
const Profile: FC<IProfile> = ({
   name,
   desc,
   data,
   handleDelete,
   handleEdit,
}) => {
   return (
      <section>
         <h1 className="head_text text-left">
            <span className="blue_gradient">{name} Profile</span>
         </h1>
         <p className="desc text-left">{desc}</p>
         <div className="mt-10 prompt_layout">
            {data.map((prompt) => {
               return (
                  <PromptCard
                     key={prompt._id}
                     prompt={prompt}
                     handleEdit={() => handleEdit(prompt)}
                     handleDelete={() => handleDelete(prompt)}
                  />
               );
            })}
         </div>
      </section>
   );
};

export default Profile;
