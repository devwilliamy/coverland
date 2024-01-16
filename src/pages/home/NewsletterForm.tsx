import { BsChevronRight } from 'react-icons/bs';
import { postSubscriberEmail } from '@/lib/db';

const NewsletterForm = () => {
  const handleSubmit = async (e: FormData) => {
    'use server';
    const form = e.get('email');
    if (!form) return;
    await postSubscriberEmail(form);
  };

  return (
    <div>
      <form action={handleSubmit} className="flex flex-row h-12">
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Your Email"
          className="bg-white w-full rounded-l p-4 text-[#767676]"
        />
        <button
          type="submit"
          className=" w-12 h-12 bg-[#BE1B1B] duration-300 hover:bg-red flex flex-col justify-center items-center"
        >
          <BsChevronRight size={20} color={'#fff'} />
        </button>
      </form>
    </div>
  );
};

export default NewsletterForm;
