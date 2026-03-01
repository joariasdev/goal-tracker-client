import type { UserLoginView } from "../models/User";
import { useAuth } from "./useAuth";

const BASE_URL: string = import.meta.env.VITE_API_URL;
const ENDPOINT: string = "/auth";

function useAuthClient() {
  const { updateUser } = useAuth();

  async function login(userCredential: UserLoginView) {
    const response = await fetch(BASE_URL + ENDPOINT + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(userCredential),
    });

    const { status } = response;
    const result = await response.json();

    if (status !== 200) {
      return result;
    }

    updateUser(result);

    return result;
  }

  return { login };
}

export default useAuthClient;
