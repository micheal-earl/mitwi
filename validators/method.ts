export default function validateMethod(
  req: Request,
  method: string,
): Response | null {
  if (req.method != method) {
    const resp = new Response(
      JSON.stringify({
        error:
          `Incorrect HTTP method: ${req.method}, route expects ${method} request.`,
      }),
      {
        status: 404,
        headers: { "Content-Type": "application/json" },
      },
    );
    return resp;
  }
  return null;
}
