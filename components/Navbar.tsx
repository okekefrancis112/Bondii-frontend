import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import React from 'react';
import Head from "next/head";
import { Button } from './Buttons';
import { ConnectionButton } from './ConnectionButton';

const Navbar = () => {
  return (
    <>
        <Head>
          <title>Nahmii | Bondii</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
          <link href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css" rel="stylesheet"></link>
        </Head>
        <div className='flex justify-between items-center py-4 px-4 md:px-8 nav__bar'>
          <div className='text-white flex items-center font-medium text-xl'>
            <Link href={"/"}>
              <div className='product__logo'>
              {/* <i className="ri-quill-pen-line"></i>  */}
              <div> <img src="favicon-1.ico"width="30"/> </div> {" "}
              <div> <p>Bondii</p> </div>
              </div>
            </Link>
            <Link href="/market" className=''>
                <a className='navbar__market'>
                    Markets
                </a>
            </Link>
            <Link href="/partners">
                <a className='ml-4 navbar___partner'>
                    Partners
                </a>
            </Link>
          </div>

          <div className='flex items-center'>
            <ConnectionButton></ConnectionButton>
          </div>
        </div>
    </>
  )
}

export default Navbar;