import { api } from "@/utils/api";

export const useAuthNoteRequiredQuery = () => {
  return api.example.hello.useQuery({
    text: "hello",
  });

};
