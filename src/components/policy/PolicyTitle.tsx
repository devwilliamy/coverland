type PolicyTitleProps = {
  title: string;
  uppercase?: boolean;
};

export default function PolicyTitle({ title, uppercase }: PolicyTitleProps) {
  return (
    <p className={`pt-5 text-base font-bold ${uppercase ? 'uppercase' : ''}`}>
      {title}
    </p>
  );
}
