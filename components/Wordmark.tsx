export function Wordmark({ className = "text-[1.375rem]" }: { className?: string }) {
  return (
    <span className={`font-bold tracking-tighter text-navy ${className}`}>
      BillCheck<span className="text-cta">UK</span>
    </span>
  );
}
