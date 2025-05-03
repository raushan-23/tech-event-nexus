
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EventFilters, EventType } from "@/types";
import { format } from "date-fns";

interface EventFiltersProps {
  filters: EventFilters;
  onFilterChange: (filters: EventFilters) => void;
  colleges: string[];
}

const EventFiltersComponent = ({
  filters,
  onFilterChange,
  colleges,
}: EventFiltersProps) => {
  const [date, setDate] = useState<Date | undefined>(undefined);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filters,
      search: e.target.value,
    });
  };

  const handleEventTypeChange = (value: string) => {
    onFilterChange({
      ...filters,
      eventType: value as EventType | "all",
    });
  };

  const handleCollegeChange = (value: string) => {
    onFilterChange({
      ...filters,
      college: value,
    });
  };

  const handleDateChange = (date: Date | undefined) => {
    setDate(date);
    onFilterChange({
      ...filters,
      dateRange: {
        ...filters.dateRange,
        from: date,
      },
    });
  };

  const clearFilters = () => {
    setDate(undefined);
    onFilterChange({
      search: "",
      eventType: "all",
      college: "",
      dateRange: {
        from: undefined,
        to: undefined,
      },
    });
  };

  return (
    <div className="bg-card rounded-lg p-4 shadow-sm border">
      <div className="text-lg font-semibold mb-4">Filters</div>
      <div className="space-y-4">
        <div>
          <Input
            placeholder="Search events..."
            value={filters.search}
            onChange={handleSearchChange}
            className="w-full"
          />
        </div>
        <div>
          <Select
            value={filters.eventType}
            onValueChange={handleEventTypeChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Event Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="hackathon">Hackathon</SelectItem>
              <SelectItem value="workshop">Workshop</SelectItem>
              <SelectItem value="techtalk">Tech Talk</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select value={filters.college} onValueChange={handleCollegeChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="College" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Colleges</SelectItem>
              {colleges.map((college) => (
                <SelectItem key={college} value={college}>
                  {college}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-4 w-4"
                >
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                  <line x1="16" x2="16" y1="2" y2="6" />
                  <line x1="8" x2="8" y1="2" y2="6" />
                  <line x1="3" x2="21" y1="10" y2="10" />
                </svg>
                {filters.dateRange.from ? (
                  format(filters.dateRange.from, "PPP")
                ) : (
                  <span>Select date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={filters.dateRange.from}
                onSelect={handleDateChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <Button
          variant="outline"
          onClick={clearFilters}
          className="w-full"
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

export default EventFiltersComponent;
