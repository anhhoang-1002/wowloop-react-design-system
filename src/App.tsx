import React, { useState } from 'react';
import {
  Navbar,
  Button,
  Card,
  H1,
  H2,
  H3,
  H4,
  Text,
  HighlightText,
  Badge,
  Input,
  PillBanner,
  StatusChip,
  Modal,
  StatCard,
} from './components';
import {
  TrendingUp,
  Users,
  Repeat,
  DollarSign,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Zap,
  Layers,
} from 'lucide-react';

export function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ company: '', website: '', revenue: '' });
  const [formError, setFormError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.company) {
      setFormError(true);
    } else {
      setFormError(false);
      alert('Strategy call requested for: ' + formData.company);
      setIsModalOpen(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg-canvas)' }}>
      {/* SaaS Header Navigation */}
      <Navbar
        onBookCall={() => setIsModalOpen(true)}
        onLogin={() => alert('Redirecting to Wowloop Login...')}
      />

      {/* Hero Section */}
      <section
        style={{
          padding: '80px 20px 60px',
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <Badge variant="blue" style={{ marginBottom: '20px' }}>
          <Sparkles size={14} /> WOWLOOP SAAS PLATFORM DESIGN SYSTEM
        </Badge>

        <H1 style={{ maxWidth: '900px', margin: '0 auto 20px' }}>
          Turn What You Already Have Into <HighlightText>Recurring Revenue</HighlightText>
        </H1>

        <Text
          variant="muted"
          style={{ fontSize: '20px', maxWidth: '720px', margin: '0 auto 36px', lineHeight: '1.6' }}
        >
          A design system engineered for high retention, customer programs, and subscriptions.
          Derived directly from <b>wowsuite.ai</b> aesthetics.
        </Text>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button variant="primary-gradient" size="lg" pill onClick={() => setIsModalOpen(true)}>
            BOOK A STRATEGY CALL <ArrowRight size={18} />
          </Button>
          <Button variant="deep-blue" size="lg" pill onClick={() => alert('Viewing Component Specs')}>
            EXPLORE COMPONENTS <Layers size={18} />
          </Button>
        </div>

        {/* Floating Pill Banner */}
        <div style={{ marginTop: '50px' }}>
          <PillBanner
            title="Customer Programs & Retention Operating System"
            subtitle="Clear benefits • Clear rules • Clear status tracking"
            action={<StatusChip status="active" label="System Active" />}
          />
        </div>
      </section>

      {/* SaaS Dashboard Metrics Demo */}
      <section style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
        <H3 style={{ marginBottom: '24px' }}>Platform Metrics (SaaS Preview)</H3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '24px',
          }}
        >
          <StatCard
            title="Monthly Recurring Revenue"
            value="$128,450"
            change="14.2%"
            isPositive={true}
            icon={<DollarSign size={20} />}
          />
          <StatCard
            title="Active Subscribers"
            value="3,420"
            change="8.7%"
            isPositive={true}
            icon={<Users size={20} />}
          />
          <StatCard
            title="Retention Rate"
            value="94.6%"
            change="2.1%"
            isPositive={true}
            icon={<Repeat size={20} />}
          />
          <StatCard
            title="Net LTV Growth"
            value="+38.5%"
            change="5.4%"
            isPositive={true}
            icon={<TrendingUp size={20} />}
          />
        </div>
      </section>

      {/* Design System Foundations Section */}
      <section style={{ maxWidth: '1200px', margin: '60px auto', padding: '0 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <H2>Design Tokens & Visual Foundation</H2>
          <Text variant="muted">Exact color palettes, typography scales, shadows, and radii tokens.</Text>
        </div>

        {/* Color Palette Grid */}
        <Card variant="light" style={{ marginBottom: '32px' }}>
          <H4>1. Color Tokens Palette</H4>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '16px',
              marginTop: '16px',
            }}
          >
            <ColorSwatch
              color="var(--gradient-primary-btn)"
              label="Primary Green Gradient"
              sub="#009959 → #52CC85"
            />
            <ColorSwatch
              color="var(--color-deep-blue)"
              label="Deep Brand Blue"
              sub="#122DBD"
            />
            <ColorSwatch
              color="var(--gradient-secondary-btn)"
              label="Secondary Orange CTA"
              sub="#FF3C3A → #FF7A1D"
            />
            <ColorSwatch
              color="var(--color-bg-canvas)"
              label="Canvas Backdrop"
              sub="#F1F7FF"
              border
            />
            <ColorSwatch
              color="var(--color-accent-blue-bg)"
              label="Accent Soft Blue"
              sub="#E3EEFF"
            />
            <ColorSwatch
              color="var(--color-danger)"
              label="Error Danger Red"
              sub="#CC4B37"
            />
          </div>
        </Card>

        {/* Typography System */}
        <Card variant="light" style={{ marginBottom: '32px' }}>
          <H4>2. Typography Hierarchy (Montserrat)</H4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
            <div>
              <span style={{ fontSize: '12px', color: '#9B9B9B' }}>Display / H1 (45px, weight 500/700)</span>
              <H1 style={{ margin: 0 }}>Turn What You Have Into <HighlightText>Recurring Revenue</HighlightText></H1>
            </div>
            <div>
              <span style={{ fontSize: '12px', color: '#9B9B9B' }}>Heading 2 (36px, weight 500)</span>
              <H2 style={{ margin: 0 }}>The First Sale Is Not <HighlightText>The Finish Line</HighlightText></H2>
            </div>
            <div>
              <span style={{ fontSize: '12px', color: '#9B9B9B' }}>Heading 3 (24px, Deep Blue #122DBD)</span>
              <H3 style={{ margin: 0 }}>A Real Program Not Just A Recurring Charge</H3>
            </div>
            <div>
              <span style={{ fontSize: '12px', color: '#9B9B9B' }}>Body & Badges</span>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '8px' }}>
                <Text style={{ margin: 0 }}>Standard body text for feature descriptions and SaaS content.</Text>
                <Badge variant="green">ACTIVE</Badge>
                <Badge variant="blue">SYSTEM READY</Badge>
                <Badge variant="orange">FEATURED</Badge>
              </div>
            </div>
          </div>
        </Card>

        {/* Component Showcase Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '32px',
          }}
        >
          {/* Button Variants */}
          <Card variant="blue-shadow" title="3. Button Components">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <span style={{ fontSize: '12px', color: '#9B9B9B', display: 'block', marginBottom: '8px' }}>
                  Primary Strategy Call Gradient (Pill & Normal)
                </span>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <Button variant="primary-gradient" pill>Book A Strategy Call</Button>
                  <Button variant="primary-gradient" size="sm">Primary SM</Button>
                </div>
              </div>

              <div>
                <span style={{ fontSize: '12px', color: '#9B9B9B', display: 'block', marginBottom: '8px' }}>
                  Secondary CTA Orange Gradient (Solid Offset Shadow)
                </span>
                <Button variant="secondary-gradient" pill fullWidth>
                  CONTINUE TO CHECKOUT
                </Button>
              </div>

              <div>
                <span style={{ fontSize: '12px', color: '#9B9B9B', display: 'block', marginBottom: '8px' }}>
                  Deep Blue & Solid Green Variants
                </span>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <Button variant="deep-blue">Deep Blue Action</Button>
                  <Button variant="solid-green">Solid Green</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="primary-gradient" loading>Loading</Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Cards & Elevation */}
          <Card variant="blue-shadow" title="4. Card Elevations & Borders">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Card variant="blue-shadow" hoverable style={{ padding: '16px' }}>
                <H4 style={{ margin: 0 }}>Feature Card (15px Radius, #0050c533 Shadow)</H4>
                <Text variant="muted" style={{ margin: '8px 0 0', fontSize: '14px' }}>
                  Clear rules, clear benefits, clear status tracking. Hover to see lift elevation.
                </Text>
              </Card>

              <Card variant="input-shadow" style={{ padding: '16px' }}>
                <H4 style={{ margin: 0 }}>Input Shadow Card (#465ff11a Shadow)</H4>
                <Text variant="muted" style={{ margin: '8px 0 0', fontSize: '14px' }}>
                  Used for form groups and subtle content cards.
                </Text>
              </Card>

              <Card variant="pill" style={{ padding: '16px' }}>
                <H4 style={{ margin: 0 }}>Capsule Pill Container (52px Radius)</H4>
                <Text variant="muted" style={{ margin: '4px 0 0', fontSize: '14px' }}>
                  Used for highlight banners and status bars.
                </Text>
              </Card>
            </div>
          </Card>

          {/* Floating Inputs & Forms */}
          <Card variant="blue-shadow" title="5. Inputs & Floating Labels">
            <form onSubmit={(e) => e.preventDefault()}>
              <Input
                floatingLabel="Company Name"
                requiredStar
                placeholder="Acme Inc."
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                error={formError ? 'Company name is required' : undefined}
              />
              <Input
                floatingLabel="Company Website"
                requiredStar
                placeholder="https://example.com"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              />
              <Input
                floatingLabel="Monthly Revenue (USD)"
                requiredStar
                placeholder="$50,000"
                value={formData.revenue}
                onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
              />
              <Button variant="primary-gradient" fullWidth onClick={() => setIsModalOpen(true)}>
                OPEN FORM MODAL DEMO
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Interactive Modal Component Demo */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Tell Us About Your Business"
        subtitle="Please complete the required information below to book your call."
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary-gradient" pill onClick={handleSubmit}>
              Submit Request
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit}>
          <Input
            floatingLabel="Company Name"
            requiredStar
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            error={formError ? 'Company name is required' : undefined}
          />
          <Input
            floatingLabel="Company Website"
            requiredStar
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
          />
          <Input
            floatingLabel="Monthly Unique Customers"
            requiredStar
            placeholder="10,000"
          />
          <Input
            floatingLabel="Monthly Revenue (USD)"
            requiredStar
            value={formData.revenue}
            onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
          />
        </form>
      </Modal>
    </div>
  );
}

// Color Swatch Helper
function ColorSwatch({ color, label, sub, border = false }: { color: string; label: string; sub: string; border?: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div
        style={{
          height: '60px',
          borderRadius: '8px',
          background: color,
          border: border ? '1px solid #CACACA' : 'none',
          boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
        }}
      />
      <div>
        <div style={{ fontWeight: '700', fontSize: '13px' }}>{label}</div>
        <div style={{ color: '#9B9B9B', fontSize: '11px' }}>{sub}</div>
      </div>
    </div>
  );
}

export default App;
