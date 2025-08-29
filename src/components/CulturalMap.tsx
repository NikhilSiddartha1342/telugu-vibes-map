import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from '@/components/ui/button';
import { MapPin, Plus } from 'lucide-react';

// Sample memory data for demonstration
const sampleMemories = [
  {
    id: 1,
    lat: 17.3850,
    lng: 78.4867,
    title: "Our First Sankranti at Tank Bund",
    location: "Hyderabad, Telangana",
    category: "Festival",
    year: 2023,
    story: "It was 2023, and the air was filled with the smell of sweet pongal. Watching the kites fly over Hussain Sagar was magical..."
  },
  {
    id: 2,
    lat: 16.5062,
    lng: 80.6480,
    title: "Watching 'NTR' First Day First Show",
    location: "Vijayawada, Andhra Pradesh", 
    category: "Cinema",
    year: 1982,
    story: "Back in 1982, we saved up for weeks to see the premiere. The energy of the crowd was something I'll never forget..."
  },
  {
    id: 3,
    lat: 40.7128,
    lng: -74.0060,
    title: "Telugu Association Ugadi in NYC",
    location: "New York, USA",
    category: "Festival", 
    year: 2019,
    story: "Celebrating Ugadi thousands of miles from home, but feeling the warmth of our community..."
  },
  {
    id: 4,
    lat: 51.5074,
    lng: -0.1278,
    title: "Teaching Telugu to My Daughter",
    location: "London, UK",
    category: "Language",
    year: 2020,
    story: "In our small London apartment, passing on the beauty of our mother tongue..."
  }
];

interface CulturalMapProps {
  onAddMemory: () => void;
}

const CulturalMap: React.FC<CulturalMapProps> = ({ onAddMemory }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    if (!mapContainer.current) return;

    // For demo purposes, show API key input
    if (!apiKey) {
      setShowApiKeyInput(true);
      return;
    }

    // Initialize map
    mapboxgl.accessToken = apiKey;
    
    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        projection: 'globe' as any,
        zoom: 2,
        center: [78.9629, 20.5937], // Center on India
        pitch: 45,
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

      // Add atmosphere and fog effects
      map.current.on('style.load', () => {
        map.current?.setFog({
          color: 'rgb(30, 41, 59)', // Dark blue fog
          'high-color': 'rgb(45, 100, 150)',
          'horizon-blend': 0.3,
        });
      });

      // Add memory markers
      sampleMemories.forEach((memory) => {
        const el = document.createElement('div');
        el.className = 'memory-marker';
        el.innerHTML = `
          <div class="w-6 h-6 bg-primary rounded-full flex items-center justify-center animate-pulse-cultural cursor-pointer hover:animate-glow transition-all duration-300 shadow-cultural">
            <div class="w-3 h-3 bg-primary-foreground rounded-full"></div>
          </div>
        `;

        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <div class="p-4 bg-card text-card-foreground rounded-lg max-w-xs">
            <h3 class="font-semibold text-primary mb-2">${memory.title}</h3>
            <p class="text-sm text-muted-foreground mb-2">${memory.location} • ${memory.year}</p>
            <p class="text-sm">${memory.story.substring(0, 100)}...</p>
            <span class="inline-block mt-2 px-2 py-1 bg-accent/20 text-accent text-xs rounded-full">${memory.category}</span>
          </div>
        `);

        new mapboxgl.Marker(el)
          .setLngLat([memory.lng, memory.lat])
          .setPopup(popup)
          .addTo(map.current!);
      });

      // Gentle rotation animation
      const secondsPerRevolution = 120;
      const maxSpinZoom = 5;
      let userInteracting = false;
      let spinEnabled = true;

      function spinGlobe() {
        if (!map.current) return;
        
        const zoom = map.current.getZoom();
        if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
          let distancePerSecond = 360 / secondsPerRevolution;
          const center = map.current.getCenter();
          center.lng -= distancePerSecond / 60; // Slower rotation
          map.current.easeTo({ center, duration: 1000, easing: (n) => n });
        }
      }

      // Event listeners for interaction
      const handleInteractionStart = () => {
        userInteracting = true;
      };
      
      const handleInteractionEnd = () => {
        userInteracting = false;
        setTimeout(spinGlobe, 2000); // Resume spinning after 2 seconds
      };

      map.current.on('mousedown', handleInteractionStart);
      map.current.on('dragstart', handleInteractionStart);
      map.current.on('mouseup', handleInteractionEnd);
      map.current.on('touchend', handleInteractionEnd);

      // Start the globe spinning
      spinGlobe();
      
      const spinInterval = setInterval(spinGlobe, 1000);

      return () => {
        clearInterval(spinInterval);
        map.current?.remove();
      };

    } catch (error) {
      console.error('Error initializing map:', error);
      setShowApiKeyInput(true);
    }
  }, [apiKey]);

  const handleApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      setShowApiKeyInput(false);
    }
  };

  if (showApiKeyInput) {
    return (
      <div className="relative w-full h-[70vh] bg-card rounded-xl border border-border flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <MapPin className="w-16 h-16 text-primary mx-auto mb-4 animate-float" />
          <h3 className="text-xl font-semibold mb-4">Connect Your Map</h3>
          <p className="text-muted-foreground mb-6">
            To display the interactive world map, please enter your Mapbox public token. 
            You can get one free at <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">mapbox.com</a>
          </p>
          <form onSubmit={handleApiKeySubmit} className="space-y-4">
            <input
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="pk.eyJ1..."
              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button type="submit" variant="cultural" className="w-full">
              Initialize Map
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[70vh] rounded-xl overflow-hidden shadow-cultural">
      <div ref={mapContainer} className="absolute inset-0" />
      
      {/* Floating Add Memory Button */}
      <Button 
        onClick={onAddMemory}
        variant="cultural"
        size="lg"
        className="absolute top-6 left-6 z-10 shadow-cultural animate-pulse-cultural hover:animate-glow"
      >
        <Plus className="w-5 h-5 mr-2" />
        PIN YOUR MEMORY
      </Button>

      {/* Legend */}
      <div className="absolute bottom-6 left-6 bg-card/90 backdrop-blur-sm rounded-lg p-4 border border-border z-10">
        <h4 className="font-semibold text-sm mb-2">Memory Locations</h4>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
          <span className="text-xs text-muted-foreground">Telugu Cultural Memories</span>
        </div>
      </div>

      {/* Stats */}
      <div className="absolute bottom-6 right-6 bg-card/90 backdrop-blur-sm rounded-lg p-4 border border-border z-10">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{sampleMemories.length}</div>
          <div className="text-xs text-muted-foreground">Memories Shared</div>
        </div>
      </div>
    </div>
  );
};

export default CulturalMap;