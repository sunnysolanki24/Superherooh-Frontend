import { Card, CardContent } from "@/components/ui/card";

//import billboard3 from "@/assets/billboard3.svg";
//import ooh from "@/assets/ooh.png";
import WNDWlogo from "@/assets/WNDWlogo.jpg";

export function PartnerCard2() {
  return (
    <Card className="border-none shadow-none p-0">
      <CardContent className="p-0 m-0">
        <div className="bg-white border rounded-xl shadow-sm sm:flex dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
          <div className="shrink-0 relative w-full rounded-t-xl overflow-hidden pt-[40%] sm:rounded-s-xl sm:max-w-60 md:rounded-se-none md:max-w-xs">
            <img
              className="size-full absolute top-0 start-0 object-contain z-auto"
              alt="CardImage"
              src={WNDWlogo}
            />
          </div>
          <div className="flex flex-wrap">
            <div className="p-4 flex flex-col h-full sm:p-7">
              <h3 className="text-xl font-bold text-amber-600 dark:text-white">
                Edelman Creative Group
              </h3>
              <p className="mt-2 italic mb-2 text-gray-900 font-semibold dark:text-neutral-600">
                1221 Brickell Ave, Miami, Florida 33131
              </p>
              <p className="text-gray-500 dark:text-neutral-400 line-clamp-6">
                Edelman is a global communications firm that partners with
                businesses and organizations to evolve, promote and protect
                their brands and reputations. Our 6,000 people in more than 60
                offices deliver communications strategies that give our clients
                the confidence to lead and act with certainty, earning the trust
                of their stakeholders. Our honors include Cannes Lions Grand
                Prix awards for PR (2016) and the Entertainment Lions for Sport
                (2021); Cannes Lions Independent Agency of the Year for the
                Entertainment Track (2021); Advertising Age’s 2019 A-List; the
                Holmes Report’s 2018 Global Digital Agency of the Year; and,
                five times, Glassdoor’s Best Places to Work.
              </p>
              <div className="flex flex-row justify-between items-center mt-6">
                <div className="flex flex-row gap-10">
                  <div className="flex flex-col">
                    <p className="mt-1 text-gray-900 font-semibold dark:text-neutral-600">
                      Type of Service :
                    </p>
                    <p className=" text-gray-500 dark:text-neutral-400">
                      Media Company
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <p className="mt-1 text-gray-900 font-semibold dark:text-neutral-600">
                      DMA :
                    </p>
                    <p className=" text-gray-500 dark:text-neutral-400">
                      New York, NY
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 self-center">
                  Verified
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
