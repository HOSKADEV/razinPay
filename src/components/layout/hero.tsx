import initTranslations from "@/app/i18n";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Images } from "@/components/images";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "../ui/input";
interface HeroParams {
  params: {
    locale: string;
    i18nNamespaces: string[];
  };
}

const Hero = async ({ params: { locale, i18nNamespaces } }: HeroParams) => {
  const { t } = await initTranslations(locale, i18nNamespaces);
  return (
    <section className="absolute w-full top-0 bg-[url(/hero/hero-bg.png)] bg-cover bg-center bg-no-repeat text-white overflow-hidden h-screen">
      <div className="container flex flex-col px-6 mx-auto lg:flex-row ">
		    <div className="flex flex-col justify-center px-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left rtl:lg:text-right">
			    <h1 className="text-3xl font-bold sm:text-4xl">
          {t('hero-section.hero-header')} {" "} <span className="text-primary">RAZINPAY.COM</span>
			    </h1>
			    <p className="mt-6 mb-8 text-lg sm:mb-12">
            {t('hero-section.hero-description')}
			    </p>
          <div className="space-y-6">
            <div className="flex bg-white text-foreground items-center rounded-md">
              <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="أبيع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">أبيع</SelectItem>
                    <SelectItem value="dark">أبيع</SelectItem>
                    <SelectItem value="system">أبيع</SelectItem>
                  </SelectContent>
              </Select>
              {/* <Separator orientation="vertical"/> */}
              <Select>
                  <SelectTrigger className="">
                    <SelectValue placeholder="المجالات" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">المجالات</SelectItem>
                    <SelectItem value="dark">المجالات</SelectItem>
                    <SelectItem value="system">المجالات</SelectItem>
                  </SelectContent>
              </Select>
            </div>
            <div className="flex bg-white text-foreground items-center rounded-md">
              <form action="" className="flex items-center space-x-4 rtl:space-x-reverse">
                <p>مقابل</p> <Input type="text" placeholder="80000 DA"/>  
              </form>              
              <Select>
                  <SelectTrigger className="">
                    <SelectValue placeholder="دينار جزائري" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">دينار جزائري</SelectItem>
                    <SelectItem value="dark">اليورو</SelectItem>
                    <SelectItem value="system">الجنيه الإسترليني</SelectItem>
                  </SelectContent>
              </Select>
            </div>
          </div>
			    <div className="">
				    <Button className="mt-8">Get started</Button>
			    </div>
		    </div>
        <div className="hidden md:flex items-center justify-center px-6 lg:mt-0">
            <div className="relative ltr:right-[-30%]">
                <div className="flex aboslute">
                  <div className="flex flex-col justify-center items-center absolute z-10 top-24 right-[25%] text-center">
                    <Image src="/hero/hero-banner.svg" alt="" className="object-contain" width={360} height={360}/>
                    <ul className="flex space-x-2 rtl:space-x-reverse">
                      <li className="w-2 h-2 bg-white rounded-full"></li>
                      <li className="w-2 h-2 bg-white rounded-full"></li>
                      <li className="w-2 h-2 bg-white rounded-full"></li>
                      <li className="w-2 h-2 bg-white rounded-full"></li>
                      <li className="w-2 h-2 border border-white rounded-full"></li>
                    </ul>
                    <p className="mt-6 font-semibold w-64 text-2xl">
                      {t("banner")}
                    </p>
                  </div>
                    <Image src="/hero/hero-banner-bg.svg" alt="" className="object-contain opacity-40" width={706} height={662}/>
              </div>
            </div>
		    </div>
	    </div>
    </section>
  );
};

export default Hero;
