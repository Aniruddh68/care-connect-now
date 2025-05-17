import React, { useState } from 'react';
import { PlusCircle, Trash2, Check } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/context/UserContext';

const MultipleAccounts: React.FC = () => {
  const { toast } = useToast();
  const { accounts, switchAccount } = useUser();
  const [isAddAccountOpen, setIsAddAccountOpen] = useState(false);
  const [newAccount, setNewAccount] = useState({
    name: '',
    email: '',
  });

  const handleAddAccount = () => {
    if (!newAccount.name || !newAccount.email) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const nameInitials = newAccount.name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();

    // Add new account logic here using context
    setNewAccount({ name: '', email: '' });
    setIsAddAccountOpen(false);
    
    toast({
      title: "Account added",
      description: `${newAccount.name}'s account has been added successfully.`,
    });
  };

  const handleSwitchAccount = (id: string) => {
    switchAccount(id);
    
    toast({
      title: "Account switched",
      description: "Successfully switched to the selected account.",
    });
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-bold text-care-dark">Your Accounts</h3>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1"
          onClick={() => setIsAddAccountOpen(true)}
        >
          <PlusCircle className="h-4 w-4" /> Add Account
        </Button>
      </div>
      
      <div className="bg-white rounded-xl shadow overflow-hidden">
        {accounts.map((account, index) => (
          <React.Fragment key={account.id}>
            <div className="flex items-center p-4 hover:bg-gray-50">
              <Avatar className="h-10 w-10 mr-3 border border-gray-200">
                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${account.fullName}`} alt={account.fullName} />
                <AvatarFallback>{account.fullName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              
              <div className="flex-grow">
                <div className="flex items-center">
                  <h4 className="font-medium">{account.fullName}</h4>
                  {account.isActive && (
                    <span className="ml-2 px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded-full">
                      Active
                    </span>
                  )}
                </div>
                <p className="text-sm text-care-muted">{account.email}</p>
              </div>
              
              <div className="flex gap-2">
                {!account.isActive && (
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleSwitchAccount(account.id)}
                    className="h-8 w-8 rounded-full"
                  >
                    <Check className="h-4 w-4 text-care-primary" />
                  </Button>
                )}
              </div>
            </div>
            {index < accounts.length - 1 && (
              <div className="border-b border-gray-100"></div>
            )}
          </React.Fragment>
        ))}
      </div>
      
      <Dialog open={isAddAccountOpen} onOpenChange={setIsAddAccountOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Account</DialogTitle>
            <DialogDescription>
              Add another account to quickly switch between profiles.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                value={newAccount.name} 
                onChange={(e) => setNewAccount({...newAccount, name: e.target.value})}
                placeholder="Enter full name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                value={newAccount.email} 
                onChange={(e) => setNewAccount({...newAccount, email: e.target.value})}
                placeholder="Enter email address"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddAccountOpen(false)}>Cancel</Button>
            <Button onClick={handleAddAccount}>Add Account</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MultipleAccounts;