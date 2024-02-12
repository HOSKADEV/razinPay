import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/providers/TranslationsProvider";
import Image from "next/image";
import Link from "next/link";

const i18nNamespaces = ["auth"];
const AuthLayout = async ({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) => {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <div className="bg-muted-foreground md:p-10">
        <div className="relative flex justify-center md:container">
          <div>
            <Image
              src="/auth-razin-logo.svg"
              alt=""
              width={628.28}
              height={666}
              className="absolute left-0 hidden md:block"
            />
          </div>
          <div className="z-20 flex w-full flex-col items-center space-y-6 rounded-md bg-white py-10 shadow-md md:w-1/2">
            {children}
            <div className="text-center">
              <p>
                {t("terms-privacy.text1")}
                <br />
                <Link
                  href="/terms"
                  className="text-secondary underline underline-offset-2"
                >
                  {t("terms-privacy.link1")}
                </Link>
                <br />
                {t("terms-privacy.text2") + " "}
                <Link
                  href="/privacy"
                  className="text-secondary underline underline-offset-2"
                >
                  {t("terms-privacy.link2")}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </TranslationsProvider>
  );
};

export default AuthLayout;
