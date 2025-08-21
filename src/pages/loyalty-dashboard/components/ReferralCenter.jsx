import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ReferralCenter = ({ referralData, onSendInvite }) => {
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteMessage, setInviteMessage] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  const referralLink = `https://bookbridge.com/join?ref=${referralData?.referralCode}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard?.writeText(referralLink);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleSendInvite = (e) => {
    e?.preventDefault();
    if (inviteEmail?.trim()) {
      onSendInvite(inviteEmail, inviteMessage);
      setInviteEmail('');
      setInviteMessage('');
    }
  };

  const shareOptions = [
    { name: 'Email', icon: 'Mail', action: () => window.open(`mailto:?subject=Join BookBridge&body=Join me on BookBridge and get amazing book deals! Use my referral link: ${referralLink}`) },
    { name: 'WhatsApp', icon: 'MessageCircle', action: () => window.open(`https://wa.me/?text=Join me on BookBridge for amazing book deals! ${referralLink}`) },
    { name: 'Facebook', icon: 'Facebook', action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`) },
    { name: 'Twitter', icon: 'Twitter', action: () => window.open(`https://twitter.com/intent/tweet?text=Join me on BookBridge for amazing book deals!&url=${encodeURIComponent(referralLink)}`) }
  ];

  return (
    <div className="card-literary p-6">
      <div className="flex items-center gap-2 mb-6">
        <Icon name="Users" size={24} className="text-primary" />
        <h3 className="text-xl font-headline font-semibold">Referral Center</h3>
      </div>
      {/* Referral Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-muted/50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-primary mb-1">
            {referralData?.totalReferrals}
          </div>
          <div className="text-sm text-muted-foreground">Total Referrals</div>
        </div>
        <div className="bg-muted/50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-trust-green mb-1">
            {referralData?.successfulReferrals}
          </div>
          <div className="text-sm text-muted-foreground">Successful</div>
        </div>
        <div className="bg-muted/50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-accent mb-1">
            {referralData?.pointsEarned?.toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground">Points Earned</div>
        </div>
      </div>
      {/* Referral Link */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-foreground mb-2">
          Your Referral Link
        </label>
        <div className="flex gap-2">
          <Input
            type="text"
            value={referralLink}
            readOnly
            className="flex-1 bg-muted"
          />
          <Button
            variant={copiedLink ? "success" : "outline"}
            onClick={handleCopyLink}
            className="min-w-24"
          >
            {copiedLink ? (
              <>
                <Icon name="Check" size={16} />
                Copied
              </>
            ) : (
              <>
                <Icon name="Copy" size={16} />
                Copy
              </>
            )}
          </Button>
        </div>
      </div>
      {/* Quick Share */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-foreground mb-3">Quick Share</h4>
        <div className="flex flex-wrap gap-2">
          {shareOptions?.map((option) => (
            <Button
              key={option?.name}
              variant="outline"
              size="sm"
              onClick={option?.action}
              className="flex items-center gap-2"
            >
              <Icon name={option?.icon} size={16} />
              {option?.name}
            </Button>
          ))}
        </div>
      </div>
      {/* Send Personal Invite */}
      <div className="border-t pt-6">
        <h4 className="text-sm font-medium text-foreground mb-3">Send Personal Invite</h4>
        <form onSubmit={handleSendInvite} className="space-y-4">
          <Input
            type="email"
            label="Friend's Email"
            placeholder="Enter email address"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e?.target?.value)}
            required
          />
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Personal Message (Optional)
            </label>
            <textarea
              className="w-full p-3 border border-border rounded-md resize-none focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth"
              rows={3}
              placeholder="Add a personal message to your invitation..."
              value={inviteMessage}
              onChange={(e) => setInviteMessage(e?.target?.value)}
            />
          </div>
          <Button type="submit" variant="accent" fullWidth>
            <Icon name="Send" size={16} />
            Send Invitation
          </Button>
        </form>
      </div>
      {/* Recent Referrals */}
      {referralData?.recentReferrals && referralData?.recentReferrals?.length > 0 && (
        <div className="border-t pt-6 mt-6">
          <h4 className="text-sm font-medium text-foreground mb-3">Recent Referrals</h4>
          <div className="space-y-3">
            {referralData?.recentReferrals?.map((referral) => (
              <div key={referral?.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div>
                  <div className="font-medium text-foreground">{referral?.name}</div>
                  <div className="text-sm text-muted-foreground">
                    Joined {new Date(referral.joinDate)?.toLocaleDateString()}
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-semibold ${
                    referral?.status === 'completed' ? 'text-trust-green' : 
                    referral?.status === 'pending' ? 'text-accent' : 'text-muted-foreground'
                  }`}>
                    {referral?.status === 'completed' ? `+${referral?.pointsEarned} pts` : 
                     referral?.status === 'pending' ? 'Pending' : 'Invited'}
                  </div>
                  <div className="text-xs text-muted-foreground capitalize">
                    {referral?.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Referral Rewards Info */}
      <div className="bg-accent/10 rounded-lg p-4 mt-6">
        <div className="flex items-start gap-3">
          <Icon name="Gift" size={20} className="text-accent mt-1" />
          <div>
            <h4 className="font-semibold text-foreground mb-2">Referral Rewards</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• You get 500 points when a friend joins</li>
              <li>• Your friend gets 200 bonus points</li>
              <li>• Earn 100 extra points when they make their first purchase</li>
              <li>• No limit on referrals - invite as many friends as you want!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralCenter;