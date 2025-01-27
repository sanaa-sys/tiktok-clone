export async function fetchWithBackoff(fetchFunction, maxRetries = 5) {
    let retries = 0
    while (retries < maxRetries) {
        try {
            return await fetchFunction()
        } catch (error) {
            if (error.status === 429) {
                const delay = Math.pow(2, retries) * 1000 + Math.random() * 1000
                await new Promise((resolve) => setTimeout(resolve, delay))
                retries++
            } else {
                throw error
            }
        }
    }
    throw new Error("Max retries reached")
}

