export default function Logo({ className = 'h-[3.3rem] w-auto', alt = 'Vision International Education & Visa Services' }) {
  return (
    <img
      src="/logo.png"
      alt={alt}
      className={`object-contain ${className}`}
      draggable={false}
    />
  );
}
