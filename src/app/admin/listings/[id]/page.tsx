export async function generateStaticParams() {
  return [];
}

export default function AdminPage() {
  return (
    <div className="p-8 text-center">
      <p>Admin not available in static mode.</p>
    </div>
  );
}
