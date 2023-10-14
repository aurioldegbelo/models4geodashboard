import { useRouter } from "next/router";
import Link from "next/link";

interface Props {}

export default function LocalesSwitcher(props: Props) {
	const router = useRouter();
    const { locale: currentLocale } = useRouter()

	return (
		<div className="flex rounded-full bg-gray-100 items-center w-40">
			{router.locales?.map((locale, key) => {
				if (locale === "de") {
					return (
						<Link
							href={router.asPath}
							key={key}
							locale={locale}
							className={`${locale === currentLocale ? 'bg-indigo-400 border-2 border-indigo-700 text-indigo-950' : 'bg-gray-100'} rounded-full px-3 py-1 border-2 border-gray-100`}
						>
							{"Deutsch"}
						</Link>
					);
				}
				if (locale === "en") {
					return (
						<Link
							href={router.asPath}
							key={key}
							locale={locale}
							className={`${locale === currentLocale ? 'bg-indigo-400 border-2 border-indigo-700 text-indigo-950' : 'bg-gray-100'} rounded-full px-3 py-1 border-2 border-gray-100`}
						>
							{"English"}
						</Link>
					);
				}
			})}
		</div>
	);
}
