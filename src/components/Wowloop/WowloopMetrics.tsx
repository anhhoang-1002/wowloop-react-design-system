import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { DollarSign, Users, Repeat, TrendingUp } from 'lucide-react';

export const WowloopMetrics: React.FC = () => {
  const metrics = [
    { title: 'Monthly Recurring Revenue', value: '$128,450', change: '14.2%', isPositive: true, icon: <DollarSign size={20} /> },
    { title: 'Active Subscribers', value: '3,420', change: '8.7%', isPositive: true, icon: <Users size={20} /> },
    { title: 'Retention Rate', value: '94.6%', change: '2.1%', isPositive: true, icon: <Repeat size={20} /> },
    { title: 'Net LTV Growth', value: '+38.5%', change: '5.4%', isPositive: true, icon: <TrendingUp size={20} /> },
  ];

  return (
    <section className="max-w-5xl mx-auto my-12 px-4">
      <h3 className="text-2xl font-semibold text-secondary mb-6">Platform Metrics (SaaS Preview)</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m, idx) => (
          <Card key={idx} variant="blue-shadow" className="hover:-translate-y-1 transition-transform">
            <CardHeader className="flex flex-row items-center justify-between pb-2 border-none">
              <CardTitle className="text-xs font-bold text-muted uppercase tracking-wider">{m.title}</CardTitle>
              <div className="w-10 h-10 rounded-md bg-secondary-bg text-secondary flex items-center justify-center">
                {m.icon}
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-3xl font-black text-secondary leading-none my-2">{m.value}</div>
              <div className="flex items-center gap-1 text-xs font-semibold">
                <span className={m.isPositive ? 'text-primary-vibrant' : 'text-danger'}>
                  {m.isPositive ? '↑' : '↓'} {m.change}
                </span>
                <span className="text-muted">vs last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
