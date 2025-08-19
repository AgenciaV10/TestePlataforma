import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { 
  Heart, 
  Eye, 
  Star, 
  Search, 
  Filter, 
  TrendingUp,
  Clock,
  Users,
  Sparkles
} from "lucide-react";
import { mockCommunityProjects } from "../data/mockData";

const Community = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [likedProjects, setLikedProjects] = useState(new Set());

  const allTags = [...new Set(mockCommunityProjects.flatMap(project => project.tags))];
  
  const filteredProjects = mockCommunityProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = !selectedTag || project.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const featuredProjects = filteredProjects.filter(project => project.featured);
  const trendingProjects = [...filteredProjects].sort((a, b) => b.likes - a.likes);
  const recentProjects = [...filteredProjects].sort((a, b) => 
    new Date(b.created) - new Date(a.created)
  );

  const handleLike = (projectId) => {
    setLikedProjects(prev => {
      const newSet = new Set(prev);
      if (newSet.has(projectId)) {
        newSet.delete(projectId);
      } else {
        newSet.add(projectId);
      }
      return newSet;
    });
  };

  const ProjectCard = ({ project }) => (
    <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
            {project.featured && (
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
            )}
          </div>
          <p className="text-sm text-gray-600 mb-2">by @{project.author}</p>
          <p className="text-gray-700 mb-4">{project.description}</p>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-1 mb-4">
        {project.tags.map(tag => (
          <Badge 
            key={tag} 
            variant="secondary" 
            className="text-xs cursor-pointer hover:bg-gray-200"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedTag(tag);
            }}
          >
            {tag}
          </Badge>
        ))}
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <button 
            className={`flex items-center space-x-1 hover:text-red-500 transition-colors ${
              likedProjects.has(project.id) ? 'text-red-500' : ''
            }`}
            onClick={(e) => {
              e.stopPropagation();
              handleLike(project.id);
            }}
          >
            <Heart className={`w-4 h-4 ${likedProjects.has(project.id) ? 'fill-current' : ''}`} />
            <span>{project.likes + (likedProjects.has(project.id) ? 1 : 0)}</span>
          </button>
          
          <div className="flex items-center space-x-1">
            <Eye className="w-4 h-4" />
            <span>{project.views}</span>
          </div>
        </div>
        
        <span className="text-xs text-gray-400">
          {new Date(project.created).toLocaleDateString()}
        </span>
      </div>
    </Card>
  );

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
            <span className="text-gray-600">Community</span>
          </div>
          
          <Button onClick={() => navigate("/dashboard")}>
            Create Project
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Amazing Projects
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Explore, learn, and get inspired by what the community is building
          </p>
          
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search projects, authors, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedTag === "" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTag("")}
              >
                All
              </Button>
              {allTags.slice(0, 6).map(tag => (
                <Button
                  key={tag}
                  variant={selectedTag === tag ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTag(selectedTag === tag ? "" : tag)}
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">2,847</h3>
            <p className="text-gray-600">Active Creators</p>
          </Card>
          
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">15,293</h3>
            <p className="text-gray-600">Projects Created</p>
          </Card>
          
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">89.2k</h3>
            <p className="text-gray-600">Total Views</p>
          </Card>
        </div>

        {/* Projects Tabs */}
        <Tabs defaultValue="featured" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="featured" className="flex items-center space-x-2">
              <Star className="w-4 h-4" />
              <span>Featured</span>
            </TabsTrigger>
            <TabsTrigger value="trending" className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>Trending</span>
            </TabsTrigger>
            <TabsTrigger value="recent" className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>Recent</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="featured" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trending" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recent" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-600">Try adjusting your search terms or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;