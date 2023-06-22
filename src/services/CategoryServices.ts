import { api } from "../api/api"
import { CategoryType } from "../types/Category"
import { ResponseType } from "../types/Http"

export const handleFetchCategoriesByName = async (text: string | undefined) => {
  const response = await api.get<ResponseType>(`http://localhost:8080/categories?text=${text}`)
  return response;
}

export const handleFetchCategoryByID = async (id: string | undefined) => {
  const response = await api.get<ResponseType>(`http://localhost:8080/categories/${id}`)
  return response;
}

export const handleFetchCategories = async () => {
  const response = await api.get<ResponseType>(`http://localhost:8080/categories`)
  console.log(response)
  return response;
}