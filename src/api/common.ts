type AuthResponse = {
  accessToken: string;
  refreshToken: string;
};

export class AuthApi {
  async login(email: string, password: string): Promise<AuthResponse> {
    return {
      accessToken: "accessToken",
      refreshToken: "refreshToken",
    };
  }
  async refresh(refreshToken: string): Promise<AuthResponse> {
    return {
      accessToken: "accessToken",
      refreshToken: "refreshToken",
    };
  }
}

export const authApi = new AuthApi();
