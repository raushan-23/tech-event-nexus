
# Tech Event Nexus

A comprehensive web platform that aggregates and displays tech events from colleges and universities. The platform allows users to discover hackathons, workshops, and tech talks, as well as submit new events.

## Features

- **Event Dashboard**: View upcoming tech events with detailed information
- **Event Submission**: Allow users to submit new events with comprehensive details
- **Advanced Filtering**: Filter events by type, date, college, and keyword search
- **Responsive Design**: Optimized for all device sizes from mobile to desktop
- **Interactive UI**: Clean, modern interface with intuitive navigation

## Tech Stack

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React hooks for local state
- **Form Handling**: React Hook Form with Zod validation
- **Date Management**: date-fns for date formatting and manipulation
- **Routing**: React Router for navigation

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd tech-event-nexus
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:8080`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── EventCard.tsx    # Card component for displaying event
│   ├── EventDetails.tsx # Modal for showing detailed event information
│   ├── EventFilters.tsx # Filtering component
│   ├── EventForm.tsx    # Form for submitting new events
│   ├── Header.tsx       # Application header
│   └── Footer.tsx       # Application footer
├── data/
│   └── events.ts        # Mock event data
├── pages/
│   ├── Index.tsx        # Home page with event listings
│   └── SubmitEvent.tsx  # Event submission page
├── types/
│   └── index.ts         # TypeScript type definitions
└── App.tsx              # Main application component
```

## Data Model

The application uses the following data model for events:

```typescript
interface Event {
  id: string;
  name: string;
  description: string;
  date: string; // ISO date string
  endDate?: string; // For multi-day events
  location: string;
  college: string;
  eventType: 'hackathon' | 'workshop' | 'techtalk';
  link: string;
  imageUrl?: string;
}
```

## Future Enhancements

- User authentication for event management
- Email notifications for upcoming events
- Calendar integration
- Event recommendation based on user preferences
- Advanced web scraping from college websites to auto-populate events

## Screenshots

![Dashboard](https://i.imgur.com/example1.png)
![Event Detail](https://i.imgur.com/example2.png)
![Event Submission](https://i.imgur.com/example3.png)

## License

This project is licensed under the MIT License - see the LICENSE file for details

## Acknowledgments

- Shadcn UI components
- Unsplash for placeholder images
