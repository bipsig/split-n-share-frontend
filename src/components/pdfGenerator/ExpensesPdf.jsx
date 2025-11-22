import { 
  Document, Page, Text, View, StyleSheet 
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    padding: 40,
    fontSize: 10,
    color: "#1f2937",
    backgroundColor: "#ffffff",
  },

  // Header Section
  headerContainer: {
    marginBottom: 24,
    borderBottom: "2 solid #e5e7eb",
    paddingBottom: 16,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },

  titleSection: {
    flex: 1,
  },

  userInfoSection: {
    backgroundColor: "#f9fafb",
    padding: 12,
    borderRadius: 8,
    border: "1 solid #e5e7eb",
    minWidth: 200,
  },

  mainTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 11,
    color: "#6b7280",
    marginBottom: 8,
  },

  userInfoLabel: {
    fontSize: 8,
    color: "#6b7280",
    textTransform: "uppercase",
    marginBottom: 4,
  },

  userInfoValue: {
    fontSize: 10,
    color: "#111827",
    marginBottom: 8,
  },

  dateGenerated: {
    fontSize: 9,
    color: "#9ca3af",
    marginTop: 4,
  },

  // Stats Cards Section
  statsContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 28,
  },

  statCard: {
    flex: 1,
    padding: 14,
    borderRadius: 10,
    border: "1 solid #e5e7eb",
  },

  statCardExpense: {
    backgroundColor: "#fef2f2",
    borderColor: "#fecaca",
  },

  statCardPayment: {
    backgroundColor: "#f0fdf4",
    borderColor: "#bbf7d0",
  },

  statCardTotal: {
    backgroundColor: "#f5f3ff",
    borderColor: "#ddd6fe",
  },

  statLabel: {
    fontSize: 8,
    color: "#6b7280",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },

  statValueExpense: {
    color: "#dc2626",
  },

  statValuePayment: {
    color: "#16a34a",
  },

  statValueTotal: {
    color: "#7c3aed",
  },

  statCount: {
    fontSize: 8,
    color: "#9ca3af",
  },

  // Section Header
  sectionHeader: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 14,
    marginTop: 6,
  },

  // Table Section
  table: {
    marginTop: 12,
  },

  tableHeader: {
    backgroundColor: "#f9fafb",
    flexDirection: "row",
    padding: 10,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottom: "2 solid #e5e7eb",
  },

  tableHeaderText: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#374151",
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },

  tableRow: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottom: "1 solid #f3f4f6",
    minHeight: 36,
    alignItems: "center",
  },

  rowOdd: {
    backgroundColor: "#fafafa",
  },

  rowEven: {
    backgroundColor: "#ffffff",
  },

  // Column widths - adjusted to prevent overflow
  colDescription: {
    width: "20%",
    paddingRight: 6,
  },

  colCategory: {
    width: "11%",
    paddingRight: 6,
  },

  colType: {
    width: "11%",
    paddingRight: 6,
  },

  colPaidBy: {
    width: "14%",
    paddingRight: 6,
  },

  colGroup: {
    width: "16%",
    paddingRight: 6,
  },

  colAmount: {
    width: "14%",
    paddingRight: 6,
  },

  colDate: {
    width: "14%",
  },

  cellText: {
    fontSize: 8.5,
    color: "#374151",
    overflow: "hidden",
  },

  // Type badges
  typeBadge: {
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 5,
    fontSize: 7.5,
    fontWeight: "bold",
    alignSelf: "flex-start",
  },

  typeExpense: {
    backgroundColor: "#fee2e2",
    color: "#dc2626",
  },

  typePayment: {
    backgroundColor: "#dcfce7",
    color: "#16a34a",
  },

  // Category badges
  categoryBadge: {
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
    fontSize: 7.5,
    backgroundColor: "#e5e7eb",
    color: "#4b5563",
    alignSelf: "flex-start",
  },

  // Amount styling
  amountText: {
    fontSize: 9.5,
    fontWeight: "bold",
    color: "#111827",
  },

  // Footer
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    borderTop: "1 solid #e5e7eb",
  },

  footerText: {
    fontSize: 8,
    color: "#9ca3af",
  },

  // Empty state
  emptyState: {
    padding: 40,
    textAlign: "center",
    color: "#9ca3af",
    fontSize: 11,
  },
});

