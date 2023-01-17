import { useAuthNotRequiredQuery } from "@/hooks/useAuthNotRequiredQuery";
import React from "react";

export default function WithTrpcHook() {
  const { data, isLoading } = useAuthNotRequiredQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div>{data && <div>{data.greeting}</div>}</div>;
}
