import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useAuthentication } from '@/hooks/useAuthentication'

const Navbar = () => {
  const { logout } = useAuthentication()

  return (
    <div className="bg-white px-2 sm:px-4 py-2.5 w-full z-20 top-0 border-b border-gray-200">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <Link href="/">
          <Image src="/../public/sialogo.ico" alt="/" width="50" height="50" />
        </Link>
        <div className="flex md:order-2">
          <button
            type="button"
            className="text-white font-semibold bg-yellow-400 rounded-full px-5 py-2.5 text-center mr-3 md:mr-0"
          >
            Create Order
          </button>
          <button
            type="button"
            className="text-white font-semibold bg-yellow-400 rounded-full px-5 py-2.5 text-center mr-3 md:mr-0"
            onClick={() => logout()}
          >
            Logout
          </button>
        </div>
        <div className="items-center justify-between w-full md:flex md:w-auto md:order-1">
          <ul className="flex flex-col p-4 mt-4 md:flex-row md:mt-0 md:font-medium md:border-0 md:bg-white">
            <Link href="/">
              <li className="block py-2 pl-3 pr-4 text-black rounded font-semibold">
                Sales Order
              </li>
            </Link>
            <div class="border-r-4 rounded-full border-[#5b1010] mr-2"></div>
            <Link href="/#">
              <li className="block py-2 pl-3 pr-4 text-black rounded font-semibold">
                Service Order
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar