import { Card, CardContent, CardFooter } from "@/components/ui/card";

//import billboard3 from "@/assets/billboard3.svg";
//import ooh from "@/assets/ooh.png";
//import WNDWlogo from "@/assets/WNDWlogo.jpg";
import { IPartner } from "@/lib/utils";

interface PartnerCardProps {
  partnerObject: IPartner;
  onItemClick: (item: IPartner) => void;
}

export function PartnerCard({ partnerObject, onItemClick }: PartnerCardProps) {
  const {
    partner_name,
    country,
    description,
    city_dma,
    formats,
    services,
    websites,
  } = partnerObject;

  const verifiedStatus =
    websites?.length > 0
      ? websites.map((web) => {
          return web.verified ? "Verified" : "Not Verified";
        })
      : "NA";

  // Helper function to get initials from partner name
  const getInitials = (name: string | undefined) => {
    if (!name) return ""; // Return an empty string or any fallback value

    const nameParts = name.split(" ");
    const initials = nameParts
      .map((part) => part[0])
      .slice(0, 2) // limit to 2 characters for initials
      .join("");
    return initials.toUpperCase();
  };

  return (
    <Card onClick={() => onItemClick(partnerObject)}>
      <CardContent className="flex gap-4 p-4">
        {/* Initials container */}
        <div className="h-48 w-48 rounded-md border border-gray-200 bg-slate-100 flex items-center justify-center">
          <span className="text-6xl font-bold text-purple-800">
            {getInitials(partner_name)}
          </span>
        </div>

        {/* Flex container for the text content */}
        <div className="flex flex-col justify-start flex-1">
          <h3 className="text-xl font-bold text-amber-600 dark:text-white pb-2">
            {partner_name}
          </h3>
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
              Country :
            </p>
            <p className=" text-gray-500 dark:text-neutral-400">{country}</p>
          </div>
          <div className="flex flex-col">
            <p className="mt-1 text-gray-900 font-semibold dark:text-neutral-600">
              DMA / City :
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
