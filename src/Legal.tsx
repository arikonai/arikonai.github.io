import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

interface LegalPageProps {
  title: string;
  content: string;
  onBack: () => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ title, content, onBack }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen bg-white pt-32 pb-20 px-6"
    >
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-blue-600 font-semibold mb-8 hover:gap-3 transition-all"
        >
          <ArrowLeft size={20} /> Back to Home
        </button>
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-12">{title}</h1>
        <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed space-y-6">
          {content.split('\n\n').map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export const PRIVACY_POLICY = `
Last Updated: February 2024

1. Introduction
Arikon ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our AI-powered real estate solutions, in accordance with the Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs).

2. Information We Collect
We may collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and services. This includes:
- Name and contact data (email address, phone number).
- Agency details and professional information.
- Property data and enquiry details processed through our AI agents.

3. How We Use Your Information
We use personal information collected via our website for a variety of business purposes, including:
- To provide and facilitate delivery of our AI services (Appraisal Accelerator and Voice Agent).
- To respond to user enquiries and offer support.
- To send administrative information to you.
- To improve our AI models and service quality (using de-identified data where possible).

4. Disclosure of Your Information
We may share information we have collected about you in certain situations:
- With third-party service providers who perform services for us or on our behalf.
- To comply with legal obligations or protect our rights.
- In connection with a business transfer (e.g., merger or sale).

5. Security of Your Information
We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.

6. Your Rights
Under the Australian Privacy Principles, you have the right to:
- Access the personal information we hold about you.
- Request the correction of inaccurate personal information.
- Make a complaint if you believe we have breached the APPs.

7. Contact Us
If you have questions or comments about this Privacy Policy, please contact us at: info@arikon.com.au
`;

export const TERMS_OF_SERVICE = `
Last Updated: February 2024

1. Agreement to Terms
By accessing or using Arikon's website and services, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, then you are prohibited from using the site and services.

2. Intellectual Property Rights
Unless otherwise indicated, the site and services are our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the site are owned or controlled by us or licensed to us.

3. User Representations
By using the services, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information; (3) you have the legal capacity and you agree to comply with these Terms of Service.

4. AI Service Limitations
Our services utilize advanced AI models. While we strive for high accuracy, you acknowledge that:
- AI-generated responses may occasionally contain inaccuracies.
- You are responsible for reviewing and verifying critical information provided by the AI agents.
- Arikon is not liable for any decisions made based on AI-generated content.

5. Australian Consumer Law
Nothing in these Terms excludes, restricts or modifies any guarantee, condition, warranty, right or remedy implied or imposed by the Australian Consumer Law (ACL) which cannot be lawfully excluded, restricted or modified.

6. Limitation of Liability
To the maximum extent permitted by law, Arikon shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.

7. Governing Law
These Terms shall be governed by and defined following the laws of New South Wales, Australia. You irrevocably consent that the courts of New South Wales shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
`;

export const COOKIE_POLICY = `
Last Updated: February 2024

1. What are Cookies?
Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site.

2. How We Use Cookies
We use cookies for the following purposes:
- Essential Cookies: Necessary for the website to function properly.
- Analytics Cookies: To understand how visitors interact with our website, helping us improve our services.
- Functionality Cookies: To remember choices you make and provide enhanced, more personal features.

3. Your Choices Regarding Cookies
Most web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your browser to remove cookies and to reject cookies. Please note that if you choose to remove or reject cookies, this could affect the availability and functionality of our services.

4. Third-Party Cookies
In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the service, deliver advertisements on and through the service, and so on.

5. Updates to This Policy
We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal or regulatory reasons.
`;
