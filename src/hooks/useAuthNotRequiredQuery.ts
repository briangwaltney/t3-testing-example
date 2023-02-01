import { api } from "@/utils/api";

export const useAuthNotRequiredQuery = () => {
  return api.example.hello.useQuery({
    text: "hello",
  });
};
