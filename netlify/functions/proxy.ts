import { Handler } from "@netlify/functions";

const handler: Handler = async (event) => {
  try {
    // Construct the proxied URL
    const apiUrl = "http://44.211.82.198/api/v1" + event.path.replace("/.netlify/functions/proxy", "");

    // Only include body for methods that allow it
    const options: RequestInit = {
      method: event.httpMethod,
      headers: { "Content-Type": "application/json" },
      body: ["POST", "PUT", "PATCH", "DELETE"].includes(event.httpMethod.toUpperCase()) ? event.body : undefined,
    };

    const response = await fetch(apiUrl, options);
    const data = await response.text();

    return {
      statusCode: response.status,
      body: data,
    };
  } catch (err: unknown) {
    // Safe access to error message
    const message = err instanceof Error ? err.message : String(err);
    return {
      statusCode: 500,
      body: message,
    };
  }
};

export { handler };
