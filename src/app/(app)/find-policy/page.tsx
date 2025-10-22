import { PolicyComparison } from '@/components/insurance/PolicyComparison';
import { RecommendationSection } from '@/components/insurance/RecommendationSection';

export default function FindPolicyPage() {
  return (
    <div className="space-y-8">
      <RecommendationSection />
      <PolicyComparison />
    </div>
  );
}
