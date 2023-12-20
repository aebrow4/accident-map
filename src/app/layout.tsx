import { AppBar, Toolbar } from '@mui/material';
import './globals.css';
import type { Metadata } from 'next';
import { Inter, Roboto_Slab } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });
const robotoSlab = Roboto_Slab({
  subsets: ['latin'],
  weight: '500'
});

export const metadata: Metadata = {
  title: 'North America Climbing Accidents'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-screen`}>
        <AppBar
          position='static'
          sx={{
            backgroundColor: '#faf8ef'
          }}
        >
          <Toolbar className='flex justify-between' variant='dense'>
            <div>
              <Link
              className={`hover:text-red-600 text-slate-900 ${robotoSlab.className}`}
              href='/'
            >North America Climbing Accidents
              </Link>
            </div>
            <div>
              <Link
              className='hover:text-red-600 text-slate-900'
              href='about'
            >About
              </Link>
            </div>
          </Toolbar>
        </AppBar>
        {children}
      </body>
    </html>
  );
}
