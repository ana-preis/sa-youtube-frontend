
export const getCookie = (name: string) => {
  if (document.cookie === "") return "";
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
  if (parts[0] === value) return null;
	if (parts.length === 2) {
    const popParts = parts ? parts.pop() : null
    const splitParts = popParts ? popParts.split(';') : null
    const result = splitParts !== null ? splitParts.shift() : null
    return result;
  }
}

export function setCookie(nome: string, valor: string, expiracao: number): void {
  const data = new Date();
  data.setTime(data.getTime() + (expiracao * 24 * 60 * 60 * 1000));
  const expires = `expires=${data.toUTCString()}`;
  document.cookie = `${nome}=${valor};${expires};path=/`;
}