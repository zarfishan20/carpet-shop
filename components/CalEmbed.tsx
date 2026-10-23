"use client";

import Cal from "@calcom/embed-react";
import { site } from "@/lib/site";

export default function CalEmbed() {
  return (
    <Cal
      calLink={site.calLink}
      style={{ width: "100%", height: "700px", overflow: "scroll" }}
      config={{ layout: "month_view" }}
    />
  );
}