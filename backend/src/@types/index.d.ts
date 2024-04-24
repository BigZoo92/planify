declare module 'apple-auth' {
    export interface AppleAuthConfig {
        client_id: string;
        team_id: string;
        redirect_uri: string;
        key_id: string;
        private_key: string;
        private_key_path?: string;
    }

    export interface AppleTokenResponse {
        access_token: string;
        expires_in: number;
        id_token: string;
        refresh_token: string;
        token_type: string;
    }

    export interface AppleUserProfile {
        sub: string;
        email: string;
        email_verified: string;
        is_private_email: string;
        name?: {
            firstName: string;
            lastName: string;
        };
    }

    class AppleAuth {
        constructor(config: AppleAuthConfig, privateKey: string | Buffer, privateKeyMethod?: string);
        loginURL(): string;
        accessToken(code: string): Promise<AppleTokenResponse>;
        verifyIdToken(idToken: string, nonce?: string, method?: string): Promise<AppleUserProfile>;
      }
    
      export default AppleAuth;
    }