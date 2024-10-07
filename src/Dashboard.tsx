import { useState, useEffect, Suspense } from "react";
import { Search } from "lucide-react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom"; // Assuming you're using react-router-dom
import superhero from "@/assets/superhero.svg";
//import billboard3 from "@/assets/billboard3.svg";
//import ooh from "@/assets/ooh.png";
//import WNDWlogo from "@/assets/WNDWlogo.jpg";
import { PartnerCard2 } from "@/local-components/PartnerCard2";
import { PartnerCard } from "@/local-components/PartnerCard";
import { DataTableFacetedFilter } from "@/local-components/DataTableFacetedFilter";
import { IPartner } from "@/lib/utils";
import { Loading } from "@/local-components/Loading";

export const description = "A settings page with a form and navigation links.";

// Options for the Verified status filter
const filterOptions = [
  { label: "Verified", value: "true" },
  { label: "Not Verified", value: "false" },
];

// Options for the Formats status filter
const formatFilterOptions = [
  { label: "Static Wallscape", value: "static_wallscape" },
  { label: "Wallscape", value: "wallscape" },
  { label: "Painted Wallscape", value: "painted_wallscape" },
  { label: "Bulletin", value: "bulletin" },
  { label: "Digital Bulletin", value: "digital_bulletin" },
  {
    label: "Interactive Digital Kiosks Experience",
    value: "interactive_digital_kiosks",
  },
  { label: "Kiosk", value: "kiosk" },
  { label: "Transit", value: "transit" },
  { label: "Train Station Domination", value: "train_station_domination" },
  { label: "Billboard", value: "billboard" },
  { label: "Bus Shelters", value: "bus_shelters" },
  { label: "Urban Panels", value: "urban_panels" },
  { label: "Airport", value: "airport" },
  { label: "Mobile", value: "mobile" },
  { label: "Digital", value: "Digital" },
  { label: "Print", value: "Print" },
  { label: "Street Furniture", value: "street_furniture" },
  { label: "Transport Advertising", value: "transport_advertising" },
  { label: "Billboard Advertising", value: "billboard_advertising" },
  { label: "Transit Shelter", value: "transit_shelter" },
];

