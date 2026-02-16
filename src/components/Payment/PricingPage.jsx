import React from 'react';
import { motion } from 'framer-motion';
import { SUBSCRIPTION_PLANS } from '../../utils/constants';
import { useAuthStore } from '../../store/authStore';
import { paymentAPI } from '../../services/api';
import { Check, Star, Zap, Crown } from 'lucide-react';
import toast from 'react-hot-toast';

const PricingPage = () => {
  const { isAuthenticated } = useAuthStore();

  const handleSubscribe = async (planId) => {
    if (!isAuthenticated) {
      window.location.href = '/spoken-english-saas/register';
      return;
    }
    if (planId === 'free') {
      toast.success('You\'re already on the Free plan!');
      return;
    }
    try {
      const { url } = await paymentAPI.createCheckout(planId);
      window.location.href = url;
    } catch {
      toast.error('Unable to start checkout. Please try again.');
    }
  };

  const icons = { free: Star, pro: Zap, premium: Crown };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Choose Your Learning Plan
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Start for free and upgrade as you progress. All plans include access to our core lessons.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {SUBSCRIPTION_PLANS.map((plan, index) => {
          const Icon = icons[plan.id];
          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-2xl border-2 p-8 transition-all ${
                plan.popular
                  ? 'border-primary-500 bg-primary-50/30 shadow-xl shadow-primary-500/10'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-primary-600 text-white text-xs font-bold px-4 py-1.5 rounded-full">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 ${
                    plan.popular
                      ? 'bg-primary-100 text-primary-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                <div className="mt-2">
                  <span className="text-4xl font-bold text-gray-900">
                    ${plan.price}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-gray-500">/{plan.period}</span>
                  )}
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
                {plan.limitations?.map((limitation) => (
                  <li key={limitation} className="flex items-start gap-3 opacity-50">
                    <span className="w-5 h-5 flex items-center justify-center text-gray-400 shrink-0">✕</span>
                    <span className="text-sm text-gray-500 line-through">{limitation}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSubscribe(plan.id)}
                className={`w-full py-3 rounded-xl font-semibold transition-all ${
                  plan.popular
                    ? 'btn-primary'
                    : 'btn-secondary'
                }`}
              >
                {plan.price === 0 ? 'Get Started Free' : `Start ${plan.name}`}
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* FAQ */}
      <div className="mt-16 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {[
            {
              q: 'Can I cancel anytime?',
              a: 'Yes! You can cancel your subscription at any time. You\'ll continue to have access until the end of your billing period.',
            },
            {
              q: 'Is there a free trial?',
              a: 'Our Free plan is always available. For Pro and Premium, we offer a 7-day money-back guarantee.',
            },
            {
              q: 'What payment methods do you accept?',
              a: 'We accept all major credit cards, PayPal, and Google Pay through our secure Stripe checkout.',
            },
          ].map((faq) => (
            <div key={faq.q} className="card">
              <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
              <p className="text-sm text-gray-500">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;