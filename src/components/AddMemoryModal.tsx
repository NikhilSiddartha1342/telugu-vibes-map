import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Upload, FileText, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AddMemoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddMemoryModal: React.FC<AddMemoryModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    location: '',
    coordinates: { lat: 0, lng: 0 },
    title: '',
    story: '',
    category: '',
    year: new Date().getFullYear(),
    image: null as File | null
  });
  const { toast } = useToast();

  const categories = [
    'Festival',
    'Food', 
    'Family',
    'Cinema',
    'Language',
    'Art',
    'Achievement'
  ];

  const handleLocationSelect = (location: string) => {
    setFormData(prev => ({ ...prev, location }));
    // In a real app, you'd geocode the location
    setFormData(prev => ({ 
      ...prev, 
      coordinates: { lat: 17.3850, lng: 78.4867 } // Default to Hyderabad
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = () => {
    // In a real app, you'd submit to backend
    toast({
      title: "Memory Added! 🎉",
      description: "Your memory is now part of the Telugu Vybhavam Atlas.",
    });
    
    // Reset form and close
    setStep(1);
    setFormData({
      location: '',
      coordinates: { lat: 0, lng: 0 },
      title: '',
      story: '',
      category: '',
      year: new Date().getFullYear(),
      image: null
    });
    onClose();
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-primary mx-auto mb-4 animate-float" />
              <h3 className="text-xl font-semibold mb-2">Where did this memory happen?</h3>
              <p className="text-muted-foreground">Find the exact spot on the map or search for a location</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="e.g., Tank Bund, Hyderabad, Telangana"
                  value={formData.location}
                  onChange={(e) => handleLocationSelect(e.target.value)}
                />
              </div>
              
              {/* Mock location suggestions */}
              <div className="grid gap-2">
                <p className="text-sm text-muted-foreground">Popular locations:</p>
                {['Hyderabad, Telangana', 'Vijayawada, Andhra Pradesh', 'Visakhapatnam, Andhra Pradesh', 'New York, USA', 'London, UK'].map(location => (
                  <Button
                    key={location}
                    variant="outline"
                    className="justify-start text-left h-auto p-3"
                    onClick={() => handleLocationSelect(location)}
                  >
                    <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                    {location}
                  </Button>
                ))}
              </div>
            </div>
            
            <Button 
              onClick={nextStep} 
              disabled={!formData.location}
              className="w-full"
              variant="cultural"
            >
              Confirm Location & Next <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Upload className="w-16 h-16 text-primary mx-auto mb-4 animate-float" />
              <h3 className="text-xl font-semibold mb-2">Upload your photo or video</h3>
              <p className="text-muted-foreground">Share the visual memory that captures this moment</p>
            </div>
            
            <Card className="border-2 border-dashed border-border hover:border-primary transition-colors">
              <CardContent className="p-8 text-center">
                {formData.image ? (
                  <div className="space-y-4">
                    <CheckCircle className="w-12 h-12 text-accent mx-auto" />
                    <p className="font-medium text-foreground">{formData.image.name}</p>
                    <p className="text-sm text-muted-foreground">File uploaded successfully</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto" />
                    <div>
                      <p className="font-medium text-foreground mb-1">Drag and drop your file here</p>
                      <p className="text-sm text-muted-foreground">or click to browse</p>
                    </div>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </CardContent>
            </Card>
            
            <div className="flex space-x-3">
              <Button onClick={prevStep} variant="outline" className="flex-1">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>
              <Button onClick={nextStep} className="flex-1" variant="cultural">
                Next <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <FileText className="w-16 h-16 text-primary mx-auto mb-4 animate-float" />
              <h3 className="text-xl font-semibold mb-2">Bring your memory to life</h3>
              <p className="text-muted-foreground">Share the story behind this special moment</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Memory Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Grandma's Avakaya Pickle Day"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              
              <div>
                <Label htmlFor="story">Your Story</Label>
                <Textarea
                  id="story"
                  placeholder="Share the emotions, the people, the flavors, the sounds... what made this moment special?"
                  value={formData.story}
                  onChange={(e) => setFormData(prev => ({ ...prev, story: e.target.value }))}
                  rows={4}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    type="number"
                    min="1950"
                    max="2025"
                    value={formData.year}
                    onChange={(e) => setFormData(prev => ({ ...prev, year: parseInt(e.target.value) }))}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Button onClick={prevStep} variant="outline" className="flex-1">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>
              <Button 
                onClick={nextStep} 
                disabled={!formData.title || !formData.story || !formData.category}
                className="flex-1" 
                variant="cultural"
              >
                Review & Submit <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 text-center">
            <CheckCircle className="w-20 h-20 text-accent mx-auto animate-pulse-cultural" />
            <div>
              <h3 className="text-2xl font-bold mb-2 text-primary">Thank You! 🎉</h3>
              <p className="text-lg text-muted-foreground mb-4">
                Your memory is now part of the Telugu Vybhavam Atlas
              </p>
            </div>
            
            <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-2">{formData.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{formData.location} • {formData.year}</p>
                <p className="text-sm">{formData.story.substring(0, 100)}...</p>
              </CardContent>
            </Card>
            
            <Button onClick={handleSubmit} className="w-full" variant="cultural" size="lg">
              View on Map
            </Button>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center">
            <span className="font-telugu text-2xl text-primary">Add Your Memory</span>
          </DialogTitle>
          <DialogDescription className="text-center">
            Step {step} of 4 - Share your Telugu cultural memory with the world
          </DialogDescription>
        </DialogHeader>
        
        {/* Progress indicator */}
        <div className="flex items-center justify-center space-x-2 mb-6">
          {[1, 2, 3, 4].map(i => (
            <div
              key={i}
              className={`w-8 h-2 rounded-full transition-colors ${
                i <= step ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>
        
        {renderStep()}
      </DialogContent>
    </Dialog>
  );
};

export default AddMemoryModal;