import { useState } from 'react';

type VaultCard = {
  id: string;
  name: string;
  variant: 'l1' | 'stable' | 'experimental';
  principal: string;
  apy: string;
  topFundedLabel: string;
  topFundedValue: string;
  action?: string;
};

type FlowCard = {
  id: string;
  title: string;
  description: string;
  note?: string;
};

const vaults: VaultCard[] = [
  {
    id: 'l1',
    name: 'Dragon Vault L1',
    variant: 'l1',
    principal: '$ 12.1m',
    apy: '5.0%',
    topFundedLabel: 'Top Funded Program',
    topFundedValue: 'Public Goods Grants',
  },
  {
    id: 'stable',
    name: 'Dragon Vault Stable',
    variant: 'stable',
    principal: '$ 12.1m',
    apy: '5.0%',
    topFundedLabel: 'Top Funded Genre',
    topFundedValue: 'Public Goods Grants',
  },
  {
    id: 'experimental',
    name: 'Dragon Vault Experimental',
    variant: 'experimental',
    principal: '$ 12.1m',
    apy: '5.0%',
    topFundedLabel: 'Top Funded Program',
    topFundedValue: 'Public Goods Grants',
    action: 'View Routing',
  },
];

const flows: FlowCard[] = [
  {
    id: 'deposit',
    title: 'Deposit',
    description: 'Put treasury assets into a secure ERC-4626 vault. Your principal stays safe while Octant Mini prepares it to generate yield.',
  },
  {
    id: 'generate',
    title: 'Generate',
    description: 'Your vault automatically earns yield through diversified, low-risk DeFi strategies.',
    note: 'No manual management required.',
  },
  {
    id: 'route',
    title: 'Route',
    description: 'The Dragon Router sends a portion of your yield directly to programs you choose.',
    note: "Always aligned with your ecosystem's priorities.",
  },
];

const iconMap: Record<string, JSX.Element> = {
  deposit: (
    <svg viewBox="0 0 40 40" role="img" aria-hidden>
      <path
        d="M20 6v28M10 24l10 10 10-10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  generate: (
    <svg viewBox="0 0 40 40" role="img" aria-hidden>
      <path
        d="M11 14c1.5-4 5.5-7 9.9-7 6.7 0 12.1 5.4 12.1 12.1 0 6.7-5.4 12.1-12.1 12.1-4.4 0-8.4-3-9.9-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M20 11v9l6 3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  route: (
    <svg viewBox="0 0 40 40" role="img" aria-hidden>
      <path
        d="M12 10h8c5 0 8 3 8 8v12"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M28 30l-4-4 4-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="3" fill="currentColor" />
    </svg>
  ),
};

const yieldSources = ['Lido', 'Aave', 'Rocket Pool'];

const allocations = [
  { label: 'Grants', value: 50 },
  { label: 'Builder Round', value: 20 },
  { label: 'Events & Community', value: 30 },
];

const payoutPrograms = [
  {
    label: 'Grants',
    value: 50,
    amount: '$20,000',
    description: 'Supports open-source builders and public goods.',
  },
  {
    label: 'Builder Round',
    value: 20,
    amount: '$10,000',
    description: 'Funding for early-stage projects.',
  },
  {
    label: 'Events & Community',
    value: 30,
    amount: '$20,000',
    description: 'Workshops, meetups, and ecosystem growth.',
  },
];

const routingNotes = ['Open Source Builders', 'Education & Training', 'Developer Ecosystem'];

