import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import heroImage from '@/assets/hero-uml-diagram.png';

const Index = () => {
  const pricingTiers = [
    {
      name: 'Free',
      price: '$0',
      description: 'Perfect for getting started',
      features: [
        'Up to 3 projects',
        'Unlimited diagrams',
        'Basic UML elements',
        'Export to JSON',
        'Local storage',
      ],
    },
    {
      name: 'Pro',
      price: '$12',
      description: 'For professional developers',
      features: [
        'Unlimited projects',
        'All UML diagram types',
        'AWS & CI/CD nodes',
        'Cloud sync',
        'Export to PNG/SVG',
        'Team collaboration',
        'Priority support',
      ],
      highlighted: true,
    },
    {
      name: 'Team',
      price: '$49',
      description: 'For growing teams',
      features: [
        'Everything in Pro',
        'Up to 10 team members',
        'Shared workspaces',
        'Real-time collaboration',
        'Advanced permissions',
        'Version history',
        'Custom templates',
        'Dedicated support',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-foreground">VectorUML</h1>
          </div>
          <nav className="flex items-center gap-4">
            <Link to="/board">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Link to="/board">
              <Button>Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                Design like a software architect
              </h2>
              <p className="text-lg text-muted-foreground">
                Create professional UML diagrams with ease. Build class diagrams, sequence diagrams, and architecture diagrams with our intuitive visual editor.
              </p>
              <div className="flex gap-4">
                <Link to="/board">
                  <Button size="lg">Start Designing</Button>
                </Link>
                <Button size="lg" variant="outline">Learn More</Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src={heroImage} 
                alt="UML Diagram Editor Interface" 
                className="rounded-lg shadow-2xl border border-border"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that fits your needs. All plans include core features with no hidden fees.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
            {pricingTiers.map((tier) => (
              <Card 
                key={tier.name} 
                className={tier.highlighted ? 'border-primary shadow-lg scale-105' : ''}
              >
                <CardHeader>
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <CardDescription>{tier.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <span className="text-4xl font-bold text-foreground">{tier.price}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <ul className="space-y-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link to="/board" className="w-full">
                    <Button 
                      className="w-full" 
                      variant={tier.highlighted ? 'default' : 'outline'}
                    >
                      {tier.name === 'Free' ? 'Get Started' : 'Subscribe'}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2025 VectorUML. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
