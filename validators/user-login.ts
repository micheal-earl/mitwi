interface UserForLogin {
  username: string;
  password: string;
}

export default function validateUserForLogin(
  body: unknown,
): Response | null {
  const { username, password } = body as UserForLogin;
  if (!username || !password) {
    const resp = new Response(
      JSON.stringify({
        error: `Incorrect JSON structure`,
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
    return resp;
  }
  return null;
}
