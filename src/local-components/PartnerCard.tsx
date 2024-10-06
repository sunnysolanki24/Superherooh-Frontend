import { Card, CardContent, CardFooter } from "@/components/ui/card";

//import billboard3 from "@/assets/billboard3.svg";
import ooh from "@/assets/ooh.png";
//import WNDWlogo from "@/assets/WNDWlogo.jpg";
import { IPartner } from "@/lib/utils";

export function PartnerCard(partnerObject: IPartner) {
  const {
    partner_name,
    addresses,
    description,
    city_dma,
    formats,
    services,
    websites,
  } = partnerObject;

  const formattedAddresses =
    addresses?.length > 0
      ? addresses.map((address) => {
          return `${address.address_street}, ${address.address_city}, ${address.address_state}, ${address.address_zip_code}, ${address.address_country}`;
        })
      : "NA";

  const verifiedStatus =
    websites?.length > 0
      ? websites.map((web) => {
          return web.verified ? "Verified" : "Not Verified";
        })
      : "NA";

  return (
    <Card>
      <CardContent className="flex gap-4 p-4">
        {/* Image container */}
        <div className="h-48 w-48 rounded-md border border-gray-200">
          <img
            className="h-full w-full rounded-md object-contain"
            alt="Image placeholder"
            src={ooh}
          />
        </div>

        {/* Flex container for the text content */}
        <div className="flex flex-col justify-start flex-1">
          <h3 className="text-xl font-bold text-amber-600 dark:text-white">
            {partner_name}
          </h3>
          <p className="mt-2 italic mb-2 text-gray-900 font-semibold dark:text-neutral-600">
            {formattedAddresses[0]}
          </p>
          <p className="text-gray-500 dark:text-neutral-400 line-clamp-6">
            {description}
          </p>
          <div className="flex gap-2 mt-4">
            <p className="text-gray-500 whitespace-nowrap text-sm dark:text-neutral-600">
              Formats :
            </p>
            <p className="inline-flex items-center text-sm font-medium text-purple-800">
              {formats}
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="border-t px-6 py-4 flex justify-between align-middle">
        <div className="flex flex-row gap-10">
          <div className="flex flex-col">
            <p className="mt-1 text-gray-900 font-semibold dark:text-neutral-600">
              Type of Service :
            </p>
            <p className=" text-gray-500 dark:text-neutral-400">{services}</p>
          </div>
          <div className="flex flex-col">
            <p className="mt-1 text-gray-900 font-semibold dark:text-neutral-600">
              DMA :
            </p>
            <p className=" text-gray-500 dark:text-neutral-400">{city_dma}</p>
          </div>
        </div>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
          {verifiedStatus}
        </span>
      </CardFooter>
    </Card>
  );
}
