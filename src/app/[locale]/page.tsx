import Hero from "@/components/layout/hero";
const i18nNamespaces = ['landing']

export default async function Home({ params: { locale } }:{ params: { locale:string } }) {
  
  return (
    <main>
      <Hero params={{ locale, i18nNamespaces }}/>
    </main>
  )
}
