
export type EventType = 'hackathon' | 'workshop' | 'techtalk';

export interface Event {
  id: string;
  name: string;
  description: string;
  date: string; // ISO date string
  endDate?: string; // ISO date string for multi-day events
  location: string;
  college: string;
  eventType: EventType;
  link: string;
  imageUrl?: string;
}

export interface EventFilters {
  search: string;
  eventType: EventType | 'all';
  college: string;
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
}
