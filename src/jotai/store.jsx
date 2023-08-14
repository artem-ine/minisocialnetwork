import { atom, useAtom } from "jotai";

export const authAtom = atom({
  isAuthenticated: false,
  user: null,
  token: null,
});

export function useAuth() {
  return useAtom(authAtom);
}
