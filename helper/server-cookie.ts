/** cookie
 * cookie adalah tempat penyimpanan pada browser
 * biasanya digunakan untuk menyimpan data user session
 */
import { cookies } from "next/headers"

export const getServerCoookie = async (
    key: string
) : Promise<string> => {
    return (
        await cookies()).get(key)?.value || ""
}