import { ClerkProvider } from '@clerk/nextjs'
import '../globals.css'
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'admin authentication',
  description: 'admin dashboard by nextjs',
}

export default function RootLayout({
children,
}: {
  children: React.ReactNode
}) {
return (

      <html lang="en">

        <body className='  bg-[url(/assets/body-bg.svg)] bg-fixed bg-cover text-white  h-screen '>
          {children}
          
          </body>
    
    </html>

    
)
}
