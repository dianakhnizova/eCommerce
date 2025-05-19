export namespace Auth {
  type Token = {
    access_token: string;
    token_type: string;
    expires_in: number;
    expires_at: number;
    scope: string;
    refresh_token?: string;
  };
}
