
import { format, parseISO } from "date-fns";
import { Event } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface EventCardProps {
  event: Event;
  onClick: () => void;
}

const EventCard = ({ event, onClick }: EventCardProps) => {
  const eventTypeColor = {
    hackathon: "bg-event-hackathon",
    workshop: "bg-event-workshop", 
    techtalk: "bg-event-techtalk"
  };

  const eventBadgeVariant = {
    hackathon: "default",
    workshop: "secondary",
    techtalk: "outline"
  } as const;

  const formattedDate = format(parseISO(event.date), "MMM dd, yyyy");
  const formattedTime = format(parseISO(event.date), "h:mm a");

  return (
    <Card 
      className={`overflow-hidden hover:shadow-lg transition-shadow duration-300 event-card-${event.eventType}`} 
      onClick={onClick}
    >
      {event.imageUrl && (
        <div className="h-40 w-full overflow-hidden">
          <img
            src={event.imageUrl}
            alt={event.name}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Badge variant={eventBadgeVariant[event.eventType]} className="mb-2">
            {event.eventType.charAt(0).toUpperCase() + event.eventType.slice(1)}
          </Badge>
          <div className="text-sm text-muted-foreground">
            {formattedDate}
          </div>
        </div>
        <h3 className="text-lg font-bold mb-1 line-clamp-2">{event.name}</h3>
        <p className="text-sm text-muted-foreground mb-2">{event.college}</p>
        <p className="text-sm mb-2 line-clamp-3">{event.description}</p>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span className="truncate">{event.location}</span>
        </div>
      </CardContent>
      <CardFooter className="border-t p-4 pt-3">
        <Button variant="outline" className="w-full" onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}>
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
