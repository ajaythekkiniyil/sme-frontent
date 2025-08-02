import LoginPageTemplate from "@/app/components/login";

export default function LoginPage() {
  return (
    <>
      <LoginPageTemplate role="Admin" successUrl="/admin/dashboard/sme" />
    </>
  );
}