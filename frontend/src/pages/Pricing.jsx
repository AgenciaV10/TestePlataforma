import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Switch } from "../components/ui/switch";
import { 
  Check, 
  X, 
  Star, 
  Zap, 
  Users, 
  Building,
  ArrowRight
} from "lucide-react";
import { mockPricingPlans } from "../data/mockData";
import { useToast } from "../hooks/use-toast";

const Pricing = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isYearly, setIsYearly] = useState(false);

  const handleSelectPlan = (planName) => {
    if (planName === "Free") {
      navigate("/dashboard");
    } else {
      toast({
        title: "Coming Soon!",
        description: `${planName} plan subscription will be available soon.`,
      });
    }
  };

  const getPlanIcon = (planName) => {
    switch (planName) {
      case "Free": return <Zap className="w-6 h-6" />;
      case "Pro": return <Star className="w-6 h-6" />;
      case "Team": return <Users className="w-6 h-6" />;
      case "Enterprise": return <Building className="w-6 h-6" />;
      default: return <Zap className="w-6 h-6" />;
    }
  };

  const getYearlyPrice = (monthlyPrice) => {
    if (typeof monthlyPrice === 'number') {
      return Math.round(monthlyPrice * 12 * 0.8); // 20% discount for yearly
    }
    return monthlyPrice;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button onClick={() => navigate("/")} className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded transform rotate-45"></div>
              <span className="text-xl font-bold text-gray-900">Lovable</span>
            </button>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Pricing</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="ghost" onClick={() => navigate("/community")}>
              Community
            </Button>
            <Button onClick={() => navigate("/dashboard")}>
              Get Started
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Choose the perfect plan for your needs. Start free and scale as you grow.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-12">
            <span className={`text-lg ${!isYearly ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>
              Monthly
            </span>
            <Switch
              checked={isYearly}
              onCheckedChange={setIsYearly}
              className="data-[state=checked]:bg-blue-600"
            />
            <span className={`text-lg ${isYearly ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>
              Yearly
            </span>
            <Badge className="bg-green-100 text-green-700 border-green-200">
              Save 20%
            </Badge>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {mockPricingPlans.map((plan) => (
            <Card 
              key={plan.name}
              className={`relative p-8 hover:shadow-xl transition-all duration-300 ${
                plan.popular 
                  ? 'ring-2 ring-blue-500 scale-105' 
                  : 'hover:scale-105'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-600 text-white px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <div className="text-center mb-8">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  plan.name === 'Free' 
                    ? 'bg-gray-100 text-gray-600'
                    : plan.name === 'Pro'
                    ? 'bg-blue-100 text-blue-600'
                    : plan.name === 'Team'
                    ? 'bg-purple-100 text-purple-600'
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  {getPlanIcon(plan.name)}
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  {typeof plan.price === 'number' ? (
                    <div>
                      <span className="text-4xl font-bold text-gray-900">
                        ${isYearly ? getYearlyPrice(plan.price) : plan.price}
                      </span>
                      <span className="text-gray-600 ml-2">
                        /{isYearly ? 'year' : plan.period}
                      </span>
                      {isYearly && typeof plan.price === 'number' && (
                        <div className="text-sm text-green-600 mt-1">
                          Save ${plan.price * 12 - getYearlyPrice(plan.price)} per year
                        </div>
                      )}
                    </div>
                  ) : (
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  )}
                </div>
                
                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-gray-900 hover:bg-gray-800 text-white'
                  }`}
                  onClick={() => handleSelectPlan(plan.name)}
                >
                  {plan.buttonText}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Features included:</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {plan.limitations.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Limitations:</h4>
                    <ul className="space-y-2">
                      {plan.limitations.map((limitation, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <X className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600 text-sm">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-8">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Can I change my plan at any time?
              </h3>
              <p className="text-gray-600">
                Yes! You can upgrade or downgrade your plan at any time. Changes will be prorated and reflected in your next billing cycle.
              </p>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                What happens to my projects if I downgrade?
              </h3>
              <p className="text-gray-600">
                Your projects remain yours forever. If you downgrade, some advanced features may become unavailable, but your project files and code remain accessible.
              </p>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Do you offer refunds?
              </h3>
              <p className="text-gray-600">
                We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, contact our support team for a full refund.
              </p>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Is there a limit on the number of projects?
              </h3>
              <p className="text-gray-600">
                Free plans have a limit of 3 active projects. Pro and Team plans offer unlimited projects. Enterprise plans include custom limits based on your needs.
              </p>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Card className="p-12 bg-gradient-to-r from-blue-50 to-purple-50 border-0">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to start building?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of developers who are already creating amazing applications with AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => navigate("/dashboard")}
              >
                Start Building for Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate("/community")}
              >
                Explore Community
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Pricing;