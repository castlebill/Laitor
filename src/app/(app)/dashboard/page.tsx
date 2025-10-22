import { InsuranceChat } from '@/components/insurance/InsuranceChat';
import { MyPolicies } from '@/components/dashboard/MyPolicies';
import { UpcomingRenewals } from '@/components/dashboard/UpcomingRenewals';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <InsuranceChat />
        </div>
        <div>
          <UpcomingRenewals />
        </div>
      </div>
      
      <MyPolicies />
    </div>
  );
}
