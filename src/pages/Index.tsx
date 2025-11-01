import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Layers, Zap, Users, Lock, Cloud, Download } from 'lucide-react';
import heroImage from '@/assets/hero-uml-diagram.png';

const Index = () => {
  const features = [
    {
      icon: Layers,
      title: 'Visual Diagramming',
      description: 'Drag-and-drop interface for creating UML class diagrams, interfaces, and enums with ease.',
    },
    {
      icon: Zap,
      title: 'Real-time Editing',
      description: 'Instant updates as you design. See your changes reflected immediately on the canvas.',
    },
    {
      icon: Cloud,
      title: 'Cloud Sync',
      description: 'Access your diagrams anywhere. Automatic cloud synchronization keeps your work safe.',
    },
    {
      icon: Download,
      title: 'Export Options',
      description: 'Export to multiple formats including JSON, PNG, and SVG for maximum flexibility.',
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Work together with your team in real-time. Share projects and collaborate seamlessly.',
    },
    {
      icon: Lock,
      title: 'Secure & Private',
      description: 'Your designs are encrypted and protected. Enterprise-grade security for peace of mind.',
    },
  ];

  const pricingTiers = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for students and hobbyists',
      features: [
        'Up to 3 projects',
        'Unlimited diagrams',
        'Basic UML elements',
        'Export to JSON',
        'Local storage',
      ],
      cta: 'Get Started',
      variant: 'outline' as const,
    },
    {
      name: 'Pro',
      price: '$12',
      period: 'per month',
      description: 'For professional developers',
      features: [
        'Unlimited projects',
        'All UML diagram types',
        'AWS & CI/CD nodes',
        'Cloud sync',
        'Export to PNG/SVG',
        'Priority support',
      ],
      cta: 'Start Free Trial',
      variant: 'default' as const,
      highlighted: true,
    },
    {
      name: 'Team',
      price: '$49',
      period: 'per month',
      description: 'For growing development teams',
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
      cta: 'Contact Sales',
      variant: 'outline' as const,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <div className="mr-4 flex">
            <Link to="/" className="mr-6 flex items-center space-x-2">
              <Layers className="h-6 w-6" />
              <span className="hidden font-bold sm:inline-block">VectorUML</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <nav className="flex items-center space-x-2">
              <Link to="/board">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Link to="/board">
                <Button>Get Started</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container relative">
        <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 py-20 md:py-32">
          <h1 className="text-center text-4xl font-bold leading-tight tracking-tighter md:text-6xl lg:text-7xl lg:leading-[1.1]">
            Design like a software architect
          </h1>
          <p className="max-w-[750px] text-center text-lg text-muted-foreground sm:text-xl">
            Create professional UML diagrams with our intuitive visual editor. 
            Build class diagrams, sequence diagrams, and architecture blueprints in minutes.
          </p>
          <div className="flex gap-4 mt-4">
            <Link to="/board">
              <Button size="lg" className="h-12 px-8">
                Start Designing
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="h-12 px-8">
              View Demo
            </Button>
          </div>
          <div className="mt-12 w-full max-w-5xl">
            <div className="relative overflow-hidden rounded-xl border border-border bg-background shadow-2xl">
              <img 
                src={heroImage} 
                alt="VectorUML Diagram Editor Interface showing professional UML class diagrams" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-16 md:py-24">
        <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 mb-12">
          <h2 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl">
            Everything you need to design
          </h2>
          <p className="max-w-[750px] text-center text-lg text-muted-foreground">
            Powerful features to help you create, collaborate, and export professional diagrams
          </p>
        </div>
        <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="border-border/50">
              <CardHeader>
                <feature.icon className="h-10 w-10 text-primary mb-2" />
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container py-16 md:py-24 bg-muted/30">
        <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 mb-12">
          <h2 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl">
            Simple, transparent pricing
          </h2>
          <p className="max-w-[750px] text-center text-lg text-muted-foreground">
            Choose the plan that fits your needs. Start free and upgrade as you grow.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-3">
          {pricingTiers.map((tier) => (
            <Card 
              key={tier.name} 
              className={tier.highlighted ? 'border-primary shadow-lg relative scale-105' : 'border-border/50'}
            >
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader className="pb-8 pt-8">
                <CardTitle className="text-2xl">{tier.name}</CardTitle>
                <CardDescription>{tier.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  <span className="text-muted-foreground ml-2">/{tier.period}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-8">
                <Link to="/board" className="w-full">
                  <Button className="w-full" variant={tier.variant}>
                    {tier.cta}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-16 md:py-24">
        <div className="mx-auto flex max-w-[980px] flex-col items-center gap-6 rounded-2xl border border-border bg-card p-12 text-center">
          <h2 className="text-3xl font-bold md:text-5xl">
            Ready to start designing?
          </h2>
          <p className="max-w-[600px] text-lg text-muted-foreground">
            Join thousands of developers creating professional diagrams with VectorUML
          </p>
          <Link to="/board">
            <Button size="lg" className="h-12 px-8">
              Get Started for Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2025 VectorUML. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link to="/board" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
            <Link to="/board" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </Link>
            <Link to="/board" className="text-sm text-muted-foreground hover:text-foreground">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