function App() {
  const renderVaultLabel = (name: string) => name.split(' ').pop() ?? '';
  const [view, setView] = useState<'landing' | 'demo'>('landing');
  const [showSimulation, setShowSimulation] = useState(false);

  const closeSimulation = () => setShowSimulation(false);
  const goToLanding = () => {
    setShowSimulation(false);
    setView('landing');
  };

  if (view === 'demo') {
    return (
      <div className="page dashboard">
        <div className="glow glow-left" />
        <div className="glow glow-right" />
        <div className="content dashboard-content">
          <nav className="demo-nav">
            <button className="icon-button" onClick={goToLanding} aria-label="Back to landing">
              ←
            </button>
            <button className="btn btn-secondary" onClick={() => setShowSimulation(true)}>
              Simulate Payout
            </button>
          </nav>

          <header className="demo-header">
            <p>Configure how your vault&apos;s yield supports ecosystem growth</p>
          </header>

          <section className="demo-panel">
            <div className="vault-summary">
              <p className="vault-label">Dragon Vault L1</p>
              <h2>Dragon Vault L1</h2>
              <p className="stat-label">Principal</p>
              <p className="stat-value">$ 12.1m</p>
              <p className="stat-label">APY</p>
              <p className="stat-value apy">5.0%</p>
              <p className="stat-label">Projected Monthly Yield</p>
              <p className="stat-value">$48,900</p>

              <div className="yield-sources">
                <p className="section-label">Yield Sources</p>
                <ul>
                  {yieldSources.map((source) => (
                    <li key={source}>{source}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="vault-analytics">
              <div className="donut-chart" aria-label="Yield allocation chart" role="img">
                <div className="donut-hole" />
              </div>
              <div className="allocation-card">
                <p className="section-label">Yield Allocation</p>
                <ul>
                  {allocations.map((allocation) => (
                    <li key={allocation.label}>
                      <span>{allocation.label}</span>
                      <strong>{allocation.value}%</strong>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="routing-review">
            <div className="routing-card">
              <header>
                <div>
                  <p className="section-label">Yield Routing Review</p>
                  <h3>
                    Public Goods Grants <span>50%</span>
                  </h3>
                </div>
                <span className="badge badge-default">Default</span>
              </header>
              <p className="stat-label">Funds will be distributed to:</p>
              <ul>
                {routingNotes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </div>
            <div className="routing-card total-card">
              <p className="section-label">Total Routed This Month</p>
              <p className="total-value">$50,000</p>
              <button className="btn btn-ghost add-program">+ Add Program</button>
            </div>
          </section>

          {showSimulation && (
            <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Simulate payout">
              <div className="modal">
                <header className="modal-header">
                  <div>
                    <h2>Simulate Payout</h2>
                    <p>Preview how this month&apos;s yield will be distributed across your programs.</p>
                  </div>
                  <button className="icon-button close" onClick={closeSimulation} aria-label="Close simulation">
                    ×
                  </button>
                </header>
                <div className="modal-body">
                  <p className="section-label">Projected Monthly Yield</p>
                  <p className="projected-value">$50,000</p>
                  <p className="modal-subtext">This amount is based on your vault&apos;s current APY and yield sources.</p>
                  <div className="program-list">
                    {payoutPrograms.map((program) => (
                      <article key={program.label} className="program-card">
                        <div>
                          <h3>{program.label}</h3>
                          <p>{program.description}</p>
                        </div>
                        <strong>
                          {program.value}% - {program.amount}
                        </strong>
                      </article>
                    ))}
                  </div>
                  <div className="modal-total">
                    <span>Total Routed This Month</span>
                    <strong>$50,000</strong>
                  </div>
                </div>
                <footer className="modal-actions">
                  <button className="btn btn-danger" onClick={closeSimulation}>
                    Cancel
                  </button>
                  <button className="btn btn-secondary">Apply Simulation</button>
                </footer>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="glow glow-left" />
      <div className="glow glow-right" />
      <div className="content">
        <header className="header">
          <div className="brand">
            <div className="brand-icon" aria-hidden>
              <span />
            </div>
            <p className="brand-eyebrow">oCtant Mini</p>
          </div>
          <button className="btn btn-secondary" onClick={() => setView('demo')}>
            Launch Demo
          </button>
        </header>

        <main>
          <section className="hero">
            <h1>
              Power Your Ecosystem With
              <br />
              Automated Yield Funding
            </h1>
            <p className="hero-body">
              Turn idle treasury assets into <span>continuous</span>, transparent funding streams without your{' '}
              <span>principal</span>.
            </p>
          </section>

          <section className="vaults">
            {vaults.map((vault) => (
              <article key={vault.id} className={`vault-card ${vault.variant}`}>
                <div className="vault-card__body">
                  <p className="vault-label">{renderVaultLabel(vault.name)}</p>
                  <h3>{vault.name}</h3>
                  <div className="stat-block">
                    <div>
                      <p className="stat-label">Principal</p>
                      <p className="stat-value">{vault.principal}</p>
                    </div>
                    <div>
                      <p className="stat-label">APY</p>
                      <p className="stat-value apy">{vault.apy}</p>
                    </div>
                  </div>
                </div>
                <div className="vault-card__footer">
                  <p className="stat-label">{vault.topFundedLabel}</p>
                  <p className="vault-highlight">{vault.topFundedValue}</p>
                  {vault.action && <button className="btn btn-ghost">{vault.action}</button>}
                </div>
              </article>
            ))}
          </section>

          <section className="flows">
            {flows.map((flow) => (
              <article key={flow.id} className={`flow-card ${flow.id}`}>
                <div className="flow-icon">{iconMap[flow.id]}</div>
                <h4>{flow.title}</h4>
                <p className="flow-description">{flow.description}</p>
                {flow.note && <p className="flow-note">{flow.note}</p>}
              </article>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
