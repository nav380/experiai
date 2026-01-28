import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FileUpload from '@/components/FileUpload';
import { Settings, Upload, Users } from 'lucide-react';

export default function Admin() {
  const [activeTab, setActiveTab] = useState<'team-photo' | 'marketing-asset' | 'content'>('team-photo');

  const tabs = [
    { id: 'team-photo' as const, label: 'Team Photos', icon: Users },
    { id: 'marketing-asset' as const, label: 'Marketing Assets', icon: Upload },
    { id: 'content' as const, label: 'Content Files', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Admin Header */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="container">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-mono text-foreground leading-tight mb-4">
              Admin <span className="text-primary">File Manager</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Manage and upload files for team photos, marketing assets, and content.
            </p>
          </div>
        </section>

        {/* Divider */}
        <div className="section-divider"></div>

        {/* File Manager */}
        <section className="py-20 md:py-32">
          <div className="container">
            {/* Tabs */}
            <div className="flex gap-4 mb-12 border-b border-border">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-4 font-semibold flex items-center gap-2 border-b-2 transition-all ${
                      activeTab === tab.id
                        ? 'border-primary text-primary'
                        : 'border-transparent text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon size={20} />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Upload Section */}
              <div className="lg:col-span-1">
                <div className="bg-card/50 border border-border rounded-lg p-8">
                  <h3 className="text-xl font-bold font-mono text-foreground mb-6">
                    Upload {tabs.find(t => t.id === activeTab)?.label}
                  </h3>

                  <FileUpload
                    category={activeTab as 'team-photo' | 'marketing-asset' | 'content' | 'other'}
                    onUploadSuccess={(fileData) => {
                      console.log('File uploaded:', fileData);
                    }}
                    onUploadError={(error) => {
                      console.error('Upload error:', error);
                    }}
                  />

                  <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                    <h4 className="font-semibold text-primary mb-2">Upload Guidelines</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Maximum file size: 10MB</li>
                      <li>• Supported formats: JPG, PNG, PDF, DOC</li>
                      <li>• Team photos should be 1:1 aspect ratio</li>
                      <li>• Use descriptive filenames</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* File List Section */}
              <div className="lg:col-span-2">
                <div className="bg-card/50 border border-border rounded-lg p-8">
                  <h3 className="text-xl font-bold font-mono text-foreground mb-6">
                    Recent Uploads
                  </h3>

                  {/* Placeholder for file list */}
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border/50 hover:border-primary/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                            <Upload size={24} className="text-primary" />
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">sample-file-{i}.jpg</p>
                            <p className="text-sm text-muted-foreground">2.4 MB • Uploaded 2 days ago</p>
                          </div>
                        </div>
                        <button className="px-4 py-2 text-sm bg-primary/10 text-primary hover:bg-primary/20 rounded-lg transition-colors">
                          View
                        </button>
                      </div>
                    ))}
                  </div>

                  <p className="text-center text-muted-foreground mt-8">
                    No files uploaded yet. Upload your first file to get started!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
