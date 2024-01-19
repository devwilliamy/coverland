type PolicyTitleProps = {
  title: string;
};

export function PolicyTitle({ title }: PolicyTitleProps) {
  return <p className="text-base font-bold">{title}</p>;
}
