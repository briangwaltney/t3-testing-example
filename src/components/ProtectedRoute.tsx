import { testApi } from "@/utils/testWrapper";
import React from "react";

export default function ProtectedRoute() {
  const { data, isLoading } = testApi.example.getAllUsers.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return <div>Data: {data && <div>{data.length}</div>}</div>;
}
