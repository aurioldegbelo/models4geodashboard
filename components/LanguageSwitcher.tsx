import Link from "next/link";
import { useRouter } from "next/router";

interface Props {}


export default function LanguageSwitcher(props: Props) {

    const router = useRouter();

	return (
		<div>
			{router.locales?.map((locale, index) => (
				<div key={index}>
                    <Link href={router.asPath} locale={locale}>
                        {locale}
                    </Link>    
                </div>
			))}
		</div>
	);
}
