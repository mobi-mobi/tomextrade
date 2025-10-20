import { Phone, Mail, MapPin, Clock } from "lucide-react";

export const contactInfo = [
  {
    icon: <Phone className="w-6 h-6 text-blue-600" />,
    title: "Telefón",
    details: "+421 905 846 677",
    description: "Zavolajte nám pre okamžitú pomoc",
  },
  {
    icon: <Mail className="w-6 h-6 text-blue-600" />,
    title: "Email",
    details: "tomextrade81@gmal.com",
    description: "Pošlite nám vaše dotazy",
  },
  {
    icon: <MapPin className="w-6 h-6 text-blue-600" />,
    title: "Adresa",
    details: "Južná trieda 1598/82, 040 12 Košice",
    description: "Navštívte našu kanceláriu",
  },
  {
    icon: <Clock className="w-6 h-6 text-blue-600" />,
    title: "Pracovné hodiny",
    details: "Po-Pi: 8:00-17:00",
    description: "Sme tu, aby sme pomohli",
  },
];
