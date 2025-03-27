
import { useState } from 'react';
import { useProjectStore } from '@/store/projectStore';
import { Button } from './Button';
import { toast } from 'sonner';

interface StakeFormProps {
  projectId: string;
  maxAmount: number;
}

const StakeForm = ({ projectId, maxAmount }: StakeFormProps) => {
  const [amount, setAmount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const stakeTokens = useProjectStore(state => state.stakeTokens);
  
  const handleStake = () => {
    if (!amount || amount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    
    if (amount > maxAmount) {
      toast.error(`You can't stake more than ${maxAmount} tokens`);
      return;
    }
    
    setIsLoading(true);
    
    // Simulate transaction delay
    setTimeout(() => {
      stakeTokens({ projectId, amount });
      toast.success(`Successfully staked ${amount} tokens`);
      setAmount(0);
      setIsLoading(false);
    }, 1500);
  };
  
  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-medium text-white mb-4">Stake Tokens</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-400 mb-1">
          Amount (Available: {maxAmount} tokens)
        </label>
        <div className="relative">
          <input 
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            min="0"
            max={maxAmount}
            className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-200"
            placeholder="Enter amount to stake"
          />
          <button 
            onClick={() => setAmount(maxAmount)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-700 hover:bg-gray-600 text-xs font-medium text-white px-2 py-1 rounded transition-colors"
          >
            MAX
          </button>
        </div>
      </div>
      
      <Button 
        onClick={handleStake}
        disabled={!amount || amount <= 0 || amount > maxAmount}
        isLoading={isLoading}
        className="w-full"
      >
        Stake Tokens
      </Button>
    </div>
  );
};

export default StakeForm;
