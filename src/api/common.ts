export function sleepAndReturn<T>(data: T, duraion: number = 1000): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, duraion);
  });
}

type AuthResponse = {
  accessToken: string;
  refreshToken: string;
};

export class AuthApi {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  async login(email: string, password: string): Promise<AuthResponse> {
    /* eslint-enable @typescript-eslint/no-unused-vars */
    return {
      accessToken: "accessToken",
      refreshToken: "refreshToken",
    };
  }
  /* eslint-disable @typescript-eslint/no-unused-vars */
  async refresh(refreshToken: string): Promise<AuthResponse> {
    /* eslint-enable @typescript-eslint/no-unused-vars */
    return {
      accessToken: "accessToken",
      refreshToken: "refreshToken",
    };
  }
}

export const authApi = new AuthApi();
