import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ReactNode } from 'react';

interface ContentCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  iconBgColor?: string;
}

export default function ContentCard({ icon, title, description, iconBgColor = 'bg-blue-100' }: ContentCardProps) {
  return (
    <Card className="transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardHeader>
        <div className={`w-14 h-14 ${iconBgColor} rounded-lg flex items-center justify-center mb-4`}>
          <span className="text-3xl">{icon}</span>
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base leading-relaxed">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}

