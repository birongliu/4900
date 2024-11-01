import { getUser } from "@/app/actions/getUser-action";
import React from "react";
import { redirect } from "next/navigation";
interface AIOutput {
  id: string;
  type: string;
  breed: string;
  name: string;
  description: string;
  imgUrl: string;
}



export default async function Hero() {
  const data = await getUser();
  if (!data) {
    redirect("/login");
  };
  const result = data.publicMetadata.onboardingAIOutput as AIOutput[];

  return (
    <div className="flex bg-gray-100 w-full pl-20 lg:pl-64 text-black flex-col h-screen">
      a
    </div>
  );
}
