import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Progress } from "../components/ui/progress";
import { 
  Play, 
  Code, 
  Settings, 
  FileText, 
  Globe, 
  GitBranch, 
  Rocket,
  Eye,
  Download,
  Share2
} from "lucide-react";
import { mockProjects } from "../data/mockData";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [projects, setProjects] = useState(mockProjects);
  const [selectedProject, setSelectedProject] = useState(null);
  const [buildProgress, setBuildProgress] = useState(0);
  const [isBuilding, setIsBuilding] = useState(false);

  useEffect(() => {
    const prompt = location.state?.prompt;
    if (prompt) {
      // Create new project from prompt
      const newProject = {
        id: Date.now().toString(),
        name: `Project from: "${prompt.substring(0, 30)}..."`,
        description: prompt,
        status: "building",
        progress: 0,
        created: new Date().toISOString(),
        type: "web-app",
        framework: "React + FastAPI",
        deployment: "pending"
      };
      
      setProjects(prev => [newProject, ...prev]);
      setSelectedProject(newProject);
      simulateBuild(newProject.id);
    } else if (projects.length > 0) {
      setSelectedProject(projects[0]);
    }
  }, [location.state, projects.length]);

  const simulateBuild = (projectId) => {
    setIsBuilding(true);
    const interval = setInterval(() => {
      setBuildProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsBuilding(false);
          
          // Update project status
          setProjects(prevProjects => 
            prevProjects.map(p => 
              p.id === projectId 
                ? { ...p, status: "ready", progress: 100, deployment: "deployed" }
                : p
            )
          );
          
          return 100;
        }
        
        // Update project progress
        setProjects(prevProjects => 
          prevProjects.map(p => 
            p.id === projectId 
              ? { ...p, progress: newProgress }
              : p
          )
        );
        
        return newProgress;
      });
    }, 500);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "ready": return "bg-green-500";
      case "building": return "bg-yellow-500";
      case "error": return "bg-red-500";
      default: return "bg-gray-500";
    }
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
            <span className="text-gray-600">Dashboard</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button size="sm">
              <Rocket className="w-4 h-4 mr-2" />
              Deploy
            </Button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar - Projects */}
        <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Projects</h2>
          </div>
          
          <div className="p-4 space-y-3">
            {projects.map((project) => (
              <Card 
                key={project.id}
                className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                  selectedProject?.id === project.id ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => setSelectedProject(project)}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-gray-900 truncate">{project.name}</h3>
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(project.status)}`} />
                </div>
                
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{project.description}</p>
                
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    {project.framework}
                  </Badge>
                  <span className="text-xs text-gray-500">
                    {new Date(project.created).toLocaleDateString()}
                  </span>
                </div>
                
                {project.status === "building" && (
                  <div className="mt-3">
                    <Progress value={project.progress} className="h-1" />
                    <span className="text-xs text-gray-500 mt-1">
                      {Math.round(project.progress)}% complete
                    </span>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          {selectedProject ? (
            <div className="p-6">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{selectedProject.name}</h1>
                    <p className="text-gray-600">{selectedProject.description}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Badge 
                      className={`${getStatusColor(selectedProject.status)} text-white`}
                    >
                      {selectedProject.status}
                    </Badge>
                  </div>
                </div>

                {selectedProject.status === "building" && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Building your application...</span>
                      <span className="text-sm text-gray-500">{Math.round(buildProgress)}%</span>
                    </div>
                    <Progress value={buildProgress} className="h-2" />
                  </div>
                )}
              </div>

              <Tabs defaultValue="preview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="preview" className="flex items-center space-x-2">
                    <Eye className="w-4 h-4" />
                    <span>Preview</span>
                  </TabsTrigger>
                  <TabsTrigger value="code" className="flex items-center space-x-2">
                    <Code className="w-4 h-4" />
                    <span>Code</span>
                  </TabsTrigger>
                  <TabsTrigger value="files" className="flex items-center space-x-2">
                    <FileText className="w-4 h-4" />
                    <span>Files</span>
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="flex items-center space-x-2">
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="preview" className="mt-6">
                  <Card className="p-6">
                    {selectedProject.status === "ready" ? (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Globe className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Your app is ready!</h3>
                        <p className="text-gray-600 mb-6">Your application has been built and deployed successfully.</p>
                        <div className="flex justify-center space-x-3">
                          <Button>
                            <Play className="w-4 h-4 mr-2" />
                            Open App
                          </Button>
                          <Button variant="outline">
                            <Download className="w-4 h-4 mr-2" />
                            Download Code
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12 text-gray-500">
                        <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
                        <p>Building your application...</p>
                      </div>
                    )}
                  </Card>
                </TabsContent>

                <TabsContent value="code" className="mt-6">
                  <Card className="p-6">
                    <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                      <div className="text-green-400"># Generated code structure</div>
                      <div className="text-white mt-2">
                        <div>├── frontend/</div>
                        <div>│   ├── src/</div>
                        <div>│   ├── components/</div>
                        <div>│   └── pages/</div>
                        <div>├── backend/</div>
                        <div>│   ├── api/</div>
                        <div>│   └── models/</div>
                        <div>└── database/</div>
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="files" className="mt-6">
                  <Card className="p-6">
                    <div className="space-y-2">
                      {["App.js", "HomePage.jsx", "Dashboard.jsx", "server.py", "models.py"].map(file => (
                        <div key={file} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                          <span className="font-mono text-sm">{file}</span>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="settings" className="mt-6">
                  <Card className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold mb-2">Project Settings</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Framework:</span>
                            <span className="text-gray-600">{selectedProject.framework}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Deployment:</span>
                            <span className="text-gray-600">{selectedProject.deployment}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Created:</span>
                            <span className="text-gray-600">
                              {new Date(selectedProject.created).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Select a project to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;