import { FormEvent, useMemo, useState } from 'react';
import { formatCurrency } from '../lib/format';

const PROGRAM_CATEGORIES = ['Events', 'Public Goods', 'Community Initiatives', 'Ecosystem R&D'];

const makeId = () =>
  globalThis.crypto?.randomUUID?.() ?? `${Date.now().toString(36)}-${Math.random().toString(16).slice(2)}`;

export type WalletSplit = {
  id: string;
  address: string;
  percent: number;
};

export type ProgramDraft = {
  id: string;
  name: string;
  description: string;
  category: string;
  allocation: number;
  wallets: WalletSplit[];
};

interface CreateProgramModalProps {
  projectedYield: number;
  onClose: () => void;
  onSave: (program: ProgramDraft) => void;
}

export function CreateProgramModal({ projectedYield, onClose, onSave }: CreateProgramModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(PROGRAM_CATEGORIES[0]);
  const [allocation, setAllocation] = useState('');
  const [wallets, setWallets] = useState<WalletSplit[]>([
    { id: makeId(), address: '', percent: 100 },
  ]);

  const allocationValue = Number(allocation) || 0;
  const walletSplitTotal = useMemo(
    () => wallets.reduce((sum, wallet) => sum + (wallet.percent || 0), 0),
    [wallets],
  );
  const previewAmount = projectedYield * (allocationValue / 100);

  const isAllocationValid = allocationValue > 0 && allocationValue <= 100;
  const walletSplitsValid =
    Math.abs(walletSplitTotal - 100) < 0.01 && wallets.every((wallet) => wallet.address.trim() && wallet.percent > 0);
  const isFormValid = Boolean(name.trim()) && isAllocationValid && walletSplitsValid;

  const handleWalletChange = (id: string, field: 'address' | 'percent', value: string) => {
    setWallets((prev) =>
      prev.map((wallet) => {
        if (wallet.id !== id) return wallet;
        if (field === 'address') {
          return { ...wallet, address: value };
        }
        const nextPercent = Number(value);
        return { ...wallet, percent: Number.isFinite(nextPercent) ? nextPercent : 0 };
      }),
    );
  };

  const handleAddWallet = () => {
    setWallets((prev) => [...prev, { id: makeId(), address: '', percent: 0 }]);
  };

  const handleRemoveWallet = (id: string) => {
    setWallets((prev) => (prev.length === 1 ? prev : prev.filter((wallet) => wallet.id !== id)));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isFormValid) return;
    onSave({
      id: makeId(),
      name: name.trim(),
      description: description.trim(),
      category,
      allocation: allocationValue,
      wallets: wallets.map((wallet) => ({
        ...wallet,
        address: wallet.address.trim(),
      })),
    });
    onClose();
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Add program">
      <div className="modal program-modal">
        <header className="modal-header">
          <div>
            <h2>Add Program</h2>
            <p>Create a new vault or beneficiary with explicit wallet splits.</p>
          </div>
          <button className="icon-button close" onClick={onClose} aria-label="Close add program modal">
            ×
          </button>
        </header>
        <form className="program-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="program-name">
              Program Name <span aria-hidden="true">*</span>
            </label>
            <input
              id="program-name"
              type="text"
              placeholder="Program Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="program-description">Description (optional)</label>
            <textarea
              id="program-description"
              placeholder="Tell us about the program…"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>

          <div className="form-grid">
            <div className="form-row">
              <label htmlFor="program-category">
                Category <span aria-hidden="true">*</span>
              </label>
              <select
                id="program-category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                {PROGRAM_CATEGORIES.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <label htmlFor="program-allocation">
                Allocation (%) <span aria-hidden="true">*</span>
              </label>
              <input
                id="program-allocation"
                type="number"
                min={0}
                max={100}
                step={0.5}
                placeholder="0 - 100%"
                value={allocation}
                onChange={(event) => setAllocation(event.target.value)}
              />
              {!isAllocationValid && allocation && (
                <p className="error-text">Allocation must be between 0 and 100%.</p>
              )}
            </div>
          </div>

          <div className="wallet-splits">
            <div className="wallet-splits__header">
              <p className="section-label">Wallet Splits</p>
              <span className={`split-total ${walletSplitsValid ? '' : 'error'}`}>
                Total: {walletSplitTotal.toFixed(1)}%
              </span>
            </div>
            <div className="wallet-list">
              {wallets.map((wallet) => (
                <div key={wallet.id} className="wallet-row">
                  <div>
                    <label htmlFor={`wallet-address-${wallet.id}`}>Wallet Address</label>
                    <input
                      id={`wallet-address-${wallet.id}`}
                      type="text"
                      placeholder="0x..."
                      value={wallet.address}
                      onChange={(event) => handleWalletChange(wallet.id, 'address', event.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor={`wallet-percent-${wallet.id}`}>Split (%)</label>
                    <input
                      id={`wallet-percent-${wallet.id}`}
                      type="number"
                      min={0}
                      max={100}
                      step={0.5}
                      value={wallet.percent}
                      onChange={(event) => handleWalletChange(wallet.id, 'percent', event.target.value)}
                      required
                    />
                  </div>
                  <button
                    type="button"
                    className="icon-button remove"
                    onClick={() => handleRemoveWallet(wallet.id)}
                    aria-label="Remove wallet"
                    disabled={wallets.length === 1}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            {!walletSplitsValid && (
              <p className="error-text">Wallet splits must sum to 100% and all wallets need an address.</p>
            )}
            <button type="button" className="btn btn-ghost" onClick={handleAddWallet}>
              + Add Wallet Split
            </button>
          </div>

          <div className="monthly-preview">
            <p className="section-label">Monthly Yield Preview</p>
            <p className="preview-value">
              {allocationValue > 0 ? formatCurrency(previewAmount) : 'Set allocation to preview'}
            </p>
            <p className="modal-subtext">
              This program will receive {formatCurrency(projectedYield)} × ({allocationValue || '0'}% allocation).
            </p>
          </div>

          <footer className="modal-actions">
            <button type="button" className="btn btn-danger" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-secondary" disabled={!isFormValid}>
              + Add Program
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}
