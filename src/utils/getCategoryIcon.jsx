import { Briefcase, Circle, Heart, Home, Plane } from "lucide-react";

const sizeVariants = {
  small: 'w-4 h-4',
  medium: 'w-5 h-5',
  large: 'w-g h-6'
};

export const getCategoryIcon = (category, variant="small") => {
  const classes = sizeVariants[variant];
  switch (category) {
    case 'Home': return <Home className={classes} />;
    case 'Trip': return <Plane className={classes} />;
    case 'Office': return <Briefcase className={classes} />;
    case 'Friends': return <Heart className={classes} />;
    default: return <Circle className={classes} />;
  }
};