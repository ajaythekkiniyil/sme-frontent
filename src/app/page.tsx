import Link from 'next/link'
import BasicEnquiryForm from './components/basicEnquiryForm'

export default function Home() {
    return (
    <>
      <section>
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
          <h1 className="text-4xl font-bold mb-4">Welcome to Home Page</h1>
          <Link href="/admin/login">
            Admin login
          </Link>
          <Link href="/sme/login">
            SME login
          </Link>
          <Link href="/user/login">
            User login
          </Link>
        </div>
      </section>
      <section>
        <BasicEnquiryForm />
      </section>
    </>
  )
}
