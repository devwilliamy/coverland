type LineSeparatorProps = {
  className?: string;
  orientation?: 'horizontal' | 'vertical';
};
export default function LineSeparator({
  className = '',
  orientation = 'horizontal',
}: LineSeparatorProps) {
  const lineClass = orientation === 'horizontal' ? 'border-t' : 'border-l';
  return <div className={`${lineClass} border-gray-300 ${className}`}></div>;
}
