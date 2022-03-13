import { useEffect, useState } from 'react'

function useDebounce(value, delay = 800) {
    const [debouncedValue, setDebouncedValue] = useState < T > (value)

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay)

        return () => {
            clearTimeout(timer)
        }
    }, [value, delay])

    return debouncedValue
}

export default useDebounce