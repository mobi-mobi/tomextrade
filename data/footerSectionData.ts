const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

export const footerLinks = {
  company: [
    { name: "O nás", action: () => scrollToSection("about") },
    { name: "Naše produkty", action: () => scrollToSection("products") },
    { name: "Kontakt", action: () => scrollToSection("contact") },
  ],
  services: [
    {
      name: "Produktové poradenstvo",
      action: () => scrollToSection("contact"),
    },
    { name: "Vlastné riešenia", action: () => scrollToSection("contact") },
    { name: "Podpora", action: () => scrollToSection("contact") },
  ],
};
