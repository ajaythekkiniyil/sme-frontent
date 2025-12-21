import LoginPageTemplate from "@/app/components/LoginPageTemplate";

export default function LoginPage() {
  return (
    <>
      <LoginPageTemplate role="Admin" successUrl="/admin/dashboard/home" />
    </>
  );
}