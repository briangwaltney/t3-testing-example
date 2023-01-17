import { useAuthNoteRequiredQuery } from "@/hooks/useAuthNoteRequiredQuery";
import React from "react";

export default function WithTrpcHook() {
  const { data } = useAuthNoteRequiredQuery();

  return <div>{data && <div>{data.greeting}</div>}</div>;
}
