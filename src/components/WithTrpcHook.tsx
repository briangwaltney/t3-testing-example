import { useAuthNotRequiredQuery } from "@/hooks/useAuthNotRequiredQuery";
import React from "react";

export default function WithTrpcHook() {
  const { data } = useAuthNotRequiredQuery();

  return <div>{data && <div>{data.greeting}</div>}</div>;
}
