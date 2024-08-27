import { Button } from '../ui/button';

export default function AskQuestionOpenTrigger() {
  return (
    <div className="mx-auto my-10 mt-9 flex h-12 w-[216px] items-center justify-center whitespace-nowrap rounded border border-[#1A1A1A] bg-[#1A1A1A] px-4 py-2 text-lg font-bold uppercase text-white ring-offset-background transition-colors hover:bg-transparent hover:text-[#1A1A1A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
      ask a question
    </div>
  );
}