function Dashboard() {
  const [partnersData, setPartnersData] = useState<IPartner[]>([]);
  const [filteredPartners, setFilteredPartners] = useState<IPartner[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string[]>([]);
  const [selectedFilterFormats, setSelectedFilterFormats] = useState<string[]>(
    [],
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const arr: IPartner[] = [
      {
        partner_id: 5,
        partner_name: "Elonex",
        description: "A partner offering various services.",
        services: "Consulting, Development",
        country: "USA",
        state_province: "California",
        city_dma: "Los Angeles",
        formats: "Digital, Print",
        addresses: [
          {
            address_country: "USA",
            address_state: "California",
            address_street: "123 Main St",
            address_city: "Los Angeles",
            address_zip_code: "90001",
          },
        ],
        contacts: [
          {
            contact_name: "John Doe",
            contact_email: "johndoe@example.com",
            contact_phone: "+1-555-555-5555",
          },
        ],
        websites: [
          {
            website_url: "http://www.example.com",
            verified: true,
          },
        ],
      },
      {
        partner_id: 4,
        partner_name: "Global Advertsising",
        description: "A partner offering various services.",
        services: "Consulting, Development",
        country: "USA",
        state_province: "California",
        city_dma: "Los Angeles",
        formats: "Digital, Print",
        addresses: [
          {
            address_country: "USA",
            address_state: "California",
            address_street: "123 Main St",
            address_city: "Los Angeles",
            address_zip_code: "90001",
          },
        ],
        contacts: [
          {
            contact_name: "John Doe",
            contact_email: "johndoe@example.com",
            contact_phone: "+1-555-555-5555",
          },
        ],
        websites: [
          {
            website_url: "http://www.example.com",
            verified: true,
          },
        ],
      },
      {
        partner_id: 6,
        partner_name: "ElonexNew",
        description: "A partner offering various services.",
        services: "Consulting, Development",
        country: "USA",
        state_province: "California",
        city_dma: "Los Angeles",
        formats: "Digital, Print",
        addresses: [
          {
            address_country: "USA",
            address_state: "California",
            address_street: "123 Main St",
            address_city: "Los Angeles",
            address_zip_code: "90001",
          },
        ],
        contacts: [
          {
            contact_name: "John Doe",
            contact_email: "johndoe@example.com",
            contact_phone: "+1-555-555-5555",
          },
        ],
        websites: [
          {
            website_url: "http://www.example.com",
            verified: true,
          },
        ],
      },
      {
        partner_id: 2,
        partner_name: "Orange Barrel Media",
        description:
          "Since our founding in 2004, Orange Barrel Media has been creating value for advertisers, municipal clients, and the cities they serve by designing and operating iconic out-of-home media that adds to the character of urban places. We pioneer landmark media and smart city technology to improve lives in cities.",
        services: "Media Company",
        country: "US",
        state_province: "OH",
        city_dma: "Columbus",
        formats:
          "Static Wallscape, Wallscape, Painted Wallscape, Bulletin, Digital Bulletin, Interactive Digital Kiosks Experience Kiosk",
        addresses: [
          {
            address_country: "US",
            address_state: "OH",
            address_street: "250 N. Hartford Avenue",
            address_city: "Columbus",
            address_zip_code: "43222",
          },
        ],
        contacts: [
          {
            contact_name: "Mike Knoll",
            contact_email: "mknoll@orangebarrelmedia.com",
            contact_phone: "(330) 612-4748",
          },
        ],
        websites: [
          {
            website_url: "https://orangebarrelmedia.com/",
            verified: true,
          },
        ],
      },
      {
        partner_id: 7,
        partner_name: "JC Decaux",
        description:
          "In 1964, Jean-Claude Decaux invented advertising street furniture. In 2011, JCDecaux became the number one outdoor advertising company worldwide, developing three areas of business: street furniture, transport advertising and billboard advertising.",
        services: "Media Company, Agency",
        country: "USA",
        state_province: "California",
        city_dma: "Los Angeles",
        formats:
          "street furniture, transport advertising and billboard advertising",
        addresses: [
          {
            address_country: "USA",
            address_state: "California",
            address_street: "123 Main St",
            address_city: "Los Angeles",
            address_zip_code: "90001",
          },
        ],
        contacts: [
          {
            contact_name: "Sophie WITLOX,CORREIA Jean Claude,Manon Vallet",
            contact_email: "johndoe@example.com",
            contact_phone: "+1-555-555-5555",
          },
        ],
        websites: [
          {
            website_url: "https://www.jcdecaux.com/fr",
            verified: true,
          },
        ],
      },
      {
        partner_id: 8,
        partner_name: "JC Decaux",
        description:
          "In 1964, Jean-Claude Decaux invented advertising street furniture. In 2011, JCDecaux became the number one outdoor advertising company worldwide, developing three areas of business: street furniture, transport advertising and billboard advertising.",
        services: "Media Company, Agency",
        country: "USA",
        state_province: "California",
        city_dma: "Los Angeles",
        formats:
          "street furniture, transport advertising and billboard advertising",
        addresses: [
          {
            address_country: "USA",
            address_state: "California",
            address_street: "123 Main St",
            address_city: "Los Angeles",
            address_zip_code: "90001",
          },
        ],
        contacts: [
          {
            contact_name: "Sophie WITLOX,CORREIA Jean Claude,Manon Vallet",
            contact_email: "johndoe@example.com",
            contact_phone: "+1-555-555-5555",
          },
        ],
        websites: [
          {
            website_url: "https://www.jcdecaux.com/fr",
            verified: true,
          },
        ],
      },
    ];
    setLoading(false);
    setPartnersData(arr);
    setFilteredPartners(arr);
  }, []);

  // Mimic column filter functionality
  const column = {
    getFilterValue: () => selectedFilter,
    setFilterValue: (value: string[] | undefined) => {
      if (value) {
        setSelectedFilter(value);

        // Apply filter logic
        const filtered = partnersData?.filter((partner) => {
          const isVerified = partner.websites[0]?.verified.toString();
          return value.includes(isVerified);
        });

        setFilteredPartners(filtered);
      } else {
        setFilteredPartners(partnersData); // Reset to original data if no filter
      }
    },
    getFacetedUniqueValues: () => {
      // Mimicking faceted values based on the "verified" status
      return new Map([
        ["true", partnersData.filter((p) => p.websites[0]?.verified).length],
        ["false", partnersData.filter((p) => !p.websites[0]?.verified).length],
      ]);
    },
  };

  const columnFormats = {
    getFilterValue: () => selectedFilterFormats,
    setFilterValue: (value: string[] | undefined) => {
      if (value) {
        setSelectedFilterFormats(value);

        // Apply filter logic
        const filtered = partnersData?.filter((partner) => {
          const partFormat = partner.formats.toLowerCase(); // Convert partner formats to lowercase for comparison

          // Check if any of the selected filter values are included in partner formats
          return value.some((format) =>
            partFormat.includes(format.toLowerCase()),
          );
        });

        setFilteredPartners(filtered);
      } else {
        setFilteredPartners(partnersData); // Reset to original data if no filter
      }
    },
    getFacetedUniqueValues: () => {
      // Mimicking faceted values based on the "verified" status
      return new Map([
        ["true", partnersData.filter((p) => p.formats).length],
        ["false", partnersData.filter((p) => !p.formats).length],
      ]);
    },
  };

  const onSearchResults = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tempValue = event.target.value; // Get the input value from the event
    if (tempValue) {
      // Apply filter logic
      const filtered = partnersData?.filter((partner) => {
        const partName = partner.partner_name.toLowerCase(); // Convert partner formats to lowercase for comparison

        // Check if the input value is included in the partner name
        return partName.includes(tempValue.toLowerCase());
      });

      setFilteredPartners(filtered);
    } else {
      setFilteredPartners(partnersData); // Reset to original data if no filter
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-10">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            to="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <img className="h-20 w-64 pl-4" src={superhero} />
          </Link>
          <Link
            to="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          ></Link>
        </nav>
      </header>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto w-full flex">
          <h1 className="text-3xl font-semibold">Directories</h1>
          <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <form className="ml-auto flex-1 sm:flex-initial">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  onChange={onSearchResults}
                  placeholder="Search products..."
                  className="pl-8 sm:w-[300px] md:w-[300px] lg:w-[600px]"
                />
              </div>
            </form>
          </div>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <Suspense fallback={<Loading />}>
            <>
              <div className="mx-auto w-full flex flex-row gap-6 align-middle p-6 bg-purple-100 rounded-md">
                <p className="text-lg align-middle font-medium">Filters :</p>
                <DataTableFacetedFilter
                  title="Verified Status"
                  column={column}
                  options={filterOptions}
                />
                <DataTableFacetedFilter
                  title="Operating Formats"
                  column={columnFormats}
                  options={formatFilterOptions}
                />
              </div>
              <div className="mx-auto grid w-full">
                <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
                  {filteredPartners.map((partner: IPartner) => (
                    <PartnerCard key={partner.partner_id} {...partner} />
                  ))}
                  <PartnerCard2 />
                </div>
              </div>
            </>
          </Suspense>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
