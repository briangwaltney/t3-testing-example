import { useAuthNoteRequiredQuery } from "@/hooks/useAuthNotRequiredQuery";
import React from "react";

export default function WithTrpcHook() {
  const { data, isLoading } = useAuthNoteRequiredQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div>{data && <div>{data.greeting}</div>}</div>;
}