const ExpensesPdf = ({ transactions, currentUsername }) => {
  // Helper function to format numbers without locale issues
  const formatAmount = (amount) => {
    return amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const totalExpenses = transactions
    .filter(t => t.type === "Expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalPayments = transactions
    .filter(t => t.type === "Payment")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenseCount = transactions.filter(t => t.type === "Expense").length;
  const paymentCount = transactions.filter(t => t.type === "Payment").length;

  // Calculate user's total expenses
  const userTotalExpenses = transactions
    .filter(t => t.user_paid?.username === currentUsername)
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <View style={styles.topRow}>
            <View style={styles.titleSection}>
              <Text style={styles.mainTitle}>Expense Report</Text>
              <Text style={styles.subtitle}>
                Comprehensive transaction summary across all groups and categories
              </Text>
            </View>
            
            <View style={styles.userInfoSection}>
              <Text style={styles.userInfoLabel}>Generated For</Text>
              <Text style={styles.userInfoValue}>{currentUsername || "User"}</Text>
              <Text style={styles.userInfoLabel}>Your Total Expenses</Text>
              <Text style={styles.userInfoValue}>
                ₹{userTotalExpenses.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </Text>
            </View>
          </View>
          
          <Text style={styles.dateGenerated}>
            Generated on {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </Text>
        </View>

        {/* Statistics Cards */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, styles.statCardExpense]}>
            <Text style={styles.statLabel}>Total Expenses</Text>
            <Text style={[styles.statValue, styles.statValueExpense]}>
              ₹{totalExpenses.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </Text>
            <Text style={styles.statCount}>{expenseCount} transactions</Text>
          </View>

          <View style={[styles.statCard, styles.statCardPayment]}>
            <Text style={styles.statLabel}>Total Payments</Text>
            <Text style={[styles.statValue, styles.statValuePayment]}>
              ₹{totalPayments.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </Text>
            <Text style={styles.statCount}>{paymentCount} transactions</Text>
          </View>

          <View style={[styles.statCard, styles.statCardTotal]}>
            <Text style={styles.statLabel}>All Transactions</Text>
            <Text style={[styles.statValue, styles.statValueTotal]}>
              {transactions.length}
            </Text>
            <Text style={styles.statCount}>Total records</Text>
          </View>
        </View>

        {/* Section Header */}
        <Text style={styles.sectionHeader}>Transaction Details</Text>

        {/* Table */}
        {transactions.length > 0 ? (
          <View style={styles.table}>
            {/* Table Header */}
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderText, styles.colDescription]}>
                Description
              </Text>
              <Text style={[styles.tableHeaderText, styles.colCategory]}>
                Category
              </Text>
              <Text style={[styles.tableHeaderText, styles.colType]}>
                Type
              </Text>
              <Text style={[styles.tableHeaderText, styles.colPaidBy]}>
                Paid By
              </Text>
              <Text style={[styles.tableHeaderText, styles.colGroup]}>
                Group
              </Text>
              <Text style={[styles.tableHeaderText, styles.colAmount]}>
                Amount
              </Text>
              <Text style={[styles.tableHeaderText, styles.colDate]}>
                Date
              </Text>
            </View>

            {/* Table Rows */}
            {transactions.map((t, index) => (
              <View
                key={t._id || index}
                style={[
                  styles.tableRow,
                  index % 2 === 0 ? styles.rowEven : styles.rowOdd
                ]}
              >
                <View style={styles.colDescription}>
                  <Text style={styles.cellText}>
                    {t.description.length > 25 
                      ? t.description.substring(0, 22) + "..." 
                      : t.description}
                  </Text>
                </View>

                <View style={styles.colCategory}>
                  <Text style={styles.categoryBadge}>
                    {t.category}
                  </Text>
                </View>

                <View style={styles.colType}>
                  <Text
                    style={[
                      styles.typeBadge,
                      t.type === "Expense"
                        ? styles.typeExpense
                        : styles.typePayment
                    ]}
                  >
                    {t.type}
                  </Text>
                </View>

                <View style={styles.colPaidBy}>
                  <Text style={styles.cellText}>
                    {t.user_paid?.username || "N/A"}
                  </Text>
                </View>

                <View style={styles.colGroup}>
                  <Text style={styles.cellText}>
                    {t.groupTitle 
                      ? (t.groupTitle.length > 18 
                          ? t.groupTitle.substring(0, 15) + "..." 
                          : t.groupTitle)
                      : "—"}
                  </Text>
                </View>

                <View style={styles.colAmount}>
                  <Text style={styles.amountText}>
                    ₹{t.amount.toLocaleString('en-IN', { 
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2 
                    })}
                  </Text>
                </View>

                <View style={styles.colDate}>
                  <Text style={styles.cellText}>
                    {new Date(t.createdAt).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.emptyState}>No transactions to display</Text>
        )}

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>
            Split n Share • Generated for {currentUsername || "User"}
          </Text>
          <Text
            style={styles.footerText}
            render={({ pageNumber, totalPages }) =>
              `Page ${pageNumber} of ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  );
};

export default ExpensesPdf;