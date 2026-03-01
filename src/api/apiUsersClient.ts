import type { UserLoginView, UserView } from "../models/User";

export default class ApiUsersClient {
  private static BASE_URL: string = import.meta.env.VITE_API_URL;
  private static ENDPOINT: string = "/auth";

  static async register(userBody: UserView) {
    const response = await fetch(this.BASE_URL + this.ENDPOINT + "/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(userBody),
    });

    const { status } = response;
    const result = await response.json();

    return { status, result };
  }

  static async login(userCredential: UserLoginView) {
    const response = await fetch(this.BASE_URL + this.ENDPOINT + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(userCredential),
    });

    const { status } = response;
    const result = await response.json();

    return { status, result };
  }

  static async me() {
    const response = await fetch(this.BASE_URL + this.ENDPOINT + "/me", {
      credentials: "include",
    });

    const { status } = response;
    const result = await response.json();

    return { status, result };
  }

  static async refresh() {
    const response = await fetch(this.BASE_URL + this.ENDPOINT + "/refresh", {
      credentials: "include",
    });

    const { status } = response;
    const result = await response.json();

    return { status, result };
  }
}
