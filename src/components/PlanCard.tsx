import { Badge } from "./ui/badge";

interface PlanCardProps {
  title: string;
  mission: string;
  bullets: string[];
  constraints: string[];
  hook: string;
}

export function PlanCard({ title, mission, bullets, constraints, hook }: PlanCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-card p-6">
      <h3 className="mb-3">{title}</h3>
      <p className="mb-4 text-muted-foreground">{mission}</p>
      
      <div className="mb-4">
        <h4 className="mb-2 text-sm font-medium">This Week:</h4>
        <ul className="space-y-2">
          {bullets.map((bullet, index) => (
            <li key={index} className="text-small flex items-start">
              <span className="text-muted-foreground mr-2">•</span>
              {bullet}
            </li>
          ))}
        </ul>
      </div>

      {constraints.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {constraints.map((constraint, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {constraint}
              </Badge>
            ))}
          </div>
        </div>
      )}

      <p className="text-small text-muted-foreground italic">{hook}</p>
    </div>
  );
}