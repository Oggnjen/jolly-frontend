export const emptyCallback = () => {};

export function getToken(): string {
  const s = localStorage.getItem("token");
  return s == null ? "" : s;
}
