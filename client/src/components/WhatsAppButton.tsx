import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/447799538311"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-white shadow-lg transition-transform hover:scale-105 hover:bg-[#20bd5a]"
      aria-label="Start a chat with us on WhatsApp"
    >
      <MessageCircle size={24} />
      <span className="hidden font-medium sm:inline">Start a chat with us</span>
    </a>
  );
}
