import { LandingLayout } from '@/components/landing/LandingLayout';
import { HeroSection } from '@/components/landing/HeroSection';
import { ValueProps } from '@/components/landing/ValueProps';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { ProductPreview } from '@/components/landing/ProductPreview';
import { CTASection } from '@/components/landing/CTASection';
import { usePublicPlansVM } from '@/presentation/viewmodels/usePublicPlansVM';

export const LandingPage = () => {
  const { data, isLoading } = usePublicPlansVM();

  return (
    <LandingLayout>
      <HeroSection
        trialDays={data?.trialDays}
        trialLimits={data?.trial_limits}
        isLoading={isLoading}
      />
      <ValueProps />
      <HowItWorks />
      <ProductPreview />
      <CTASection trialDays={data?.trialDays} />
    </LandingLayout>
  );
};
