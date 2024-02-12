import Faq from "@/components/faq";
import LayoutHero from "./_components/layout-hero";

interface BenefitsLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}
const BenefitsLayout = async ({ children, params }: BenefitsLayoutProps) => {
  return (
    <main className="text-left rtl:text-right">
      <LayoutHero />

      <div className="container my-20 flex flex-row items-start justify-center ">
        <div className="space-y-8 lg:w-2/3 ltr:pr-4 rtl:pl-4">{children}</div>
        <Faq locale={params.locale} />
      </div>
    </main>
  );
};

export default BenefitsLayout;
