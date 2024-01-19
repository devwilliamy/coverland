type LineSeparatorProps = {
  className?: string;
};
export default function LineSeparator({ className }: LineSeparatorProps) {
  return <div className={`border-t border-gray-300 ${className}`}></div>;
}
