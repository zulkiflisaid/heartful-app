import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  showBack?: boolean;
  rightElement?: React.ReactNode;
  className?: string;
}

const PageHeader = ({ title, showBack = true, rightElement, className }: PageHeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className={cn('sticky top-0 z-40 flex items-center gap-3 border-b border-border bg-card px-4 py-3 safe-top', className)}>
      {showBack && (
        <button onClick={() => navigate(-1)} className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-secondary">
          <ArrowLeft className="h-5 w-5" />
        </button>
      )}
      <h1 className="flex-1 text-lg font-semibold">{title}</h1>
      {rightElement}
    </header>
  );
};

export default PageHeader;
