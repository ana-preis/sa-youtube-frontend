import { api } from "../api/api"
import { CategoryType } from "../types/Category"

export const handleFetchCategoryByName = async (text: string | undefined) => {
  const response = await api.get<CategoryType>(`http://localhost:8080/category?text=${text}`)
  return response;
}