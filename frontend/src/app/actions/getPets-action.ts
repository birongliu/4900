export default async function getPet() {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/pets`
    const response = await fetch(url)
    const data = await response.json()
    console.log(response)
    return data.data
}