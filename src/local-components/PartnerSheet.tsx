import { IPartner } from "@/lib/utils";
import { Sheet, SheetContent, SheetFooter } from "@/components/ui/sheet";

interface PartnerSheetProps {
  partnerObject: IPartner;
  open: boolean;
  onClose: () => void;
}

export function PartnerSheet({
  partnerObject,
  open,
  onClose,
}: PartnerSheetProps) {
  const {
    partner_name,
    country,
    contacts,
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
    <div className="grid grid-cols-2 gap-2">
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent side="bottom">
          <div className="flex gap-4 p-4">
            <div className="h-24 w-24 rounded-md border border-gray-200 bg-slate-100 flex items-center justify-center">
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
              <div className="h-auto w-fit flex-row justify-start mt-4 mb-4">
                <div className="flex flex-row align-middle">
                  <p className="text-gray-900 font-semibold dark:text-neutral-600">
                    Contact Name :
                  </p>
                  <p className=" text-gray-500 dark:text-neutral-400 pl-4">
                    {contacts[0]?.contact_name}
                  </p>
                </div>
                <div className="flex flex-row align-middle">
                  <p className="text-gray-900 font-semibold dark:text-neutral-600">
                    Contact Phone :
                  </p>
                  <p className=" text-gray-500 dark:text-neutral-400 pl-4">
                    {contacts[0]?.contact_phone}
                  </p>
                </div>
                <div className="flex flex-row align-middle">
                  <p className="text-gray-900 font-semibold dark:text-neutral-600">
                    Contact Email :
                  </p>
                  <p className=" text-gray-500 dark:text-neutral-400 pl-4">
                    {contacts[0]?.contact_email}
                  </p>
                </div>
                <div className="flex flex-row align-middle">
                  <p className="text-gray-900 font-semibold dark:text-neutral-600">
                    Website :
                  </p>
                  <p className=" text-gray-500 dark:text-neutral-400 pl-4">
                    {websites[0]?.website_url}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <SheetFooter className="sm:justify-start justify-start border-t px-6 py-4 flex align-middle">
            <div className="flex flex-row gap-10 flex-grow">
              <div className="flex flex-col">
                <p className="mt-1 text-gray-900 font-semibold dark:text-neutral-600">
                  Type of Service :
                </p>
                <p className=" text-gray-500 dark:text-neutral-400">
                  {services}
                </p>
              </div>
              <div className="flex flex-col">
                <p className="mt-1 text-gray-900 font-semibold dark:text-neutral-600">
                  Country :
                </p>
                <p className=" text-gray-500 dark:text-neutral-400">
                  {country}
                </p>
              </div>
              <div className="flex flex-col">
                <p className="mt-1 text-gray-900 font-semibold dark:text-neutral-600">
                  DMA / City :
                </p>
                <p className=" text-gray-500 dark:text-neutral-400">
                  {city_dma}
                </p>
              </div>
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
              {verifiedStatus}
            </span>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
