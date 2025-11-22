import {
  Home,
  Users,
  Briefcase,
  Building2,
  Globe2,
  Plane,
  Car,
  Waves,
  Mountain,
  Tent,
  Ship,
  Bike,
  Train,
  Bus,
  Hotel,
  Map,
  Utensils,
  Coffee,
  Pizza,
  ShoppingCart,
  Wine,
  Gamepad2,
  Music,
  Camera,
  PartyPopper,
  Cake,
  Dumbbell,
  GraduationCap,
  HeartPulse,
  Laptop,
  Gift,
  Calendar,
  Sun,
  Snowflake,
  CloudRain,
  Star,
  Circle
} from "lucide-react";

const VALID_ICON_NAMES = [
  'Home', 'Friends', 'Office', 'Other', 'Trip', 'Flight', 'Road Trip', 'Beach',
  'Mountain', 'Camping', 'Cruise', 'Cycling', 'Train', 'Bus Tour', 'Hotel', 'Map',
  'Restaurant', 'Coffee', 'Pizza Party', 'Groceries', 'Wine Tasting', 'Gaming',
  'Music', 'Photography', 'Party', 'Birthday', 'Fitness', 'Education', 'Health',
  'Work', 'Tech', 'Gift', 'Event', 'Holiday', 'Summer', 'Winter', 'Rainy Day', 'Special'
];

const sizeVariants = {
  small: 'w-4 h-4',
  medium: 'w-5 h-5',
  large: 'w-g h-6'
};

export const getGroupIcon = (category, variant = "large") => {
  const classes = sizeVariants[variant];

  switch (category) {
    case 'Home': return <Home className={classes} />;
    case 'Friends': return <Users className={classes} />;
    case 'Office': return <Briefcase className={classes} />;
    case 'Other': return <Building2 className={classes} />;
    case 'Trip': return <Globe2 className={classes} />;

    case 'Flight': return <Plane className={classes} />;
    case 'Road Trip': return <Car className={classes} />;
    case 'Beach': return <Waves className={classes} />;
    case 'Mountain': return <Mountain className={classes} />;
    case 'Camping': return <Tent className={classes} />;
    case 'Cruise': return <Ship className={classes} />;
    case 'Cycling': return <Bike className={classes} />;
    case 'Train': return <Train className={classes} />;
    case 'Bus Tour': return <Bus className={classes} />;
    case 'Hotel': return <Hotel className={classes} />;
    case 'Map': return <Map className={classes} />;

    case 'Restaurant': return <Utensils className={classes} />;
    case 'Coffee': return <Coffee className={classes} />;
    case 'Pizza Party': return <Pizza className={classes} />;
    case 'Groceries': return <ShoppingCart className={classes} />;
    case 'Wine Tasting': return <Wine className={classes} />;

    case 'Gaming': return <Gamepad2 className={classes} />;
    case 'Music': return <Music className={classes} />;
    case 'Photography': return <Camera className={classes} />;
    case 'Party': return <PartyPopper className={classes} />;
    case 'Birthday': return <Cake className={classes} />;

    case 'Fitness': return <Dumbbell className={classes} />;
    case 'Education': return <GraduationCap className={classes} />;
    case 'Health': return <HeartPulse className={classes} />;

    case 'Work': return <Briefcase className={classes} />;
    case 'Tech': return <Laptop className={classes} />;
    case 'Gift': return <Gift className={classes} />;
    case 'Event': return <Calendar className={classes} />;

    case 'Holiday': return <Sun className={classes} />;
    case 'Summer': return <Sun className={classes} />;
    case 'Winter': return <Snowflake className={classes} />;
    case 'Rainy Day': return <CloudRain className={classes} />;

    case 'Special': return <Star className={classes} />;

    default:
      return <Circle className={classes} />;
  }
};
