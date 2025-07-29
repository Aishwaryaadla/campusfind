import React from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "How do I report a lost or found item?",
    answer:
      "Go to the homepage and click on either 'Report Lost Item' or 'Report Found Item'. Fill in the required details, upload image if available and submit the form.",
  },
  {
    question: "How can I contact the person who posted an item?",
    answer:
      "Click on the item card to view its full details. If you're logged in, you'll see an option to send a message to the poster.",
  },
  {
    question: "Do I need to create an account to use the platform?",
    answer:
      "You can browse items without an account, but to report an item or contact someone, you need to sign up or log in.",
  },
  {
    question: "Can I edit or delete my reported item?",
    answer:
      "Yes. Go to your dashboard after logging in. You'll find options to edit, mark as returned, or delete your posts.",
  },
  {
    question: "Is there a way to see only recently added items?",
    answer:
      "Yes. The homepage shows the most recently reported lost and found items for quick access.",
  },
  {
    question: "Can I report multiple items from the same account?",
    answer:
      "Absolutely! You can report as many lost or found items as needed from a single account.",
  },
  {
    question: "What if I found my lost item?",
    answer:
      "Log in to your account, go to your dashboard, and click 'Mark as Returned' on the relevant item.",
  },
  {
    question: "Is my personal information shared with others?",
    answer:
      "No. Your name and contact details are hidden. Only the messages you send or receive are shared, and only when you're logged in.",
  },
  {
    question: "What should I do if I need help or more information about an item?",
    answer:
      "If you have any concerns or need further details about a reported item, you can contact the admin through the website, or visit the NSS office on campus during working hours for assistance.",
  },
  
];

const FAQPage = () => {
  return (
    <div className="py-16 px-4 bg-base-200 min-h-screen">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
        <p className="text-base-content text-opacity-70">
          Find answers to common questions about using the Campus Lost & Found system.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="collapse collapse-arrow bg-base-100 shadow-md">
            <input type="checkbox" className="peer" />
            <div className="collapse-title text-lg font-medium flex items-center gap-2">
              <ChevronDown className="w-4 h-4 text-base-content text-opacity-60" />
              {faq.question}
            </div>
            <div className="collapse-content text-base-content text-opacity-80">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;
