import React from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { BookOpen, Download, Search, FileText } from 'lucide-react';
import './KnowledgeBase.css';

export const KnowledgeBase: React.FC = () => {
  return (
    <div className="knowledge-base animate-fade-in">
      <header className="kb-header">
        <div>
          <h1 className="dashboard-title">Resource Library</h1>
          <p className="dashboard-subtitle">Browse guides, manuals, and best practices available offline.</p>
        </div>
        <div className="kb-search">
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Search resources..." className="kb-search-input" />
        </div>
      </header>

      <div className="kb-grid mt-6">
        <Card className="kb-card" hoverable>
          <div className="kb-icon-wrapper bg-primary-light">
            <BookOpen size={28} className="text-white" />
          </div>
          <h3 className="kb-title">Maize Cultivation Guide 2026</h3>
          <p className="kb-desc">Complete handbook for optimal maize yield in Northern Province.</p>
          <div className="kb-footer">
            <span className="kb-size">PDF • 2.4 MB</span>
            <Button variant="ghost" size="sm" className="download-btn">
              <Download size={18} />
            </Button>
          </div>
        </Card>

        <Card className="kb-card" hoverable>
          <div className="kb-icon-wrapper" style={{ backgroundColor: '#f59e0b' }}>
            <FileText size={28} className="text-white" />
          </div>
          <h3 className="kb-title">Pest Management: Fall Armyworm</h3>
          <p className="kb-desc">Identification signs and organic treatments for common pests.</p>
          <div className="kb-footer">
            <span className="kb-size">PDF • 1.1 MB</span>
            <Button variant="ghost" size="sm" className="download-btn">
              <Download size={18} />
            </Button>
          </div>
        </Card>

        <Card className="kb-card" hoverable>
          <div className="kb-icon-wrapper bg-secondary">
            <BookOpen size={28} className="text-white" />
          </div>
          <h3 className="kb-title">Irrigation Best Practices</h3>
          <p className="kb-desc">Water conservation techniques for dry seasons.</p>
          <div className="kb-footer">
            <span className="kb-size">PDF • 3.0 MB</span>
            <Button variant="ghost" size="sm" className="download-btn">
              <Download size={18} />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
