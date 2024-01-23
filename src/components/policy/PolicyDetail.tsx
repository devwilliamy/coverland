type PolicyDetailProps = {
  children: React.ReactNode;
};

export default function PolicyDetail({ children }: PolicyDetailProps) {
  return <p className="pt-5 text-base font-normal leading-6">{children}</p>;
}
