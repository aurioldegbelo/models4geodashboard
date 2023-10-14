import { useRouter } from "next/router"
import Link from "next/link"

interface Props {
 
}
 
export default function LocalesSwitcher(props: Props) {

    const router = useRouter()

    return (
        <div className="flex gap-2">
            {router.locales?.map((locale, key) => (
                <Link href={router.asPath} key={key} locale={locale} className="bg-gray-400">
                    {locale}
                </Link>
            ))}
        </div>
    )
}