import { useState, useCallback } from 'react';

const SPENT_KEY = 'stars_spent';

function getSpent(): number {
  try {
    return parseInt(localStorage.getItem(SPENT_KEY) || '0', 10);
  } catch { return 0; }
}

function getTotalEarned(): number {
  try {
    const saved = localStorage.getItem('game_progress');
    if (saved) {
      const p = JSON.parse(saved);
      return p.totalStars ?? 0;
    }
  } catch {}
  return 0;
}

export function useStarBalance() {
  const [spent, setSpent] = useState(getSpent);

  const totalEarned = getTotalEarned();
  const balance = Math.max(0, totalEarned - spent);

  const spendStars = useCallback((amount: number): boolean => {
    const current = Math.max(0, getTotalEarned() - getSpent());
    if (current < amount) return false;
    const newSpent = getSpent() + amount;
    localStorage.setItem(SPENT_KEY, String(newSpent));
    setSpent(newSpent);
    return true;
  }, []);

  const canAfford = useCallback((amount: number) => balance >= amount, [balance]);

  const addStars = useCallback((amount: number) => {
    const newSpent = Math.max(0, getSpent() - amount);
    localStorage.setItem(SPENT_KEY, String(newSpent));
    setSpent(newSpent);
  }, []);

  return { balance, spendStars, canAfford, addStars };
}
