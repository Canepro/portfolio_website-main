import React from 'react';
import { Section, SectionDivider, SectionText, SectionTitle } from '../../styles/GlobalComponents';
import OptimizedImage from '../OptimizedImage/OptimizedImage';

const FLOW_IMAGE_SRC = '/images/infra-flow.svg';
const FLOW_IMAGE_ALT =
  'Hybrid Cloud GitOps Architecture showing Terraform provisioning OCI OKE and ArgoCD managing K3s Rocket.Chat deployments';

const InfrastructureFlow: React.FC = () => {
  return (
    <Section id="infrastructure-flow" style={{ marginTop: '24px' }}>
      <SectionDivider divider />
      <SectionTitle>Infrastructure Flow</SectionTitle>
      <SectionText>
        A declarative pipeline where Terraform provisions the OCI OKE Hub and K3s Spoke, while
        ArgoCD reconciles 100% of application state and observability telemetry from Git.
      </SectionText>

      <div className="w-full">
        <div className="mx-auto w-full max-w-5xl overflow-hidden rounded-xl border bg-card p-3 shadow-sm">
          <div className="relative aspect-[16/9] w-full">
            <OptimizedImage
              src={FLOW_IMAGE_SRC}
              alt={FLOW_IMAGE_ALT}
              fill
              enableHover={false}
              placeholder={false}
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default InfrastructureFlow;
