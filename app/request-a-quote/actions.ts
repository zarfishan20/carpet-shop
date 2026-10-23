"use server";

export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function sendQuote(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  // Spam trap: real visitors never fill this hidden field
  if (formData.get("website")) return { status: "success" };

  const get = (n: string) => String(formData.get(n) ?? "").trim();

  const name = get("firstname");
  const email = get("email");
  const phone = get("phone");
  const postcode = get("postcode");

  if (!name || !email || !phone || !postcode) {
    return {
      status: "error",
      message: "Please fill in your name, email, phone and postcode.",
    };
  }
  if (!formData.get("consent")) {
    return {
      status: "error",
      message: "Please tick the box to agree we can contact you.",
    };
  }

  const flooring = formData.getAll("flooring").map(String).join(", ");

  // All the extra details go into one readable message for HubSpot
  const details = [
    `Property type: ${get("property") || "-"}`,
    `Flooring wanted: ${flooring || "-"}`,
    `Rooms / areas: ${get("rooms") || "-"}`,
    `Approx. size (m²): ${get("size") || "-"}`,
    `Remove old flooring: ${get("removal") || "-"}`,
    `Timeline: ${get("timeline") || "-"}`,
    `Preferred contact: ${get("contactMethod") || "-"}`,
    get("product") ? `Product: ${get("product")}` : "",
    "",
    get("message"),
  ]
    .filter((l) => l !== "")
    .join("\n");

  const portal = process.env.HUBSPOT_PORTAL_ID;
  const guid = process.env.HUBSPOT_FORM_GUID;
  if (!portal || !guid) {
    return {
      status: "error",
      message: "The form isn't set up yet. Please call us instead.",
    };
  }

  try {
    const res = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${portal}/${guid}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields: [
            { name: "firstname", value: name },
            { name: "email", value: email },
            { name: "phone", value: phone },
            { name: "zip", value: postcode },
            { name: "message", value: details },
          ],
          context: { pageName: "Request a quote" },
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