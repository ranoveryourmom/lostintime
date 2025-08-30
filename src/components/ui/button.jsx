export function Button({ children, onClick, variant = 'primary', className }) {
  const base = "px-4 py-2 rounded text-white font-bold transition " +
               (variant === 'secondary' ? 'bg-gray-600 hover:bg-gray-700' : 'bg-blue-600 hover:bg-blue-700');
  return <button onClick={onClick} className={`${base} ${className}`}>{children}</button>;
}