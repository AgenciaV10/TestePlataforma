import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Card } from "../components/ui/card";
import { Paperclip, Globe, ArrowUp, Sparkles, Code, Zap } from "lucide-react";
import { useToast } from "../hooks/use-toast";

const HomePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast({
        title: "Prompt necessário",
        description: "Digite uma descrição do que você quer criar.",
        variant: "destructive",
      });
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "Projeto criado com sucesso!",
        description: "Redirecionando para o dashboard...",
      });
      
      // Navigate to dashboard with the prompt
      setTimeout(() => {
        navigate("/dashboard", { state: { prompt } });
      }, 1000);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-white/20">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded transform rotate-45"></div>
            <span className="text-xl font-bold text-gray-900">Lovable</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => navigate("/community")}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Community
            </button>
            <button 
              onClick={() => navigate("/pricing")}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Pricing
            </button>
            <button className="text-gray-600 hover:text-gray-900 transition-colors">
              Enterprise
            </button>
            <button className="text-gray-600 hover:text-gray-900 transition-colors">
              Learn
            </button>
            <button className="text-gray-600 hover:text-gray-900 transition-colors">
              Launched
            </button>
          </nav>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
            Log in
          </Button>
          <Button className="bg-gray-900 hover:bg-gray-800 text-white">
            Get started
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center px-6 py-20 min-h-[80vh]">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Build something{" "}
            <span className="inline-flex items-center">
              <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded transform rotate-45 mx-2"></div>
              Lovable
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12">
            Create apps and websites by chatting with AI
          </p>
        </div>

        {/* Main Input */}
        <div className="w-full max-w-2xl mb-12">
          <Card className="p-2 bg-white/90 backdrop-blur-sm shadow-xl border border-white/30">
            <div className="flex items-center space-x-2">
              <Input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ask Lovable to create a blog about..."
                className="flex-1 border-0 focus:ring-0 text-lg placeholder:text-gray-500"
                onKeyPress={(e) => e.key === "Enter" && handleGenerate()}
              />
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                  <Paperclip className="w-4 h-4" />
                  <span className="ml-1 hidden sm:inline">Attach</span>
                </Button>
                <Badge variant="secondary" className="text-gray-600">
                  <Globe className="w-3 h-3 mr-1" />
                  Public
                </Badge>
                <Button 
                  size="sm" 
                  className="bg-gray-600 hover:bg-gray-700"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <ArrowUp className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Features Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="p-6 bg-white/70 backdrop-blur-sm border border-white/30 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">AI-Powered Creation</h3>
            <p className="text-gray-600">
              Simply describe what you want to build, and our AI will generate the complete application for you.
            </p>
          </Card>
          
          <Card className="p-6 bg-white/70 backdrop-blur-sm border border-white/30 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
              <Code className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Full-Stack Development</h3>
            <p className="text-gray-600">
              Generate frontend, backend, and database code with modern frameworks and best practices.
            </p>
          </Card>
          
          <Card className="p-6 bg-white/70 backdrop-blur-sm border border-white/30 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Instant Deployment</h3>
            <p className="text-gray-600">
              Deploy your applications instantly to the cloud with automatic scaling and optimization.
            </p>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default HomePage;