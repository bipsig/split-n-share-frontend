import { parseAmount } from "../../../../utils/parseAmount";

const GroupBalanceBreakdown = ({ member, breakdown, balance }) => {
  if (!breakdown || Object.keys(breakdown).length === 0) {
    return (
      <div className="text-sm text-gray-500 italic">
        No individual transactions
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {Object.entries(breakdown).map(([otherUser, amount]) => (
        amount !== 0 && (
          <div key={otherUser} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">
                  {amount > 0 ? otherUser.charAt(0).toUpperCase() : member.username.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="text-sm text-gray-700">
                {amount < 0 ? `${member.username} owes ${otherUser}` : `${otherUser} owes ${member.username}`}
              </span>
            </div>
            <span className={`text-sm font-semibold ${amount < 0 ? 'text-red-600' : 'text-green-600'
              }`}>
              {parseAmount(amount)}
            </span>
          </div>
        )
      ))}
    </div>
  );
};

export default GroupBalanceBreakdown;