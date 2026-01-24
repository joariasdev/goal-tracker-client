import type { UserView } from "../models/User";

export default class ApiUsersClient {
  private static BASE_URL: string = import.meta.env.VITE_API_URL;
  private static ENDPOINT: string = "/auth";

  static async register(userBody: UserView) {
    const response = await fetch(this.BASE_URL + this.ENDPOINT + "/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userBody),
    });

    const { status } = response;
    const result = await response.json();

    return { status, result };
  }
}
