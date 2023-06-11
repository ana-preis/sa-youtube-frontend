import { api } from "../api/api"
import { CategoryType } from "../types/Category"

export const handleFetchCategoriesByName = async (text: string | undefined) => {
  const response = await api.get<CategoryType>(`http://localhost:8080/categories?text=${text}`)
  return response;
}

export const handleFetchCategoryByID = async (id: string | undefined) => {
  const response = await api.get<CategoryType>(`http://localhost:8080/categories/${id}`)
  return response;
}

// VERIFICAR AQUI SE TA VINDO CORRETO
export const handleFetchCategories = async () => {
  const response = await api.get<CategoryType[]>(`http://localhost:8080/categories`)
  return response;
}