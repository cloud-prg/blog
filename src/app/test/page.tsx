'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function Search() {
    const searchParams = useSearchParams()

    return <input placeholder="Search..." />
}

const Searchbar = () => {
    return (
        // You could have a loading skeleton as the `fallback` too
        <Suspense fallback={<div>Loading...</div>}>
            <Search />
            <div>以上是否正常在生产环节中运作了</div>
        </Suspense>
    )
}

export default Searchbar