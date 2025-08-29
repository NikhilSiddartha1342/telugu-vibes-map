import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Users } from 'lucide-react';

interface MemoryCardProps {
  title: string;
  location: string;
  category: string;
  year: number;
  story: string;
  image?: string;
  onClick?: () => void;
}

const MemoryCard: React.FC<MemoryCardProps> = ({
  title,
  location,
  category,
  year,
  story,
  image,
  onClick
}) => {
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Festival': 'bg-primary/20 text-primary border-primary/20',
      'Cinema': 'bg-secondary/20 text-secondary border-secondary/20',
      'Food': 'bg-accent/20 text-accent border-accent/20',
      'Family': 'bg-muted text-muted-foreground border-muted',
      'Language': 'bg-primary/10 text-primary border-primary/10',
      'Art': 'bg-accent/10 text-accent border-accent/10',
    };
    return colors[category] || 'bg-muted text-muted-foreground border-muted';
  };

  return (
    <Card 
      className="group cursor-pointer transition-all duration-300 hover:shadow-cultural hover:scale-105 hover:-translate-y-2 bg-card border-border overflow-hidden"
      onClick={onClick}
    >
      <div className="relative overflow-hidden">
        {image && (
          <img 
            src={image} 
            alt={title}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
          />
        )}
        {!image && (
          <div className="w-full h-48 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
            <Users className="w-16 h-16 text-muted-foreground" />
          </div>
        )}
        <div className="absolute top-4 right-4">
          <Badge className={`${getCategoryColor(category)} backdrop-blur-sm`}>
            {category}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="space-y-3">
          <div>
            <h3 className="text-lg font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{year}</span>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
            {story}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MemoryCard;