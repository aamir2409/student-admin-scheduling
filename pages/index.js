
import React from "react";
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <header>
        <h1>Welcome!</h1>
      </header>
      <div className="home">
      <Link href="/student">
        <div className="student_login">
          <h2>Student Login</h2>
        </div>
      </Link>
      <Link href="admin">
        <div className="admin_login">
          <h2>Admin</h2>
        </div>
      </Link>
      </div>
    </div>
  )
}
