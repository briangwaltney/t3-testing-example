import { api } from "@/utils/api"

export const useProtectedRouteQuery = () => {
  return api.example.getAllUsers.useQuery()
}