import { Briefcase, Circle, Heart, Home, Plane } from "lucide-react";

export const getCategoryIcon = (category) => {
  switch (category) {
    case 'Home': return <Home className="w-4 h-4" />;
    case 'Trip': return <Plane className="w-4 h-4" />;
    case 'Office': return <Briefcase className="w-4 h-4" />;
    case 'Friends': return <Heart className="w-4 h-4" />;
    default: return <Circle className="w-4 h-4" />;
  }
};