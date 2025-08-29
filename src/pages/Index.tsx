import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import CulturalMap from '@/components/CulturalMap';
import MemoryCard from '@/components/MemoryCard';
import AddMemoryModal from '@/components/AddMemoryModal';
import { MapPin, Upload, FileText, Heart, Globe, Users, ArrowRight } from 'lucide-react';
import sankrantiImage from '@/assets/sankranti-celebration.jpg';
import vintageCinemaImage from '@/assets/vintage-cinema.jpg';
import heroBackground from '@/assets/hero-background.jpg';

const Index = () => {
  const [isAddMemoryModalOpen, setIsAddMemoryModalOpen] = useState(false);

  const featuredMemories = [
    {
      title: "Our First Sankranti at Tank Bund",
      location: "Hyderabad, Telangana",
      category: "Festival",
      year: 2023,
      story: "It was 2023, and the air was filled with the smell of sweet pongal. Watching the kites fly over Hussain Sagar was magical, connecting us to generations of celebration...",
      image: sankrantiImage
    },
    {
      title: "Watching 'NTR' First Day First Show",
      location: "Vijayawada, Andhra Pradesh",
      category: "Cinema", 
      year: 1982,
      story: "Back in 1982, we saved up for weeks to see the premiere. The energy of the crowd was something I'll never forget, the way everyone cheered in unison...",
      image: vintageCinemaImage
    },
    {
      title: "Telugu Association Ugadi in NYC",
      location: "New York, USA",
      category: "Festival",
      year: 2019,
      story: "Celebrating Ugadi thousands of miles from home, but feeling the warmth of our community in a small community center in Queens. The pachadi tasted like home..."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center items-center px-4">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${heroBackground})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background"></div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          {/* Main Title */}
          <div className="mb-8 animate-float">
            <h1 className="font-telugu text-6xl md:text-8xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-4">
              తెలుగు వైభవం
            </h1>
            <h2 className="font-elegant text-xl md:text-2xl text-foreground/90 tracking-wide">
              Telugu Vybhavam
            </h2>
          </div>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-light">
            The Living Atlas of Telugu Culture
          </p>
          
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Pin your memories, share your stories, and celebrate our rich heritage together. 
            From festivals in Hyderabad to Telugu communities across the globe.
          </p>
          
          <Button 
            onClick={() => setIsAddMemoryModalOpen(true)}
            variant="cultural" 
            size="lg"
            className="text-lg px-8 py-4 h-auto animate-pulse-cultural hover:animate-glow"
          >
            <MapPin className="w-6 h-6 mr-3" />
            PIN YOUR MEMORY
          </Button>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-lg mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">1,247</div>
              <div className="text-sm text-muted-foreground">Memories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">67</div>
              <div className="text-sm text-muted-foreground">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary">15k+</div>
              <div className="text-sm text-muted-foreground">Contributors</div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Explore Our <span className="text-primary">Cultural Universe</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Each glowing dot represents a cherished memory from our community. 
              Click on any pin to discover stories from across the globe.
            </p>
          </div>
          
          <CulturalMap onAddMemory={() => setIsAddMemoryModalOpen(true)} />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Become a Part of Our Story in <span className="text-primary">3 Simple Steps</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Share your Telugu cultural memories and help preserve our rich heritage for future generations
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center group hover:shadow-cultural transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-semibold">1. Pin the Location</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Find the exact spot on the map where your memory was made—be it your hometown, 
                  a temple, or a restaurant abroad.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center group hover:shadow-cultural transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                  <Upload className="w-8 h-8 text-accent" />
                </div>
                <CardTitle className="text-xl font-semibold">2. Share Your Memory</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Upload your favourite photo or a short video that captures the moment. 
                  Old, scanned photos are especially welcome!
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center group hover:shadow-cultural transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/20 transition-colors">
                  <FileText className="w-8 h-8 text-secondary" />
                </div>
                <CardTitle className="text-xl font-semibold">3. Tell the Story</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Add a title and a short story to give your memory context and 
                  bring it to life for others to discover.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Memories Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-primary">Journeys</span> from Our Community
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover the beautiful stories that make up our collective Telugu heritage. 
              Each memory is a thread in the tapestry of our culture.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredMemories.map((memory, index) => (
              <MemoryCard
                key={index}
                title={memory.title}
                location={memory.location}
                category={memory.category}
                year={memory.year}
                story={memory.story}
                image={memory.image}
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button 
              onClick={() => setIsAddMemoryModalOpen(true)} 
              variant="elegant" 
              size="lg"
            >
              Share Your Story <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Community Impact Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5">
        <div className="max-w-4xl mx-auto text-center">
          <Heart className="w-16 h-16 text-primary mx-auto mb-6 animate-pulse-cultural" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Preserving Heritage, <span className="text-primary">Building Bridges</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Every memory you share contributes to a living digital museum of Telugu culture. 
            Together, we're creating an invaluable resource that connects our diaspora and 
            preserves our stories for future generations.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="flex items-center space-x-4 p-6 bg-background/50 rounded-lg border border-border">
              <Globe className="w-8 h-8 text-accent flex-shrink-0" />
              <div className="text-left">
                <h3 className="font-semibold mb-1">Global Connection</h3>
                <p className="text-sm text-muted-foreground">
                  Connecting Telugu communities from Andhra Pradesh to Australia
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-6 bg-background/50 rounded-lg border border-border">
              <Users className="w-8 h-8 text-secondary flex-shrink-0" />
              <div className="text-left">
                <h3 className="font-semibold mb-1">Cultural Preservation</h3>
                <p className="text-sm text-muted-foreground">
                  Safeguarding traditions and stories for future generations
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="font-telugu text-2xl font-semibold text-primary mb-4">తెలుగు వైభవం</h3>
          <p className="text-muted-foreground mb-6">
            Mapping Our Memories, Celebrating Our Story
          </p>
          <div className="flex justify-center space-x-8 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">About Us</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
            <a href="#" className="hover:text-primary transition-colors">A Hackathon Project</a>
          </div>
          <div className="mt-8 pt-8 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Built with ❤️ for the Telugu community worldwide
            </p>
          </div>
        </div>
      </footer>

      {/* Add Memory Modal */}
      <AddMemoryModal 
        isOpen={isAddMemoryModalOpen}
        onClose={() => setIsAddMemoryModalOpen(false)}
      />
    </div>
  );
};

export default Index;
