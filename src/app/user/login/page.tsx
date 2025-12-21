import LoginPageTemplate from "@/app/components/LoginPageTemplate";

export default function SmeLoginPage() {
  return (
    <>
      <LoginPageTemplate role="USER" successUrl="/user/dashboard/home" />
    </>
  );
}