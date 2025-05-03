
import { format, parseISO } from "date-fns";
import { Event } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface EventDetailsProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
}

const EventDetails = ({ event, isOpen, onClose }: EventDetailsProps) => {
  if (!event) return null;

  const eventTypeColor = {
    hackathon: "bg-event-hackathon",
    workshop: "bg-event-workshop",
    techtalk: "bg-event-techtalk",
  };

  const eventBadgeVariant = {
    hackathon: "default",
    workshop: "secondary",
    techtalk: "outline",
  } as const;

  const formattedDate = event.date
    ? format(parseISO(event.date), "EEEE, MMMM dd, yyyy")
    : "";
  const formattedTime = event.date
    ? format(parseISO(event.date), "h:mm a")
    : "";

  let dateDisplay = `${formattedDate} at ${formattedTime}`;
  if (event.endDate) {
    const formattedEndDate = format(parseISO(event.endDate), "EEEE, MMMM dd, yyyy");
    const formattedEndTime = format(parseISO(event.endDate), "h:mm a");
    dateDisplay = `${formattedDate} at ${formattedTime} - ${formattedEndDate} at ${formattedEndTime}`;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant={eventBadgeVariant[event.eventType]}>
              {event.eventType.charAt(0).toUpperCase() + event.eventType.slice(1)}
            </Badge>
          </div>
          <DialogTitle className="text-2xl font-bold">{event.name}</DialogTitle>
          <DialogDescription className="text-base font-medium">
            {event.college}
          </DialogDescription>
        </DialogHeader>
        {event.imageUrl && (
          <div className="w-full h-56 overflow-hidden rounded-md mb-4">
            <img
              src={event.imageUrl}
              alt={event.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="text-sm font-medium">Date & Time</div>
            <div className="flex items-center gap-2 text-sm">
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
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                <line x1="16" x2="16" y1="2" y2="6" />
                <line x1="8" x2="8" y1="2" y2="6" />
                <line x1="3" x2="21" y1="10" y2="10" />
              </svg>
              <span>{dateDisplay}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium">Location</div>
            <div className="flex items-center gap-2 text-sm">
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
              <span>{event.location}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium">Description</div>
            <p className="text-sm">{event.description}</p>
          </div>
          <div className="pt-4">
            <Button
              className="w-full"
              onClick={() => window.open(event.link, "_blank")}
            >
              Visit Event Website
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventDetails;
