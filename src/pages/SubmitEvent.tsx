
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EventForm from "@/components/EventForm";

const SubmitEvent = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Submit an Event</h1>
          <p className="text-muted-foreground mb-8">
            Know about a tech event happening at your college or university? Submit it here to share with the community.
          </p>
          <div className="bg-card rounded-lg p-6 shadow-sm border">
            <EventForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SubmitEvent;
