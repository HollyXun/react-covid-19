import { useState, useEffect, useCallback}  from 'react'

export const BASE_URL = 'https://corona.lmao.ninja/v2'

export function useCoronaAPI(
    path,
    { initialData = null, converter = (data)=> data, refetchInterval = null}
    ) {
    const [data, setData] = useState(initialData)
    const converData = useCallback(converter,[])

    useEffect(()=> {
        const fetchData = async ()=> {
            const res = await fetch(`${BASE_URL}${path}`)
            const data = await res.json()
            setData(converData(data))
        }

        fetchData()

        if (refetchInterval) {
            const intervalId = setInterval(fetchData, refetchInterval)
            return ()=> {
                clearInterval(intervalId)
            }
        }
    },[converData, path, refetchInterval])
    return data
}
