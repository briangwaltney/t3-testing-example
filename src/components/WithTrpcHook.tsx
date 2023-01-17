import { useAuthNoteRequiredQuery } from "@/hooks/useAuthNotRequiredQuery";
import React from "react";

export default function WithTrpcHook() {
  const { data } = useAuthNoteRequiredQuery();

  return <div>{data && <div>{data.greeting}</div>}</div>;
}
