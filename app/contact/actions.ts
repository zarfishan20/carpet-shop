"use server";

export type FormState = { status: "idle" | "success" | "error"; message?: string };

export async function sendInquiry(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  // Spam trap: real visitors never fill this hidden field
  if (formData.get("website")) return { status: "success" };

  const get = (n: string) => String(formData.get(n) ?? "").trim();
  const firstname = get("firstname");
  const email = get("email");
  const phone = get("phone");
  const message = get("message");

  if (!firstname || !email || !message) {
    return { status: "error", message: "Please fill in your name, email and message." };
  }

  const portal = process.env.HUBSPOT_PORTAL_ID;
  const guid = process.env.HUBSPOT_FORM_GUID;
  if (!portal || !guid) {
    return { status: "error", message: "The form isn't set up yet. Please call us instead." };
  }

  try {
    const res = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${portal}/${guid}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields: [
            { name: "firstname", value: firstname },
            { name: "email", value: email },
            { name: "phone", value: phone },
            { name: "message", value: message },
          ],
          context: { pageName: "Contact / quote request" },
        }),
      }
    );
    if (!res.ok) throw new Error(String(res.status));
    return { status: "success" };
  } catch {
    return {
      status: "error",
      message: "Something went wrong. Please try again or call us.",
    };
  }
}