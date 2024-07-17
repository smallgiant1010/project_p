import React from 'react'
import { Image } from 'next/image'

export default function Navbar() {
  return (
    <nav>
        <div>
            <Link href="/home">
                <button>
                    <Image />
                </button>
            </Link>
        </div>
        <div>
            <Link href="/create">
                <button>
                </button>
            </Link>
            <Link href="/history">
                <button>
                </button>
            </Link>
            <Link href="/products">
                <button>
                </button>
            </Link>
            <Link href="/profile">
                <button>
                    <Image />
                </button>
            </Link>
        </div>
    </nav>
  )
}
