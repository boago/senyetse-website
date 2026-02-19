export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-senyetse-cream">
      {children}
    </div>
  );
}
