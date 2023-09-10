"use client";
import React, { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import { IPrompt } from "../interfaces/prompt.interface";

const PromptCardList: React.FC<{
   data: IPrompt[];
   handleTagClick: (tag: string) => void;
}> = ({ data, handleTagClick }) => {
   return (
      <div className="mt-16 prompt_layout">
         {data.map((prompt) => {
            return (
               <PromptCard
                  key={prompt._id}
                  prompt={prompt}
                  handleTagClick={handleTagClick}
                  handleEdit={() => {}}
                  handleDelete={() => {}}
               />
            );
         })}
      </div>
   );
};

const Feed = () => {
   const [searchText, setSearchText] = useState("");
   const [searchTimeout, setSearchTimeout] = useState<any>(null);
   const [prompts, setPrompts] = useState([]);
   const [searchedResults, setSearchedResults] = useState([]);

   useEffect(() => {
      const fetchPosts = async () => {
         const response = await fetch("api/prompt");
         const data = await response.json();
         setPrompts(data);
         setSearchedResults(data);
      };
      fetchPosts();
   }, []);

   const filterPrompts = (searchText: string) => {
      const regex = new RegExp(searchText, "i");
      return prompts.filter(
         (item: any) =>
            regex.test(item.creator.username) ||
            regex.test(item.tag) ||
            regex.test(item.prompt)
      );
   };
   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      clearTimeout(searchTimeout);
      setSearchText(e.target.value);
      setSearchTimeout(
         setTimeout(() => {
            if (e.target.value === "") {
               setSearchedResults(prompts);
               return;
            }
            const searchResults = filterPrompts(e.target.value);
            setSearchedResults(searchResults);
         }, 500)
      );
   };
   const handleTagClick = (tag: string) => {
      setSearchText(tag);
      setSearchTimeout(
         setTimeout(() => {
            if (tag === "") {
               setSearchedResults(prompts);
               return;
            }
            const searchResults = filterPrompts(tag);
            setSearchedResults(searchResults);
         }, 500)
      );
   };
   return (
      <section className="feed">
         <form className="relative w-full flex-center">
            <input
               type="text"
               className="search_input peer"
               placeholder="Search for a tag or username"
               value={searchText}
               onChange={handleSearchChange}
               required
            />
         </form>
         <PromptCardList
            data={searchedResults}
            handleTagClick={handleTagClick}
         />
      </section>
   );
};

export default Feed;
