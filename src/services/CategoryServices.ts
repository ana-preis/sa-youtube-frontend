import { api } from "../api/api"
import { CategoryType } from "../types/Category"

export const handleFetchCategoriesByName = async (text: string | undefined) => {
  const response = await api.get<CategoryType>(`http://localhost:8080/category?text=${text}`)
  return response;
}

export const handleFetchCategoryByID = async (id: string | undefined) => {
  const response = await api.get<CategoryType>(`http://localhost:8080/category/${id}`)
  return response;
}