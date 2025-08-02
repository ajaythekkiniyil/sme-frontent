import LoginPageTemplate from "@/app/components/login";

export default function SmeLoginPage() {
  return (
    <>
      <LoginPageTemplate role="SME" successUrl="/sme/dashboard/home" />
    </>
  );
}