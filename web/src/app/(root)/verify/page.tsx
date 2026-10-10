import type { Metadata } from "next";
import { VerifyView } from "@/components/VerifyView";

export const metadata: Metadata = {
  title: "Verify a certificate · Code Master",
  description: "Check that a Code Master certificate is genuine.",
};

/** Public page behind every certificate's QR code: /verify/?id=CM-…  */
export default function VerifyPage() {
  return <VerifyView />;
}
