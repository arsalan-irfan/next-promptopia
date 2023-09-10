"use client";

import React, { useEffect, useState } from "react";
import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { Post } from "../../types/post.type";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
   const router = useRouter();

   const { data: session } = useSession();
   const [posts, setPosts] = useState<any[]>([]);
   useEffect(() => {
      const fetchPosts = async () => {
         const response = await fetch(`api/users/${session?.user.id}/posts`);
         const data = await response.json();
         setPosts(data);
      };
      if (session?.user.id) fetchPosts();
   }, []);

   const handleEdit = (post: any) => {
      router.push(`/update-prompt?id=${post._id}`);
   };
   const handleDelete = async (post: any) => {
      const hasConfirmed = confirm(
         "Are you sure you want to delete this prompt"
      );
      try {
         await fetch(`api/prompt/${post._id.toString()}`, {
            method: "DELETE",
         });
         const filteredPosts = posts.filter((p) => p._id !== post._id);

         setPosts(filteredPosts);
      } catch (error) {
         console.log(error);
      }
   };
   console.log("posts=>", posts);
   return (
      <Profile
         name="My"
         desc="Welcome to your personalized profile page"
         data={posts}
         handleEdit={handleEdit}
         handleDelete={handleDelete}
      />
   );
};

export default ProfilePage;
