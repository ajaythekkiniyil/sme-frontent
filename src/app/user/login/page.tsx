import LoginPageTemplate from "@/app/components/login";

export default function SmeLoginPage() {
  return (
    <>
      <LoginPageTemplate role="USER" successUrl="/user/dashboard/home" />
    </>
  );
}