import ContactPage from '../../../components/policy/ContactPage';
export async function generateMetadata() {
  return {
    title: `Contact – Coverland`,
    description: `Have questions or need assistance? Reach out to our dedicated customer support team today. Whether you're seeking product information or assistance with an order, we're here to help. Contact us now`,
  };
}

const Contact = () => <ContactPage />;

export default Contact;
