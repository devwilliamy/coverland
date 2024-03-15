'use server';
export async function sendEmail(formData: FormData) {
  const rawFormData = {
    subject: formData.get('name'),
    email: formData.get('email'),
    phoneNumber: formData.get('phoneNumber'),
    body: formData.get('body'),
  };

  return `mailto:${rawFormData.email}?subject=${rawFormData.subject}&body=${rawFormData.body}`;
}
