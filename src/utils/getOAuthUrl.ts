export const getOAuthUrl = (provider: "kakao" | "google" | "apple") => {
  switch (provider) {
    case "kakao": {
      const clientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
      const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
      return `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
    }

    case "google": {
      const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
      const redirectUri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;
      const scope = "openid profile email";
      return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
    }

    case "apple": {
      const clientId = process.env.NEXT_PUBLIC_APPLE_CLIENT_ID;
      const redirectUri = process.env.NEXT_PUBLIC_APPLE_REDIRECT_URI;
      const scope = "name email";
      const responseMode = "form_post";
      const state = Math.random().toString(36).substring(2, 15); // optional CSRF string

      return `https://appleid.apple.com/auth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&response_mode=${responseMode}&state=${state}`;
    }

    default:
      throw new Error("Unknown provider");
  }
};
