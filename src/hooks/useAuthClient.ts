import type { UserLoginView, UserView } from "../models/User";
import { useAuth } from "./useAuth";

const BASE_URL: string = import.meta.env.VITE_API_URL;
const ENDPOINT: string = "/auth";

function useAuthClient() {
  const { updateUser } = useAuth();

  async function registerUser(userBody: UserView) {
    const response = await fetch(BASE_URL + ENDPOINT + "/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(userBody),
    });

    const { status } = response;
    const result = await response.json();

    if (status === 200) {
      const { email, password } = userBody;
      login({ email, password });
    }

    return result;
  }

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

    if (status === 200) {
      updateUser(result);
    }

    return result;
  }

  return { registerUser, login };
}

export default useAuthClient;
