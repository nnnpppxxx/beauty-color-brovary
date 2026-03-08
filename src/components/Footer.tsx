import { Instagram } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="py-10 border-t border-border bg-background">
      <div className="container mx-auto px-4 flex flex-col items-center gap-4">
        <img src={logo} alt="Beauty Color" className="h-12 w-auto opacity-60" />
        <div className="flex items-center gap-4">
          <a
            href="https://www.instagram.com/beautycolor_brovary"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-gold transition-colors"
          >
            <Instagram size={18} />
          </a>
        </div>
        <p className="text-muted-foreground font-body text-xs text-center">
          © {new Date().getFullYear()} Beauty Color by Natalia Yasenchuk. Всі права захищено.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
