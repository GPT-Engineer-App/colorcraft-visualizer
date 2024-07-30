import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Material Theme Editor</h1>
        <p className="mb-8">Edit and preview your Material Design theme colors</p>
        <Link to="/theme-editor">
          <Button>Go to Theme Editor</Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
