
import { useState, useMemo } from "react";
import Header from "@/components/Header";
import EventCard from "@/components/EventCard";
import EventFilters from "@/components/EventFilters";
import EventDetails from "@/components/EventDetails";
import Footer from "@/components/Footer";
import { Event, EventFilters as FilterType } from "@/types";
import { events } from "@/data/events";

const Index = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterType>({
    search: "",
    eventType: "all",
    college: "",
    dateRange: {
      from: undefined,
      to: undefined,
    },
  });

  // Extract all unique college names
  const colleges = useMemo(() => {
    const allColleges = events.map((event) => event.college);
    return [...new Set(allColleges)];
  }, []);

  // Filter events based on filters
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      // Search filter
      if (
        filters.search &&
        !event.name.toLowerCase().includes(filters.search.toLowerCase()) &&
        !event.description.toLowerCase().includes(filters.search.toLowerCase()) &&
        !event.college.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false;
      }

      // Event type filter
      if (filters.eventType !== "all" && event.eventType !== filters.eventType) {
        return false;
      }

      // College filter
      if (
        filters.college &&
        event.college !== filters.college
      ) {
        return false;
      }

      // Date filter
      if (filters.dateRange.from) {
        const eventDate = new Date(event.date);
        const fromDate = new Date(filters.dateRange.from);
        fromDate.setHours(0, 0, 0, 0);
        
        if (eventDate < fromDate) {
          return false;
        }
      }

      return true;
    });
  }, [filters, events]);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setIsDetailsOpen(true);
  };

  const closeEventDetails = () => {
    setIsDetailsOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-12 px-4 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Tech Event Nexus</h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Discover tech talks, hackathons, and workshops at colleges and universities.
            </p>
            <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
              <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-lg p-4 shadow-sm">
                <div className="text-3xl font-bold text-primary mb-2">
                  {filteredEvents.filter(e => e.eventType === 'hackathon').length}
                </div>
                <div className="text-sm">Hackathons</div>
              </div>
              <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-lg p-4 shadow-sm">
                <div className="text-3xl font-bold text-accent mb-2">
                  {filteredEvents.filter(e => e.eventType === 'workshop').length}
                </div>
                <div className="text-sm">Workshops</div>
              </div>
              <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-lg p-4 shadow-sm">
                <div className="text-3xl font-bold text-secondary mb-2">
                  {filteredEvents.filter(e => e.eventType === 'techtalk').length}
                </div>
                <div className="text-sm">Tech Talks</div>
              </div>
            </div>
          </div>
        </section>
        <section className="container mx-auto py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <EventFilters 
                filters={filters} 
                onFilterChange={setFilters} 
                colleges={colleges}
              />
            </div>
            <div className="lg:col-span-3">
              {filteredEvents.length === 0 ? (
                <div className="bg-card rounded-lg p-8 text-center">
                  <h3 className="text-lg font-semibold mb-2">No events found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your filters or check back later for new events.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      onClick={() => handleEventClick(event)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <EventDetails 
        event={selectedEvent} 
        isOpen={isDetailsOpen} 
        onClose={closeEventDetails}
      />
      <Footer />
    </div>
  );
};

export default Index;
