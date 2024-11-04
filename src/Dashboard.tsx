import { useState, useEffect, Suspense } from "react";
import { Search } from "lucide-react";
//import axios from "axios";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom"; // Assuming you're using react-router-dom
import superhero from "@/assets/superhero.svg";
//import billboard3 from "@/assets/billboard3.svg";
//import ooh from "@/assets/ooh.png";
//import WNDWlogo from "@/assets/WNDWlogo.jpg";
//import { PartnerCard2 } from "@/local-components/PartnerCard2";
import { PartnerCard } from "@/local-components/PartnerCard";
import { PartnerSheet } from "./local-components/PartnerSheet";
import { DataTableFacetedFilter } from "@/local-components/DataTableFacetedFilter";
import { IPartner } from "@/lib/utils";
import { Loading } from "@/local-components/Loading";
import Papa from "papaparse";
import {
  Pagination,
  PaginationContent,
  //PaginationEllipsis,
  PaginationItem,
  //PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import csvFile from "./data/DirectoryMasterSheet.csv";

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

const filterDMAsOptions = [
  { label: "Los Angeles", value: "Los Angeles" },
  { label: "Columbus", value: "Columbus" },
  { label: "New York", value: "New York" },
  { label: "Hyderabad", value: "Hyderabad" },
  { label: "Bangalore", value: "Bangalore" },
  { label: "Chennai", value: "Chennai" },
  { label: "Mumbai", value: "Mumbai" },
];

function Dashboard() {
  const [partnersData, setPartnersData] = useState<IPartner[]>([]);
  const [filteredPartners, setFilteredPartners] = useState<IPartner[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string[]>([]);
  const [selectedFilterFormats, setSelectedFilterFormats] = useState<string[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  //const [temerror, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState<IPartner[]>([]);
  const [clickedPartnerObject, setClickedPartnerObject] =
    useState<IPartner | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const rowsPerPage = 10;

  useEffect(() => {
    ///TEMp Fix FrontEnd////////////////////////
    fetch(csvFile)
      .then((response) => response.text())
      .then((data) => {
        Papa.parse(data, {
          header: true,
          dynamicTyping: true,
          complete: (results) => {
            const formattedData: IPartner[] = results.data.map(
              (row: any, index) => ({
                partner_id: index + 1,
                partner_name: row["Partner Name"] as string, // Adjust based on your CSV headers
                description: row["Description"] as string,
                services: row["Services"] as string,
                country: row["Country"] as string,
                state_province: row["State/Province"] as string,
                city_dma: row["City/DMA"] as string,
                formats: row["OperatingFormats"] as string,
                addresses: [
                  {
                    address_country: row["Address Country"] as string,
                    address_state: row["Address State"] as string,
                    address_street: row["Address Street"] as string,
                    address_city: row["Address City"] as string,
                    address_zip_code: row["Address Zip Code"] as string,
                  },
                ],
                contacts: [
                  {
                    contact_name: row["Contact Name"] as string,
                    contact_email: row["Contact Email"] as string,
                    contact_phone: row["Contact Phone"] as string,
                  },
                ],
                websites: [
                  {
                    website_url: row["Website"] as string,
                    verified: row["Verified"] === "true", // Assuming verified is a boolean in the CSV
                  },
                ],
              }),
            );
            setPartnersData(formattedData);
            setFilteredPartners(formattedData);
            setLoading(false);
          },
        });
      });

    //TEMP FIX ENDDDDD////////////////

    ////Closed API Call to be open//////
    // axios
    //   //.get("65.2.6.168/partners")
    //   .get("https://breadbutterandmagic.com/partners")
    //   .then((response) => {
    //     console.log("DataPartner---", response.data);
    //     setPartnersData(response.data);
    //     setFilteredPartners(response.data);
    //   })
    //   .catch((error) => {
    //     setError(error.message);
    //     console.log("Error", temerror);
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
    ///Closed api call to open////

    // setLoading(false);
    // setPartnersData(arr);
    // setFilteredPartners(arr);
  }, []);

  useEffect(() => {
    const currentDatatemp = filteredPartners.slice(
      (currentPage - 1) * rowsPerPage,
      currentPage * rowsPerPage,
    );

    setCurrentData(currentDatatemp);
  }, [filteredPartners, currentPage]);

  const totalPages = Math.ceil(filteredPartners.length / rowsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Mimic column filter functionality
  const column = {
    getFilterValue: () => selectedFilter,
    setFilterValue: (value: string[] | undefined) => {
      if (value) {
        setSelectedFilter(value);

        // Apply filter logic
        const filtered = partnersData?.filter((partner) => {
          const isVerified = partner.websites[0]?.verified.toString();
          return value?.includes(isVerified);
        });

        setFilteredPartners(filtered);
        setCurrentData(filtered);
      } else {
        setFilteredPartners(partnersData); // Reset to original data if no filter
        setCurrentData(partnersData);
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
          const partFormat = partner.formats?.toLowerCase(); // Convert partner formats to lowercase for comparison

          // Check if any of the selected filter values are included in partner formats
          return value?.some((format) =>
            partFormat?.includes(format?.toLowerCase()),
          );
        });

        setFilteredPartners(filtered);
        setCurrentData(filtered);
      } else {
        setFilteredPartners(partnersData); // Reset to original data if no filter
        setCurrentData(partnersData);
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

  const columnDMAsCities = {
    getFilterValue: () => selectedFilterFormats,
    setFilterValue: (value: string[] | undefined) => {
      if (value) {
        setSelectedFilterFormats(value);

        // Apply filter logic
        const filtered = partnersData?.filter((partner) => {
          const partFormat = partner.city_dma?.toLowerCase(); // Convert partner formats to lowercase for comparison

          // Check if any of the selected filter values are included in partner formats
          return value.some((dma) => partFormat?.includes(dma.toLowerCase()));
        });

        setFilteredPartners(filtered);
        setCurrentData(filtered);
      } else {
        setFilteredPartners(partnersData); // Reset to original data if no filter
        setCurrentData(partnersData);
      }
    },
    getFacetedUniqueValues: () => {
      // Mimicking faceted values based on the "verified" status
      return new Map([
        ["true", partnersData.filter((p) => p.city_dma).length],
        ["false", partnersData.filter((p) => !p.city_dma).length],
      ]);
    },
  };

  // useEffect(() => {
  //   const applyFilters = () => {
  //     let filtered = partnersData;

  //     // Filter by Verified status
  //     if (selectedFilter.length > 0) {
  //       filtered = filtered.filter((partner) => {
  //         const isVerified = partner.websites[0]?.verified.toString();
  //         return selectedFilter?.includes(isVerified);
  //       });
  //     }

  //     // Filter by Formats
  //     if (selectedFilterFormats.length > 0) {
  //       filtered = filtered.filter((partner) => {
  //         const partFormat = partner.formats?.toLowerCase();
  //         return selectedFilterFormats.some((format) =>
  //           partFormat?.includes(format?.toLowerCase()),
  //         );
  //       });
  //     }

  //     // Filter by DMA cities
  //     if (selectedFilterFormats.length > 0) {
  //       filtered = filtered.filter((partner) => {
  //         const partCityDMA = partner.city_dma?.toLowerCase();
  //         return selectedFilterFormats.some((dma) =>
  //           partCityDMA?.includes(dma?.toLowerCase()),
  //         );
  //       });
  //     }

  //     setFilteredPartners(filtered);
  //     setCurrentData(filtered);
  //   };

  //   applyFilters();
  // }, [selectedFilter, selectedFilterFormats, partnersData]);

  const onSearchResults = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tempValue = event.target.value.toLowerCase(); // Get the input value and convert to lowercase
    if (tempValue) {
      const filtered = partnersData?.filter((partner) => {
        // Check all fields for a match
        return (
          (typeof partner.partner_name === "string" &&
            partner.partner_name.toLowerCase().includes(tempValue)) ||
          (typeof partner.description === "string" &&
            partner.description.toLowerCase().includes(tempValue)) ||
          (typeof partner.services === "string" &&
            partner.services.toLowerCase().includes(tempValue)) ||
          (typeof partner.country === "string" &&
            partner.country.toLowerCase().includes(tempValue)) ||
          (typeof partner.state_province === "string" &&
            partner.state_province.toLowerCase().includes(tempValue)) ||
          (typeof partner.city_dma === "string" &&
            partner.city_dma.toLowerCase().includes(tempValue)) ||
          (typeof partner.formats === "string" &&
            partner.formats.toLowerCase().includes(tempValue)) ||
          (Array.isArray(partner.contacts) &&
            partner.contacts.some((contact) =>
              Object.values(contact).some(
                (field) =>
                  typeof field === "string" &&
                  field.toLowerCase().includes(tempValue),
              ),
            )) ||
          (Array.isArray(partner.websites) &&
            partner.websites.some(
              (website) =>
                typeof website.website_url === "string" &&
                website.website_url.toLowerCase().includes(tempValue),
            ))
        );
      });

      setFilteredPartners(filtered);
      setCurrentData(filtered);
    } else {
      setFilteredPartners(partnersData); // Reset to original data if no filter
      setCurrentData(partnersData);
      setCurrentPage(1);
    }
  };

  const handleCardClick = (partnerObject: IPartner) => {
    setClickedPartnerObject(partnerObject);
    setIsSheetOpen(true);
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
          <h1 className="text-3xl w-fit text-nowrap font-semibold">
            Global OOH Directory
          </h1>
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
              <div className="mx-auto w-full flex flex-wrap flex-row gap-6 align-middle p-6 bg-purple-100 rounded-md">
                <p className="text-lg align-middle font-medium">Filters :</p>
                <DataTableFacetedFilter
                  title="Category"
                  column={column}
                  options={filterOptions}
                />
                <DataTableFacetedFilter
                  title="Operating Formats"
                  column={columnFormats}
                  options={formatFilterOptions}
                />
                <DataTableFacetedFilter
                  title="Operating DMAs/Cities"
                  column={columnDMAsCities}
                  options={filterDMAsOptions}
                />
              </div>
              <div className="mx-auto grid w-full">
                <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
                  {currentData.map((partner: IPartner) => (
                    <PartnerCard
                      key={partner.partner_id}
                      partnerObject={partner}
                      onItemClick={handleCardClick}
                    />
                  ))}
                </div>
              </div>
              <Pagination style={{ width: "auto" }}>
                <PaginationPrevious
                  onClick={() => {
                    if (currentPage !== 1)
                      handlePageChange(Math.max(currentPage - 1, 1));
                  }}
                  className={
                    currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
                  } // Adjust styles based on disabled state
                >
                  Previous
                </PaginationPrevious>
                <PaginationContent>
                  {Array.from({ length: totalPages }, (_, index) => {
                    const pageNum = index + 1;
                    if (
                      pageNum === 1 ||
                      pageNum === totalPages ||
                      (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                    ) {
                      return (
                        <PaginationItem
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`pagination-item ${currentPage === pageNum ? "active" : ""}`}
                        >
                          {pageNum}
                        </PaginationItem>
                      );
                    }
                    if (
                      pageNum === currentPage - 2 ||
                      pageNum === currentPage + 2
                    ) {
                      return (
                        <span key={pageNum} className="mx-2">
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}
                </PaginationContent>
                <PaginationNext
                  onClick={() =>
                    handlePageChange(Math.min(currentPage + 1, totalPages))
                  }
                  className={`pagination-next ${currentPage === totalPages ? "disabled" : ""}`}
                >
                  Next
                </PaginationNext>
              </Pagination>
            </>
            {clickedPartnerObject && (
              <PartnerSheet
                partnerObject={clickedPartnerObject}
                open={isSheetOpen}
                onClose={() => setIsSheetOpen(false)}
              />
            )}
          </Suspense>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
