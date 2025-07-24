import { FileText, Search, MessageCircle, CheckCircle } from 'lucide-react';
import InfoCard from './ui/InfoCard';

const HowItWorks = () => {
  const steps = [
    {
      icon: <FileText className="w-6 h-6 text-primary" />,
      title: 'Report Your Item',
      description: 'Quickly report a lost or found item with location and description.',
    },
    {
      icon: <Search className="w-6 h-6 text-primary" />,
      title: 'Browse or Search',
      description: 'Find matching reports using search or by category.',
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-primary" />,
      title: 'Contact Safely',
      description: 'Use our secure chat to connect and arrange return.',
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-primary" />,
      title: 'Reunite & Return',
      description: 'Meet on campus and return the item securely.',
    },
  ];

  return (
    <section className="py-16 bg-base-100">
      <div className="container mx-auto px-4 text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">How It Works</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Simple 4-step process to report and recover lost & found items on campus.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {steps.map((step, index) => (
          <InfoCard
            key={index}
            title={step.title}
            description={step.description}
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-2 mx-auto">
              {step.icon}
            </div>
          </InfoCard>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
